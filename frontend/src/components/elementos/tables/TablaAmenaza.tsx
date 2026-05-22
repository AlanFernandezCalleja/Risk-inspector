import type { Columna } from "./TablaGenérica";
import { TablaGenerica } from "./TablaGenérica";

// Formato en el que vienen las amenazas

interface AmenazaData {
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

export const TablaAmenaza = () => {


    // Columnas y como se renderiza su contenido
    // Estructura de la tabla amenaza 
  const columnaAmenazas: Columna<AmenazaData>[] = [
    { encabezado: "ID", clave: "id" },
    { encabezado: "ACTIVO", clave: "activo" },
    { encabezado: "AMENAZA", clave: "amenaza", render: (amenaza)=>{
        return <>
            <div className="font-medium text-slate-800">{amenaza.amenaza}</div>
            <div className="text-sm text-slate-400 mt-0.5">{amenaza.descripcionAmenaza}</div>
        </>;
        }, 
    },
    { encabezado: "CONSECUENCIA", clave: "consecuencia" ,render:(amenaza)=>{
        return <>
            <div className="font-medium text-slate-800">{amenaza.consecuencia}</div>
            <div className="text-sm text-slate-400 mt-0.5">{amenaza.descripcionConsecuencia}</div>
        </>;
    },},
    { encabezado: "PROBABILIDAD", clave: "probabilidad" },
    { encabezado: "IMPACTO", clave: "impacto" },
    {
      encabezado: "RIESGO",
      clave: "riesgo",
      render: (amenaza) => {
        let badgeStyles = "bg-green-50 text-green-700 border-green-200"; // Bajo por defecto

        if (amenaza.riesgo >= 5 && amenaza.riesgo <= 9) {
          badgeStyles = "bg-amber-50 text-amber-700 border-amber-200"; // Medio
        } else if (amenaza.riesgo > 9) {
          badgeStyles = "bg-rose-50 text-rose-700 border-rose-200"; // Alto
        }

        return (
          <span
            className={`inline-flex items-center justify-center min-w-20 rounded-full border px-3 py-1 text-base font-bold ${badgeStyles}`}
          >
            {amenaza.riesgo}
          </span>
        );
      },
    },
  ];

  // Datos hardcode para visualziar como quedaria si tuviera datos.
  const datosAmenazas: AmenazaData[] = [
    
    {
      id: 1,
      activo: "Base de Datos Clientes",
      amenaza: "Fuga de Información",
      descripcionAmenaza: "Exfiltración por malware",
      consecuencia: "Sanciones legales de severidad alta",
      descripcionConsecuencia: "Cargos legales por valores de 13000 BOB",
      probabilidad: 3,
      impacto: 4,
      riesgo: 12,
    },
    {
      id: 3,
      activo: "Servidor Web",
      amenaza: "Ataque DDoS",
      descripcionAmenaza: "Saturación de peticiones",
      consecuencia: "Cierre temporal de la plataforma",
      descripcionConsecuencia: "No se podría hacer registros o edicion",
      probabilidad: 2,
      impacto: 2,
      riesgo: 4,
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Amenazas y Consecuencias
      </h2>
      <TablaGenerica columnas={columnaAmenazas} datos={datosAmenazas}/>
    </div>
  );
};
