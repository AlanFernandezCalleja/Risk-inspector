// src/config/supabase.ts
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Aseguramos que se lean las variables del archivo .env
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Validación de seguridad para que el backend no truene en producción por falta de credenciales
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Faltan las variables de entorno SUPABASE_URL o SUPABASE_ANON_KEY');
}

// Inicializamos y exportamos el cliente único
export const supabase = createClient(supabaseUrl, supabaseKey);