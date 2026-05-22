// TODO: Tabla de Controles
import type { Columna } from "./TablaGenérica";
import { TablaGenerica } from "./TablaGenérica";
// CONTROL: Estos son los datos que debe tener cada control
export interface ControlData {
  id: number;
  control: string;
  descripcionControl: string;
  tipo: string;
  nivel: string;
  frecuencia: string;
}

export const TablaControles = () => {
  const columnaControles: Columna<ControlData>[] = [
    { encabezado: "ID", clave: "id" },

    {
      encabezado: "CONTROL",
      clave: "control",
      render: (control) => {
        return (
          <>
            <div className="font-medium text-slate-800">{control.control}</div>
            <div className="text-sm text-slate-400 mt-0.5">
              {control.descripcionControl}
            </div>
          </>
        );
      },
    },

    { encabezado: "TIPO", clave: "tipo" },
    { encabezado: "AUTOMATICO", clave: "nivel" },
    { encabezado: "FRECUENCIA", clave: "frecuencia" },
  ];
  const datosControles: ControlData[] = [
    {
      id: 1,
      control: "Desactivación de cuentas Genéricas",
      descripcionControl:
        "Implementar una política para desactivar las cuentas genéricas",
      tipo: "P",
      nivel: "A",
      frecuencia: "D",
    },
    {
      id: 2,
      control: "Revisión de accesos privilegiados",
      descripcionControl:
        "Revisar trimestralmente los usuarios con roles administrativos",
      tipo: "D",
      nivel: "A",
      frecuencia: "T",
    },
    {
      id: 3,
      control: "Cambio de contraseñas obligatorio",
      descripcionControl:
        "Forzar cambio de contraseña cada 90 días para usuarios finales",
      tipo: "O",
      nivel: "M",
      frecuencia: "S",
    },
    {
      id: 4,
      control: "Bitácora de eventos del sistema",
      descripcionControl:
        "Registrar todos los eventos de inicio de sesión y cambios críticos",
      tipo: "D",
      nivel: "A",
      frecuencia: "D",
    },
    {
      id: 5,
      control: "Revisión de cuentas inactivas",
      descripcionControl:
        "Identificar y bloquear cuentas sin actividad por más de 30 días",
      tipo: "P",
      nivel: "M",
      frecuencia: "M",
    },
    {
      id: 6,
      control: "Autenticación multifactor",
      descripcionControl:
        "Implementar MFA para accesos remotos a sistemas críticos",
      tipo: "O",
      nivel: "A",
      frecuencia: "A",
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Controles </h2>
      <TablaGenerica columnas={columnaControles} datos={datosControles} />
    </div>
  );
};
