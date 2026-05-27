// src/hooks/useGestionRiesgos.ts
import { useState } from "react";
import { useRiesgos } from "./useRiesgos";
import { type RiesgoCompletoData } from "../models/RiesgoCopletoData";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
export const useGestionRiesgos = () => {
  const { riesgos, cargando, error, recargarRiesgos } = useRiesgos();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [riesgoSeleccionado, setRiesgoSeleccionado] = useState<RiesgoCompletoData | null>(null);

  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [idRiesgoAEliminar, setIdRiesgoAEliminar] = useState<number | null>(null);

  const abrirCrear = () => { setRiesgoSeleccionado(null); setIsModalOpen(true); };
  const abrirEditar = (riesgo: RiesgoCompletoData) => { setRiesgoSeleccionado(riesgo); setIsModalOpen(true); };
  const cerrarModalForm = () => setIsModalOpen(false);

  const guardarRiesgo = async (datos: any) => {
    try {
      const url = riesgoSeleccionado 
        ? `${API_URL}/riesgos/editar/${riesgoSeleccionado.idRiesgo}`
        : `${API_URL}/riesgos/crear`;
        
      const method = riesgoSeleccionado ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos) // Aquí va tu formato mágico con controlesIds
      });

      if (!res.ok) throw new Error("Error al guardar el riesgo");
      
      await recargarRiesgos();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const prepararEliminar = (id: number) => { setIdRiesgoAEliminar(id); setIsConfirmDeleteOpen(true); };
  const cancelarEliminar = () => { setIsConfirmDeleteOpen(false); setIdRiesgoAEliminar(null); };

  const confirmarEliminar = async () => {
    if (idRiesgoAEliminar !== null) {
      try {
        await fetch(`${API_URL}/riesgos/eliminar/${idRiesgoAEliminar}`, { method: 'DELETE' });
        await recargarRiesgos();
      } catch (err) {
        console.error("Error al eliminar riesgo", err);
      } finally {
        cancelarEliminar();
      }
    }
  };

  return {
    estado: { riesgos, cargando, error },
    modalForm: { isOpen: isModalOpen, riesgo: riesgoSeleccionado, abrirCrear, abrirEditar, cerrar: cerrarModalForm, guardar: guardarRiesgo },
    modalEliminar: { isOpen: isConfirmDeleteOpen, preparar: prepararEliminar, confirmar: confirmarEliminar, cancelar: cancelarEliminar }
  };
};