import { type AmenazaData } from "../models/AmenazaData";
import { datosActivos } from "./activos";


export const datosAmenazas: AmenazaData[] = [
    
    {
      id: 1,
      activo: datosActivos[0],
      amenaza: "Fuga de Información",
      descripcion_amenaza: "Exfiltración por malware",
      consecuencia: "Sanciones legales de severidad alta",
      descripcion_consecuencia: "Cargos legales por valores de 13000 BOB",
      probabilidad: 3,
      impacto: 4,
      riesgo_inherente: 12,
    },
    {
      id: 2,
      activo: datosActivos[1],
      amenaza: "Ataque DDoS",
      descripcion_amenaza: "Saturación de peticiones",
      consecuencia: "Cierre temporal de la plataforma",
      descripcion_consecuencia: "No se podría hacer registros o edicion",
      probabilidad: 2,
      impacto: 2,
      riesgo_inherente: 4,
    },
    {
      id: 3,
      activo: datosActivos[1],
      amenaza: "SQL Injection",
      descripcion_amenaza: "Alteración y manipulación de la base de datos",
      consecuencia: "Integridad comprometida",
      descripcion_consecuencia: "Los datos pueden ser alterados generando incoherencias en opearciones",
      probabilidad: 2,
      impacto: 5,
      riesgo_inherente: 5*2,
    },
  ];