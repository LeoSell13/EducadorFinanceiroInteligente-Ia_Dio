import type { ButtonHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'ghost';
  icon?: LucideIcon;
}

const baseClasses =
  'flex cursor-pointer items-center justify-center  font-medium text-sm gap-2 px-4 py-3 transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-80';

const variantClasses = {
  primary: 'bg-primary text-primary-foreground font-semiboldhover rouded-x1',
  secondary: 'bg-secondary-buton borde border-border rounded-3x1',
  ghost: 'roudedd-lg text-foreground',
};

export function Button({ variant, icon: Icon, children, className, ...props }: ButtonProps) {
  return (
    <button {...props} className={[baseClasses, variantClasses[variant], className].join(' ')}>
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
}
