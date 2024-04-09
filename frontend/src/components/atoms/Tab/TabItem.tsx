import { Tab } from "@headlessui/react";
import { HtmlHTMLAttributes } from "react";

interface TabItemProps extends HtmlHTMLAttributes<HTMLDivElement> {
  title: string;
}

export const TabItem = ({ children, title }: TabItemProps) => {
  const classNames =
    "w-full py-1 text-xs font-medium leading-5 focus:outline-none border border-l-gray-900 border-r-gray-500 border-y-0";

  return (
    <Tab
      key={title}
      className={({ selected }) =>
        `${classNames}  ${
          selected
            ? "border-b-4 border-orange-600 "
            : "hover:bg-white/[0.12] hover:text-white"
        }`
      }
    >
      {children}
    </Tab>
  );
};
