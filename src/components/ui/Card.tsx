import { ReactNode } from 'react';

type CardProps = {
  title?: string;
  children: ReactNode;
  className?: string;
  titleAction?: ReactNode;
};

export const Card = ({ title, children, className = '', titleAction }: CardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
          {titleAction && <div>{titleAction}</div>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};