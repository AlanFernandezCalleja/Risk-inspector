
type LabelTabProps = {
  title: string;
  text: string;
};

export const LabelTab = ({ title, text }: LabelTabProps) => {
  return (
    <>
      <div className="font-medium text-slate-800">{title}</div>
      <div className="text-sm text-slate-400 mt-0.5">
        {text}
      </div>
    </>
  );
};