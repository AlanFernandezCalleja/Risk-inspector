import FilaRiesgo from "./FilaRiesgo";

// TODO: Agregar Botones para editar amenaza, eliminar amenaza, agregar amenaza nueva

export default function TablaAmenazas() {
  // Datos de prueba (incluyendo tu ejemplo y un par más para ver el comportamiento estético)
  // TODO: Implementar una API
  const datos = [
    { 
      id: 1, 
      activo: "Nombre del Activo", 
      amenaza: "Amenaza", 
      descripcionAmenaza: "Descripción detallada del riesgo",
      consecuencia: "Consecuencia", 
      descripcionConsecuencia: "Descripcion Consecuencia",
      probabilidad: 1, 
      impacto: 5, 
      riesgo: 5 
    },
    { 
      id: 2, 
      activo: "Base de Datos Clientes", 
      amenaza: "Fuga de Información", 
      descripcionAmenaza: "Exfiltración por malware",
      consecuencia: "Sanciones legales de severidad alta", 
      probabilidad: 3, 
      impacto: 4, 
      riesgo: 12 
    },
    { 
      id: 3, 
      activo: "Servidor Web", 
      amenaza: "Ataque DDoS", 
      descripcionAmenaza: "Saturación de peticiones",
      consecuencia: "Cierre temporal de la plataforma", 
      probabilidad: 2, 
      impacto: 2, 
      riesgo: 4 
    }
  ];

  return (
    <div className="w-full p-6 bg-slate-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-6xl overflow-hidden rounded-md border border-slate-200 bg-white shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-slate-600">
            
            {/* Encabezado de la Tabla */}
            <thead className="bg-slate-100 text-sm font-bold uppercase tracking-wider text-slate-700">
              <tr>
                <th scope="col" className="px-6 py-4 text-center w-12 border border-slate-200/60">N°</th>
                <th scope="col" className="px-6 py-4 border border-slate-200/60">Activo</th>
                <th scope="col" className="px-6 py-4 border border-slate-200/60">Amenaza</th>
                <th scope="col" className="px-6 py-4 border border-slate-200/60">Consecuencia</th>
                <th scope="col" className="px-6 py-4 text-center border border-slate-200/60">Probabilidad</th>
                <th scope="col" className="px-6 py-4 text-center border border-slate-200/60">Impacto</th>
                <th scope="col" className="px-6 py-4 text-center border border-slate-200/60">Nivel de Riesgo</th>
              </tr>
            </thead>
            
            {/* Cuerpo de la Tabla */}
            <tbody className="divide-y divide-slate-100 bg-white ">
              {datos.map((item) => (
                <FilaRiesgo key={item.id} fila={item} />
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}