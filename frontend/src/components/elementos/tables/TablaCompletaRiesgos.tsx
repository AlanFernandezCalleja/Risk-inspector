import { type RiesgoCompletoData } from "../../models/RiesgoCopletoData";
import { TablaGenerica, type Columna } from "./TablaGenérica";

import { datosPruebaAnalisisDeRiesgo } from "../../../data/riesgos";

// La tabla para realizar analisis de reisgos segun la metodología de la inge

// TODO: Que en la columna de Controles, se pueda abrir una ventana con la lista de controles de esa amenaza .

// Usando las tablas de Activo, Amenaza y la información de Contorles creados anteriormente, generar la tabla completa para el analisis de riesgos.
// La tabla para el analisis de riesgos debe tener las siguientes columnas:

// IdRiesgo (ese es un number)
// Aplicacion (es un interface ActivoData, que proviene de otra tabla)
// AmenazaVulnerabilidad (esta información proviene de un atributo de interface de AmenazaData, AmenazaData.amenaza)
// Probabilidad (esta información proviene de un atributo de interface de AmenazaData, AmenazaData.probabilidad tipo number)
// Impacto (esta información proviene de un atributo de interface de AmenazaData, AmenazaData.impacto tipo number)
// RiesgoInherente PxI (esta información proviene de un atributo de interface de AmenazaData, AmenazaData.riesgo tipo number)
// NivelRiesgo (es un string, se genera en base al resultado de RxI)
// TratamientoDelRiesgo (es un string)
// Controles (esta información es un array de interfaces de ControlData,)
// ProbabilidadResidual  (es un number)
// ImpactoResidual (es un number)
// RiesgoResidual (es un number)
// NivelRiesgoResidual  (es un String)

// Helper para los badges de riesgo
const getRiesgoBadge = (nivel: string) => {
  let styles = "bg-gray-100 text-gray-800 border-gray-200";
  const n = nivel.toLowerCase();
  if (n.includes("bajo"))
    styles = "bg-emerald-100 text-emerald-800 border-emerald-200";
  if (n.includes("medio"))
    styles = "bg-amber-100 text-amber-800 border-amber-200";
  if (n.includes("alto")) styles = "bg-rose-100 text-rose-800 border-rose-200";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles}`}
    >
      {nivel}
    </span>
  );
};





export const TablaCompletaRiesgos = () => {
  const columnasAnalisisRiesgos: Columna<RiesgoCompletoData>[] = [
    { encabezado: "ID", clave: "idRiesgo" },
    {
      encabezado: "ACTIVO DE INFORMACIÓN",
      render: (fila) => (
        <span className="font-medium text-gray-900">
          {fila.aplicacion.nombre}
        </span>
      ),
    },
    {
      encabezado: "AMENAZA",
      render: (fila) => fila.amenaza.amenaza,
    },
    {
      encabezado: "PROB.",
      render: (fila) => fila.amenaza.probabilidad,
    },
    {
      encabezado: "IMP.",
      render: (fila) => fila.amenaza.impacto,
    },
    {
      encabezado: "RIESGO INH.",
      render: (fila) => (
        <span className="font-bold">{fila.amenaza.riesgo}</span>
      ),
    },
    {
      encabezado: "NIVEL RIESGO",
      render: (fila) => getRiesgoBadge(fila.nivelRiesgo),
    },
    {
      encabezado: "TRATAMIENTO",
      clave: "tratamientoRiesgo",
    },
    {
      encabezado: "CONTROLES",
      render: (fila) => (
        <div className="flex flex-wrap gap-1">
          {fila.controles.length > 0 ? (
            fila.controles.map((c) => (
              <span
                key={c.id}
                title={c.descripcionControl} // Usamos tu atributo descripcionControl
                className="px-2 py-1 text-[10px] font-mono bg-indigo-50 text-indigo-700 rounded border border-indigo-100 cursor-help"
              >
                {c.control} {/* Usamos tu atributo control */}
              </span>
            ))
          ) : (
            <span className="text-gray-400 italic text-xs">Sin controles</span>
          )}
        </div>
      ),
    },
    { encabezado: "PROB. RES.", clave: "probabilidadResidual" },
    { encabezado: "IMP. RES.", clave: "impactoResidual" },
    {
      encabezado: "RIESGO RES.",
      render: (fila) => (
        <span className="font-bold">{fila.riesgoResidual}</span>
      ),
    },
    {
      encabezado: "NIVEL RESIDUAL",
      render: (fila) => getRiesgoBadge(fila.nivelRiesgoResidual),
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Matriz para Análisis de Riesgos
      </h2>

      {/* Pasamos los datos que importamos */}
      <TablaGenerica
        columnas={columnasAnalisisRiesgos}
        datos={datosPruebaAnalisisDeRiesgo}
      />
    </div>
  );
};
