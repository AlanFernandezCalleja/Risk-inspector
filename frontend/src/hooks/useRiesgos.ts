// src/hooks/useRiesgos.ts
import { useState, useEffect } from 'react';
import { type RiesgoCompletoData } from '../models/RiesgoCopletoData';

export const useRiesgos = () => {
  const [riesgos, setRiesgos] = useState<RiesgoCompletoData[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    
    fetch(`${API_URL}/riesgos`)
      .then((res) => res.json())
      .then((data) => {
        setRiesgos(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error cargando riesgos:", err);
        setCargando(false);
      });
  }, []);

  return { riesgos, cargando };
};