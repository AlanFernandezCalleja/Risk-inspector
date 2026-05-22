// El navbar personalizado para la página de Tablas
// frontend/src/components/elementos/navigation/NavbarTablas.tsx
import { NavLink } from 'react-router-dom';

export const NavbarTablas = () => {
  const subLinkClass = ({ isActive }: { isActive: boolean }) =>
    `pb-3 text-sm font-medium border-b-2 transition-all ${
      isActive
        ? 'border-emerald-600 text-emerald-600 font-bold'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    }`;

  return (
    <header className="bg-white border-b border-gray-200 px-8 pt-4 overflow-x-auto">
      <div className="flex gap-6 min-w-max">
        <NavLink to="/tablas/amenazas" className={subLinkClass}>Amenazas</NavLink>
        <NavLink to="/tablas/controles" className={subLinkClass}>Controles</NavLink>
        <NavLink to="/tablas/activos" className={subLinkClass}>Activos de Información</NavLink>
        <NavLink to="/tablas/analisis-riesgo" className={subLinkClass}>Análisis de Riesgos</NavLink>
      </div>
    </header>
  );
};