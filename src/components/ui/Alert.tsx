import React from 'react';

export const Alert: React.FC<{ type?: 'error' | 'success' | 'info'; children: React.ReactNode }> = ({ type = 'info', children }) => {
  const base = 'px-4 py-2 rounded';
  const colors: Record<string, string> = {
    error: 'bg-red-100 text-red-800',
    success: 'bg-green-100 text-green-800',
    info: 'bg-blue-50 text-blue-800',
  };
  return <div className={`${base} ${colors[type]}`}>{children}</div>;
};

export default Alert;
