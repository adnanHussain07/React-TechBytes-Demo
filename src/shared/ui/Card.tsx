import React from 'react';

type CardProps = {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ title, children, footer }) => {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        margin: '16px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        maxWidth: '400px',
        display: 'inline-block',
        verticalAlign: 'top',
      }}
    >
      {title && (
        <h3 style={{ marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
          {title}
        </h3>
      )}
      <div>{children}</div>
      {footer && (
        <div style={{ borderTop: '1px solid #eee', paddingTop: '10px', marginTop: '10px' }}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
