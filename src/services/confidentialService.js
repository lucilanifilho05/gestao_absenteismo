// Serviço mock com criptografia no cliente (AES-GCM via Web Crypto).
// Salva registros por usuário (criptografados) e envia "sinal anônimo" ao RH (somente tema, sem userId).

const STORAGE_PREFIX = "confidentialChannel:";
const SIGNALS_KEY = "confidentialSignals";
const KEY_PREFIX = "conf_key:"; // guarda JWK da chave simétrica do usuário

// ---------- helpers de base64 <-> ArrayBuffer ----------
function ab2b64(ab) {
  const bytes = new Uint8Array(ab);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}
function b642ab(b64) {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

// ---------- Web Crypto key management ----------
async function getOrCreateKey(userId) {
  const stored = localStorage.getItem(KEY_PREFIX + userId);
  if (stored) {
    const jwk = JSON.parse(stored);
    return await crypto.subtle.importKey(
      "jwk",
      jwk,
      { name: "AES-GCM" },
      false, // não exportável novamente por segurança leve no mock
      ["encrypt", "decrypt"]
    );
  }
  // cria chave nova
  const key = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
  // exporta JWK e salva localmente (mock)
  const jwk = await crypto.subtle.exportKey("jwk", key);
  localStorage.setItem(KEY_PREFIX + userId, JSON.stringify(jwk));
  return key;
}

async function encryptForUser(userId, plaintext) {
  const key = await getOrCreateKey(userId);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const enc = new TextEncoder().encode(plaintext);
  const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, enc);
  return {
    iv: ab2b64(iv),
    data: ab2b64(ct),
  };
}

async function decryptForUser(userId, payload) {
  const key = await getOrCreateKey(userId);
  const iv = new Uint8Array(b642ab(payload.iv));
  const ct = b642ab(payload.data);
  const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ct);
  return new TextDecoder().decode(pt);
}

// ---------- storage utils ----------
function loadArray(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}
function saveArray(key, arr) {
  localStorage.setItem(key, JSON.stringify(arr));
}

// ---------- API ----------
export async function saveConfidentialRecord({ userId, title, body, signalToHR, theme }) {
  const userKey = STORAGE_PREFIX + userId;
  const list = loadArray(userKey);

  const titleEnc = title ? await encryptForUser(userId, title) : null;
  const bodyEnc = await encryptForUser(userId, body);

  const record = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    titleEnc,
    bodyEnc,
    signaled: !!signalToHR,
    theme: signalToHR ? theme : "",
  };

  list.unshift(record); // mais recente no topo
  saveArray(userKey, list);

  // Sinal anônimo ao RH: guarda tema e data, sem userId
  if (signalToHR && theme) {
    const signals = loadArray(SIGNALS_KEY);
    signals.unshift({
      id: crypto.randomUUID(),
      createdAt: record.createdAt,
      theme,
    });
    saveArray(SIGNALS_KEY, signals);
  }

  return record;
}

export async function listDecryptedRecords(userId) {
  const userKey = STORAGE_PREFIX + userId;
  const list = loadArray(userKey);

  const out = [];
  for (const r of list) {
    const title = r.titleEnc ? await decryptForUser(userId, r.titleEnc) : "";
    const body = await decryptForUser(userId, r.bodyEnc);
    out.push({
      id: r.id,
      createdAt: r.createdAt,
      title,
      body,
      signaled: r.signaled,
      theme: r.theme,
    });
  }
  return out;
}

// (opcional) obter sinais anônimos — útil para um painel do RH (não solicitado aqui)
// export function listAnonymousSignals() {
//   return loadArray(SIGNALS_KEY);
// }
