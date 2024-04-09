import { Switch } from "@headlessui/react";

interface IToggleProps {
  enabled: boolean;
  onChange: (value: boolean) => void;
}

export const Toggle = ({ enabled, onChange }: IToggleProps) => {
  return (
    <Switch
      checked={enabled}
      onChange={onChange}
      className={`${
        enabled ? "bg-blue-600" : "bg-gray-200"
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          enabled ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
};
