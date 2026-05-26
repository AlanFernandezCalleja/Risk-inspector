// src/components/TablaAmenaza.tsx
import type { Columna } from "./TablaGenérica";
import { TablaGenerica } from "./TablaGenérica";
import type { AmenazaData } from "../../models/AmenazaData";
import { LabelTab } from "../ui/LabelTab"; // 🌟 ¡Estrenamos tu componente creativo!
import { Plus } from "lucide-react";
// Información de prueba (Asegúrate de que tus datos de prueba usen snake_case también)
import { datosAmenazas } from "../../data/amenazas";
import { LabelRiesgo } from "../ui/LabelRiesgo";
import { Boton } from "../ui/Boton";
import { LabelButtons } from "../ui/LabelButtons";

export const TablaAmenaza = () => {
  // Columnas estructuradas y limpias gracias a tu Dumb Component
  const columnaAmenazas: Columna<AmenazaData>[] = [
    { encabezado: "ID", clave: "id" },
    {
      encabezado: "ACTIVO",
      render: (amenaza) => (
        <LabelTab
          title={amenaza.activo.nombre}
          text={amenaza.activo.descripcion_activo || ""}
        />
      ),
    },
    {
      encabezado: "AMENAZA",
      render: (amenaza) => (
        <LabelTab title={amenaza.amenaza} text={amenaza.descripcion_amenaza} />
      ),
    },
    {
      encabezado: "CONSECUENCIA",
      render: (amenaza) => (
        <LabelTab
          title={amenaza.consecuencia}
          text={amenaza.descripcion_consecuencia}
        />
      ),
    },
    { encabezado: "PROBABILIDAD", clave: "probabilidad" },
    { encabezado: "IMPACTO", clave: "impacto" },
    {
      encabezado: "RIESGO",
      render: (amenaza) => (
        <LabelRiesgo text="" riesgo={amenaza.riesgo_inherente} />
      ),
    },
    {
      encabezado: "ACCIONES",
      render: () => {
        return (
          <LabelButtons
            accion1={() => alert("editar")}
            accion2={() => alert("eliminar")}
            text1="Editar"
            text2="Eliminar"
          />
        );
      },
    },
  ];

  return (
    <div className="min-w-5xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Amenazas y Consecuencias
      </h2>
      <Boton
        variante="primary"
        icono={<Plus size={16} />}
        onClick={() => alert("Crear")}
      >
        Añadir Amenaza
      </Boton>

      <TablaGenerica columnas={columnaAmenazas} datos={datosAmenazas} />
    </div>
  );
};
