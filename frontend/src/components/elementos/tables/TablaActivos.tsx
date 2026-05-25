// TODO; activos con las tablas para hacer lo demas
//

import { TablaGenerica, type Columna } from "./TablaGenérica";
import { type ActivoData } from "../../models/ActivoData";


import { useActivos } from "../../hooks/useActivos";
//      id: string;
//     nombre: string;
//     descripcionActivo?:string;
//     prioridad: string;
const columnaActivos: Columna<ActivoData>[] = [
  { encabezado: "ID", clave: "id" },
  { encabezado: "Nombre Activo", clave: "nombre" },
  { encabezado: "Descripción", clave: "descripcionActivo" },
  {
    encabezado: "prioridad",
    clave: "prioridad",
    render: (activo) => {
      return (
        <>
          <div className="font-medium text-slate-800">
            {activo.prioridad.nombre}
          </div>
          <div className="text-sm text-center text-slate-400 mt-0.5">
            {activo.prioridad.nivelPeso}
          </div>
        </>
      );
    },
  },
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
      <TablaGenerica
        columnas={columnaActivos}
        datos={activos}
      ></TablaGenerica>
    </div>
  );
};
