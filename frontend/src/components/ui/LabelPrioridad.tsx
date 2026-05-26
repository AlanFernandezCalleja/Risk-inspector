type RiesgoProps = {
  nivel: number;
  nombre: string;
};

export const LabelPrioridad = ({ nivel, nombre }: RiesgoProps) => {
   // Bajo por defecto
  
    let badgeStyles= ''; 
  
  switch (nivel) {
    case 1:
        badgeStyles = "bg-green-50 text-green-700 border-green-200";
        break;
    case 2:
        badgeStyles = "bg-amber-50 text-amber-700 border-amber-200";
        break;
    case 3:
        badgeStyles = "bg-amber-50 text-amber-700 border-amber-200";
        break;
    case 4:
        badgeStyles = "bg-rose-50 text-rose-700 border-rose-200";
        break;
  
    default:
        break;
  }
  const textOn = `${nombre}`;

  return (
    <>
      <span className={`inline-flex items-center justify-center min-w-30 rounded-full border px-3 py-1 text-base font-base ${badgeStyles}`}>
        {textOn} 
        </span>
    </>
  );
};
