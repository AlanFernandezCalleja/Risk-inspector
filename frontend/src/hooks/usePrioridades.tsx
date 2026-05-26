import { useState, useEffect } from "react";
import { type PrioridadData } from "../models/ActivoData";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const usePrioridades = () => {
  const [prioridades, setPrioridades] = useState<PrioridadData[]>([]);

  useEffect(() => {
    const cargarPrioridades = async () => {
      try {
        const res = await fetch(`${API_URL}/prioridades/lista`);
        if (res.ok) {
          const datos = await res.json();
          setPrioridades(datos);
        }
      } catch (err) {
        console.error("Error cargando prioridades:", err);
      }
    };
    cargarPrioridades();
  }, []);

  return { prioridades };
};