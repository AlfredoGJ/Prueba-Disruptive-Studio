interface LabelProps {
  text: string;
}

export const Label = ({ text }: LabelProps) => {
  return <small className="text-small">{text}</small>;
};
