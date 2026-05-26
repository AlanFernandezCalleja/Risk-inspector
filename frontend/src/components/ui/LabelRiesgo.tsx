type RiesgoProps = {
  riesgo: number;
  text?: string;
};

export const LabelRiesgo = ({ riesgo, text }: RiesgoProps) => {
  let badgeStyles = "bg-green-50 text-green-700 border-green-200"; // Bajo por defecto
  const valorRiesgo = riesgo;

  if (valorRiesgo >= 5 && valorRiesgo <= 9) {
    badgeStyles = "bg-amber-50 text-amber-700 border-amber-200"; // Medio
  } else if (valorRiesgo > 9) {
    badgeStyles = "bg-rose-50 text-rose-700 border-rose-200"; // Alto
  }

  return (
    <>
      <span
        className={`inline-flex items-center justify-center min-w-20 rounded-full border px-3 py-1 text-base font-bold ${badgeStyles}`}
      >
        {riesgo} 
      </span>
    </>
  );
};
