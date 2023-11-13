import { ChangeEvent } from "react";

interface SwitchProps {
  className?: string;
  label?: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Switch: React.FC<SwitchProps> = ({
  className,
  checked = false,
  onChange,
  label,
  ...props
}) => (
  <label className="relative inline-flex cursor-pointer items-center">
    <input
      type="checkbox"
      value=""
      className="peer sr-only"
      checked={checked}
      onChange={onChange}
    />
    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-brand-blue-100 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700"></div>
    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
      {label}
    </span>
  </label>
);

export default Switch;
