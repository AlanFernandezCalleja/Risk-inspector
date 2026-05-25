
export interface PrioridadData{
    id: number,
    nombre: string,
    nivelPeso: number,
}


export interface ActivoData{
    id: number;
    nombre: string;
    descripcionActivo?:string;
    prioridad: PrioridadData;
}