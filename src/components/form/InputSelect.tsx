import React from "react";

interface Option {
  key: string;
  value: string;
  disabled?: boolean;
}

interface InputSelectProps {
  className?: string;
  disabled?: boolean;
  label?: string;
  name: string;
  onChange: (selectedValue: string) => void;
  options: Array<Option | string>;
  placeholder?: string;
  value: string;
}

const InputSelect: React.FC<InputSelectProps> = ({
  disabled,
  label,
  name,
  onChange,
  options = [],
  value,
  placeholder = "Select an option",
  className = "",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  const renderOptions = () => {
    return options.map((option) => {
      if (typeof option === "string") {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        );
      }
      return (
        <option key={option.key} value={option.value} disabled={option.disabled}>
          {option.value}
        </option>
      );
    });
  };

  return (
    <div className="flex items-center gap-2">
      {label && (
        <label htmlFor={`select-${name}`} className="text-stone-800 dark:text-stone-200">
          {label}
        </label>
      )}
      <select
        disabled={disabled}
        id={`select-${name}`}
        name={name}
        onChange={handleChange}
        value={value}
        className={`bg-stone-200 dark:bg-stone-800 border border-sky-700 rounded-md font-bold uppercase p-2 ${className}`}
      >
        <option value="-1" disabled>
          {placeholder}
        </option>

        {renderOptions()}
      </select>
    </div>
  );
};

export { InputSelect };
