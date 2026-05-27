// src/services/controles.service.ts
import { supabase } from '../config/supabase.js';


const QUERY_CONTROL_COMPLETO = `
  id,
  control,
  descripcion_control,
  tipo:tipos_control (id, nombre),
  nivel:niveles_control (id, nombre),
  frecuencia:frecuencias (id, nombre)
`;


export const ControlesService = {
  
  // 1. GET de todos los controles
  async obtenerControles() {
    const { data, error } = await supabase
      .from('controles')
      // 💡 TODO: Reemplaza '*' por tus columnas reales, ej: 'id, nombre, tipo, amenaza:amenazas(id, amenaza)'
      .select(QUERY_CONTROL_COMPLETO);

    if (error) {
      throw new Error(`Error al obtener controles: ${error.message}`);
    }

    return data;
  },

  // 2. GET de un control específico por su ID
  async obtenerControl(id: number) {
    const { data, error } = await supabase
      .from('controles')
      .select(QUERY_CONTROL_COMPLETO)
      .eq('id', id)
      .single(); //  Magia aplicada: devuelve el objeto directo { ... } en lugar de un array [{ ... }]

    if (error) {
      throw new Error(`Error al obtener el control: ${error.message}`);
    }

    return data;
  },

  // 3. PUT o Edición de un Control
  async editarControl(id: number, datos: any) { 
    // 💡 TODO: Te sugiero cambiar 'any' por una interfaz real si tienes los tipos definidos
    const { data, error } = await supabase
      .from('controles')
      .update(datos)
      .eq('id', id)
      .select(QUERY_CONTROL_COMPLETO).single();

    if (error) {
      throw new Error(`Error al editar el control: ${error.message}`);
    }
    
    return data;
  },

  // 4. DELETE de control por id
  async eliminarControl(id: number) {
    const { error } = await supabase
      .from('controles')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Error al eliminar el control: ${error.message}`);
    }
    
    return true;
  },
  // 3. POST: Crear un nuevo control
  async crearControl(datosControl: any) {
    const { data, error } = await supabase
      .from('controles')
      .insert(datosControl)
      .select(QUERY_CONTROL_COMPLETO)
      .single(); // Devuelve el control recién creado con sus relaciones

    if (error) {
      throw new Error(`Error al crear el control: ${error.message}`);
    }

    return data;
  },

};