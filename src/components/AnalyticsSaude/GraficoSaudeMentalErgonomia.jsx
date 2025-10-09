import React from 'react';

const GraficoSaudeMentalErgonomia = ({ saudeMental, ergonomia, tipoAnalise }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Gráfico de Saúde Mental e Ergonomia</h2>
      
      {/* Conteúdo baseado no tipo de análise selecionado */}
      {tipoAnalise === 'saude-mental' ? (
        <div>
          {/* Saúde Mental */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Distribuição de Sentimentos</h3>
              <div className="space-y-3">
                {saudeMental.sentimentos.map((sentimento, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">
                        {sentimento.sentimento === 'Feliz' && '😊'}
                        {sentimento.sentimento === 'Motivado' && '💪'}
                        {sentimento.sentimento === 'Ansioso' && '😰'}
                        {sentimento.sentimento === 'Estressado' && '😥'}
                        {sentimento.sentimento === 'Desmotivado' && '😞'}
                        {sentimento.sentimento === 'Triste' && '😢'}
                      </span>
                      <span className="font-medium">{sentimento.sentimento}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-gray-900">{sentimento.porcentagem}%</span>
                      <span className={`text-xs ml-2 ${sentimento.variacao >= 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {sentimento.variacao >= 0 ? '+' : ''}{sentimento.variacao}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Insights de Saúde Mental</h3>
              <div className="space-y-3">
                {saudeMental.insights.map((insight, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Ergonomia */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Áreas de Desconforto</h3>
              <div className="space-y-3">
                {ergonomia.desconfortos.map((desconforto, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">{desconforto.area}</span>
                      <span className="font-bold text-orange-600">{desconforto.porcentagem}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full" 
                        style={{ width: `${desconforto.porcentagem}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Setores: {desconforto.setores.join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Insights de Ergonomia</h3>
              <div className="space-y-3">
                {ergonomia.insights.map((insight, index) => (
                  <div key={index} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-sm text-orange-800">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Exemplo Contextual */}
      <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
        <h4 className="font-medium text-purple-800 mb-2">💡 Exemplos Contextuais:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-purple-700 font-medium">Saúde Mental:</p>
            <p className="text-purple-600">"Setor X apresenta um aumento de 10% em desmotivação por questões de liderança"</p>
          </div>
          <div>
            <p className="text-purple-700 font-medium">Ergonomia:</p>
            <p className="text-purple-600">"Células X e Z estão com aumento de 20% em dores no punho, proveniente da má posição ofertada pelas máquinas"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraficoSaudeMentalErgonomia;