import { forwardRef } from "react";

interface textboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  Size?: "sm" | "md" | "lg";
  border?: "none" | string;
  textAlignment?: "left" | "center" | "right";
}

export const Textbox = forwardRef(function Textbox(
  {
    onChange,
    type,
    placeholder,
    onClick,
    onBlur,
    value,
    readOnly,
    Size = "md",
    border,
    textAlignment = "left",
  }: textboxProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const sizeStyle =
    (Size === "md" && "py-2 px-4") || (Size === "sm" && "py-1 px-1");
  const borderStyle =
    border !== "none"
      ? `border ${border} focus:ring focus:ring-stone-300 focus:ring-1`
      : "border border-0";

  return (
    <div
      className={`text-${textAlignment} ${sizeStyle} ${borderStyle} bg-slate-300 placeholder:italic rounded-xl`}
    >
      <input
        className="bg-inherit focus:outline-none w-full"
        autoComplete="off"
        type={type}
        readOnly={readOnly}
        value={value}
        ref={ref}
        onClick={onClick}
        onBlur={onBlur}
        placeholder={placeholder}
        onChange={onChange}
      ></input>
    </div>
  );
});
