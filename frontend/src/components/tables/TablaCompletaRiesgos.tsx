// src/components/TablaCompletaRiesgos.tsx
import { type RiesgoCompletoData } from "../../models/RiesgoCopletoData";
import { TablaGenerica, type Columna } from "./TablaGenérica";
import { useRiesgos } from "../../hooks/useRiesgos"; // Importamos el nuevo hook
import { LabelButtons } from "../ui/LabelButtons";
import { Boton } from "../ui/Boton";
import { Plus } from "lucide-react";

const getRiesgoBadge = (nivel: string) => {
  let styles = "bg-gray-100 text-gray-800 border-gray-200";
  const n = nivel?.toLowerCase() || "";
  
  if (n.includes("bajo"))
    styles = "bg-emerald-100 text-emerald-800 border-emerald-200";
  if (n.includes("medio"))
    styles = "bg-amber-100 text-amber-800 border-amber-200";
  if (n.includes("alto")) 
    styles = "bg-rose-100 text-rose-800 border-rose-200";
  if (n.includes("crítico") || n.includes("critico")) 
    styles = "bg-red-200 text-red-900 border-red-300 animate-pulse"; // Estilo extra para críticos

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles}`}>
      {nivel}
    </span>
  );
};

export const TablaCompletaRiesgos = () => {
  // 🔌 Consumimos los datos reales del backend
  const { riesgos, cargando } = useRiesgos();

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
        
        <span className="font-bold">{fila.amenaza.riesgo_inherente}</span>
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
          {fila.controles && fila.controles.length > 0 ? (
            fila.controles.map((c:any) => (
              <span
                key={c.id}
                
                title={c.descripcion_control} 
                className="px-2 py-1 text-[10px] font-mono bg-indigo-50 text-indigo-700 rounded border border-indigo-100 cursor-help"
              >
                {c.control}
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
    {
          encabezado: "ACCIONES",
          render: () => {
            return (
              <LabelButtons
                accion1={() => alert("editar")}
                accion2={() => alert("eliminar")}
                text1="Editar"
                text2="Eliminar"
              />
            );
          },
        }
  ];

  if (cargando) {
    return (
      <div className="flex justify-center items-center p-8 text-gray-500 font-medium">
        Cargando matriz de análisis de riesgos...
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Matriz para Análisis de Riesgos
      </h2>
      <Boton variante="primary" tamano="md" icono={<Plus size={16} />} onClick={() => alert('Crear')}>
        Crear Nuevo Control
      </Boton>

      <TablaGenerica
        columnas={columnasAnalisisRiesgos}
        datos={riesgos}
      />
    </div>
  );
};