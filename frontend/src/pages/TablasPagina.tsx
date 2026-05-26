// src/pages/TablasPagina.tsx
import { Outlet, useLocation } from 'react-router-dom';

export const TablasPagina = () => {
  const location = useLocation();

  // Diccionario de títulos según la sub-ruta exacta
  const titulos: Record<string, string> = {
    "/tablas/activos": "Activos de Información",
    "/tablas/amenazas": "Matriz de Amenazas y Consecuencias",
    "/tablas/controles": "Catálogo de Controles de Seguridad",
    "/tablas/analisis-riesgo": "Matriz Completa para Análisis de Riesgos",
  };

  // Detectamos el título actual basándonos en la URL
  const tituloActual = titulos[location.pathname] || "Módulos de Configuración";

  return (
    <div className="space-y-6">
      
      {/* Título de la página que cambiará mágicamente según la pestaña */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
          {tituloActual}
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Gestiona y parametriza los elementos principales de la matriz de riesgos.
        </p>
      </div>

      {/* 🔄 Este Outlet interno renderizará TablaAmenaza, TablaActivos, etc. */}
      <div className="pt-2">
        <Outlet />
      </div>

    </div>
  );
};