interface Options {
  key: string;
  value: string;
  disabled?: boolean;
}

interface InputSelectProps {
  name: string;
  label?: string;
  options: Array<Options>;
  // onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChange?: (selectedValue: string) => void;
  required?: boolean;
  styles?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
}

const InputSelect: React.FC<InputSelectProps> = ({
  name,
  label,
  options = [],
  onChange,
  required,
  styles = '',
  disabled,
  value
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onChange?.(selectedValue);
  };

  return (
    <div className="flex flex-col gap-2 w-ful">
      {label && (
        <label htmlFor={`select-${name}`} className="text-stone-800 dark:text-stone-200 capitalize">
          {label} {required && <span className="text-sky-600 text-xl m-0 p-0" title="campo requerido">*</span>}
        </label>
      )}
      <select
        id={`select-${name}`}
        name={name}
        onChange={handleChange}
        className={`bg-stone-300 dark:bg-stone-700 text-stone-800 dark:text-stone-200 outline outline-2 outline-sky-900 p-1 md:px-2 rounded-lg ${styles}`}
        required={required}
        value={value || ''}
        disabled={disabled}
      >
        {/* <option value="" disabled>Seleccionar</option> */}
        {options.map(({ key, value, disabled }) => (
          <option key={key} value={value} disabled={disabled}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}

export { InputSelect };
