import { Fragment } from "react/jsx-runtime";

// src/components/elementos/matrix/MatrixTemplate.tsx
interface MatrixTemplateProps {
  probabilidadSeleccionada?: number; // Valor del 1 al 5
  impactoSeleccionado?: number;       // Valor del 1 al 5
  nombreAmenaza?: string;             // Opcional, para mostrar un título contextual
}

export const MatrixTemplate = ({ 
  probabilidadSeleccionada, 
  impactoSeleccionado,
  nombreAmenaza 
}: MatrixTemplateProps) => {

  // Definimos las filas del 5 al 1 (eje Y) tal como en tu imagen
  const nivelesEjeY = [5, 4, 3, 2, 1];
  // Definimos las columnas del 1 al 5 (eje X)
  const nivelesEjeX = [1, 2, 3, 4, 5];

  // Función para determinar el color de la celda basado estrictamente en tu imagen
  const obtenerColorCelda = (probabilidad: number, impacto: number) => {
    const riesgo = probabilidad * impacto;

    // Casos especiales donde el producto no define el color exacto de la imagen
    if (probabilidad === 5 && impacto === 1) return 'bg-yellow-300 text-black'; // Riesgo 5 (Amarillo)
    if (probabilidad === 1 && impacto === 5) return 'bg-yellow-300 text-black'; // Riesgo 5 (Amarillo)

    // Rangos estándar basados en tu mapa de colores
    if (riesgo >= 20) return 'bg-red-500 text-white';        // Muy Alto (Rojo)
    if (riesgo >= 10) return 'bg-amber-400 text-white';     // Alto (Naranja)
    if (riesgo >= 5)  return 'bg-yellow-300 text-black';     // Medio (Amarillo)
    return 'bg-emerald-500 text-white';                      // Bajo (Verde)
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm max-w-xl mx-auto">
      {nombreAmenaza && (
        <div className="mb-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-700 bg-blue-50 px-2.5 py-1 rounded-full">
            Ubicación de Riesgo
          </span>
          <h4 className="text-gray-800 font-bold text-lg mt-1 truncate">{nombreAmenaza}</h4>
        </div>
      )}

      <div className="flex">
        {/* Etiqueta Eje Y (PROBABILIDAD) */}
        <div className="flex items-center justify-center pr-2">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest [writing-mode:vertical-lr] rotate-180">
            Probabilidad
          </p>
        </div>

        <div className="flex-1">
          {/* Grid de la Matriz (5 filas principales + 1 para etiquetas del eje X) */}
          <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr] gap-1.5 items-center">
            
            {/* Iteramos sobre las filas (Probabilidad) de arriba a abajo (5 a 1) */}
            {nivelesEjeY.map((prob) => (
              <Fragment key={`fila-${prob}`}>
                {/* Indicador numérico izquierdo de la fila */}
                <div className="text-right pr-2 text-sm font-bold text-gray-500 w-6">
                  {prob}
                </div>

                {/* Iteramos sobre las columnas (Impacto) de izquierda a derecha (1 a 5) */}
                {nivelesEjeX.map((imp) => {
                  const valorRiesgo = prob * imp;
                  const esCeldaActiva = probabilidadSeleccionada === prob && impactoSeleccionado === imp;

                  return (
                    <div
                      key={`celda-${prob}-${imp}`}
                      className={`relative aspect-video flex items-center justify-center font-bold text-base rounded border border-black/10 shadow-sm select-none transition-all ${obtenerColorCelda(prob, imp)}`}
                    >
                      {/* Valor numérico del riesgo de fondo */}
                      <span>{valorRiesgo}</span>

                      {/* MARCADOR DINÁMICO (Si coincide con los parámetros recibidos) */}
                      {esCeldaActiva && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded">
                          {/* Anillo exterior con animación de pulso */}
                          <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-white opacity-75"></span>
                          {/* Círculo indicador central */}
                          <span className="relative inline-flex rounded-full h-6 w-6 bg-white text-gray-900 text-xs items-center justify-center shadow-md font-extrabold border-2 border-teal-600">
                            X
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </Fragment>
            ))}

            {/* Fila inferior: Espacio vacío de esquina + Números del Eje X (Impacto) */}
            <div></div> {/* Esquina inferior izquierda */}
            {nivelesEjeX.map((imp) => (
              <div key={`etiqueta-x-${imp}`} className="text-center pt-2 text-sm font-bold text-gray-500">
                {imp}
              </div>
            ))}
          </div>

          {/* Etiqueta Eje X (IMPACTO) */}
          <div className="text-center pt-3">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Impacto
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};