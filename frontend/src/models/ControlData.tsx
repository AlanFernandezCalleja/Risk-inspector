


export interface Tipo{
  id: number,
  nombre: string,
}
export interface Nivel{
  id: number,
  nombre: string,
}
export interface Frecuencia {
  id: number,
  nombre: string,
}

export interface ControlData {
  id: number;
  control: string;
  descripcion_control: string;
  tipo: Tipo;
  nivel: Nivel;
  frecuencia: Frecuencia;
}