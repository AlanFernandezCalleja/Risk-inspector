// TODO: Página con metricas del estado de la empresa

// TODO: Métrica Nivel de riesgo identificado
// TODO: Cantidad de controels
// TODO: Cantidad de Amenazas
// SEMI CHECK:  Barra porcentaje de Amenazas cubiertas
// TODO: Reportes Amenazas realizados este mes

import { ProgressCircle } from "../components/dashComponents/ProgressCircle";

export const Dashboard = () => {
  // Datos de ejemplo basados en tu lógica de Activos -> Amenazas cubiertas
  const datosDashboard = {
    tituloGeneral: "Cobertura Global de Riesgos",
    totalAmenazasGlobal: 3,
    amenazasCubiertasGlobal: 2, // 19 de 25 (~76%)
    
    // Desglose por activos individuales
    activos: [
      { id: 1, nombre: "Base de Datos Clientes", cubiertas: 8, total: 10 },
      { id: 2, nombre: "Servidor Web Glucotracker", cubiertas: 6, total: 10 },
      { id: 3, nombre: "Módulo de Registros Pacientes", cubiertas: 2, total: 10 },
    ]
  };

  return (
    <div className=" bg-gray-100 p-8">
      {/* Encabezado del Dashboard */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard de Seguridad</h1>
        <p className="text-gray-500 text-sm">Monitoreo y nivel de mitigación de amenazas sobre activos de información.</p>
      </header>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Columna 1: El Chart Circular (Progreso Global) */}
        <div className="lg:col-span-1">
          <ProgressCircle 
            titulo={datosDashboard.tituloGeneral}
            subtitulo="Porcentaje total de mitigación en la organización"
            cubiertos={datosDashboard.amenazasCubiertasGlobal}
            total={datosDashboard.totalAmenazasGlobal}
          />
        </div>

        {/* Columna 2 y 3: Detalle por Activo Individual (Barras de progreso lineales) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full">
          <h3 className="text-gray-700 font-semibold text-lg mb-1">Cobertura por Activo de Información</h3>
          <p className="text-xs text-gray-400 mb-6">Lista detallada de amenazas mitigadas por cada activo.</p>
          
          <div className="space-y-6">
            {datosDashboard.activos.map((activo) => {
              const pct = Math.round((activo.cubiertas / activo.total) * 100);
              return (
                <div key={activo.id} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-700">{activo.nombre}</span>
                    <span className="text-gray-500">{activo.cubiertas}/{activo.total} ({pct}%)</span>
                  </div>
                  
                  {/* Barra de progreso con Tailwind */}
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-1000 ${
                        pct >= 80 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
