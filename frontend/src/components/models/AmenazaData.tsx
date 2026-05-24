import { type ActivoData } from "./ActivoData";


export interface AmenazaData {
  id: number;
  activo: ActivoData;
  amenaza: string;
  descripcionAmenaza?: string;
  consecuencia: string;
  descripcionConsecuencia?: string; // El "?" significa que es opcional
  probabilidad: number;
  impacto: number;
  riesgo: number;
}
