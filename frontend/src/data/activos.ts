import {type ActivoData, type PrioridadData } from "../models/ActivoData";
// export interface activoData{
//     id: string;
//     nombre: string;
//     descripcionActivo?:string;
//     prioridad: string;
// }

export const datosPriridad : PrioridadData []  = [
  {
    id: 1,
    nombre: "BAJO",
    nivel_peso: 1,
  },
  {
    id: 2,
    nombre: "MEDIO",
    nivel_peso: 2,
  },
  {
    id: 3,
    nombre: "CRITICO",
    nivel_peso: 3,
  },
  {
    id: 4,
    nombre: "MUY CRITICO",
    nivel_peso: 4,
  }
]


export const datosActivos: ActivoData[]= [
    {
      id: 1,
      nombre: "Base de Datos Clientes",
      descripcion_activo: "La base de datos con los registros de clientes y demas cosas",
      prioridad: datosPriridad[3],
    },
    {
      id: 2,
      nombre: "Servidor Web Glucotracker",
      descripcion_activo: "Esta es la aplciación web de GlucoTracker",
      prioridad: datosPriridad[1],
    },
    {
      id: 3,
      nombre: "Módulo de Registros Pacientes",
      descripcion_activo: "Sistema para revisar el registro de cada paciente",
      prioridad: datosPriridad[2],
    },
]