import { Label } from "../../atoms";

interface SelectProps extends React.HtmlHTMLAttributes<String> {
  label: string;
}

export default function Field({ children, label }: SelectProps) {
  return (
    <div className="flex flex-col py-1">
      <div className="mb-1">
        <Label text={label} />
      </div>
      <div className="contents">{children}</div>
    </div>
  );
}
