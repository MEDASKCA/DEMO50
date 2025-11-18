'use client';

import React, { useState } from 'react';
import {
  X,
  Bell,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  Coffee,
  Utensils,
  UserCheck,
  Shield,
  Award,
  Send,
  ChevronRight,
  Filter
} from 'lucide-react';

interface StaffReliefModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ReliefRequest {
  id: string;
  requestedBy: {
    name: string;
    role: string;
    theatre: string;
    currentShiftStart: string;
  };
  reason: string;
  duration: string;
  urgency: 'routine' | 'urgent' | 'emergency';
  requestedAt: string;
  status: 'pending' | 'acknowledged' | 'deployed';
  deployedStaff?: string;
}

interface StaffMember {
  id: string;
  name: string;
  role: string;
  theatre: string;
  shiftStart: string;
  shiftEnd: string;
  hoursWorked: number;
  teaBreaks: Array<{
    time: string;
    duration: string;
    authorizedBy: string;
    authorizedByRole: string;
  }>;
  lunchBreak?: {
    time: string;
    duration: string;
    authorizedBy: string;
  };
  supperBreak?: {
    time: string;
    duration: string;
    authorizedBy: string;
  };
  lunchEntitled: boolean;
  supperEntitled: boolean;
  breakStatus: 'no_break' | 'overdue' | 'taken';
}

interface AvailableStaff {
  id: string;
  name: string;
  role: string;
  currentLocation: string;
  breakStatus: 'not_taken' | 'taken' | 'overdue';
  lastBreak: string;
  competencies: string[];
  matchScore: number;
  estimatedArrival: string;
  reliefHistory: number;
}

export default function StaffReliefModal({ isOpen, onClose }: StaffReliefModalProps) {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [selectedStaffForRelief, setSelectedStaffForRelief] = useState<string | null>(null);
  const [breakFilter, setBreakFilter] = useState<'all' | 'no_break' | 'overdue' | 'taken'>('all');
  const [selectedStaffForBreak, setSelectedStaffForBreak] = useState<StaffMember | null>(null);
  const [expandedStaffCards, setExpandedStaffCards] = useState<Set<string>>(new Set());


  const toggleStaffCard = (staffId: string) => {
    setExpandedStaffCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(staffId)) {
        newSet.delete(staffId);
      } else {
        newSet.add(staffId);
      }
      return newSet;
    });
  };

  if (!isOpen) return null;

  // Mock relief requests from staff members
  const reliefRequests: ReliefRequest[] = [
    {
      id: '1',
      requestedBy: {
        name: 'S. Patel',
        role: 'Anaes N/P',
        theatre: 'Main Theatre 3',
        currentShiftStart: '08:00'
      },
      reason: 'Coffee/Rest Break',
      duration: '15 min',
      urgency: 'routine',
      requestedAt: '10:45',
      status: 'pending'
    },
    {
      id: '2',
      requestedBy: {
        name: 'RN M. Johnson',
        role: 'Scrub N/P',
        theatre: 'DSU Theatre 5',
        currentShiftStart: '08:00'
      },
      reason: 'Toilet Break',
      duration: '15 min',
      urgency: 'urgent',
      requestedAt: '11:02',
      status: 'pending'
    },
    {
      id: '3',
      requestedBy: {
        name: 'RN K. Thompson',
        role: 'Scrub N/P',
        theatre: 'Main Theatre 8',
        currentShiftStart: '08:00'
      },
      reason: 'Lunch Break',
      duration: '30 min',
      urgency: 'routine',
      requestedAt: '10:30',
      status: 'acknowledged',
      deployedStaff: 'RN A. Flores'
    }
  ];

  // Staff members with break tracking
  const staffMembers: StaffMember[] = [
    // Main Theatre 1
    { id: '1', name: 'L. O\'Brien', role: 'Anaes N/P', theatre: 'Main Theatre 1', shiftStart: '10:00', shiftEnd: '18:00', hoursWorked: 2.5, teaBreaks: [], lunchEntitled: false, supperEntitled: false, breakStatus: 'no_break' },
    { id: '2', name: 'RN A. Flores', role: 'Scrub N/P', theatre: 'Main Theatre 1', shiftStart: '08:00', shiftEnd: '20:00', hoursWorked: 4.5, teaBreaks: [{ time: '09:30', duration: '10 min', authorizedBy: 'J. Smith', authorizedByRole: 'Team Lead' }], lunchBreak: { time: '13:00', duration: '30 min', authorizedBy: 'Theatre Manager' }, lunchEntitled: true, supperEntitled: true, breakStatus: 'taken' },
    { id: '3', name: 'ODP D. Jordan', role: 'Scrub N/P', theatre: 'Main Theatre 1', shiftStart: '08:00', shiftEnd: '18:00', hoursWorked: 4.5, teaBreaks: [], lunchEntitled: true, supperEntitled: false, breakStatus: 'overdue' },
    { id: '4', name: 'T. Chikukwe', role: 'HCA', theatre: 'Main Theatre 1', shiftStart: '08:00', shiftEnd: '16:00', hoursWorked: 4.5, teaBreaks: [{ time: '10:15', duration: '15 min', authorizedBy: 'RN A. Flores', authorizedByRole: 'Team Lead' }], lunchEntitled: false, supperEntitled: false, breakStatus: 'no_break' },

    // Main Theatre 3
    { id: '5', name: 'H. Adams', role: 'Anaes N/P', theatre: 'Main Theatre 3', shiftStart: '08:00', shiftEnd: '16:00', hoursWorked: 4.5, teaBreaks: [], lunchEntitled: false, supperEntitled: false, breakStatus: 'no_break' },
    { id: '6', name: 'RN M. Garcia', role: 'Scrub N/P', theatre: 'Main Theatre 3', shiftStart: '08:00', shiftEnd: '20:00', hoursWorked: 4.5, teaBreaks: [], lunchBreak: { time: '12:30', duration: '30 min', authorizedBy: 'Theatre Manager' }, lunchEntitled: true, supperEntitled: true, breakStatus: 'taken' },
    { id: '7', name: 'RN L. Brown', role: 'Scrub N/P', theatre: 'Main Theatre 3', shiftStart: '08:00', shiftEnd: '18:00', hoursWorked: 4.5, teaBreaks: [{ time: '09:00', duration: '10 min', authorizedBy: 'R. Johnson', authorizedByRole: 'Team Lead' }], lunchEntitled: true, supperEntitled: false, breakStatus: 'overdue' },
    { id: '8', name: 'ODP K. White', role: 'Scrub N/P', theatre: 'Main Theatre 3', shiftStart: '10:00', shiftEnd: '20:00', hoursWorked: 2.5, teaBreaks: [], lunchEntitled: true, supperEntitled: false, breakStatus: 'no_break' },
    { id: '9', name: 'S. Ali', role: 'HCA', theatre: 'Main Theatre 3', shiftStart: '08:00', shiftEnd: '16:00', hoursWorked: 4.5, teaBreaks: [{ time: '08:45', duration: '10 min', authorizedBy: 'RN M. Garcia', authorizedByRole: 'Team Lead' }], lunchEntitled: false, supperEntitled: false, breakStatus: 'no_break' },

    // Main Theatre 4
    { id: '10', name: 'E. Cooper', role: 'Anaes N/P', theatre: 'Main Theatre 4', shiftStart: '08:00', shiftEnd: '18:00', hoursWorked: 4.5, teaBreaks: [], lunchEntitled: true, supperEntitled: false, breakStatus: 'overdue' },
    { id: '11', name: 'ODP F. Harrison', role: 'Scrub N/P', theatre: 'Main Theatre 4', shiftStart: '08:00', shiftEnd: '20:00', hoursWorked: 4.5, teaBreaks: [{ time: '09:15', duration: '10 min', authorizedBy: 'A. Robertson', authorizedByRole: 'Team Lead' }], lunchEntitled: true, supperEntitled: true, breakStatus: 'no_break' },
    { id: '12', name: 'RN G. Walker', role: 'Scrub N/P', theatre: 'Main Theatre 4', shiftStart: '08:00', shiftEnd: '18:00', hoursWorked: 4.5, teaBreaks: [], lunchEntitled: true, supperEntitled: false, breakStatus: 'no_break' },
    { id: '13', name: 'H. Green', role: 'HCA', theatre: 'Main Theatre 4', shiftStart: '08:00', shiftEnd: '16:00', hoursWorked: 4.5, teaBreaks: [{ time: '10:00', duration: '15 min', authorizedBy: 'RN G. Walker', authorizedByRole: 'Team Lead' }], lunchEntitled: false, supperEntitled: false, breakStatus: 'no_break' },

    // Main Theatre 5
    { id: '14', name: 'L. Hill', role: 'Anaes N/P', theatre: 'Main Theatre 5', shiftStart: '08:00', shiftEnd: '18:00', hoursWorked: 4.5, teaBreaks: [], lunchBreak: { time: '13:15', duration: '30 min', authorizedBy: 'Theatre Manager' }, lunchEntitled: true, supperEntitled: false, breakStatus: 'taken' },
    { id: '15', name: 'RN M. Scott', role: 'Scrub N/P', theatre: 'Main Theatre 5', shiftStart: '08:00', shiftEnd: '20:00', hoursWorked: 4.5, teaBreaks: [{ time: '09:45', duration: '10 min', authorizedBy: 'I. Moore', authorizedByRole: 'Team Lead' }], lunchEntitled: true, supperEntitled: true, breakStatus: 'overdue' },
    { id: '16', name: 'ODP N. Young', role: 'Scrub N/P', theatre: 'Main Theatre 5', shiftStart: '08:00', shiftEnd: '20:00', hoursWorked: 4.5, teaBreaks: [], lunchEntitled: true, supperEntitled: true, breakStatus: 'no_break' },
    { id: '17', name: 'O. King', role: 'HCA', theatre: 'Main Theatre 5', shiftStart: '08:00', shiftEnd: '20:00', hoursWorked: 4.5, teaBreaks: [{ time: '08:30', duration: '10 min', authorizedBy: 'RN M. Scott', authorizedByRole: 'Team Lead' }, { time: '11:00', duration: '10 min', authorizedBy: 'Theatre Manager', authorizedByRole: 'Manager' }], lunchBreak: { time: '14:00', duration: '30 min', authorizedBy: 'Theatre Manager' }, supperBreak: { time: '17:30', duration: '30 min', authorizedBy: 'Theatre Manager' }, lunchEntitled: true, supperEntitled: true, breakStatus: 'taken' },

    // Main Theatre 6
    { id: '18', name: 'S. Campbell', role: 'Anaes N/P', theatre: 'Main Theatre 6', shiftStart: '08:00', shiftEnd: '16:00', hoursWorked: 4.5, teaBreaks: [], lunchEntitled: false, supperEntitled: false, breakStatus: 'no_break' },
    { id: '19', name: 'RN T. Parker', role: 'Scrub N/P', theatre: 'Main Theatre 6', shiftStart: '08:00', shiftEnd: '18:00', hoursWorked: 4.5, teaBreaks: [{ time: '09:20', duration: '15 min', authorizedBy: 'P. Wright', authorizedByRole: 'Team Lead' }], lunchEntitled: true, supperEntitled: false, breakStatus: 'overdue' },
    { id: '20', name: 'ODP U. Evans', role: 'Scrub N/P', theatre: 'Main Theatre 6', shiftStart: '08:00', shiftEnd: '18:00', hoursWorked: 4.5, teaBreaks: [], lunchEntitled: true, supperEntitled: false, breakStatus: 'no_break' },

    // Main Theatre 7
    { id: '21', name: 'Y. Rogers', role: 'Anaes N/P', theatre: 'Main Theatre 7', shiftStart: '08:00', shiftEnd: '16:00', hoursWorked: 4.5, teaBreaks: [{ time: '10:30', duration: '10 min', authorizedBy: 'X. Morris', authorizedByRole: 'Team Lead' }], lunchEntitled: false, supperEntitled: false, breakStatus: 'no_break' },
    { id: '22', name: 'RN Z. Reed', role: 'Scrub N/P', theatre: 'Main Theatre 7', shiftStart: '08:00', shiftEnd: '20:00', hoursWorked: 4.5, teaBreaks: [], lunchEntitled: true, supperEntitled: true, breakStatus: 'overdue' },
    { id: '23', name: 'ODP A. Cook', role: 'Scrub N/P', theatre: 'Main Theatre 7', shiftStart: '08:00', shiftEnd: '18:00', hoursWorked: 4.5, teaBreaks: [], lunchBreak: { time: '12:00', duration: '30 min', authorizedBy: 'Theatre Manager' }, lunchEntitled: true, supperEntitled: false, breakStatus: 'taken' },

    // Main Theatre 8
    { id: '24', name: 'E. Bailey', role: 'Anaes N/P', theatre: 'Main Theatre 8', shiftStart: '08:00', shiftEnd: '18:00', hoursWorked: 4.5, teaBreaks: [], lunchEntitled: true, supperEntitled: false, breakStatus: 'no_break' },
    { id: '25', name: 'RN F. Rivera', role: 'Scrub N/P', theatre: 'Main Theatre 8', shiftStart: '08:00', shiftEnd: '18:00', hoursWorked: 4.5, teaBreaks: [{ time: '09:10', duration: '10 min', authorizedBy: 'B. Morgan', authorizedByRole: 'Team Lead' }], lunchEntitled: true, supperEntitled: false, breakStatus: 'overdue' },
    { id: '26', name: 'ODP G. Cooper', role: 'Scrub N/P', theatre: 'Main Theatre 8', shiftStart: '08:00', shiftEnd: '18:00', hoursWorked: 4.5, teaBreaks: [], lunchBreak: { time: '13:30', duration: '30 min', authorizedBy: 'Theatre Manager' }, lunchEntitled: true, supperEntitled: false, breakStatus: 'taken' },
    { id: '27', name: 'H. Ward', role: 'HCA', theatre: 'Main Theatre 8', shiftStart: '08:00', shiftEnd: '16:00', hoursWorked: 4.5, teaBreaks: [{ time: '10:45', duration: '10 min', authorizedBy: 'RN F. Rivera', authorizedByRole: 'Team Lead' }], lunchEntitled: false, supperEntitled: false, breakStatus: 'no_break' },

    // Main Theatre 10
    { id: '28', name: 'R. Price', role: 'Anaes N/P', theatre: 'Main Theatre 10', shiftStart: '08:00', shiftEnd: '18:00', hoursWorked: 4.5, teaBreaks: [], lunchEntitled: true, supperEntitled: false, breakStatus: 'no_break' },
    { id: '29', name: 'RN S. Bennett', role: 'Scrub N/P', theatre: 'Main Theatre 10', shiftStart: '08:00', shiftEnd: '20:00', hoursWorked: 4.5, teaBreaks: [{ time: '08:50', duration: '15 min', authorizedBy: 'O. Brooks', authorizedByRole: 'Team Lead' }], lunchEntitled: true, supperEntitled: true, breakStatus: 'overdue' },
    { id: '30', name: 'ODP T. Wood', role: 'Scrub N/P', theatre: 'Main Theatre 10', shiftStart: '08:00', shiftEnd: '20:00', hoursWorked: 4.5, teaBreaks: [], lunchBreak: { time: '12:15', duration: '30 min', authorizedBy: 'Theatre Manager' }, lunchEntitled: true, supperEntitled: true, breakStatus: 'taken' },
    { id: '31', name: 'RN U. Barnes', role: 'Scrub N/P', theatre: 'Main Theatre 10', shiftStart: '10:00', shiftEnd: '20:00', hoursWorked: 2.5, teaBreaks: [], lunchEntitled: true, supperEntitled: false, breakStatus: 'no_break' },

    // Main Theatre 11
    { id: '32', name: 'Y. Jenkins', role: 'Anaes N/P', theatre: 'Main Theatre 11', shiftStart: '08:00', shiftEnd: '18:00', hoursWorked: 4.5, teaBreaks: [{ time: '09:30', duration: '10 min', authorizedBy: 'V. Ross', authorizedByRole: 'Team Lead' }], lunchEntitled: true, supperEntitled: false, breakStatus: 'overdue' },
    { id: '33', name: 'Z. Perry', role: 'Anaes N/P', theatre: 'Main Theatre 11', shiftStart: '10:00', shiftEnd: '18:00', hoursWorked: 2.5, teaBreaks: [], lunchEntitled: false, supperEntitled: false, breakStatus: 'no_break' },
    { id: '34', name: 'RN A. Powell', role: 'Scrub N/P', theatre: 'Main Theatre 11', shiftStart: '08:00', shiftEnd: '18:00', hoursWorked: 4.5, teaBreaks: [], lunchBreak: { time: '13:45', duration: '30 min', authorizedBy: 'Theatre Manager' }, lunchEntitled: true, supperEntitled: false, breakStatus: 'taken' },
    { id: '35', name: 'ODP B. Long', role: 'Scrub N/P', theatre: 'Main Theatre 11', shiftStart: '08:00', shiftEnd: '18:00', hoursWorked: 4.5, teaBreaks: [], lunchEntitled: true, supperEntitled: false, breakStatus: 'no_break' },

    // Main Theatre 12
    { id: '36', name: 'F. Washington', role: 'Anaes N/P', theatre: 'Main Theatre 12', shiftStart: '08:00', shiftEnd: '18:00', hoursWorked: 4.5, teaBreaks: [], lunchEntitled: true, supperEntitled: false, breakStatus: 'overdue' },
    { id: '37', name: 'RN G. Butler', role: 'Scrub N/P', theatre: 'Main Theatre 12', shiftStart: '08:00', shiftEnd: '20:00', hoursWorked: 4.5, teaBreaks: [{ time: '10:15', duration: '10 min', authorizedBy: 'C. Patterson', authorizedByRole: 'Team Lead' }], lunchEntitled: true, supperEntitled: true, breakStatus: 'no_break' },
    { id: '38', name: 'ODP H. Simmons', role: 'Scrub N/P', theatre: 'Main Theatre 12', shiftStart: '08:00', shiftEnd: '18:00', hoursWorked: 4.5, teaBreaks: [], lunchBreak: { time: '12:45', duration: '30 min', authorizedBy: 'Theatre Manager' }, lunchEntitled: true, supperEntitled: false, breakStatus: 'taken' },

    // DSU Theatre 1
    { id: '39', name: 'L. Alexander', role: 'Anaes N/P', theatre: 'DSU Theatre 1', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [], lunchEntitled: true, supperEntitled: false, breakStatus: 'no_break' },
    { id: '40', name: 'RN M. Russell', role: 'Scrub N/P', theatre: 'DSU Theatre 1', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [{ time: '09:25', duration: '10 min', authorizedBy: 'I. Foster', authorizedByRole: 'Team Lead' }], lunchEntitled: true, supperEntitled: false, breakStatus: 'overdue' },
    { id: '41', name: 'ODP N. Griffin', role: 'Scrub N/P', theatre: 'DSU Theatre 1', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [], lunchBreak: { time: '13:00', duration: '30 min', authorizedBy: 'Theatre Manager' }, lunchEntitled: true, supperEntitled: false, breakStatus: 'taken' },
    { id: '42', name: 'O. Diaz', role: 'HCA', theatre: 'DSU Theatre 1', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [{ time: '10:30', duration: '10 min', authorizedBy: 'RN M. Russell', authorizedByRole: 'Team Lead' }], lunchEntitled: true, supperEntitled: false, breakStatus: 'no_break' },

    // DSU Theatre 2
    { id: '43', name: 'S. Hamilton', role: 'Anaes N/P', theatre: 'DSU Theatre 2', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [], lunchEntitled: true, supperEntitled: false, breakStatus: 'overdue' },
    { id: '44', name: 'ODP T. Graham', role: 'Scrub N/P', theatre: 'DSU Theatre 2', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [{ time: '09:05', duration: '15 min', authorizedBy: 'P. Hayes', authorizedByRole: 'Team Lead' }], lunchBreak: { time: '12:30', duration: '30 min', authorizedBy: 'Theatre Manager' }, lunchEntitled: true, supperEntitled: false, breakStatus: 'taken' },

    // DSU Theatre 3
    { id: '45', name: 'X. Owens', role: 'Anaes N/P', theatre: 'DSU Theatre 3', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [], lunchEntitled: true, supperEntitled: false, breakStatus: 'no_break' },
    { id: '46', name: 'RN Y. Reynolds', role: 'Scrub N/P', theatre: 'DSU Theatre 3', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [], lunchEntitled: true, supperEntitled: false, breakStatus: 'overdue' },
    { id: '47', name: 'ODP Z. Fisher', role: 'Scrub N/P', theatre: 'DSU Theatre 3', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [{ time: '10:00', duration: '10 min', authorizedBy: 'U. Sullivan', authorizedByRole: 'Team Lead' }], lunchEntitled: true, supperEntitled: false, breakStatus: 'no_break' },

    // DSU Theatre 4
    { id: '48', name: 'D. Payne', role: 'Anaes N/P', theatre: 'DSU Theatre 4', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [], lunchBreak: { time: '13:15', duration: '30 min', authorizedBy: 'Theatre Manager' }, lunchEntitled: true, supperEntitled: false, breakStatus: 'taken' },
    { id: '49', name: 'RN E. Hunter', role: 'Scrub N/P', theatre: 'DSU Theatre 4', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [{ time: '09:40', duration: '10 min', authorizedBy: 'A. Ellis', authorizedByRole: 'Team Lead' }], lunchEntitled: true, supperEntitled: false, breakStatus: 'overdue' },
    { id: '50', name: 'ODP F. Lawson', role: 'Scrub N/P', theatre: 'DSU Theatre 4', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [], lunchEntitled: true, supperEntitled: false, breakStatus: 'no_break' },
    { id: '51', name: 'RN G. Berry', role: 'Scrub N/P', theatre: 'DSU Theatre 4', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [], lunchBreak: { time: '12:00', duration: '30 min', authorizedBy: 'Theatre Manager' }, lunchEntitled: true, supperEntitled: false, breakStatus: 'taken' },

    // DSU Theatre 5
    { id: '52', name: 'K. Burns', role: 'Anaes N/P', theatre: 'DSU Theatre 5', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [], lunchEntitled: true, supperEntitled: false, breakStatus: 'overdue' },
    { id: '53', name: 'L. Stanley', role: 'Anaes N/P', theatre: 'DSU Theatre 5', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [{ time: '08:55', duration: '10 min', authorizedBy: 'H. Arnold', authorizedByRole: 'Team Lead' }], lunchEntitled: true, supperEntitled: false, breakStatus: 'no_break' },
    { id: '54', name: 'RN M. Webb', role: 'Scrub N/P', theatre: 'DSU Theatre 5', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [], lunchBreak: { time: '13:30', duration: '30 min', authorizedBy: 'Theatre Manager' }, lunchEntitled: true, supperEntitled: false, breakStatus: 'taken' },
    { id: '55', name: 'ODP N. Tucker', role: 'Scrub N/P', theatre: 'DSU Theatre 5', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [], lunchEntitled: true, supperEntitled: false, breakStatus: 'no_break' },

    // DSU Theatre 6
    { id: '56', name: 'R. Rice', role: 'Anaes N/P', theatre: 'DSU Theatre 6', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [], lunchEntitled: true, supperEntitled: false, breakStatus: 'overdue' },
    { id: '57', name: 'RN S. Black', role: 'Scrub N/P', theatre: 'DSU Theatre 6', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [{ time: '10:20', duration: '10 min', authorizedBy: 'O. Porter', authorizedByRole: 'Team Lead' }], lunchEntitled: true, supperEntitled: false, breakStatus: 'no_break' },
    { id: '58', name: 'ODP T. Mills', role: 'Scrub N/P', theatre: 'DSU Theatre 6', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [], lunchBreak: { time: '12:15', duration: '30 min', authorizedBy: 'Theatre Manager' }, lunchEntitled: true, supperEntitled: false, breakStatus: 'taken' },
    { id: '59', name: 'RN U. Grant', role: 'Scrub N/P', theatre: 'DSU Theatre 6', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [], lunchEntitled: true, supperEntitled: false, breakStatus: 'no_break' },
    { id: '60', name: 'V. West', role: 'HCA', theatre: 'DSU Theatre 6', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [{ time: '09:50', duration: '10 min', authorizedBy: 'RN S. Black', authorizedByRole: 'Team Lead' }], lunchEntitled: true, supperEntitled: false, breakStatus: 'overdue' },

    // DSU Theatre 7
    { id: '61', name: 'Z. Reyes', role: 'Anaes N/P', theatre: 'DSU Theatre 7', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [], lunchBreak: { time: '13:00', duration: '30 min', authorizedBy: 'Theatre Manager' }, lunchEntitled: true, supperEntitled: false, breakStatus: 'taken' },
    { id: '62', name: 'RN A. Little', role: 'Scrub N/P', theatre: 'DSU Theatre 7', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [{ time: '09:35', duration: '10 min', authorizedBy: 'W. Stone', authorizedByRole: 'Team Lead' }], lunchEntitled: true, supperEntitled: false, breakStatus: 'overdue' },
    { id: '63', name: 'ODP B. Fowler', role: 'Scrub N/P', theatre: 'DSU Theatre 7', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [], lunchEntitled: true, supperEntitled: false, breakStatus: 'no_break' },

    // DSU Theatre 8
    { id: '64', name: 'G. Holland', role: 'Anaes N/P', theatre: 'DSU Theatre 8', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [], lunchEntitled: true, supperEntitled: false, breakStatus: 'no_break' },
    { id: '65', name: 'RN H. Newman', role: 'Scrub N/P', theatre: 'DSU Theatre 8', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [], lunchBreak: { time: '12:45', duration: '30 min', authorizedBy: 'Theatre Manager' }, lunchEntitled: true, supperEntitled: false, breakStatus: 'taken' },
    { id: '66', name: 'ODP I. Barrett', role: 'Scrub N/P', theatre: 'DSU Theatre 8', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [{ time: '10:05', duration: '10 min', authorizedBy: 'D. Wells', authorizedByRole: 'Team Lead' }], lunchEntitled: true, supperEntitled: false, breakStatus: 'overdue' },

    // DSU Theatre 9
    { id: '67', name: 'M. Castillo', role: 'Anaes N/P', theatre: 'DSU Theatre 9', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [], lunchEntitled: true, supperEntitled: false, breakStatus: 'overdue' },
    { id: '68', name: 'RN N. Webb', role: 'Scrub N/P', theatre: 'DSU Theatre 9', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [{ time: '09:15', duration: '15 min', authorizedBy: 'J. Murray', authorizedByRole: 'Team Lead' }], lunchEntitled: true, supperEntitled: false, breakStatus: 'no_break' },
    { id: '69', name: 'ODP O. Duncan', role: 'Scrub N/P', theatre: 'DSU Theatre 9', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [], lunchBreak: { time: '12:30', duration: '30 min', authorizedBy: 'Theatre Manager' }, lunchEntitled: true, supperEntitled: false, breakStatus: 'taken' },
    { id: '70', name: 'RN P. Graves', role: 'Scrub N/P', theatre: 'DSU Theatre 9', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [], lunchEntitled: true, supperEntitled: false, breakStatus: 'no_break' },

    // DSU Theatre 10
    { id: '71', name: 'T. Kim', role: 'Anaes N/P', theatre: 'DSU Theatre 10', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [], lunchBreak: { time: '13:15', duration: '30 min', authorizedBy: 'Theatre Manager' }, lunchEntitled: true, supperEntitled: false, breakStatus: 'taken' },
    { id: '72', name: 'RN U. Mendoza', role: 'Scrub N/P', theatre: 'DSU Theatre 10', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [{ time: '09:00', duration: '10 min', authorizedBy: 'Q. Lynch', authorizedByRole: 'Team Lead' }], lunchEntitled: true, supperEntitled: false, breakStatus: 'overdue' },
    { id: '73', name: 'ODP V. Burke', role: 'Scrub N/P', theatre: 'DSU Theatre 10', shiftStart: '08:00', shiftEnd: '17:00', hoursWorked: 4.5, teaBreaks: [], lunchEntitled: true, supperEntitled: false, breakStatus: 'no_break' }
  ];

  // Filter staff based on break status
  const filteredStaff = staffMembers.filter(staff => {
    if (breakFilter === 'all') return true;
    return staff.breakStatus === breakFilter;
  });

  // Count staff by break status
  const breakCounts = {
    no_break: staffMembers.filter(s => s.breakStatus === 'no_break').length,
    overdue: staffMembers.filter(s => s.breakStatus === 'overdue').length,
    taken: staffMembers.filter(s => s.breakStatus === 'taken').length
  };

  // Available staff based on the selected request's role
  const getAvailableStaff = (requestRole: string): AvailableStaff[] => {
    if (requestRole === 'Anaes N/P') {
      return [
        {
          id: '1',
          name: 'ODP R. Thompson',
          role: 'Anaes N/P',
          currentLocation: 'Break Room',
          breakStatus: 'taken',
          lastBreak: '09:30',
          competencies: ['Orthopaedics', 'General', 'Emergency'],
          matchScore: 95,
          estimatedArrival: '2 min',
          reliefHistory: 3
        }
      ];
    } else if (requestRole === 'Scrub N/P') {
      return [
        {
          id: '3',
          name: 'RN A. Flores',
          role: 'Scrub N/P',
          currentLocation: 'Recovery',
          breakStatus: 'taken',
          lastBreak: '08:45',
          competencies: ['Orthopaedics', 'General', 'Vascular'],
          matchScore: 98,
          estimatedArrival: '3 min',
          reliefHistory: 2
        }
      ];
    }
    return [];
  };

  const selectedRequestData = reliefRequests.find(r => r.id === selectedRequest);
  const availableStaff = selectedRequestData ? getAvailableStaff(selectedRequestData.requestedBy.role) : [];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return 'bg-red-100 text-red-700 border-red-300';
      case 'urgent': return 'bg-orange-100 text-orange-700 border-orange-300';
      default: return 'bg-blue-100 text-blue-700 border-blue-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed': return 'bg-green-100 text-green-700';
      case 'acknowledged': return 'bg-blue-100 text-blue-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  const getBreakStatusColor = (status: string) => {
    switch (status) {
      case 'taken': return 'text-green-600 bg-green-50';
      case 'not_taken': return 'text-yellow-600 bg-yellow-50';
      case 'overdue': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const handleDeployStaff = () => {
    if (selectedStaffForRelief && selectedRequest) {
      const staff = availableStaff.find(s => s.id === selectedStaffForRelief);
      alert(`${staff?.name} has been deployed to relieve ${selectedRequestData?.requestedBy.name}. Status: Acknowledged.`);
      setSelectedRequest(null);
      setSelectedStaffForRelief(null);
    }
  };

  const handleSendForBreak = (staff: StaffMember, breakType: 'tea' | 'lunch' | 'supper') => {
    const breakLabel = breakType === 'tea' ? 'Tea Break' : breakType === 'lunch' ? 'Lunch Break' : 'Supper Break';
    alert(`Sending ${staff.name} for ${breakLabel}. Relief staff will be deployed.`);
    setSelectedStaffForBreak(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      <div className="bg-white w-full h-full overflow-hidden flex flex-col md:flex-row">
        {/* Left Panel - Relief Requests List */}
        <div className="w-1/4 sm:w-1/3 md:w-80 lg:w-96 bg-gray-50 border-r border-gray-200 flex flex-col flex-shrink-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white px-6 py-5 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-6 h-6" />
                <div>
                  <h2 className="text-lg font-bold">Relief Requests</h2>
                  <p className="text-blue-100 text-xs mt-1">Manage staff relief deployment</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-blue-800 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="p-4 bg-white border-b border-gray-200">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-yellow-50 rounded-lg p-2 border border-yellow-200">
                <p className="text-xs text-yellow-700">Pending</p>
                <p className="text-lg font-bold text-yellow-900">
                  {reliefRequests.filter(r => r.status === 'pending').length}
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-2 border border-blue-200">
                <p className="text-xs text-blue-700">Acknowledged</p>
                <p className="text-lg font-bold text-blue-900">
                  {reliefRequests.filter(r => r.status === 'acknowledged').length}
                </p>
              </div>
              <div className="bg-red-50 rounded-lg p-2 border border-red-200">
                <p className="text-xs text-red-700">Emergency</p>
                <p className="text-lg font-bold text-red-900">
                  {reliefRequests.filter(r => r.urgency === 'emergency').length}
                </p>
              </div>
            </div>
          </div>

          {/* Requests List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {reliefRequests.map((request) => (
              <div
                key={request.id}
                onClick={() => setSelectedRequest(request.id)}
                className={`bg-white rounded-lg border-2 p-3 cursor-pointer transition-all ${
                  selectedRequest === request.id
                    ? 'border-orange-500 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{request.requestedBy.name}</h4>
                    <p className="text-xs text-gray-600">{request.requestedBy.role} • {request.requestedBy.theatre}</p>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform ${selectedRequest === request.id ? 'text-orange-600 transform rotate-90' : 'text-gray-400'}`} />
                </div>

                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getUrgencyColor(request.urgency)}`}>
                    {request.urgency.toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(request.status)}`}>
                    {request.status === 'pending' ? 'Pending' : request.status === 'acknowledged' ? 'Acknowledged' : 'Deployed'}
                  </span>
                </div>

                <div className="text-xs text-gray-700 space-y-1">
                  <div className="flex items-center">
                    <Coffee className="w-3 h-3 mr-1 text-gray-400" />
                    <span className="font-medium">Reason:</span>
                    <span className="ml-1">{request.reason}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1 text-gray-400" />
                    <span className="font-medium">Duration:</span>
                    <span className="ml-1">{request.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1 text-gray-400" />
                    <span className="font-medium">Requested:</span>
                    <span className="ml-1">{request.requestedAt}</span>
                  </div>
                </div>

                {request.status === 'acknowledged' && request.deployedStaff && (
                  <div className="mt-2 bg-green-50 rounded p-2 text-xs text-green-800">
                    <CheckCircle className="w-3 h-3 inline mr-1" />
                    <span className="font-medium">Deployed: {request.deployedStaff}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Staff Break Overview or Deploy Staff */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedRequest ? (
            <>
              {/* Selected Request Header */}
              <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white px-6 py-5 border-b border-blue-800 flex-shrink-0">
                <h3 className="text-lg font-bold">Deploy Relief Staff</h3>
                <p className="text-blue-100 text-xs mt-1">
                  Relief for: {selectedRequestData?.requestedBy.name} ({selectedRequestData?.requestedBy.role}) - {selectedRequestData?.requestedBy.theatre}
                </p>
                <div className="mt-2 flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <Coffee className="w-4 h-4 mr-1" />
                    <span>{selectedRequestData?.reason}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{selectedRequestData?.duration}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getUrgencyColor(selectedRequestData?.urgency || 'routine')}`}>
                    {selectedRequestData?.urgency.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Available Staff List */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-gray-700">
                      Available Staff (Role: {selectedRequestData?.requestedBy.role})
                    </h4>
                    <span className="text-xs text-gray-500">
                      <Shield className="w-3 h-3 inline mr-1" />
                      Competency-verified matches
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {availableStaff.length > 0 ? (
                    availableStaff.map((staff) => (
                      <div
                        key={staff.id}
                        onClick={() => setSelectedStaffForRelief(staff.id)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedStaffForRelief === staff.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-semibold text-gray-900">{staff.name}</h4>
                              <span className="text-sm text-gray-600">({staff.role})</span>

                              {/* Match Score */}
                              <div className="flex items-center space-x-1">
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full ${getMatchScoreColor(staff.matchScore)}`}
                                    style={{ width: `${staff.matchScore}%` }}
                                  />
                                </div>
                                <span className="text-xs font-medium">{staff.matchScore}%</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-xs">
                              <div className="space-y-1">
                                <div className="flex items-center space-x-1">
                                  <User className="w-3 h-3 text-gray-400" />
                                  <span>Currently: {staff.currentLocation}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-3 h-3 text-gray-400" />
                                  <span>ETA: {staff.estimatedArrival}</span>
                                </div>
                              </div>

                              <div className="space-y-1">
                                <div className="flex items-center space-x-1">
                                  <Coffee className="w-3 h-3 text-gray-400" />
                                  <span className={`px-2 py-0.5 rounded text-xs ${getBreakStatusColor(staff.breakStatus)}`}>
                                    Break: {staff.lastBreak}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <UserCheck className="w-3 h-3 text-gray-400" />
                                  <span>Relieved {staff.reliefHistory}x today</span>
                                </div>
                              </div>
                            </div>

                            {/* Competencies */}
                            <div className="mt-2 flex flex-wrap gap-1">
                              {staff.competencies.map((comp) => (
                                <span key={comp} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                                  <Award className="w-3 h-3 inline mr-1" />
                                  {comp}
                                </span>
                              ))}
                            </div>
                          </div>

                          {selectedStaffForRelief === staff.id && (
                            <CheckCircle className="w-5 h-5 text-blue-600 ml-3" />
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <AlertCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                      <p>No available staff for this role</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    <AlertCircle className="w-3 h-3 inline mr-1" />
                    Deployment will be logged in audit trail
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedRequest(null);
                        setSelectedStaffForRelief(null);
                      }}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeployStaff}
                      disabled={!selectedStaffForRelief}
                      className={`px-6 py-2 rounded-lg font-medium flex items-center space-x-2 ${
                        selectedStaffForRelief
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <Send className="w-4 h-4" />
                      <span>Deploy Staff to Relieve</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Overview Header */}
              <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white px-6 py-5 border-b border-blue-800 flex-shrink-0">
                <h3 className="text-lg font-bold">Wellbeing Breaks</h3>
                <p className="text-blue-100 text-xs mt-1">
                  Lunch (30 min) for 9+ hour shifts • Supper (30 min) for 11+ hour shifts
                </p>
              </div>

              {/* Filter Buttons */}
              <div className="bg-white border-b border-gray-200 p-3 flex-shrink-0">
                <div className="flex items-center space-x-2 flex-wrap">
                  <Filter className="w-3 h-3 text-gray-500" />
                  <span className="text-xs font-medium text-gray-700">Filter:</span>
                  <button
                    onClick={() => setBreakFilter('all')}
                    className={`px-2 py-1 rounded text-[10px] font-medium transition-all ${
                      breakFilter === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Staff ({staffMembers.length})
                  </button>
                  <button
                    onClick={() => setBreakFilter('no_break')}
                    className={`px-2 py-1 rounded text-[10px] font-medium transition-all ${
                      breakFilter === 'no_break'
                        ? 'bg-red-600 text-white'
                        : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
                    }`}
                  >
                    No Break ({breakCounts.no_break})
                  </button>
                  <button
                    onClick={() => setBreakFilter('overdue')}
                    className={`px-2 py-1 rounded text-[10px] font-medium transition-all ${
                      breakFilter === 'overdue'
                        ? 'bg-orange-600 text-white'
                        : 'bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100'
                    }`}
                  >
                    Overdue ({breakCounts.overdue})
                  </button>
                  <button
                    onClick={() => setBreakFilter('taken')}
                    className={`px-2 py-1 rounded text-[10px] font-medium transition-all ${
                      breakFilter === 'taken'
                        ? 'bg-green-600 text-white'
                        : 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                    }`}
                  >
                    Break Taken ({breakCounts.taken})
                  </button>
                </div>
              </div>

              {/* Staff Grid - 6 columns */}
              <div className="flex-1 overflow-y-auto overflow-x-auto p-4">
                <div className="grid grid-cols-6 gap-3 min-w-[1800px] lg:min-w-full">
                  {filteredStaff.map((staff) => (
                    <div
                      key={staff.id}
                      className="bg-white rounded-lg border-2 border-gray-200 p-3 cursor-pointer hover:border-gray-300 transition-all min-w-[250px]"
                    >
                      {/* Staff Info */}
                      <div className="mb-3">
                        <h4 className="font-semibold text-gray-900 text-sm mb-1 break-words">{staff.name}</h4>
                        <p className="text-xs text-gray-600 break-words">{staff.role}</p>
                        <p className="text-xs text-gray-500 break-words">{staff.theatre}</p>
                      </div>

                      {/* Break Buttons */}
                      <div className="space-y-2">
                        {/* Tea Button */}
                        <button
                          onClick={() => handleSendForBreak(staff, 'tea')}
                          className={`w-full px-2 py-1.5 rounded text-xs font-medium transition-all ${
                            staff.teaBreaks.length > 0
                              ? 'bg-blue-100 text-blue-700 border border-blue-300'
                              : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-blue-50 hover:border-blue-200'
                          }`}
                        >
                          Tea {staff.teaBreaks.length > 0 && `(${staff.teaBreaks.length}✓)`}
                        </button>
                        {staff.teaBreaks.length > 0 && (
                          <div className="text-xs text-blue-600 space-y-0.5">
                            {staff.teaBreaks.map((tb, idx) => (
                              <div key={idx}>✓ {tb.time}</div>
                            ))}
                          </div>
                        )}

                        {/* Lunch Button */}
                        {staff.lunchEntitled && (
                          <>
                            <button
                              onClick={() => !staff.lunchBreak && handleSendForBreak(staff, 'lunch')}
                              disabled={!!staff.lunchBreak}
                              className={`w-full px-2 py-1.5 rounded text-xs font-medium transition-all ${
                                staff.lunchBreak
                                  ? 'bg-green-100 text-green-700 border border-green-300 cursor-default'
                                  : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-green-50 hover:border-green-200'
                              }`}
                            >
                              Lunch {staff.lunchBreak && '✓'}
                            </button>
                            {staff.lunchBreak && (
                              <div className="text-xs text-green-600">✓ {staff.lunchBreak.time}</div>
                            )}
                          </>
                        )}

                        {/* Supper Button */}
                        {staff.supperEntitled && (
                          <>
                            <button
                              onClick={() => !staff.supperBreak && handleSendForBreak(staff, 'supper')}
                              disabled={!!staff.supperBreak}
                              className={`w-full px-2 py-1.5 rounded text-xs font-medium transition-all ${
                                staff.supperBreak
                                  ? 'bg-purple-100 text-purple-700 border border-purple-300 cursor-default'
                                  : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-purple-50 hover:border-purple-200'
                              }`}
                            >
                              Supper {staff.supperBreak && '✓'}
                            </button>
                            {staff.supperBreak && (
                              <div className="text-xs text-purple-600">✓ {staff.supperBreak.time}</div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Note */}
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="text-xs text-gray-600">
                  <AlertCircle className="w-3 h-3 inline mr-1" />
                  <span className="font-medium">Policy:</span> Lunch break for 9+ hour shifts (08:00-18:00).
                  Supper break for 11+ hour shifts (08:00-20:00). Tea breaks are discretionary.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
