// src/hooks/useGestionAmenazas.ts
import { useState } from "react";
import { type AmenazaData } from "../models/AmenazaData";
import { useAmenazas } from "./useAmenazas";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
export const useGestionAmenazas = () => {
  const { amenazas, cargando, error, recargarAmenazas } = useAmenazas();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amenazaSeleccionada, setAmenazaSeleccionada] = useState<AmenazaData | null>(null);

  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [idAmenazaAEliminar, setIdAmenazaAEliminar] = useState<number | null>(null);

  const abrirCrear = () => { setAmenazaSeleccionada(null); setIsModalOpen(true); };
  const abrirEditar = (amenaza: AmenazaData) => { setAmenazaSeleccionada(amenaza); setIsModalOpen(true); };
  const cerrarModalForm = () => setIsModalOpen(false);

  const guardarAmenaza = async (datos: any) => {
    try {
      const url = amenazaSeleccionada 
        ? `${API_URL}/amenazas/editar/${amenazaSeleccionada.id}`
        : `${API_URL}/amenazas/crear`;
        
      const method = amenazaSeleccionada ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });

      if (!res.ok) throw new Error("Error al guardar amenaza");
      
      await recargarAmenazas();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const prepararEliminar = (id: number) => { setIdAmenazaAEliminar(id); setIsConfirmDeleteOpen(true); };
  const cancelarEliminar = () => { setIsConfirmDeleteOpen(false); setIdAmenazaAEliminar(null); };

  const confirmarEliminar = async () => {
    if (idAmenazaAEliminar !== null) {
      try {
        await fetch(`${API_URL}/amenazas/eliminar/${idAmenazaAEliminar}`, { method: 'DELETE' });
        await recargarAmenazas();
      } catch (err) {
        console.error("Error al eliminar amenaza", err);
      } finally {
        cancelarEliminar();
      }
    }
  };

  return {
    estado: { amenazas, cargando, error },
    modalForm: { isOpen: isModalOpen, amenaza: amenazaSeleccionada, abrirCrear, abrirEditar, cerrar: cerrarModalForm, guardar: guardarAmenaza },
    modalEliminar: { isOpen: isConfirmDeleteOpen, preparar: prepararEliminar, confirmar: confirmarEliminar, cancelar: cancelarEliminar }
  };
};