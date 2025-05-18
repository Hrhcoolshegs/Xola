import { ReactNode } from 'react';
import { Card } from './Card';

type StatCardProps = {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
};

export const StatCard = ({ title, value, icon, trend, className = '' }: StatCardProps) => {
  return (
    <Card className={`${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-800">{value}</p>
          
          {trend && (
            <div className="mt-2 flex items-center">
              <span className={`text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className="p-2 rounded-md bg-[#0073b9]/10 text-[#0073b9]">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};