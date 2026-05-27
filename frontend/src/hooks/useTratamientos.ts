// src/hooks/useTratamientos.ts
import { useState, useEffect } from 'react';

interface Tratamiento {
  id: number;
  nombre: string;
}

export const useTratamientos = () => {
  const [tratamientos, setTratamientos] = useState<Tratamiento[]>([]);
  const [cargandoTratamientos, setCargandoTratamientos] = useState(true);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    
    fetch(`${API_URL}/catalogos/tratamientos`)
      .then(async (res) => {
        const data = await res.json();
        
        // 🌟 Validamos si el backend nos devolvió un error (ej. status 400)
        if (!res.ok) throw new Error(data.error || "Error en la petición");
        
        // 🌟 Verificamos que realmente sea un arreglo antes de guardarlo
        if (Array.isArray(data)) {
          setTratamientos(data);
        } else {
          setTratamientos([]); // Si nos mandan otra cosa, ponemos un arreglo vacío
        }
      })
      .catch((err) => {
        // 🌟 Si falla, imprimimos el error pero mantenemos la app viva
        console.error("Fallo al cargar tratamientos:", err.message);
        setTratamientos([]); 
      })
      .finally(() => {
        setCargandoTratamientos(false);
      });
  }, []);

  return { tratamientos, cargandoTratamientos };
};