'use client';

import React, { useState } from 'react';
import { RemovalRequest } from '@/lib/surgicalCompetencyData';

interface RemovalRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemType: 'procedure' | 'equipment';
  itemName: string;
  itemId: string;
  onSubmit: (request: Omit<RemovalRequest, 'id' | 'requestDate' | 'status'>) => void;
  userRole: string;
  userName: string;
}

const REMOVAL_REASONS = [
  'No longer used in our trust',
  'Replaced by newer equipment/technique',
  'Duplicate entry',
  'Incorrect/outdated information',
  'Not relevant to my role',
  'Other (please specify)'
];

export default function RemovalRequestModal({
  isOpen,
  onClose,
  itemType,
  itemName,
  itemId,
  onSubmit,
  userRole,
  userName
}: RemovalRequestModalProps) {
  const [selectedReason, setSelectedReason] = useState('');
  const [detailedReason, setDetailedReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!selectedReason) {
      alert('Please select a reason for removal');
      return;
    }

    if (selectedReason === 'Other (please specify)' && !detailedReason.trim()) {
      alert('Please provide detailed reason');
      return;
    }

    setIsSubmitting(true);

    const request: Omit<RemovalRequest, 'id' | 'requestDate' | 'status'> = {
      itemId,
      itemName,
      itemType,
      requestedBy: userName,
      requestedByRole: userRole,
      reason: selectedReason,
      detailedReason: selectedReason === 'Other (please specify)' ? detailedReason : undefined
    };

    await onSubmit(request);

    setIsSubmitting(false);
    setSelectedReason('');
    setDetailedReason('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Request {itemType === 'procedure' ? 'Procedure' : 'Equipment'} Removal
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Item Info */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">
              {itemType === 'procedure' ? 'Procedure' : 'Equipment'} to remove:
            </div>
            <div className="text-lg font-semibold text-gray-900">{itemName}</div>
          </div>

          {/* Warning */}
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <div className="font-semibold text-yellow-900 mb-1">Important</div>
                <div className="text-sm text-yellow-800">
                  This request will be reviewed by administrators. The {itemType} will only be removed if approved.
                  This helps maintain data quality across the system.
                </div>
              </div>
            </div>
          </div>

          {/* Reason Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Why should this {itemType} be removed? *
            </label>
            <div className="space-y-2">
              {REMOVAL_REASONS.map((reason) => (
                <label
                  key={reason}
                  className={`
                    flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all
                    ${selectedReason === reason
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="reason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{reason}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Detailed Reason (if "Other" selected) */}
          {selectedReason === 'Other (please specify)' && (
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Please provide detailed reason *
              </label>
              <textarea
                value={detailedReason}
                onChange={(e) => setDetailedReason(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Explain why this should be removed..."
              />
            </div>
          )}

          {/* Additional Information */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-sm text-blue-900">
              <div className="font-semibold mb-2">What happens next?</div>
              <ul className="list-disc list-inside space-y-1 text-blue-800">
                <li>Your request will be submitted to administrators for review</li>
                <li>You'll be notified when a decision is made</li>
                <li>If approved, the {itemType} will be removed from the global list</li>
                <li>If rejected, you'll receive an explanation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !selectedReason}
            className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Removal Request'}
          </button>
        </div>
      </div>
    </div>
  );
}
