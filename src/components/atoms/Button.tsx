interface Props {
  variant?: 'text' | 'outlined' | 'contained';
  color?:
    | 'default'
    | 'primary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'sections'
    | 'white';
  size?: 'sm' | 'md' | 'lg';
  rounded?: true | false;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  formAction?: (formData: FormData) => void;
  disabled?: boolean;
}

export default function CustomButton({
  color = 'default',
  size = 'md',
  variant = 'contained',
  type = 'button',
  rounded = true,
  className,
  onClick,
  children,
  formAction,
  disabled,
}: Props) {
  const colorStyles = {
    primary: {
      contained: 'bg-primary hover:bg-primary-80 text-white',
      outlined:
        'border-primary bg-transparent border-[1.5px] hover:bg-primary text-white',
      text: 'hover:bg-primary bg-transparent text-white',
    },
    success: {
      contained: 'bg-success hover:bg-success-80 text-white',
      outlined:
        'border-success bg-transparent border-[1.5px] hover:bg-success text-white',
      text: 'hover:bg-success bg-transparent text-white',
    },
    danger: {
      contained: 'bg-danger hover:bg-danger-80 text-white',
      outlined:
        'border-danger bg-transparent border-[1.5px] hover:bg-danger text-white',
      text: 'hover:bg-danger bg-transparent text-white',
    },
    warning: {
      contained: 'bg-warning hover:bg-warning-80 text-white',
      outlined:
        'border-warning bg-transparent border-[1.5px] hover:bg-warning text-white',
      text: 'hover:bg-warning bg-transparent text-white',
    },
    sections: {
      contained: 'bg-dark hover:bg-dark-80 text-primary',
      outlined:
        'border-warning bg-transparent border-[1.5px] hover:bg-warning text-primary',
      text: 'hover:bg-warning bg-transparent text-primary',
    },
    default: {
      contained: 'bg-dark-80 hover:bg-dark-60 text-white',
      outlined:
        'border-dark-60 bg-transparent border-[1.5px] hover:bg-dark-60 text-white',

      text: 'bg-transparent text-white',
    },
    white: {
      contained: 'bg-white hover:bg-white text-black',
      outlined:
        'border-white bg-transparent border-[1.5px] hover:bg-white text-black',
      text: 'bg-transparent text-black',
    },
  };

  const sizeStyles = {
    sm: 'py-1 px-3',
    md: 'py-2 px-4',
    lg: 'py-3 px-6',
  };

  const baseStyles = `inline-flex justify-center items-center gap-2 font-medium  transition-all w-full ${
    rounded ? 'rounded-lg' : ''
  }`;

  return (
    <button
      disabled={disabled}
      formAction={formAction ?? undefined}
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${colorStyles[color][variant]} ${className}`}
    >
      {children}
    </button>
  );
}
