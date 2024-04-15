import { PhotoIcon } from "@heroicons/react/20/solid";
import React, {
  ChangeEvent,
  MutableRefObject,
  forwardRef,
  useEffect,
} from "react";

interface textboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  Size?: "sm" | "md" | "lg";
  border?: "none" | string;
  textAlignment?: "left" | "center" | "right";
  file: File | null;
}

const FileUpload = forwardRef(function Textbox(
  {
    placeholder,
    onChange,
    onBlur,
    file,
    readOnly,
    Size = "md",
    border,
    textAlignment = "left",
    name,
  }: textboxProps,
  forwardedRef: React.ForwardedRef<HTMLInputElement>
) {
  const sizeStyle =
    (Size === "md" && "py-2 px-4") || (Size === "sm" && "py-1 px-1");
  const borderStyle =
    border !== "none"
      ? ` border-2 border-dashed border-purple-300 focus:ring focus:ring-stone-300 focus:ring-1`
      : "border border-0";

  const innerRef = React.useRef<HTMLInputElement>(null);

  function handleClick() {
    if (innerRef.current) {
      innerRef.current.click();
    }
  }

  useEffect(() => {
    // The inner ref has been attached to the element and has been rendered
    if (innerRef.current) {
      if (typeof forwardedRef === "function") forwardedRef(innerRef.current);
      else {
        if (forwardedRef?.current) {
          forwardedRef.current = innerRef.current;
        }
      }
    }
  }, []);

  return (
    <div
      onClick={handleClick}
      className={`flex space-x-2  align-middle text-${textAlignment} ${sizeStyle} ${borderStyle} bg-slate-200 placeholder:italic rounded-md cursor-pointer`}
    >
      <div className="text-purple-400">
        <PhotoIcon width={22}></PhotoIcon>
      </div>
      <div className=" text-gray-400 italic">
        {file ? file.name : "Click to upload an image"}
      </div>
      <input
        name={name}
        accept=".jpg,.png "
        id="fileInput"
        className="bg-inherit focus:outline-none w-full hidden"
        autoComplete="off"
        type="file"
        readOnly={readOnly}
        ref={innerRef}
        onBlur={onBlur}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
});

export default FileUpload;
