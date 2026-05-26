import { type AmenazaData } from "./AmenazaData";
import { type ActivoData } from "./ActivoData";
import { type ControlData } from "./ControlData";


export interface RiesgoCompletoData {
  idRiesgo: number;
  aplicacion: ActivoData;
  amenaza: AmenazaData;
  nivelRiesgo: string; 
  tratamientoRiesgo: string; 
  controles: ControlData[]; 
  probabilidadResidual: number;
  impactoResidual: number;
  riesgoResidual: number;
  nivelRiesgoResidual: string;
}