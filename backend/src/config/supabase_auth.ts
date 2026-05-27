// src/config/supabase_auth.ts
// Cliente dedicado a la base de datos externa de autenticación (otro proyecto)
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const authUrl = process.env.AUTH_SUPABASE_URL;
const authKey = process.env.AUTH_SUPABASE_ANON_KEY;

let supabaseAuth: SupabaseClient;

if (!authUrl || !authKey || authUrl.startsWith('PEGAR_AQUI')) {
  console.warn('⚠️  AUTH_SUPABASE_URL o AUTH_SUPABASE_ANON_KEY no están configuradas en .env');
  console.warn('   El endpoint /auth/login no funcionará hasta que se configuren.');
  // Creamos un proxy que lanza error claro si se intenta usar sin configurar
  supabaseAuth = new Proxy({} as SupabaseClient, {
    get() {
      throw new Error('La base de datos de autenticación no está configurada. Revisa AUTH_SUPABASE_URL y AUTH_SUPABASE_ANON_KEY en el .env');
    }
  });
} else {
  supabaseAuth = createClient(authUrl, authKey);
}

export { supabaseAuth };
