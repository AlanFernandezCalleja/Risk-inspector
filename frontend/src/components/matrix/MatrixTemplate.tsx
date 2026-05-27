// src/components/elementos/matrix/MatrixTemplate.tsx
import { Fragment } from "react/jsx-runtime";

interface MatrixTemplateProps {
  probInh?: number; // Probabilidad Inherente
  impInh?: number;  // Impacto Inherente
  probRes?: number; // Probabilidad Residual
  impRes?: number;  // Impacto Residual
  nombreAmenaza?: string;
}

export const MatrixTemplate = ({ 
  probInh, 
  impInh,
  probRes,
  impRes,
  nombreAmenaza 
}: MatrixTemplateProps) => {

  const nivelesEjeY = [5, 4, 3, 2, 1];
  const nivelesEjeX = [1, 2, 3, 4, 5];

  const obtenerColorCelda = (probabilidad: number, impacto: number) => {
    const riesgo = probabilidad * impacto;
    if (probabilidad === 5 && impacto === 1) return 'bg-yellow-300 text-black';
    if (probabilidad === 1 && impacto === 5) return 'bg-yellow-300 text-black';

    if (riesgo >= 20) return 'bg-rose-500 text-white';        // Muy Alto
    if (riesgo >= 10) return 'bg-amber-400 text-white';       // Alto
    if (riesgo >= 5)  return 'bg-yellow-300 text-black';      // Medio
    return 'bg-emerald-500 text-white';                       // Bajo
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm max-w-xl mx-auto">
      {nombreAmenaza && (
        <div className="mb-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-700 bg-blue-50 px-2.5 py-1 rounded-full">
            Mapa de Mitigación de Riesgo
          </span>
          <h4 className="text-gray-800 font-bold text-lg mt-2 truncate">{nombreAmenaza}</h4>
        </div>
      )}

      {/* Leyenda de marcadores */}
      <div className="flex justify-center gap-6 mb-4 text-xs font-semibold">
        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.5 rounded bg-blue-600 text-white border border-blue-700 shadow-sm">RI</span>
          <span className="text-gray-600">Riesgo Inherente</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.5 rounded bg-purple-600 text-white border border-purple-700 shadow-sm">RR</span>
          <span className="text-gray-600">Riesgo Residual</span>
        </div>
      </div>

      <div className="flex">
        {/* Eje Y (PROBABILIDAD) */}
        <div className="flex items-center justify-center pr-2">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest [writing-mode:vertical-lr] rotate-180">
            Probabilidad
          </p>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr] gap-1.5 items-center">
            
            {nivelesEjeY.map((prob) => (
              <Fragment key={`fila-${prob}`}>
                <div className="text-right pr-2 text-sm font-bold text-gray-400 w-6">
                  {prob}
                </div>

                {nivelesEjeX.map((imp) => {
                  const valorRiesgo = prob * imp;
                  
                  // Evaluamos las posiciones de ambos riesgos
                  const esInherent = probInh === prob && impInh === imp;
                  const esResidual = probRes === prob && impRes === imp;

                  return (
                    <div
                      key={`celda-${prob}-${imp}`}
                      className={`relative aspect-video flex items-center justify-center font-bold text-lg rounded border border-black/5 shadow-sm select-none transition-all ${obtenerColorCelda(prob, imp)}`}
                    >
                      {/* Puntuación base */}
                      <span className="opacity-40 text-sm">{valorRiesgo}</span>

                      {/* CASO 1: Coinciden en el mismo cuadrante (No hubo mitigación efectiva en cuadrantes) */}
                      {esInherent && esResidual && (
                        <div className="absolute inset-1 flex items-center justify-center bg-indigo-700 text-white text-[11px] font-black rounded border border-white shadow-md animate-pulse">
                          RI + RR
                        </div>
                      )}

                      {/* CASO 2: Solo Riesgo Inherente */}
                      {esInherent && !esResidual && (
                        <span className="absolute top-1 left-1 px-1.5 py-0.5 text-[10px] font-black rounded bg-blue-600 text-white border border-white shadow-md">
                          RI
                        </span>
                      )}

                      {/* CASO 3: Solo Riesgo Residual */}
                      {esResidual && !esInherent && (
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 text-[10px] font-black rounded bg-purple-600 text-white border border-white shadow-md">
                          RR
                        </span>
                      )}
                    </div>
                  );
                })}
              </Fragment>
            ))}

            {/* Eje X (Impacto) */}
            <div></div>
            {nivelesEjeX.map((imp) => (
              <div key={`etiqueta-x-${imp}`} className="text-center pt-2 text-sm font-bold text-gray-400">
                {imp}
              </div>
            ))}
          </div>

          <div className="text-center pt-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Impacto
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};