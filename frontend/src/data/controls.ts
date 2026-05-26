import { type ControlData } from "../models/ControlData";


export const datosControles: ControlData[] = [
    {
      id: 1,
      control: "Desactivación de cuentas Genéricas",
      descripcion_control:
        "Implementar una política para desactivar las cuentas genéricas",
      tipo: "P",
      nivel: "A",
      frecuencia: "D",
    },
    {
      id: 2,
      control: "Revisión de accesos privilegiados",
      descripcion_control:
        "Revisar trimestralmente los usuarios con roles administrativos",
      tipo: "D",
      nivel: "A",
      frecuencia: "T",
    },
    {
      id: 3,
      control: "Cambio de contraseñas obligatorio",
      descripcion_control:
        "Forzar cambio de contraseña cada 90 días para usuarios finales",
      tipo: "O",
      nivel: "M",
      frecuencia: "S",
    },
    {
      id: 4,
      control: "Bitácora de eventos del sistema",
      descripcion_control:
        "Registrar todos los eventos de inicio de sesión y cambios críticos",
      tipo: "D",
      nivel: "A",
      frecuencia: "D",
    },
    {
      id: 5,
      control: "Revisión de cuentas inactivas",
      descripcion_control:
        "Identificar y bloquear cuentas sin actividad por más de 30 días",
      tipo: "P",
      nivel: "M",
      frecuencia: "M",
    },
    {
      id: 6,
      control: "Autenticación multifactor",
      descripcion_control:
        "Implementar MFA para accesos remotos a sistemas críticos",
      tipo: "O",
      nivel: "A",
      frecuencia: "A",
    },
  ];