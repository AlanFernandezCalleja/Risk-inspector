// CHECK: Tabla de Controles
// TODO: Mejorar apariencia
// TODO: Mejorar logica en cada una de las columnas
// TDOO: Agregar columna de acciones de Editar / Elliminar


import type { Columna } from "./TablaGenérica";
import { TablaGenerica } from "./TablaGenérica";
// CONTROL: Estos son los datos que debe tener cada control
import { datosControles } from "../../data/controls";
import  {type ControlData} from '../../models/ControlData'; 
import { LabelTab } from "../ui/LabelTab";
import { LabelButtons } from "../ui/LabelButtons";
import { Boton } from "../ui/Boton";
import { Plus } from "lucide-react";

export const TablaControles = () => {
  const columnaControles: Columna<ControlData>[] = [
    { encabezado: "ID", clave: "id" },

    {
      encabezado: "CONTROL",
      clave: "control",
      render: (con) => {
        return <LabelTab title={con.control} text={con.descripcion_control}/>;
      },
    },

    { encabezado: "TIPO", clave: "tipo" },
    { encabezado: "AUTOMATICO", clave: "nivel" },
    { encabezado: "FRECUENCIA", clave: "frecuencia" },
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
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Controles </h2>
      <Boton variante="primary" tamano="md" icono={<Plus size={16} />} onClick={() => alert('Crear')}>
        Crear Nuevo Control
      </Boton>
      <TablaGenerica columnas={columnaControles} datos={datosControles} />
    </div>
  );
};
