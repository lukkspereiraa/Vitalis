import React from 'react';

// --- Tipos  ---
export type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary'; 
  className?: string;
};

// --- Componente ---
const Button: React.FC<ButtonProps> = ({ onClick, children, variant = 'primary', className = '' }) => {
    const baseClasses = "w-full font-bold py-4 px-6 rounded-xl transition-colors duration-300";

    const getVariantClasses = () => {
        switch (variant) {
            case 'primary':
                return "bg-[#10B981] text-white shadow-lg hover:bg-emerald-700";
            case 'secondary':
                return "text-[#10B981] hover:bg-emerald-500/10";
            case 'tertiary':
                return "text-gray-600 hover:bg-gray-200"; // Estilo do novo botão de voltar
            default:
                return "bg-[#10B981] text-white shadow-lg hover:bg-emerald-700";
        }
    };

    return (
        <button onClick={onClick} className={`${baseClasses} ${getVariantClasses()} ${className}`}>
            {children}
        </button>
    );
};

export default Button;
