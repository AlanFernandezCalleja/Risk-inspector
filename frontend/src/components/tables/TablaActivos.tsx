// TODO; activos con las tablas para hacer lo demas
//

import { TablaGenerica, type Columna } from "./TablaGenérica";
import { type ActivoData } from "../../models/ActivoData";
import { Plus } from "lucide-react";

import { useActivos } from "../../hooks/useActivos";
import { LabelPrioridad } from "../ui/LabelPrioridad";
import { Boton } from "../ui/Boton";
import { LabelButtons } from "../ui/LabelButtons";
//      id: string;
//     nombre: string;
//     descripcionActivo?:string;
//     prioridad: string;
const columnaActivos: Columna<ActivoData>[] = [
  { encabezado: "ID", clave: "id" },
  { encabezado: "Nombre Activo", clave: "nombre" },
  { encabezado: "Descripción", clave: "descripcion_activo" },
  {
    encabezado: "prioridad",
    clave: "prioridad",
    render: (a) => <LabelPrioridad nivel={a.prioridad?.nivel_peso || 0} nombre={a.prioridad?.nombre || 'Sin Prioridad'}></LabelPrioridad>,
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
      }
];

export const TablaActivos = () => {
  const { activos, cargando, error } = useActivos();
  if (cargando)
    return (
      <div className="text-center py-4 text-gray-500">
        Cargando activos desde el servidor...
      </div>
    );
  if (error)
    return (
      <div className="text-center py-4 text-red-500 font-semibold">
        ⚠️ Error: {error}
      </div>
    );


  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Activos de Información
      </h2>
      <Boton variante="primary" tamano="md" icono={<Plus size={16} />} onClick={() => alert('Crear')}>
        Crear Nuevo Activo
      </Boton>
      <TablaGenerica
        columnas={columnaActivos}
        datos={activos}
      ></TablaGenerica>
    </div>
  );
};
