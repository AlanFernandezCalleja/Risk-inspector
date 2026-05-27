// src/hooks/useRiesgos.ts
import { useState, useEffect, useCallback } from 'react';
import { type RiesgoCompletoData } from '../models/RiesgoCopletoData';

export const useRiesgos = () => {
  const [riesgos, setRiesgos] = useState<RiesgoCompletoData[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Envolvemos la petición en un useCallback para poder llamarla
  // tanto al inicio (useEffect) como desde otros archivos (recargarRiesgos)
  const recargarRiesgos = useCallback(async () => {
    setCargando(true);
    setError(null);
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'; // Ajusta el puerto a tu backend
      
      const res = await fetch(`${API_URL}/riesgos/lista`);
      if (!res.ok) throw new Error("No se pudieron cargar los riesgos");
      
      const data = await res.json();
      setRiesgos(data);
    } catch (err: any) {
      console.error("Error cargando riesgos:", err);
      setError(err.message || "Ocurrió un error al cargar la tabla");
    } finally {
      setCargando(false);
    }
  }, []);

  // Solo se ejecuta una vez al montar el componente
  useEffect(() => {
    recargarRiesgos();
  }, [recargarRiesgos]);

  // Ahora sí exportamos las 4 cosas que necesita useGestionRiesgos
  return { riesgos, cargando, error, recargarRiesgos };
};