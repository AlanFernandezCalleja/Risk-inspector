// src/components/ui/ConfirmacionModal.tsx
import { Boton } from "./Boton";
import { AlertTriangle } from "lucide-react"; // Opcional: para darle un toque visual de advertencia

interface ConfirmacionModalProps {
  isOpen: boolean;
  onClose: () => void; // Acción al cancelar o cerrar
  onConfirm: () => void | Promise<void>; // Acción al confirmar
  titulo?: string;
  mensaje?: string;
  textoConfirmar?: string;
  textoCancelar?: string;
  varianteConfirmar?: "primary" | "danger" | "success";
  cargando?: boolean; // Por si la acción de confirmar toma tiempo en el servidor
}

export const ConfirmacionModal = ({
  isOpen,
  onClose,
  onConfirm,
  titulo = "¿Estás seguro?",
  mensaje = "Esta acción no se puede deshacer.",
  textoConfirmar = "Confirmar",
  textoCancelar = "Cancelar",
  varianteConfirmar = "primary",
  cargando = false,
}: ConfirmacionModalProps) => {
  
  // Si el modal está cerrado, no renderizamos absolutamente nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-60">
      {/* Contenedor del recuadro */}
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
        
        <div className="flex items-start gap-3">
          {/* Ícono dinámico según la intención */}
          <div className={`p-2 rounded-full mt-0.5 ${
            varianteConfirmar === 'danger' ? 'bg-rose-50 text-rose-600' : 'bg-indigo-50 text-indigo-600'
          }`}>
            <AlertTriangle size={20} />
          </div>

          {/* Textos Informativos */}
          <div className="space-y-1 flex-1">
            <h3 className="text-lg font-bold text-gray-900 tracking-tight">
              {titulo}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {mensaje}
            </p>
          </div>
        </div>

        {/* 🛠️ Botonera de Acciones (Tus Súper Botones Reutilizables) */}
        <div className="flex justify-end gap-2 pt-5 mt-2 border-t border-gray-100">
          <Boton
            variante="secondary"
            tamano="md"
            onClick={onClose}
            disabled={cargando}
          >
            {textoCancelar}
          </Boton>
          
          <Boton
            variante={varianteConfirmar}
            tamano="md"
            onClick={onConfirm}
            cargando={cargando}
          >
            {textoConfirmar}
          </Boton>
        </div>

      </div>
    </div>
  );
};