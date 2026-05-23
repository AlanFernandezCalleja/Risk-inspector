// TODO; activos con las tablas para hacer lo demas
// 

import { TablaGenerica, type Columna } from "./TablaGenérica";
import { type ActivoData } from "../../models/ActivoData";
import { datosActivos } from "../../../data/activos";
    //      id: string;
    //     nombre: string;
    //     descripcionActivo?:string;
    //     prioridad: string;
export const TablaActivos = ()=>{
    const columnaActivos: Columna<ActivoData>[] = [
        {encabezado: 'ID', clave: 'id'},
        {encabezado: 'Nombre Activo', clave: 'nombre'},
        {encabezado: 'Descripción', clave: 'descripcionActivo'},
        {encabezado: 'prioridad', clave: 'prioridad'},
    ];
   
    return <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Activos de Información
      </h2>
        <TablaGenerica columnas={columnaActivos} datos={datosActivos}></TablaGenerica>
    </div> 
    
}
