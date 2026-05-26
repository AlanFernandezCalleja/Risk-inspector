interface ProgressCircleProps {
  titulo: string;
  cubiertos: number;
  total: number;
  subtitulo?: string;
}

export const ProgressCircle = ({ titulo, cubiertos, total, subtitulo }: ProgressCircleProps) => {
  // Evitar división por cero
  const porcentaje = total > 0 ? Math.round((cubiertos / total) * 100) : 0;
  
  // Configuración del SVG para el anillo de progreso
  const radio = 60;
  const circunferencia = 2 * Math.PI * radio; // Aproximadamente 314.16
  const strokeDashoffset = circunferencia - (porcentaje / 100) * circunferencia;

  // Color dinámico según el nivel de cobertura
  let colorAnillo = "text-rose-500"; // Bajo (Menos de 50%)
  if (porcentaje >= 50 && porcentaje < 80) colorAnillo = "text-amber-500"; // Medio
  if (porcentaje >= 80) colorAnillo = "text-emerald-500"; // Alto / Seguro

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center w-full max-w-sm">
      <h3 className="text-gray-700 font-semibold text-lg mb-1 text-center">{titulo}</h3>
      {subtitulo && <p className="text-xs text-gray-400 mb-6 text-center">{subtitulo}</p>}

      {/* Contenedor del Gráfico */}
      <div className="relative flex items-center justify-center">
        <svg className="w-36 h-36 transform -rotate-90">
          {/* Círculo de fondo (Gris) */}
          <circle
            cx="72"
            cy="72"
            r={radio}
            className="text-gray-100"
            strokeWidth="12"
            stroke="currentColor"
            fill="transparent"
          />
          {/* Círculo de progreso (Color dinámico con transición suave) */}
          <circle
            cx="72"
            cy="72"
            r={radio}
            className={`${colorAnillo} transition-all duration-1000 ease-out`}
            strokeWidth="12"
            strokeDasharray={circunferencia}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
          />
        </svg>

        {/* Textos en el centro del círculo */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-extrabold text-gray-800">{porcentaje}%</span>
          <span className="text-xs font-medium text-gray-500 mt-0.5">
            {cubiertos} / {total} Amenazas Controladas
          </span>
        </div>
      </div>

      {/* Leyenda inferior */}
      <div className="mt-6 flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-full">
        <span className={`h-2.5 w-2.5 rounded-full ${colorAnillo.replace('text-', 'bg-')}`} />
        <span>{porcentaje >= 80 ? 'Empresa Segura' : porcentaje >= 50 ? 'Seguridad Regular' : 'Empresa en Riesgo'}</span>
      </div>
    </div>
  );
};