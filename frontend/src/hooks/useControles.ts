// src/hooks/useControles.ts

import { useState, useEffect } from 'react';
import type { ControlData } from '../models/ControlData';
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useControles = () => {
  const [controles, setControles] = useState<ControlData[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const obtenerControles = async () => {
    setCargando(true);
    setError(null);
    try {
      // 💡 Asegúrate de que esta URL coincida con tu backend
      const response = await fetch(`${API_URL}/controles/lista`);
      
      if (!response.ok) {
        throw new Error('Error al obtener los controles');
      }

      const data = await response.json();
      setControles(data);
    } catch (err: any) {
      setError(err.message || 'Error de conexión');
    } finally {
      setCargando(false);
    }
  };

  // Se ejecuta automáticamente al montar el componente
  useEffect(() => {
    obtenerControles();
  }, []);

  return {
    controles,
    cargando,
    error,
    recargarControles: obtenerControles, // Útil para cuando crees o edites un control
  };
};