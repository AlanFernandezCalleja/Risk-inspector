// src/components/ui/Boton.tsx
import { type ButtonHTMLAttributes, type ReactNode } from "react";

// 1. Definimos las variantes visuales que necesitará tu sistema de riesgos
type VarianteBoton = "primary" | "secondary" | "danger" | "success" | "outline";
type TamanoBoton = "sm" | "md" | "lg";

// 2. Extendemos las propiedades nativas de un <button> de HTML para que acepte onClick, type, disabled, etc.
interface BotonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: VarianteBoton;
  tamano?: TamanoBoton;
  cargando?: boolean;
  icono?: ReactNode; // Por si quieres meterle un ícono de Lucide o similar
}

export const Boton = ({
  children,
  variante = "primary",
  tamano = "md",
  cargando = false,
  icono,
  className = "",
  disabled,
  ...props
}: BotonProps) => {
  
  // Diccionario de estilos base comunes para todos los botones
  const estilosBase = "inline-flex items-center justify-center font-base rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed gap-2";

  // Diccionario de variantes de color (Intenciones)
  const variantes: Record<VarianteBoton, string> = {
    primary: "bg-orange-400 hover:bg-orange-500 text-white border-transparent ",
    secondary: "bg-white hover:bg-gray-50 text-gray-700 border-gray-300 ",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white border-transparent ",
    danger: "bg-rose-500 hover:bg-rose-600 text-white border-transparent ",
    outline: "bg-transparent hover:bg-gray-50 text-gray-600 border-gray-200 shadow-none ",
  };

  // Diccionario de tamaños operativos
  const tamanos: Record<TamanoBoton, string> = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-1.5 text-md",
    lg: "px-5 py-2.5 text-base",
  };

  return (
    <button
      className={`${estilosBase} ${variantes[variante]} ${tamanos[tamano]} ${className}`}
      disabled={disabled || cargando}
      {...props} // Hereda mágicamente onClick, type="submit", etc.
    >
      {/* Animación de carga tipo Spinner si está procesando algo */}
      {cargando && (
        <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}

      {/* Si viene un ícono y no está cargando, lo muestra */}
      {!cargando && icono && <span className="flex items-center">{icono}</span>}
      
      {/* El texto o contenido del botón */}
      <span>{children}</span>
    </button>
  );
};