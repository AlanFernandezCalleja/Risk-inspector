// src/hooks/useGestionControles.ts
import { useState } from "react";
import { type ControlData } from "../models/ControlData";
import { useControles } from "./useControles";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
export const useGestionControles = () => {
  const { controles, cargando, error, recargarControles } = useControles();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [controlSeleccionado, setControlSeleccionado] = useState<ControlData | null>(null);

  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [idControlAEliminar, setIdControlAEliminar] = useState<number | null>(null);

  const abrirCrear = () => { setControlSeleccionado(null); setIsModalOpen(true); };
  const abrirEditar = (control: ControlData) => { setControlSeleccionado(control); setIsModalOpen(true); };
  const cerrarModalForm = () => setIsModalOpen(false);

  const guardarControl = async (datos: any) => {
    try {
      const url = controlSeleccionado 
        ? `http://localhost:3000/controles/editar/${controlSeleccionado.id}`
        : `http://localhost:3000/controles/crear`;
        
      const method = controlSeleccionado ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });

      if (!res.ok) throw new Error("Error al guardar");
      
      await recargarControles();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const prepararEliminar = (id: number) => { setIdControlAEliminar(id); setIsConfirmDeleteOpen(true); };
  const cancelarEliminar = () => { setIsConfirmDeleteOpen(false); setIdControlAEliminar(null); };

  const confirmarEliminar = async () => {
    if (idControlAEliminar !== null) {
      try {
        await fetch(`http://localhost:3000/controles/eliminar/${idControlAEliminar}`, { method: 'DELETE' });
        await recargarControles();
      } catch (err) {
        console.error("Error al eliminar", err);
      } finally {
        cancelarEliminar();
      }
    }
  };

  return {
    estado: { controles, cargando, error },
    modalForm: { isOpen: isModalOpen, control: controlSeleccionado, abrirCrear, abrirEditar, cerrar: cerrarModalForm, guardar: guardarControl },
    modalEliminar: { isOpen: isConfirmDeleteOpen, preparar: prepararEliminar, confirmar: confirmarEliminar, cancelar: cancelarEliminar }
  };
};