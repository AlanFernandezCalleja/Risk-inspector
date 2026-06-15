import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ShieldAlert, LogIn, Info } from 'lucide-react';
import { Boton } from '../components/ui/Boton';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validación básica en frontend
    if (!email.trim() || !password.trim()) {
      setError('Por favor, ingresa tu correo y contraseña.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('El formato del correo electrónico no es válido.');
      return;
    }

    setCargando(true);

    try {
      const respuesta = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: email, contrasena: password })
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setError(datos.error || 'Credenciales incorrectas. Inténtalo de nuevo.');
        setCargando(false);
        return;
      }

      // Login exitoso — guardar datos del usuario autenticado
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', datos.usuario.correo);
      localStorage.setItem('userName', datos.usuario.nombre_completo);
      localStorage.setItem('userRol', datos.usuario.rol || '');
      navigate('/dashboard/general');

    } catch (err) {
      setError('No se pudo conectar con el servidor. Verifica que el backend esté corriendo.');
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-cyan-900 via-slate-900 to-teal-950 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-150 transition-all duration-300">
        
        {/* Encabezado del login */}
        <div className="bg-cyan-800 px-8 py-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-800 to-teal-800 opacity-90" />
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo */}
            <div className="h-14 w-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white font-extrabold text-2xl mb-3 border border-white/20 shadow-inner">
              RI
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Risk Inspector</h2>
            <p className="text-cyan-200/80 text-sm mt-1">Análisis y Gestión de Riesgos Corporativos</p>
          </div>
        </div>

        {/* Cuerpo del Formulario */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Mensaje de Error */}
            {error && (
              <div className="flex items-start gap-3 p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-sm animate-pulse">
                <ShieldAlert className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Input Correo */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Correo Electrónico
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="ejemplo@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:bg-white transition-all text-sm"
                />
              </div>
            </div>

            {/* Input Contraseña */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Contraseña
                </label>
              </div>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={mostrarPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-11 py-3 bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:bg-white transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {mostrarPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Botón Ingresar */}
            <Boton
              type="submit"
              variante="primary"
              tamano="lg"
              cargando={cargando}
              icono={<LogIn className="h-5 w-5" />}
              className="w-full bg-cyan-700 hover:bg-cyan-850 py-3 text-white border-transparent shadow-md focus:ring-cyan-500 font-semibold"
            >
              Iniciar Sesión
            </Boton>
          </form>

          {/* Caja Informativa */}
          <div className="mt-8 p-3.5 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-2.5">
            <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-800 leading-relaxed">
              <span className="font-semibold block mb-0.5">Información:</span>
              <p>Ingresa con las credenciales de tu cuenta de usuario registrada en el sistema.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-100 py-4 text-center">
          <p className="text-xs text-gray-400">
            &copy; 2026 Risk Inspector. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};
