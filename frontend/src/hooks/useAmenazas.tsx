// src/hooks/useAmenazas.ts

import { useState, useEffect } from 'react';
import type { AmenazaData } from '../models/AmenazaData';
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useAmenazas = () => {
  const [amenazas, setAmenazas] = useState<AmenazaData[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const obtenerAmenazas = async () => {
    setCargando(true);
    setError(null);
    try {
      // 💡 Asegúrate de que el puerto coincida con tu backend
      const response = await fetch(`${API_URL}/amenazas/lista`);
      
      if (!response.ok) {
        throw new Error('Error al obtener las amenazas');
      }

      const data = await response.json();
      setAmenazas(data);
    } catch (err: any) {
      setError(err.message || 'Error de conexión');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerAmenazas();
  }, []);

  return {
    amenazas,
    cargando,
    error,
    recargarAmenazas: obtenerAmenazas,
  };
};