// src/components/tables/TablaActivos.tsx
import { useState } from "react";
import { TablaGenerica, type Columna } from "./TablaGenérica";
import { type ActivoData } from "../../models/ActivoData";
import { Filter, FilterIcon, Plus } from "lucide-react";

import { useActivos } from "../../hooks/useActivos";
import { useActivosMutaciones } from "../../hooks/useActivosMutaciones"; // 🌟 Tu hook de mutaciones
import { ActivoModal } from "../ActivoModal"; // 🌟 Tu modal atómico
import { LabelPrioridad } from "../ui/LabelPrioridad";
import { Boton } from "../ui/Boton";
import { LabelButtons } from "../ui/LabelButtons";
import { ConfirmacionModal } from "../ui/ConfirmacionModal";

export const TablaActivos = () => {
  // 1. Traemos los activos y asumimos que tu hook expone la función para recargar (ej. refetch o cargarActivos)
  const { activos, cargando, error, recargar } = useActivos();

  // 2. Estados para controlar el ciclo de vida del Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activoSeleccionado, setActivoSeleccionado] = useState<ActivoData | null>(null);

  // 🌟 NUEVOS ESTADOS: Para controlar la confirmación de eliminación
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [idActivoAEliminar, setIdActivoAEliminar] = useState<number | null>(null);

  // 3. Inicializamos tus mutaciones pasándole la función de recarga automática al tener éxito
  const { crearActivo, editarActivo, eliminarActivo } = useActivosMutaciones(recargar);


  // Manejador que se activa al pulsar "Eliminar" en la fila
  const handlePreparaEliminar = (id: number) => {
    setIdActivoAEliminar(id);       // Guardamos el ID en memoria
    setIsConfirmDeleteOpen(true);    // Abrimos tu hermoso modal UI
  };

  // Manejador que se ejecuta cuando el usuario pulsa "Confirmar" en tu modal
  const handleConfirmarEliminar = async () => {
    if (idActivoAEliminar !== null) {
      await eliminarActivo(idActivoAEliminar); // Ejecuta la mutación real en la API
      setIsConfirmDeleteOpen(false);           // Cierra el modal
      setIdActivoAEliminar(null);              // Limpia el ID en memoria
    }
  };

  // 4. Manejadores de las acciones del CRUD
  const handleAbrirCrear = () => {
    setActivoSeleccionado(null); // Modo: Crear nuevo
    setIsModalOpen(true);
  };

  const handleAbrirEditar = (activo: ActivoData) => {
    setActivoSeleccionado(activo); // Modo: Editar existente
    setIsModalOpen(true);
  };

  const handleGuardarActivo = async (datos: { nombre: string; descripcion_activo: string; prioridad_id: number }) => {
    if (activoSeleccionado) {
      // Si hay un activo seleccionado, disparamos la edición
      return await editarActivo(activoSeleccionado.id, datos);
    } else {
      // Si es null, disparamos la creación
      return await crearActivo(datos);
    }
  };

  // 5. Estructura de columnas (Ahora dentro para capturar el contexto de las funciones de arriba)
  const columnaActivos: Columna<ActivoData>[] = [
    { encabezado: "ID", clave: "id" },
    { encabezado: "Nombre Activo", clave: "nombre" },
    { encabezado: "Descripción", clave: "descripcion_activo" },
    {
      encabezado: "Prioridad",
      clave: "prioridad",
      render: (activo) => (
        <LabelPrioridad 
          nivel={activo.prioridad?.nivel_peso || 0} 
          nombre={activo.prioridad?.nombre || 'Sin Prioridad'} 
        />
      ),
    },
    {
      encabezado: "ACCIONES",
      render: (activo) => (
        // 🌟 Pasamos dinámicamente el activo de esta fila a las acciones
        <LabelButtons
          accion1={() => handleAbrirEditar(activo)}
          accion2={() => handlePreparaEliminar(activo.id)}
          text1="Editar"
          text2="Eliminar"
        />
      ),
    }
  ];

  if (cargando) {
    return <div className="text-center py-8 text-gray-500">Cargando activos desde el servidor...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500 font-semibold">⚠️ Error: {error}</div>;
  }

  return (
    <div className="space-y-4">
      {/* Barra superior con tu Súper Botón Reutilizable */}
      <div className="flex justify-end gap-2 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <Boton variante="primary" tamano="md" icono={<Plus size={16} />} onClick={handleAbrirCrear}>
          Crear Nuevo Activo
        </Boton>
        <Boton variante="secondary" tamano="md" icono={<FilterIcon size={16} />} onClick={()=>alert("filtrar")}>
          Filtrar
        </Boton>
      </div>

      {/* Tabla de visualización de datos */}
      <TablaGenerica columnas={columnaActivos} datos={activos} />

      {/* 🔮 El Modal controlador que renderiza el formulario */}
      <ActivoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activo={activoSeleccionado}
        onSave={handleGuardarActivo}
      />

      {/* 🌟 TU NUEVO MODAL EN ACCIÓN: Lo renderizamos al final del componente */}
      <ConfirmacionModal
        isOpen={isConfirmDeleteOpen}
        onClose={() => {
          setIsConfirmDeleteOpen(false);
          setIdActivoAEliminar(null);
        }}
        onConfirm={handleConfirmarEliminar}
        titulo="¿Eliminar Activo de Información?"
        mensaje="Esta acción es permanente. Se desvincularán todas las amenazas y controles asociados a este activo de forma definitiva."
        textoConfirmar="Sí, eliminar"
        textoCancelar="Cancelar"
        varianteConfirmar="danger" // 🔴 Se dibuja rojo automáticamente porque es una acción crítica
      />
    </div>
  );
};