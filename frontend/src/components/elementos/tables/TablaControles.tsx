// CHECK: Tabla de Controles
// TODO: Mejorar apariencia
// TODO: Mejorar logica en cada una de las columnas
// TDOO: Agregar columna de acciones de Editar / Elliminar


import type { Columna } from "./TablaGenérica";
import { TablaGenerica } from "./TablaGenérica";
// CONTROL: Estos son los datos que debe tener cada control
import {datosControles} from '../../../data/controls.ts'
import  {type ControlData} from '../../models/ControlData'; 

export const TablaControles = () => {
  const columnaControles: Columna<ControlData>[] = [
    { encabezado: "ID", clave: "id" },

    {
      encabezado: "CONTROL",
      clave: "control",
      render: (control) => {
        return (
          <>
            <div className="font-medium text-slate-800">{control.control}</div>
            <div className="text-sm text-slate-400 mt-0.5">
              {control.descripcionControl}
            </div>
          </>
        );
      },
    },

    { encabezado: "TIPO", clave: "tipo" },
    { encabezado: "AUTOMATICO", clave: "nivel" },
    { encabezado: "FRECUENCIA", clave: "frecuencia" },
  ];
  

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Controles </h2>
      <TablaGenerica columnas={columnaControles} datos={datosControles} />
    </div>
  );
};
