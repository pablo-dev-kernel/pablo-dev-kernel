// Hooks
import { useThemeController } from "@/libs/hooks/useThemeController";

interface ButtonProps {
  children?: React.ReactNode;
  disabled?: boolean;
  leftIcon?: React.ReactElement;
  onClick?: () => void;
  rightIcon?: React.ReactElement;
  styles?: string;
  text?: string;
  title?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  ref?: React.RefObject<HTMLButtonElement>;
}

const Button = ({
  children,
  disabled = false,
  leftIcon,
  onClick,
  rightIcon,
  styles,
  text,
  title,
  type = 'button',
  ref,
}: ButtonProps) => {
  const { tones } = useThemeController();

  const buttonClasses = `
    transition-colors px-2 outline ${tones.outlineColor.normal} rounded-lg flex items-center gap-1
    ${styles}
    ${disabled ? 'bg-stone-700' : `${tones.bgColor.normal} hover:${tones.bgColor.dark} font-medium text-lg`}
    ${tones.textColor}
  `;

  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      title={title}
      type={type}
      ref={ref}
    >
      {children || (
        <>
          {leftIcon && <span>{leftIcon}</span>}
          {text && <span>{text}</span>}
          {rightIcon && <span>{rightIcon}</span>}
        </>
      )}
    </button>
  )
}

export { Button };
