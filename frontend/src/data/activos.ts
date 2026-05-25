import {type ActivoData, type PrioridadData } from "../components/models/ActivoData";
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
    nivelPeso: 1,
  },
  {
    id: 2,
    nombre: "MEDIO",
    nivelPeso: 2,
  },
  {
    id: 3,
    nombre: "CRITICO",
    nivelPeso: 3,
  },
  {
    id: 4,
    nombre: "MUY CRITICO",
    nivelPeso: 4,
  }
]


export const datosActivos: ActivoData[]= [
    {
      id: 1,
      nombre: "Base de Datos Clientes",
      descripcionActivo: "La base de datos con los registros de clientes y demas cosas",
      prioridad: datosPriridad[3],
    },
    {
      id: 2,
      nombre: "Servidor Web Glucotracker",
      descripcionActivo: "Esta es la aplciación web de GlucoTracker",
      prioridad: datosPriridad[1],
    },
    {
      id: 3,
      nombre: "Módulo de Registros Pacientes",
      descripcionActivo: "Sistema para revisar el registro de cada paciente",
      prioridad: datosPriridad[2],
    },
]