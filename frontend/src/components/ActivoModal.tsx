import { useState, useEffect } from "react";
import { type ActivoData } from "../models/ActivoData";
import { usePrioridades } from "../hooks/usePrioridades"

interface ActivoModalProps {
  isOpen: boolean;
  onClose: () => void;
  activo: ActivoData | null;
  onSave: (datos: { nombre: string; descripcion_activo: string; prioridad_id: number }) => Promise<boolean>;
}

export const ActivoModal = ({ isOpen, onClose, activo, onSave }: ActivoModalProps) => {
  const { prioridades } = usePrioridades();
  const [formData, setFormData] = useState({ nombre: "", descripcion_activo: "", prioridad_id: "" });

  useEffect(() => {
    if (activo) {
      setFormData({
        nombre: activo.nombre,
        descripcion_activo: activo.descripcion_activo || "",
        prioridad_id: activo.prioridad ? String(activo.prioridad.id) : "",
      });
    } else {
      setFormData({ nombre: "", descripcion_activo: "", prioridad_id: "" });
    }
  }, [activo, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const exito = await onSave({
      nombre: formData.nombre,
      descripcion_activo: formData.descripcion_activo,
      prioridad_id: Number(formData.prioridad_id),
    });
    if (exito) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {activo ? "Modificar Activo" : "Nuevo Activo"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text" required value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              required value={formData.descripcion_activo}
              onChange={(e) => setFormData({ ...formData, descripcion_activo: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 resize-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
            <select
              required value={formData.prioridad_id}
              onChange={(e) => setFormData({ ...formData, prioridad_id: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
            >
              <option value="" disabled>Selecciona una prioridad</option>
              {prioridades.map((p) => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
              {activo ? "Guardar Cambios" : "Crear Activo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};