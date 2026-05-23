import {type ActivoData } from "../components/models/ActivoData";
// export interface activoData{
//     id: string;
//     nombre: string;
//     descripcionActivo?:string;
//     prioridad: string;
// }

export const datosActivos: ActivoData[]= [
    {
      id: 1,
      nombre: "Base de Datos Clientes",
      descripcionActivo: "La base de datos con los registros de clientes y demas cosas",
      prioridad: "Muy Alta",
    },
    {
      id: 2,
      nombre: "Servidor Web Glucotracker",
      descripcionActivo: "Esta es la aplciación web de GlucoTracker",
      prioridad: "Media",
    },
    {
      id: 3,
      nombre: "Módulo de Registros Pacientes",
      descripcionActivo: "Sistema para revisar el registro de cada paciente",
      prioridad: "Alta",
    },
]