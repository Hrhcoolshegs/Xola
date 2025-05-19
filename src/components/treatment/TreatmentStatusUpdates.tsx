import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCircle, AlertTriangle, Clock, RefreshCw } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface StatusUpdate {
  id: string;
  type: 'progress' | 'milestone' | 'alert';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface TreatmentStatusUpdatesProps {
  treatmentId: string;
  updates: StatusUpdate[];
  onUpdateRead: (updateId: string) => void;
  onRefresh: () => void;
}

export const TreatmentStatusUpdates = ({
  treatmentId,
  updates,
  onUpdateRead,
  onRefresh
}: TreatmentStatusUpdatesProps) => {
  const [showAll, setShowAll] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const unreadCount = updates.filter(update => !update.read).length;
  const displayedUpdates = showAll ? updates : updates.slice(0, 3);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setIsRefreshing(false);
  };

  const getUpdateIcon = (type: StatusUpdate['type']) => {
    switch (type) {
      case 'progress':
        return <Clock size={16} className="text-[#0073b9]" />;
      case 'milestone':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'alert':
        return <AlertTriangle size={16} className="text-yellow-500" />;
      default:
        return <Bell size={16} className="text-gray-400" />;
    }
  };

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h3 className="text-lg font-medium text-gray-800">Status Updates</h3>
            {unreadCount > 0 && (
              <Badge variant="primary" size="sm" className="ml-2">
                {unreadCount} new
              </Badge>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            icon={<RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />}
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            Refresh
          </Button>
        </div>

        <div className="space-y-3">
          <AnimatePresence>
            {displayedUpdates.map((update) => (
              <motion.div
                key={update.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`p-4 rounded-lg border transition-colors ${
                  !update.read
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-white border-gray-200'
                }`}
                onClick={() => !update.read && onUpdateRead(update.id)}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    {getUpdateIcon(update.type)}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-800">
                        {update.title}
                      </p>
                      <span className="text-xs text-gray-500">
                        {update.timestamp}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      {update.message}
                    </p>
                    {update.action && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={update.action.onClick}
                      >
                        {update.action.label}
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {updates.length > 3 && (
          <div className="text-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : `Show All (${updates.length})`}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};