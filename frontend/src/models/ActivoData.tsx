
export interface PrioridadData{
    id: number,
    nombre: string,
    nivel_peso: number,
}


export interface ActivoData{
    id: number;
    nombre: string;
    descripcion_activo?:string;
    prioridad?: PrioridadData;
}