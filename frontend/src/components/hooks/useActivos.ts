// src/components/hooks/useActivos.ts
// Archivo para hacer peticion de los activos
import { useState, useEffect } from "react";
import { type ActivoData } from "../../components/models/ActivoData";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Función pura auxiliar para limpiar la transformación de datos
const mapearActivoDesdeBackend = (item: any): ActivoData => ({
  id: item.id,
  nombre: item.nombre,
  descripcionActivo: item.descripcion_activo,
  prioridad: {
    id: item.prioridad_id?.id,
    nombre: item.prioridad_id?.nombre,
    nivelPeso: item.prioridad_id?.nivel_peso,
  },
});

export const useActivos = () => {
  const [activos, setActivos] = useState<ActivoData[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarActivos = async () => {
      try {
        setCargando(true);
        const respuesta = await fetch(`${API_URL}/activos`);
        
        if (!respuesta.ok) {
          throw new Error("No se pudo obtener la información del servidor");
        }

        const datosBackend = await respuesta.json();
        // Aplicamos el mapeo estructurado
        setActivos(datosBackend.map(mapearActivoDesdeBackend));
      } catch (err: any) {
        setError(err.message || "Ocurrió un error inesperado");
      } finally {
        setCargando(false);
      }
    };

    cargarActivos();
  }, []);

  // Exponemos solo lo que el componente visual necesita consumir
  return { activos, cargando, error };
};