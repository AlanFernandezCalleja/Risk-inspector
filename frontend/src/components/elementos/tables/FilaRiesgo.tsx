

// 1. Definimos la estructura de datos que debe recibir el componente
interface RiesgoData {
  id: number;
  activo: string;
  amenaza: string;
  descripcionAmenaza: string;
  consecuencia: string;
  descripcionConsecuencia?: string; // El "?" significa que es opcional
  probabilidad: number;
  impacto: number;
  riesgo: number;
}

interface FilaRiesgoProps {
  fila: RiesgoData;
}

export default function FilaRiesgo({ fila }: FilaRiesgoProps) {
  
  // 2. Encapsulamos la lógica de estilos del nivel de riesgo aquí adentro
  let badgeStyles = "bg-green-50 text-green-700 border-green-200"; // Bajo
  if (fila.riesgo >= 5 && fila.riesgo <= 9) {
    badgeStyles = "bg-amber-50 text-amber-700 border-amber-200"; // Medio
  } else if (fila.riesgo > 9) {
    badgeStyles = "bg-rose-50 text-rose-700 border-rose-200"; // Alto
  }

  return (
    <tr className="transition-colors duration-200 hover:bg-slate-50/80">
      {/* N° */}
      <td className="px-6 py-4 text-center font-semibold text-slate-400">
        {fila.id}
      </td>
      
      {/* Activo */}
      <td className="px-6 py-4 font-semibold text-slate-900">
        {fila.activo}
      </td>
      
      {/* Amenaza */}
      <td className="px-6 py-4">
        <div className="font-medium text-slate-800">{fila.amenaza}</div>
        <div className="text-sm text-slate-400 mt-0.5">{fila.descripcionAmenaza}</div>
      </td>
      
      {/* Consecuencia */}
      <td className="px-6 py-4 text-slate-500 max-w-xs md:max-w-sm">
        <div className="font-medium text-slate-800">{fila.consecuencia}</div>
        <div className="text-sm text-slate-400 mt-0.5">
          {fila.descripcionConsecuencia || 'Sin descripción adicional'}
        </div>
      </td>
      
      {/* Probabilidad */}
      <td className="px-6 py-4 text-center text-xl font-medium text-slate-700">
        {fila.probabilidad}
      </td>
      
      {/* Impacto */}
      <td className="px-6 py-4 text-center text-xl font-medium text-slate-700">
        {fila.impacto}
      </td>
      
      {/* Nivel de Riesgo (Badge) */}
      <td className="px-6 py-4 text-center whitespace-nowrap">
        <span className={`inline-flex items-center justify-center min-w-[40px] rounded-full border px-3 py-1 text-base font-bold ${badgeStyles}`}>
          {fila.riesgo}
        </span>
      </td>
    </tr>
  );
}