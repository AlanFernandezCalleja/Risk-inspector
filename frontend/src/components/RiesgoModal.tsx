// src/components/modals/RiesgoModal.tsx
import { useState, useEffect } from "react";
import { type RiesgoCompletoData } from "../models/RiesgoCopletoData";
// 👇 Asumimos que tienes estos hooks para llenar los catálogos del form
import { useAmenazas } from "../hooks/useAmenazas";
import { useControles } from "../hooks/useControles"; 
import { useTratamientos } from "../hooks/useTratamientos";

interface RiesgoModalProps {
  isOpen: boolean;
  onClose: () => void;
  riesgoItem: RiesgoCompletoData | null;
  onSave: (datos: any) => Promise<boolean>;
}

export const RiesgoModal = ({ isOpen, onClose, riesgoItem, onSave }: RiesgoModalProps) => {
  const { amenazas } = useAmenazas();
  const { controles } = useControles();
  const { tratamientos, cargandoTratamientos } = useTratamientos();
  
  const [formData, setFormData] = useState({ 
    amenaza_id: "",
    tratamiento_id: "", 
    probabilidad_residual: "1",
    impacto_residual: "1",
    controlesIds: [] as number[] // 🌟 Nuestro arreglo mágico
  });

  useEffect(() => {
    if (riesgoItem) {
      setFormData({
        amenaza_id: String(riesgoItem.amenaza.id),
        // Asumiendo que tienes el ID del tratamiento, si no, ajusta esto:
        tratamiento_id: String(riesgoItem.tratamientoRiesgo), 
        probabilidad_residual: String(riesgoItem.probabilidadResidual || 1),
        impacto_residual: String(riesgoItem.impactoResidual || 1),
        controlesIds: riesgoItem.controles ? riesgoItem.controles.map(c => c.id) : [],
      });
    } else {
      setFormData({ amenaza_id: "", tratamiento_id: "", probabilidad_residual: "1", impacto_residual: "1", controlesIds: [] });
    }
  }, [riesgoItem, isOpen]);

  if (!isOpen) return null;

  // 🌟 La función que agrega o quita IDs del arreglo cuando marcas un checkbox
  const handleControlToggle = (id: number) => {
    setFormData(prev => ({
      ...prev,
      controlesIds: prev.controlesIds.includes(id)
        ? prev.controlesIds.filter(cId => cId !== id) // Lo quita si ya estaba
        : [...prev.controlesIds, id] // Lo agrega si no estaba
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const exito = await onSave({
      amenaza_id: Number(formData.amenaza_id),
      tratamiento_id: Number(formData.tratamiento_id),
      probabilidad_residual: Number(formData.probabilidad_residual),
      impacto_residual: Number(formData.impacto_residual),
      controlesIds: formData.controlesIds,
    });
    if (exito) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {riesgoItem ? "Modificar Riesgo" : "Nuevo Riesgo"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amenaza</label>
              <select required value={formData.amenaza_id} onChange={(e) => setFormData({ ...formData, amenaza_id: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white">
                <option value="" disabled>Seleccionar amenaza...</option>
                {amenazas?.map((a) => <option key={a.id} value={a.id}>{a.amenaza}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tratamiento del Riesgo</label>
              <select 
                required 
                value={formData.tratamiento_id} 
                onChange={(e) => setFormData({ ...formData, tratamiento_id: e.target.value })} 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
              >
                <option value="" disabled>
                  {cargandoTratamientos ? "Cargando..." : "Seleccionar tratamiento..."}
                </option>
                {/* 🌟 3. Mapeamos los tratamientos dinámicamente */}
                {(tratamientos || []).map((t) => (
                  <option key={t.id} value={t.id}>{t.nombre}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Probabilidad Residual</label>
              <input type="number" min="1" max="5" required value={formData.probabilidad_residual} onChange={(e) => setFormData({ ...formData, probabilidad_residual: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Impacto Residual</label>
              <input type="number" min="1" max="5" required value={formData.impacto_residual} onChange={(e) => setFormData({ ...formData, impacto_residual: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            </div>
          </div>

          {/* 🌟 Sección de Controles (Checkboxes) */}
          <div className="mt-4 border-t pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar Controles a Aplicar</label>
            <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3 bg-gray-50 grid grid-cols-2 gap-2">
              {controles?.map((c) => (
                <label key={c.id} className="flex items-center space-x-2 text-sm cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.controlesIds.includes(c.id)}
                    onChange={() => handleControlToggle(c.id)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>{c.control}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
              {riesgoItem ? "Guardar Cambios" : "Crear Riesgo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};