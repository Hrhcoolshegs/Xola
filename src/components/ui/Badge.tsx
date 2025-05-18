import { ReactNode } from 'react';

type BadgeProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
  className?: string;
};

export const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}: BadgeProps) => {
  const baseClasses = 'inline-flex items-center rounded-full font-medium';
  
  const variantClasses = {
    primary: 'bg-[#0073b9] text-white',
    secondary: 'bg-[#56c4c5] text-white',
    outline: 'bg-white border border-gray-300 text-gray-700',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
  };
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {children}
    </span>
  );
};