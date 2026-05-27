// src/components/ControlModal.tsx
import { useState, useEffect } from "react";
import { type ControlData } from "../models/ControlData";
import { useCatalogos } from "../hooks/useCatalogos";

interface ControlModalProps {
  isOpen: boolean;
  onClose: () => void;
  controlItem: ControlData | null;
  onSave: (datos: { 
    control: string; 
    descripcion_control: string; 
    tipo_id: number; 
    nivel_id: number; 
    frecuencia_id: number;
  }) => Promise<boolean>;
}

export const ControlModal = ({ isOpen, onClose, controlItem, onSave }: ControlModalProps) => {
  const { tipos, niveles, frecuencias, cargando } = useCatalogos();
  
  const [formData, setFormData] = useState({ 
    control: "", 
    descripcion_control: "", 
    tipo_id: "", 
    nivel_id: "", 
    frecuencia_id: "" 
  });

  useEffect(() => {
    if (controlItem) {
      setFormData({
        control: controlItem.control,
        descripcion_control: controlItem.descripcion_control || "",
        tipo_id: controlItem.tipo ? String(controlItem.tipo.id) : "",
        nivel_id: controlItem.nivel ? String(controlItem.nivel.id) : "",
        frecuencia_id: controlItem.frecuencia ? String(controlItem.frecuencia.id) : "",
      });
    } else {
      setFormData({ control: "", descripcion_control: "", tipo_id: "", nivel_id: "", frecuencia_id: "" });
    }
  }, [controlItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const exito = await onSave({
      control: formData.control,
      descripcion_control: formData.descripcion_control,
      tipo_id: Number(formData.tipo_id),
      nivel_id: Number(formData.nivel_id),
      frecuencia_id: Number(formData.frecuencia_id),
    });
    if (exito) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {controlItem ? "Modificar Control" : "Nuevo Control"}
        </h2>
        
        {cargando ? (
          <p className="text-gray-500 text-sm">Cargando opciones...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Control</label>
              <input
                type="text" required value={formData.control}
                onChange={(e) => setFormData({ ...formData, control: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea
                required value={formData.descripcion_control}
                onChange={(e) => setFormData({ ...formData, descripcion_control: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20 resize-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select required value={formData.tipo_id} onChange={(e) => setFormData({ ...formData, tipo_id: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white">
                  <option value="" disabled>Seleccionar...</option>
                  {tipos.map((t) => <option key={t.id} value={t.id}>{t.nombre}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nivel</label>
                <select required value={formData.nivel_id} onChange={(e) => setFormData({ ...formData, nivel_id: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white">
                  <option value="" disabled>Seleccionar...</option>
                  {niveles.map((n) => <option key={n.id} value={n.id}>{n.nombre}</option>)}
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Frecuencia</label>
                <select required value={formData.frecuencia_id} onChange={(e) => setFormData({ ...formData, frecuencia_id: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white">
                  <option value="" disabled>Seleccionar...</option>
                  {frecuencias.map((f) => <option key={f.id} value={f.id}>{f.nombre}</option>)}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700">
                Cancelar
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                {controlItem ? "Guardar Cambios" : "Crear Control"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};