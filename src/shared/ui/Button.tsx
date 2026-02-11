import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', style, ...props }) => {
  const baseStyle: React.CSSProperties = {
    padding: '10px 15px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1em',
    ...style,
  };

  const primaryStyle: React.CSSProperties = {
    backgroundColor: '#007bff',
    color: 'white',
  };

  const secondaryStyle: React.CSSProperties = {
    backgroundColor: '#6c757d',
    color: 'white',
  };

  const currentStyle = variant === 'primary' ? primaryStyle : secondaryStyle;

  return (
    <button style={{ ...baseStyle, ...currentStyle }} {...props}>
      {children}
    </button>
  );
};

export default Button;
