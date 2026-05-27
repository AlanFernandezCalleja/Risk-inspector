// src/components/AmenazaModal.tsx
import { useState, useEffect } from "react";
import { type AmenazaData } from "../models/AmenazaData";
import { useActivos } from "../hooks/useActivos"; // Asumiendo que tienes este hook

interface AmenazaModalProps {
  isOpen: boolean;
  onClose: () => void;
  amenazaItem: AmenazaData | null;
  onSave: (datos: { 
    activo_id: number;
    amenaza: string; 
    descripcion_amenaza: string; 
    consecuencia: string; 
    descripcion_consecuencia: string; 
    probabilidad: number;
    impacto: number;
  }) => Promise<boolean>;
}

export const AmenazaModal = ({ isOpen, onClose, amenazaItem, onSave }: AmenazaModalProps) => {
  const { activos, cargando } = useActivos();
  
  const [formData, setFormData] = useState({ 
    activo_id: "",
    amenaza: "", 
    descripcion_amenaza: "", 
    consecuencia: "", 
    descripcion_consecuencia: "",
    probabilidad: "",
    impacto: ""
  });

  useEffect(() => {
    if (amenazaItem) {
      setFormData({
        activo_id: amenazaItem.activo ? String(amenazaItem.activo.id) : "",
        amenaza: amenazaItem.amenaza,
        descripcion_amenaza: amenazaItem.descripcion_amenaza || "",
        consecuencia: amenazaItem.consecuencia || "",
        descripcion_consecuencia: amenazaItem.descripcion_consecuencia || "",
        probabilidad: String(amenazaItem.probabilidad || 1),
        impacto: String(amenazaItem.impacto || 1),
      });
    } else {
      setFormData({ activo_id: "", amenaza: "", descripcion_amenaza: "", consecuencia: "", descripcion_consecuencia: "", probabilidad: "1", impacto: "1" });
    }
  }, [amenazaItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const exito = await onSave({
      activo_id: Number(formData.activo_id),
      amenaza: formData.amenaza,
      descripcion_amenaza: formData.descripcion_amenaza,
      consecuencia: formData.consecuencia,
      descripcion_consecuencia: formData.descripcion_consecuencia,
      probabilidad: Number(formData.probabilidad),
      impacto: Number(formData.impacto),
    });
    if (exito) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {amenazaItem ? "Modificar Amenaza" : "Nueva Amenaza"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Activo Afectado</label>
            <select required value={formData.activo_id} onChange={(e) => setFormData({ ...formData, activo_id: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white">
              <option value="" disabled>{cargando ? "Cargando activos..." : "Selecciona un activo"}</option>
              {activos?.map((a) => <option key={a.id} value={a.id}>{a.nombre}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amenaza</label>
              <input type="text" required value={formData.amenaza} onChange={(e) => setFormData({ ...formData, amenaza: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción de la Amenaza</label>
              <input type="text" required value={formData.descripcion_amenaza} onChange={(e) => setFormData({ ...formData, descripcion_amenaza: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Consecuencia</label>
              <input type="text" required value={formData.consecuencia} onChange={(e) => setFormData({ ...formData, consecuencia: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción de Consecuencia</label>
              <input type="text" required value={formData.descripcion_consecuencia} onChange={(e) => setFormData({ ...formData, descripcion_consecuencia: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Probabilidad (1-5)</label>
              <input type="number" min="1" max="5" required value={formData.probabilidad} onChange={(e) => setFormData({ ...formData, probabilidad: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Impacto (1-5)</label>
              <input type="number" min="1" max="5" required value={formData.impacto} onChange={(e) => setFormData({ ...formData, impacto: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
              {amenazaItem ? "Guardar Cambios" : "Crear Amenaza"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};