export interface AmenazaData {
  id: number;
  activo: string;
  amenaza: string;
  descripcionAmenaza?: string;
  consecuencia: string;
  descripcionConsecuencia?: string; // El "?" significa que es opcional
  probabilidad: number;
  impacto: number;
  riesgo: number;
}
