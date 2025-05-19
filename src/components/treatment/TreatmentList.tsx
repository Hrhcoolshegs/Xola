import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import { useTreatments } from '../../services/treatmentService';
import { useTreatmentStore } from '../../stores/useTreatmentStore';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Calendar, DollarSign, Clock, CheckCircle } from 'lucide-react';

export const TreatmentList = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const { filters, pagination, setFilters, setPagination } = useTreatmentStore();
  
  const { data, isLoading, isFetching } = useTreatments({
    page: pagination.page,
    pageSize: pagination.pageSize,
    ...filters,
  });

  const rowVirtualizer = useVirtualizer({
    count: data?.treatments?.length ?? 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200, // Estimated row height
    overscan: 5,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0073b9]"></div>
      </div>
    );
  }

  return (
    <div
      ref={parentRef}
      className="h-[800px] overflow-auto"
      style={{
        contain: 'strict',
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const treatment = data.treatments[virtualRow.index];
          return (
            <div
              key={treatment.id}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <Card className="m-2">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        Treatment Plan #{treatment.id}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Patient ID: {treatment.patientId}
                      </p>
                    </div>
                    <Badge
                      variant={
                        treatment.status === 'active' ? 'primary' :
                        treatment.status === 'completed' ? 'success' : 'warning'
                      }
                    >
                      {treatment.status.charAt(0).toUpperCase() + treatment.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center text-gray-500 mb-1">
                        <Calendar size={16} className="mr-1" />
                        <span className="text-sm">Duration</span>
                      </div>
                      <p className="font-medium">30 Days</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center text-gray-500 mb-1">
                        <DollarSign size={16} className="mr-1" />
                        <span className="text-sm">Total Cost</span>
                      </div>
                      <p className="font-medium">
                        ${treatment.procedures.reduce((sum, proc) => sum + proc.cost, 0)}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center text-gray-500 mb-1">
                        <Clock size={16} className="mr-1" />
                        <span className="text-sm">Progress</span>
                      </div>
                      <div className="flex items-center">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full mr-2">
                          <div 
                            className="h-2 bg-[#0073b9] rounded-full"
                            style={{ width: `${treatment.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {Math.round(treatment.progress)}%
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center text-gray-500 mb-1">
                        <CheckCircle size={16} className="mr-1" />
                        <span className="text-sm">Procedures</span>
                      </div>
                      <p className="font-medium">
                        {treatment.procedures.filter(p => p.status === 'completed').length}/
                        {treatment.procedures.length}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="primary" size="sm">
                      Update Progress
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {isFetching && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#0073b9]"></div>
        </div>
      )}
    </div>
  );
};