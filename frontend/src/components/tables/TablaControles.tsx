// src/components/tables/TablaControles.tsx
import type { Columna } from "./TablaGenérica";
import { TablaGenerica } from "./TablaGenérica";
import { type ControlData } from '../../models/ControlData'; 
import { LabelTab } from "../ui/LabelTab";
import { LabelButtons } from "../ui/LabelButtons";
import { Boton } from "../ui/Boton";
import { Plus } from "lucide-react";

import { useGestionControles } from "../../hooks/useGestionControles"; // 🌟 El cerebro
import { ControlModal } from "../ControlModal"; // 🌟 El modal form
import { ConfirmacionModal } from "../ui/ConfirmacionModal"; // 🌟 El modal eliminar

export const TablaControles = () => {
  const { estado, modalForm, modalEliminar } = useGestionControles();

  const columnaControles: Columna<ControlData>[] = [
    { encabezado: "ID", clave: "id" },
    {
      encabezado: "CONTROL",
      clave: "control",
      render: (con) => <LabelTab title={con.control} text={con.descripcion_control}/>,
    },
    { encabezado: "TIPO", clave: "tipo", render:(con) => con.tipo?.nombre },
    { encabezado: "AUTOMATICO", clave: "nivel", render: (con) => con.nivel?.nombre },
    { encabezado: "FRECUENCIA", clave: "frecuencia", render: (con) => con.frecuencia?.nombre },
    {
      encabezado: "ACCIONES",
      render: (con) => (
        <LabelButtons
          accion1={() => modalForm.abrirEditar(con)}
          accion2={() => modalEliminar.preparar(con.id)}
          text1="Editar"
          text2="Eliminar"
        />
      ),
    },
  ];

  if (estado.cargando) return <p>Cargando controles...</p>;
  if (estado.error) return <p>Error: {estado.error}</p>;

  return (
    <div>
      <div className="flex justify-start gap-2 bg-transparent py-4">
        <Boton variante="primary" tamano="md" icono={<Plus size={16} />} onClick={modalForm.abrirCrear}>
          Crear Nuevo Control
        </Boton>
      </div>

      <TablaGenerica columnas={columnaControles} datos={estado.controles} />

      <ControlModal
        isOpen={modalForm.isOpen}
        onClose={modalForm.cerrar}
        controlItem={modalForm.control}
        onSave={modalForm.guardar}
      />

      <ConfirmacionModal
        isOpen={modalEliminar.isOpen}
        onClose={modalEliminar.cancelar}
        onConfirm={modalEliminar.confirmar}
        titulo="¿Eliminar Control?"
        mensaje="Esta acción es permanente. ¿Deseas eliminar este control de seguridad?"
        textoConfirmar="Sí, eliminar"
        textoCancelar="Cancelar"
        varianteConfirmar="danger"
      />
    </div>
  );
};