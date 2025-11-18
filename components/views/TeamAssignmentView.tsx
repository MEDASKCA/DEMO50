'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Users } from 'lucide-react';

interface TeamAssignmentViewProps {
  onBack?: () => void;
}

export default function TeamAssignmentView({ onBack }: TeamAssignmentViewProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-50 p-6">
      <Users className="w-16 h-16 text-teal-600 mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Team Assignment</h2>
      <p className="text-gray-600 text-center max-w-md mb-6">
        Assign and manage theatre teams
      </p>
      <button
        onClick={handleBack}
        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all"
      >
        Back to Dashboard
      </button>
    </div>
  );
}
