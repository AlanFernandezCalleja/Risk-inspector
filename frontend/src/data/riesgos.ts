import { type RiesgoCompletoData } from "../components/models/RiesgoCopletoData";
import { datosActivos } from "./activos";
import { datosAmenazas } from "./amenazas";
import { datosControles } from "./controls";


export const datosPruebaAnalisisDeRiesgo: RiesgoCompletoData[] = [
  {
    idRiesgo: 1,
    aplicacion: datosActivos[0],
    amenaza: datosAmenazas[0],
    nivelRiesgo: "Alto",
    tratamientoRiesgo: "Mitigar",
    controles: [],
    probabilidadResidual: 1,
    impactoResidual: 4,
    riesgoResidual: 4,
    nivelRiesgoResidual: "Bajo"
  },
  {
    idRiesgo: 2,
    aplicacion:datosActivos[0],
    amenaza: datosAmenazas[1],
    nivelRiesgo: "Bajo",
    tratamientoRiesgo: "Aceptar",
    controles: [], // Sin controles aplicados
    probabilidadResidual: 2,
    impactoResidual: 2,
    riesgoResidual: 4,
    nivelRiesgoResidual: "Bajo"
  },
  {
    idRiesgo: 3,
    aplicacion:datosActivos[1],
    amenaza: datosAmenazas[2],
    nivelRiesgo: "Alto",
    tratamientoRiesgo: "Aceptar",
    controles: [], // Sin controles aplicados
    probabilidadResidual: 2,
    impactoResidual: 2,
    riesgoResidual: 4,
    nivelRiesgoResidual: "Bajo"
  }
];