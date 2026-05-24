import { type AmenazaData } from "../components/models/AmenazaData";
import { datosActivos } from "./activos";


export const datosAmenazas: AmenazaData[] = [
    
    {
      id: 1,
      activo: datosActivos[0],
      amenaza: "Fuga de Información",
      descripcionAmenaza: "Exfiltración por malware",
      consecuencia: "Sanciones legales de severidad alta",
      descripcionConsecuencia: "Cargos legales por valores de 13000 BOB",
      probabilidad: 3,
      impacto: 4,
      riesgo: 12,
    },
    {
      id: 2,
      activo: datosActivos[1],
      amenaza: "Ataque DDoS",
      descripcionAmenaza: "Saturación de peticiones",
      consecuencia: "Cierre temporal de la plataforma",
      descripcionConsecuencia: "No se podría hacer registros o edicion",
      probabilidad: 2,
      impacto: 2,
      riesgo: 4,
    },
    {
      id: 3,
      activo: datosActivos[1],
      amenaza: "SQL Injection",
      descripcionAmenaza: "Alteración y manipulación de la base de datos",
      consecuencia: "Integridad comprometida",
      descripcionConsecuencia: "Los datos pueden ser alterados generando incoherencias en opearciones",
      probabilidad: 2,
      impacto: 5,
      riesgo: 5*2,
    },
  ];