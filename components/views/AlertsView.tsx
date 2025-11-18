'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, AlertTriangle, AlertCircle, Info, CheckCircle, X, Clock, Users, Package, Activity, TrendingUp } from 'lucide-react';

interface AlertsViewProps {
  onBack?: () => void;
}

type AlertType = 'critical' | 'warning' | 'info' | 'success';

interface Alert {
  id: string;
  type: AlertType;
  title: string;
  message: string;
  timestamp: Date;
  category: string;
  actionable: boolean;
  actionLabel?: string;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'critical',
    title: 'Emergency Case Incoming',
    message: 'Trauma case arriving in 8 minutes. Theatre 3 Main needs immediate preparation.',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    category: 'Operations',
    actionable: true,
    actionLabel: 'Prepare Theatre'
  },
  {
    id: '2',
    type: 'warning',
    title: 'Staff Shortage Alert',
    message: '2 scrub nurses called in sick for tomorrow\'s morning shift. Coverage needed for 6 procedures.',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    category: 'Staffing',
    actionable: true,
    actionLabel: 'Find Coverage'
  },
  {
    id: '3',
    type: 'critical',
    title: 'Critical Supply Level',
    message: 'Surgical gloves (Size 7.5) below minimum threshold. Only 23 boxes remaining.',
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    category: 'Inventory',
    actionable: true,
    actionLabel: 'Order Now'
  },
  {
    id: '4',
    type: 'warning',
    title: 'Equipment Maintenance Due',
    message: 'Anaesthesia machine in Theatre 2 Ortho is due for scheduled maintenance within 48 hours.',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    category: 'Equipment',
    actionable: true,
    actionLabel: 'Schedule'
  },
  {
    id: '5',
    type: 'info',
    title: 'Schedule Update',
    message: 'Tomorrow\'s ortho list extended by 2 hours. All staff notified.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    category: 'Operations',
    actionable: false
  },
  {
    id: '6',
    type: 'success',
    title: 'Procurement Order Delivered',
    message: 'Monthly surgical instruments order received and checked into inventory.',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    category: 'Inventory',
    actionable: false
  },
  {
    id: '7',
    type: 'warning',
    title: 'Delayed Procedure',
    message: 'Case #247 delayed by 45 minutes due to late patient arrival. Subsequent cases affected.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    category: 'Operations',
    actionable: true,
    actionLabel: 'View Schedule'
  },
  {
    id: '8',
    type: 'info',
    title: 'New Safety Protocol',
    message: 'Updated WHO surgical checklist now available. All staff to review by end of week.',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    category: 'Compliance',
    actionable: true,
    actionLabel: 'Review'
  }
];

export default function AlertsView({ onBack }: AlertsViewProps) {
  const router = useRouter();
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filter, setFilter] = useState<'all' | AlertType>('all');

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const handleDismiss = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const getAlertIcon = (type: AlertType) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getAlertStyles = (type: AlertType) => {
    switch (type) {
      case 'critical':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
          icon: 'text-red-600 dark:text-red-400',
          badge: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
        };
      case 'warning':
        return {
          bg: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
          icon: 'text-orange-600 dark:text-orange-400',
          badge: 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200'
        };
      case 'success':
        return {
          bg: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
          icon: 'text-green-600 dark:text-green-400',
          badge: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
        };
      default:
        return {
          bg: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
          icon: 'text-blue-600 dark:text-blue-400',
          badge: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
        };
    }
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const filteredAlerts = filter === 'all' ? alerts : alerts.filter(a => a.type === filter);
  const criticalCount = alerts.filter(a => a.type === 'critical').length;
  const warningCount = alerts.filter(a => a.type === 'warning').length;

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Mobile Header */}
      <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 py-2.5 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">Alerts</h2>
          </div>
          {(criticalCount > 0 || warningCount > 0) && (
            <div className="flex gap-1.5">
              {criticalCount > 0 && (
                <div className="bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
                  {criticalCount}
                </div>
              )}
              {warningCount > 0 && (
                <div className="bg-orange-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
                  {warningCount}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Alerts & Notifications</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">Critical alerts and operational notifications</p>
          </div>
          {(criticalCount > 0 || warningCount > 0) && (
            <div className="flex gap-3">
              {criticalCount > 0 && (
                <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-3 py-1.5 rounded-lg">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm font-semibold">{criticalCount} Critical</span>
                </div>
              )}
              {warningCount > 0 && (
                <div className="flex items-center gap-2 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-3 py-1.5 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-semibold">{warningCount} Warning</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Filter Tabs - Mobile Only */}
      <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 py-1.5 flex-shrink-0">
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
          {[
            { value: 'all', label: 'All', count: alerts.length },
            { value: 'critical', label: 'Critical', count: criticalCount },
            { value: 'warning', label: 'Warning', count: warningCount },
            { value: 'info', label: 'Info', count: alerts.filter(a => a.type === 'info').length }
          ].map(({ value, label, count }) => (
            <button
              key={value}
              onClick={() => setFilter(value as any)}
              className={`px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap transition-colors ${
                filter === value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              {label} {count > 0 && `(${count})`}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Filter Tabs */}
      <div className="hidden md:block bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex-shrink-0">
        <div className="flex gap-2 overflow-x-auto">
          {[
            { value: 'all', label: 'All', count: alerts.length },
            { value: 'critical', label: 'Critical', count: criticalCount },
            { value: 'warning', label: 'Warning', count: warningCount },
            { value: 'info', label: 'Info', count: alerts.filter(a => a.type === 'info').length },
            { value: 'success', label: 'Success', count: alerts.filter(a => a.type === 'success').length }
          ].map(({ value, label, count }) => (
            <button
              key={value}
              onClick={() => setFilter(value as any)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filter === value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {label} {count > 0 && `(${count})`}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        {filteredAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <Bell className="w-12 h-12 text-gray-400 dark:text-gray-600 mb-3" />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">No alerts</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">All clear</p>
          </div>
        ) : (
          <div className="md:p-4 md:space-y-3">
            {filteredAlerts.map(alert => {
              const styles = getAlertStyles(alert.type);
              return (
                <div
                  key={alert.id}
                  className={`md:border md:rounded-lg border-b border-gray-200 dark:border-gray-700 p-3 md:p-4 ${styles.bg} bg-white dark:bg-gray-800 md:transition-all md:hover:shadow-md`}
                >
                  <div className="flex items-start gap-2 md:gap-3">
                    <div className={`flex-shrink-0 ${styles.icon} md:block hidden`}>
                      {getAlertIcon(alert.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-xs md:text-sm font-bold text-gray-900 dark:text-gray-100">
                          {alert.title}
                        </h3>
                        <button
                          onClick={() => handleDismiss(alert.id)}
                          className="flex-shrink-0 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                          <X className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </button>
                      </div>

                      <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 mb-1.5 md:mb-2">
                        {alert.message}
                      </p>

                      <div className="flex items-center gap-1.5 md:gap-2 flex-wrap mb-1.5 md:mb-0">
                        <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${styles.badge}`}>
                          {alert.category}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-0.5">
                          <Clock className="w-3 h-3" />
                          {getTimeAgo(alert.timestamp)}
                        </span>
                      </div>

                      {alert.actionable && (
                        <button className="mt-1.5 md:mt-3 px-2.5 md:px-3 py-1 md:py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-semibold rounded md:rounded-lg transition-colors">
                          {alert.actionLabel}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Stats Bar - Desktop Only */}
      <div className="hidden md:block bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3 flex-shrink-0">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total</div>
            <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{alerts.length}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Critical</div>
            <div className="text-lg font-bold text-red-600 dark:text-red-400">{criticalCount}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Warning</div>
            <div className="text-lg font-bold text-orange-600 dark:text-orange-400">{warningCount}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Today</div>
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{alerts.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
