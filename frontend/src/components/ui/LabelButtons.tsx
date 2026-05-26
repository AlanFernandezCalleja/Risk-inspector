import { Edit, Edit2, Edit2Icon, Edit3, Trash, Trash2, Trash2Icon } from "lucide-react";
import { Boton } from "./Boton";

interface LabelAcctionsProps {
  accion1: () => void;
  text1?: string;
  accion2: () => void;
  text2?: string;
}

export const LabelButtons = ({
  accion1,
  accion2,
  text1,
  text2,
}: LabelAcctionsProps) => {
  return (
    <div className="flex items-center gap-2">
      <Boton variante="secondary" tamano="sm" onClick={accion1} icono={<Edit2 size={16}/>}>
        Editar
      </Boton>
      <Boton variante="danger" tamano="sm" onClick={accion2} icono={<Trash2Icon size={16}/>}>
        Eliminar
      </Boton>
    </div>
  );
};
