import { Button as ChakraButton } from '@chakra-ui/react';
import { MouseEventHandler, ReactNode } from 'react';

const variants = {
  solid: "w-full mx-auto flex justify-center py-2 px-4 border border-transparent rounded-sm shadow-sm text-sm xs:text-base font-medium text-white bg-orange-600 transition-all",
  outline: "w-full mx-auto flex items-center justify-center gap-3 py-2.5 px-4 border border-orange-600 rounded-lg text-sm font-medium text-gray-700 bg-white transition-colors shadow-sm",
};

const activeVariants = {
  solid: "cursor-pointer hover:bg-orange-700 active:scale-[0.98]",
  outline: "cursor-pointer hover:bg-gray-50",
};

export type ButtonProps = {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: keyof typeof variants;
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string; // optional extra Tailwind classes
};

export const Button = ({
  variant = 'solid',
  type = 'button',
  children,
  className = "font-roboto",
  isDisabled = false,
  ...props
}: ButtonProps) => {

  const baseClass = variants[variant];
  const interactionClass = isDisabled
    ? "opacity-50 cursor-not-allowed"
    : activeVariants[variant];

  return (
    <ChakraButton
      {...props}
      type={type}
      isDisabled={isDisabled}
      className={`${baseClass} ${interactionClass} ${className}`}
    >
      {children}
    </ChakraButton>
  );
};