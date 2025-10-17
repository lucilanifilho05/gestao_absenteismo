import React, { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";
import DropdownSelect from "./DropdownSelect";
import { saveConfidentialRecord } from "../../services/confidentialService";

const THEMES = [
  { value: "carga_trabalho", label: "Carga de Trabalho" },
  { value: "relacionamento", label: "Relacionamento Interpessoal" },
  { value: "ergonomia", label: "Ergonomia do Posto de Trabalho" },
  { value: "outros", label: "Outros" },
];

const NewConfidentialModal = ({ open, onClose, userId, onSaved }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [signal, setSignal] = useState(false);
  const [theme, setTheme] = useState("");
  const [saving, setSaving] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState("");

  if (!open) return null;

  const canSave = body.trim().length > 0 && (!signal || (signal && theme));

  const handleSave = async () => {
    if (!canSave || saving) return;
    try {
      setSaving(true);
      await saveConfidentialRecord({
        userId,
        title: title.trim() || "",
        body: body.trim(),
        signalToHR: signal,
        theme: signal ? theme : "",
      });
      setConfirmMsg(
        signal
          ? "Registro salvo. O conteúdo está criptografado (apenas você vê) e o tema foi sinalizado anonimamente ao RH."
          : "Registro salvo. O conteúdo está criptografado e é visível apenas para você."
      );
      // limpa os campos
      setTitle("");
      setBody("");
      setSignal(false);
      setTheme("");
      // notifica a page
      await onSaved?.();
    } catch (e) {
      console.error(e);
      setConfirmMsg("Ocorreu um erro ao salvar. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* backdrop desfocado */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 relative">
          <button
            onClick={onClose}
            className="absolute right-3 top-3 p-2 rounded hover:bg-gray-100"
            aria-label="Fechar"
          >
            ✕
          </button>

          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
            Novo Registro Confidencial
          </h2>
          <p className="text-gray-600 mt-1">
            O conteúdo é criptografado no seu dispositivo e só você consegue ler.
          </p>

          <div className="mt-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Título (opcional)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Ex.: Reflexões sobre meu fluxo de trabalho"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Descreva aqui sua observação
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={6}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Escreva com detalhes. Este conteúdo é somente seu."
              />
              <p className="mt-1 text-xs text-gray-500">
                * Criptografado localmente com AES-GCM (Web Crypto).
              </p>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <ToggleSwitch checked={signal} onChange={setSignal} />
                <div>
                  <p className="font-medium text-gray-800">
                    Sinalizar tema ao RH anonimamente
                  </p>
                  <p className="text-xs text-gray-500">
                    Opcional. Envia apenas o tema. Seu texto e sua identidade não são compartilhados.
                  </p>
                </div>
              </div>

              {signal && (
                <div className="min-w-[240px]">
                  <DropdownSelect
                    value={theme}
                    onChange={setTheme}
                    placeholder="Tema principal"
                    options={THEMES}
                  />
                </div>
              )}
            </div>
          </div>

          {confirmMsg && (
            <div className="mt-4 rounded-lg border border-green-200 bg-green-50 text-green-700 px-3 py-2 text-sm">
              {confirmMsg}
            </div>
          )}

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={!canSave || saving}
              className={`px-5 py-2 rounded-lg font-medium text-white transition
                ${canSave && !saving ? "bg-violet-600 hover:bg-violet-700" : "bg-violet-300 cursor-not-allowed"}
              `}
            >
              {saving ? "Salvando..." : "Salvar Registro"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewConfidentialModal;
