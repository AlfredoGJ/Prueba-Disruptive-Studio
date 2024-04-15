import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { Option } from "../../../types/types";

interface ListBoxProps {
  options: Option[];
  name: string;
  value?: Option | Option[];
  multiple?: boolean;
  onChange?: ((value: Option[]) => void) | ((value: Option) => void);
}

export const Select = ({
  options,
  name,
  value,
  onChange,
  multiple,
}: ListBoxProps) => {
  return (
    <div className="top-16 w-auto ">
      <Listbox
        value={value}
        name={name}
        onChange={onChange}
        multiple={multiple}
        by="name"
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-md bg-slate-200 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm h-9">
            <span className="block truncate">
              {Array.isArray(value)
                ? value.map((v) => v.name).join(", ")
                : value?.name}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-200 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {options.map((option) => (
                <Listbox.Option
                  key={option.id}
                  className=" cursor-default select-none py-1 px-1"
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <div
                        className={` ${
                          selected
                            ? "font-medium text-purple-600"
                            : "font-normal"
                        } ${active ? "bg-slate-400" : ""}`}
                      >
                        {option.name}
                      </div>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
