// Archivo src/pages/MatricesRiesgo.tsx
import { useState } from "react";
import { MatrixTemplate } from "../components/matrix/MatrixTemplate";
import { useRiesgos } from "../hooks/useRiesgos";

export const MatricesRiesgo = () => {
  // 🔌 Consumimos los riesgos de la base de datos real
  const { riesgos, cargando, error } = useRiesgos();
  
  // Guardamos el ID del riesgo que el usuario desea ver
  const [riesgoSeleccionadoId, setRiesgoSeleccionadoId] = useState<number | string>("");

  if (cargando) {
    return <div className="p-8 text-center text-gray-500 font-medium">Cargando mapas de calor...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500 font-medium">Error: {error}</div>;
  }

  // Buscamos el objeto completo del riesgo seleccionado
  const riesgoActivo = riesgos.find(r => r.idRiesgo === Number(riesgoSeleccionadoId));

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Análisis de Mapas de Calor</h2>
        <p className="text-sm text-gray-500 mt-1">Selecciona un riesgo para comparar el impacto de los controles aplicados.</p>
      </div>

      {/* Selector Dinámico */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Seleccionar Riesgo de la Matriz
        </label>
        <select
          value={riesgoSeleccionadoId}
          onChange={(e) => setRiesgoSeleccionadoId(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>-- Elige un riesgo activo --</option>
          {riesgos.map((r) => (
            <option key={r.idRiesgo} value={r.idRiesgo}>
              ID {r.idRiesgo} - {r.amenaza?.amenaza} ({r.aplicacion?.nombre})
            </option>
          ))}
        </select>
      </div>

      {/* Renderizado de la Matriz Condicional */}
      {riesgoActivo ? (
        <div className="space-y-6">
          <MatrixTemplate 
            nombreAmenaza={riesgoActivo.amenaza?.amenaza}
            probInh={riesgoActivo.amenaza?.probabilidad}
            impInh={riesgoActivo.amenaza?.impacto}
            probRes={riesgoActivo.probabilidadResidual}
            impRes={riesgoActivo.impactoResidual}
          />
          
          {/* Tarjeta de Resumen Informativo */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 grid grid-cols-2 gap-4 text-center text-sm">
            <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100">
              <span className="text-xs font-bold text-blue-700 uppercase">Riesgo Inherente</span>
              <p className="text-2xl font-black text-blue-900 mt-1">{riesgoActivo.amenaza?.riesgo_inherente}</p>
              <p className="text-xs text-gray-500 mt-0.5">Prob: {riesgoActivo.amenaza?.probabilidad} | Imp: {riesgoActivo.amenaza?.impacto}</p>
            </div>
            <div className="p-3 bg-purple-50/50 rounded-lg border border-purple-100">
              <span className="text-xs font-bold text-purple-700 uppercase">Riesgo Residual</span>
              <p className="text-2xl font-black text-purple-900 mt-1">{riesgoActivo.riesgoResidual}</p>
              <p className="text-xs text-gray-500 mt-0.5">Prob: {riesgoActivo.probabilidadResidual} | Imp: {riesgoActivo.impactoResidual}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-medium">
          Ningún riesgo seleccionado para graficar.
        </div>
      )}
    </div>
  );
};