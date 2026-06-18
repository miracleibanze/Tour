import React, { type FC } from "react";

interface buttonType {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  outline?: boolean;
}

const Button: FC<buttonType> = ({
  children,
  className = "",
  onClick,
  href,
  outline,
}) => {
  return href ? (
    <a href={href}>
      <button
        onClick={onClick}
        className={`bg-primary text-secondary md:py-2 py-1 md:px-6 px-4 rounded-md ${outline ? "border border-primary text-primary" : "bg-primary text-secondary"} ${className}`}
      >
        {children}
      </button>
    </a>
  ) : (
    <button
      onClick={onClick}
      className={`bg-primary text-secondary md:py-2 py-1 md:px-6 px-4 rounded-md ${outline ? " border border-primary text-primary" : "bg-primary text-secondary"} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
