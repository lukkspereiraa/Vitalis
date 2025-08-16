import React from 'react';

// --- Tipos (TypeScript) ---
export type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
};

// --- Componente ---
const Button: React.FC<ButtonProps> = ({ onClick, children, variant = 'primary', className = '' }) => {
    const baseClasses = "w-full font-bold py-4 px-6 rounded-xl transition-colors duration-300";
    
    const variantClasses = variant === 'primary'
        ? "bg-[#10B981] text-white shadow-lg hover:bg-emerald-700"
        : "text-[#10B981] hover:bg-emerald-500/10";

    return (
        <button onClick={onClick} className={`${baseClasses} ${variantClasses} ${className}`}>
            {children}
        </button>
    );
};

export default Button;