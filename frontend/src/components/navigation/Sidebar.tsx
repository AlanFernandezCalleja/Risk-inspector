// Este Sidebar siempre estará disponible para toda la pagina
// valores
// frontend/src/components/elementos/navigation/Sidebar.tsx

import { NavLink } from 'react-router-dom';

export const Sidebar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
      isActive 
        ? 'bg-cyan-200 text-sky-800' 
        : 'text-gray-100 hover:bg-cyan-100/90 hover:text-teal-900'
    }`;

  return (
    <aside className="w-74 bg-cyan-800 border-r border-gray-200 flex flex-col justify-between h-full">
      <div className="px-4 py-6">
        {/* Logo */}
        <div className="flex items-center gap-2 px-2 mb-8">
          <div className="h-8 w-8 bg-slate-100 rounded-lg flex items-center justify-center text-teal-700 font-extrabold text-sm">RI</div>
          <span className="font-bold text-gray-100 text-lg">Risk Inspector</span>
        </div>

        {/* Menú Principal */}
        <nav className="space-y-1">
          <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
          <NavLink to="/tablas" className={linkClass}>Tablas y Registros</NavLink>
          <NavLink to="/mapas-calor" className={linkClass}>Mapas de Calor</NavLink>
          <NavLink to="/configuracion" className={linkClass}>Configuración</NavLink>
        </nav>
      </div>
      
      <div className="p-4 border-t border-cyan-400 text-xs text-cyan-300">
        v1.0.0 — Risk Inspector
      </div>
    </aside>
  );
};