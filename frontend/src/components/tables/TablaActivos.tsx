// src/components/tables/TablaActivos.tsx
import { TablaGenerica, type Columna } from "./TablaGenérica";
import { type ActivoData } from "../../models/ActivoData";
import { FilterIcon, Plus } from "lucide-react";
import { ActivoModal } from "../ActivoModal"; // 🌟 Tu modal atómico
import { LabelPrioridad } from "../ui/LabelPrioridad";
import { Boton } from "../ui/Boton";
import { LabelButtons } from "../ui/LabelButtons";
import { ConfirmacionModal } from "../ui/ConfirmacionModal";
import { useGestionActivos } from "../../hooks/useGestionActivos";

export const TablaActivos = () => {
  // 🌟 Extraemos la lógica limpia del hook
  const { estado, modalForm, modalEliminar } = useGestionActivos();

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
        <LabelButtons
          accion1={() => modalForm.abrirEditar(activo)} // 🌟 Usamos el hook
          accion2={() => modalEliminar.preparar(activo.id)} // 🌟 Usamos el hook
          text1="Editar"
          text2="Eliminar"
        />
      ),
    }
  ];

  // Manejo de UI de carga y error
  if (estado.cargando) return <div className="text-center py-8 text-gray-500">Cargando activos desde el servidor...</div>;
  if (estado.error) return <div className="text-center py-8 text-red-500 font-semibold">⚠️ Error: {estado.error}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-start gap-2 bg-transparent p-4 rounded-xl border-collapse py-0 px-0 my-0">
        <Boton variante="primary" tamano="md" icono={<Plus size={16} />} onClick={modalForm.abrirCrear}>
          Crear Nuevo Activo
        </Boton>
        <Boton variante="secondary" tamano="md" icono={<FilterIcon size={16} />} onClick={()=>alert("filtrar")}>
          Filtrar
        </Boton>
      </div>

      <TablaGenerica columnas={columnaActivos} datos={estado.activos} />

      <ActivoModal
        isOpen={modalForm.isOpen}
        onClose={modalForm.cerrar}
        activo={modalForm.activo}
        onSave={modalForm.guardar}
      />

      <ConfirmacionModal
        isOpen={modalEliminar.isOpen}
        onClose={modalEliminar.cancelar}
        onConfirm={modalEliminar.confirmar}
        titulo="¿Eliminar Activo de Información?"
        mensaje="Esta acción es permanente. Se desvincularán todas las amenazas y controles asociados a este activo."
        textoConfirmar="Sí, eliminar"
        textoCancelar="Cancelar"
        varianteConfirmar="danger"
      />
    </div>
  );
};