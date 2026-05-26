// src/services/prioridades.service.ts
import { supabase } from '../config/supabase.js';

export const PrioridadesService = {
  async obtenerTodas() {
    const { data, error } = await supabase
      .from('prioridades')
      .select('id, nombre, nivel_peso');

    if (error) throw new Error(error.message);
    return data;
  }
};