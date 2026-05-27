// src/components/tables/TablaCompletaRiesgos.tsx
import { type RiesgoCompletoData } from "../../models/RiesgoCopletoData";
import { TablaGenerica, type Columna } from "./TablaGenérica";
import { useGestionRiesgos } from "../../hooks/useGestionRiesgos"; 
import { LabelButtons } from "../ui/LabelButtons";
import { Boton } from "../ui/Boton";
import { Plus } from "lucide-react";
import { RiesgoModal } from "../RiesgoModal";
import { ConfirmacionModal } from "../ui/ConfirmacionModal";

const getRiesgoBadge = (nivel: string) => {
  let styles = "bg-gray-100 text-gray-800 border-gray-200";
  const n = nivel?.toLowerCase() || "";
  
  if (n.includes("bajo")) styles = "bg-emerald-100 text-emerald-800 border-emerald-200";
  if (n.includes("medio")) styles = "bg-amber-100 text-amber-800 border-amber-200";
  if (n.includes("alto")) styles = "bg-rose-100 text-rose-800 border-rose-200";
  if (n.includes("crítico") || n.includes("critico")) styles = "bg-red-200 text-red-900 border-red-300 animate-pulse";

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles}`}>
      {nivel}
    </span>
  );
};

export const TablaCompletaRiesgos = () => {
  // 🔌 Conectamos nuestro nuevo hook súper poderoso
  const { estado, modalForm, modalEliminar } = useGestionRiesgos();

  const columnasAnalisisRiesgos: Columna<RiesgoCompletoData>[] = [
    { encabezado: "ID", clave: "idRiesgo" },
    { encabezado: "ACTIVO DE INFORMACIÓN", render: (fila) => <span className="font-medium text-gray-900">{fila.aplicacion?.nombre}</span> },
    { encabezado: "AMENAZA", render: (fila) => fila.amenaza?.amenaza },
    { encabezado: "PROB.", render: (fila) => fila.amenaza?.probabilidad },
    { encabezado: "IMP.", render: (fila) => fila.amenaza?.impacto },
    { encabezado: "RIESGO INH.", render: (fila) => <span className="font-bold">{fila.amenaza?.riesgo_inherente}</span> },
    { encabezado: "NIVEL RIESGO", render: (fila) => getRiesgoBadge(fila.nivelRiesgo) },
    { encabezado: "TRATAMIENTO", clave: "tratamientoRiesgo" },
    {
      encabezado: "CONTROLES",
      render: (fila) => (
        <div className="flex flex-wrap gap-1">
          {fila.controles && fila.controles.length > 0 ? (
            fila.controles.map((c: any) => (
              <span key={c.id} title={c.descripcion_control} className="px-2 py-1 text-[10px] font-mono bg-indigo-50 text-indigo-700 rounded border border-indigo-100 cursor-help">
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
    { encabezado: "RIESGO RES.", render: (fila) => <span className="font-bold">{fila.riesgoResidual}</span> },
    { encabezado: "NIVEL RESIDUAL", render: (fila) => getRiesgoBadge(fila.nivelRiesgoResidual) },
    {
      encabezado: "ACCIONES",
      render: (fila) => (
        <LabelButtons
          accion1={() => modalForm.abrirEditar(fila)}
          accion2={() => modalEliminar.preparar(fila.idRiesgo)}
          text1="Editar"
          text2="Eliminar"
        />
      ),
    }
  ];

  if (estado.cargando) {
    return <div className="flex justify-center items-center p-8 text-gray-500 font-medium">Cargando matriz de análisis de riesgos...</div>;
  }

  return (
    <div>
      <div className="mb-4">
        <Boton variante="primary" tamano="md" icono={<Plus size={16} />} onClick={modalForm.abrirCrear}>
          Crear Nuevo Riesgo
        </Boton>
      </div>

      <TablaGenerica columnas={columnasAnalisisRiesgos} datos={estado.riesgos} />

      {/* Insertamos los modales invisibles que esperan ser llamados */}
      <RiesgoModal 
        isOpen={modalForm.isOpen} 
        onClose={modalForm.cerrar} 
        riesgoItem={modalForm.riesgo} 
        onSave={modalForm.guardar} 
      />

      <ConfirmacionModal 
        isOpen={modalEliminar.isOpen}
        onClose={modalEliminar.cancelar}
        onConfirm={modalEliminar.confirmar}
        titulo="¿Eliminar Riesgo?"
        mensaje="¿Estás seguro de que deseas eliminar este riesgo y desenlazar sus controles?"
        textoConfirmar="Eliminar"
        textoCancelar="Cancelar"
        varianteConfirmar="danger"
      />
    </div>
  );
};