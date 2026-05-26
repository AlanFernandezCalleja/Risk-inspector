// src/models/AmenazaData.ts
import { type ActivoData } from "./ActivoData";

export interface AmenazaData {
  id: number;
  activo: ActivoData; //  Añadimos la relación con el activo
  amenaza: string;
  descripcion_amenaza: string; // snake_case
  consecuencia: string;
  descripcion_consecuencia: string; //  Añadimos este campo que viene de la BD
  probabilidad: number;
  impacto: number;
  riesgo_inherente: number; // snake_case
}