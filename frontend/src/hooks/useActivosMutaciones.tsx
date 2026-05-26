//Archivo : src/hooks/useActivosMutaciones.tsx
import { useState } from "react";
import { type ActivoData } from "../models/ActivoData";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useActivosMutaciones = (onSuccess: () => void) => {
  const [guardando, setGuardando] = useState(false);

  const crearActivo = async (activo: Omit<ActivoData, "id"> & { prioridad_id: number }) => {
    setGuardando(true);
    try {
      const res = await fetch(`${API_URL}/activos/crear`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activo),
      });
      if (res.ok) onSuccess();
      return res.ok;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      setGuardando(false);
    }
  };

  const editarActivo = async (id: number, activo: Partial<ActivoData> & { prioridad_id: number }) => {
    setGuardando(true);
    try {
      const res = await fetch(`${API_URL}/activos/editar/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activo),
      });
      if (res.ok) onSuccess();
      return res.ok;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      setGuardando(false);
    }
  };

  const eliminarActivo = async (id: number) => {
  // 🌟 Eliminamos el confirm nativo de aquí. El hook ahora solo ejecuta la acción de borrar.
  try {
    const res = await fetch(`${API_URL}/activos/eliminar/${id}`, { method: "DELETE" });
    if (res.ok) onSuccess();
    return res.ok;
  } catch (err) {
    console.error(err);
    return false;
  }
};

  return { crearActivo, editarActivo, eliminarActivo, guardando };
};