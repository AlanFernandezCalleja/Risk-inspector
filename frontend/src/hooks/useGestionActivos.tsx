// src/hooks/useGestionActivos.ts
import { useState } from "react";
import { type ActivoData } from "../models/ActivoData";
import { useActivos } from "./useActivos";
import { useActivosMutaciones } from "./useActivosMutaciones";

export const useGestionActivos = () => {
  // 1. Datos y Mutaciones
  const { activos, cargando, error, recargar } = useActivos();
  const { crearActivo, editarActivo, eliminarActivo } = useActivosMutaciones(recargar);

  // 2. Estados del Modal de Formulario (Crear/Editar)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activoSeleccionado, setActivoSeleccionado] = useState<ActivoData | null>(null);

  // 3. Estados del Modal de Eliminación
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [idActivoAEliminar, setIdActivoAEliminar] = useState<number | null>(null);

  // --- MÉTODOS DEL FORMULARIO ---
  const abrirCrear = () => {
    setActivoSeleccionado(null);
    setIsModalOpen(true);
  };

  const abrirEditar = (activo: ActivoData) => {
    setActivoSeleccionado(activo);
    setIsModalOpen(true);
  };

  const cerrarModalForm = () => setIsModalOpen(false);

  const guardarActivo = async (datos: { nombre: string; descripcion_activo: string; prioridad_id: number }) => {
    try {
      if (activoSeleccionado) {
        await editarActivo(activoSeleccionado.id, datos);
      } else {
        await crearActivo(datos);
      }
      cerrarModalForm(); 
      
      // 🌟 RETORNAMOS TRUE: Le confirmamos al modal que la operación fue un éxito
      return true; 
    } catch (error) {
      console.error("Error al guardar el activo:", error);
      
      // 🌟 RETORNAMOS FALSE: Le avisamos al modal que algo falló (para que no se cierre o muestre error)
      return false; 
    }
  };

  // --- MÉTODOS DE ELIMINACIÓN ---
  const prepararEliminar = (id: number) => {
    setIdActivoAEliminar(id);
    setIsConfirmDeleteOpen(true);
  };

  const cancelarEliminar = () => {
    setIsConfirmDeleteOpen(false);
    setIdActivoAEliminar(null);
  };

  const confirmarEliminar = async () => {
    if (idActivoAEliminar !== null) {
      await eliminarActivo(idActivoAEliminar);
      cancelarEliminar();
    }
  };

  // 4. Retornamos la lógica perfectamente agrupada
  return {
    estado: { activos, cargando, error },
    modalForm: { isOpen: isModalOpen, activo: activoSeleccionado, abrirCrear, abrirEditar, cerrar: cerrarModalForm, guardar: guardarActivo },
    modalEliminar: { isOpen: isConfirmDeleteOpen, preparar: prepararEliminar, confirmar: confirmarEliminar, cancelar: cancelarEliminar }
  };
};