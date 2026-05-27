// src/components/TablaAmenaza.tsx
import type { Columna } from "./TablaGenérica";
import { TablaGenerica } from "./TablaGenérica";
import type { AmenazaData } from "../../models/AmenazaData";
import { LabelTab } from "../ui/LabelTab";
import { Plus } from "lucide-react";
import { LabelRiesgo } from "../ui/LabelRiesgo";
import { Boton } from "../ui/Boton";
import { LabelButtons } from "../ui/LabelButtons";

import { useGestionAmenazas } from "../../hooks/useGestionAmenazas";
import { AmenazaModal } from "../AmenazaModal";
import { ConfirmacionModal } from "../ui/ConfirmacionModal";

export const TablaAmenaza = () => {
  const { estado, modalForm, modalEliminar } = useGestionAmenazas();

  const columnaAmenazas: Columna<AmenazaData>[] = [
    { encabezado: "ID", clave: "id" },
    {
      encabezado: "ACTIVO",
      render: (amenaza) => (
        <LabelTab
          title={amenaza.activo?.nombre || "N/A"}
          text={amenaza.activo?.descripcion_activo || ""}
        />
      ),
    },
    {
      encabezado: "AMENAZA",
      render: (amenaza) => <LabelTab title={amenaza.amenaza} text={amenaza.descripcion_amenaza} />,
    },
    {
      encabezado: "CONSECUENCIA",
      render: (amenaza) => <LabelTab title={amenaza.consecuencia} text={amenaza.descripcion_consecuencia} />,
    },
    { encabezado: "PROBABILIDAD", clave: "probabilidad" },
    { encabezado: "IMPACTO", clave: "impacto" },
    {
      encabezado: "RIESGO",
      render: (amenaza) => <LabelRiesgo text="" riesgo={amenaza.riesgo_inherente || 0} />,
    },
    {
      encabezado: "ACCIONES",
      render: (amenaza) => {
        return (
          <LabelButtons
            accion1={() => modalForm.abrirEditar(amenaza)}
            accion2={() => modalEliminar.preparar(amenaza.id)}
            text1="Editar"
            text2="Eliminar"
          />
        );
      },
    },
  ];

  if (estado.cargando) return <p className="text-gray-500">Cargando amenazas...</p>;
  if (estado.error) return <p className="text-red-500">Error: {estado.error}</p>;

  return (
    <div className="min-w-5xl">
      <div className="mb-4">
        <Boton
          variante="primary"
          icono={<Plus size={16} />}
          onClick={modalForm.abrirCrear}
        >
          Añadir Amenaza
        </Boton>
      </div>

      <TablaGenerica columnas={columnaAmenazas} datos={estado.amenazas} />

      <AmenazaModal 
        isOpen={modalForm.isOpen}
        onClose={modalForm.cerrar}
        amenazaItem={modalForm.amenaza}
        onSave={modalForm.guardar}
      />

      <ConfirmacionModal 
        isOpen={modalEliminar.isOpen}
        onClose={modalEliminar.cancelar}
        onConfirm={modalEliminar.confirmar}
        titulo="¿Eliminar Amenaza?"
        mensaje="Esta acción es irreversible. ¿Deseas eliminar esta amenaza de la base de datos?"
        textoConfirmar="Eliminar"
        textoCancelar="Cancelar"
        varianteConfirmar="danger"
      />
    </div>
  );
};