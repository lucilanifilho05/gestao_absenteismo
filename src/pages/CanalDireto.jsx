import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import NewConfidentialModal from "../components/CanalDireto/NewConfidentialModal";
import { listDecryptedRecords } from "../services/confidentialService";

const CanalDireto = () => {
  const navigate = useNavigate();
  // const { user } = useAuth();
  const userId = "mock-user"; // substitua por user?.id quando integrar

  const [open, setOpen] = useState(false);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    setLoading(true);
    const data = await listDecryptedRecords(userId);
    setRecords(data);
    setLoading(false);
  };

  useEffect(() => {
    reload();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#5b24ca]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[#5b24ca] tracking-tight">Canal Direto</h1>
            <p className="text-gray-600 mt-1">
              Espaço 100% confidencial para registrar observações. Somente você pode ler o conteúdo.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            >
              ← Voltar
            </button>
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium transition"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-white/20">+</span>
              Novo Registro Confidencial
            </button>
          </div>
        </div>
      </div>

      {/* Lista de registros do próprio usuário (descriptografados no cliente) */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Seus registros</h2>

        {loading && <p className="text-sm text-gray-500">Carregando…</p>}

        {!loading && records.length === 0 && (
          <p className="text-sm text-gray-500">Você ainda não tem registros confidenciais.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {records.map((r) => (
            <div key={r.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-500">
                    {new Date(r.createdAt).toLocaleString("pt-BR")}
                  </p>
                  <h3 className="mt-1 font-semibold text-gray-900">
                    {r.title || <span className="text-gray-400 italic">Sem título</span>}
                  </h3>
                </div>
              </div>
              <p className="mt-2 text-gray-700 whitespace-pre-wrap">
                {r.body}
              </p>
              {r.signaled && r.theme && (
                <div className="mt-3 inline-flex items-center gap-2 text-xs px-2 py-1 bg-amber-50 text-amber-700 rounded">
                  <span>🔔 Sinal enviado ao RH (anônimo)</span>
                  <span className="font-medium">• {r.theme}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <NewConfidentialModal
        open={open}
        onClose={() => setOpen(false)}
        userId={userId}
        onSaved={async () => {
          setOpen(false);
          await reload();
        }}
      />
    </div>
  );
};

export default CanalDireto;
