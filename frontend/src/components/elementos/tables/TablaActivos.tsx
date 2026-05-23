// TODO; activos con las tablas para hacer lo demas
// 

import { TablaGenerica, type Columna } from "./TablaGenérica";


interface activoData{
    id: string;
    nombre: string;
    prioridad: string;
}

export const TablaActivos = ()=>{
    const columnaActivos: Columna<activoData>[] = [];
    const datosActivos: activoData []= [];
    return <TablaGenerica columnas={columnaActivos} datos={datosActivos}></TablaGenerica>
}
