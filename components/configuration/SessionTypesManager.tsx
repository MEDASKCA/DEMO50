'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Check, X, Loader2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc, query, where } from 'firebase/firestore';
import { useHospital } from '@/lib/hospitalContext';

interface SessionType {
  id: string;
  name: string;
  abbreviation: string;
  displayAs: string; // What to show in allocation view (e.g., "x2", "AM", "PM")
  startTime?: string;
  endTime?: string;
  duration?: number; // in minutes
  color?: string;
  description?: string;
}

export default function SessionTypesManager() {
  const { currentHospital } = useHospital();
  const [sessionTypes, setSessionTypes] = useState<SessionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [newAbbr, setNewAbbr] = useState('');
  const [newSessions, setNewSessions] = useState<number | ''>('');
  const [newStartTime, setNewStartTime] = useState('');
  const [newEndTime, setNewEndTime] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [editingAbbr, setEditingAbbr] = useState('');
  const [editingSessions, setEditingSessions] = useState<number | ''>('');
  const [editingStartTime, setEditingStartTime] = useState('');
  const [editingEndTime, setEditingEndTime] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (currentHospital) {
      loadSessionTypes();
    }
  }, [currentHospital]);

  const loadSessionTypes = async () => {
    if (!currentHospital) return;

    setLoading(true);
    try {
      const q = query(collection(db, 'sessionTypes'), where('hospitalId', '==', currentHospital.id));
      const snapshot = await getDocs(q);
      const loadedTypes: SessionType[] = [];

      snapshot.forEach(doc => {
        const data = doc.data();
        loadedTypes.push({
          id: doc.id,
          name: data.name,
          abbreviation: data.abbreviation || data.name.substring(0, 10).toUpperCase(),
          displayAs: data.displayAs || data.abbreviation || data.name.substring(0, 10).toUpperCase(),
          startTime: data.startTime,
          endTime: data.endTime,
          duration: data.duration,
          color: data.color,
          description: data.description
        });
      });

      // Sort alphabetically
      loadedTypes.sort((a, b) => a.name.localeCompare(b.name));
      setSessionTypes(loadedTypes);
    } catch (error) {
      console.error('Error loading session types:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!newName.trim()) return;
    if (!currentHospital) {
      alert('No hospital selected. Please select a hospital first.');
      return;
    }

    const abbr = newAbbr.trim() || newName.trim().substring(0, 10).toUpperCase();
    const display = newSessions ? `x${newSessions}` : abbr;

    if (abbr.length > 10) {
      alert('Abbreviation must be 10 characters or less');
      return;
    }

    setSaving(true);
    try {
      const id = `${currentHospital.id}-${newName
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')}`;

      await setDoc(doc(db, 'sessionTypes', id), {
        hospitalId: currentHospital.id,
        name: newName.trim(),
        abbreviation: abbr,
        displayAs: display,
        startTime: newStartTime.trim() || undefined,
        endTime: newEndTime.trim() || undefined
      });

      setNewName('');
      setNewAbbr('');
      setNewSessions('');
      setNewStartTime('');
      setNewEndTime('');
      await loadSessionTypes();
    } catch (error) {
      console.error('Error adding session type:', error);
      alert('Error adding session type. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleStartEdit = (sessionType: SessionType) => {
    setEditingId(sessionType.id);
    setEditingName(sessionType.name);
    setEditingAbbr(sessionType.abbreviation);
    // Parse displayAs - if it starts with "x" followed by a number, extract the number
    const displayAs = sessionType.displayAs;
    if (displayAs.startsWith('x') && !isNaN(Number(displayAs.substring(1)))) {
      setEditingSessions(Number(displayAs.substring(1)));
    } else {
      setEditingSessions('');
    }
    setEditingStartTime(sessionType.startTime || '');
    setEditingEndTime(sessionType.endTime || '');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName('');
    setEditingAbbr('');
    setEditingSessions('');
    setEditingStartTime('');
    setEditingEndTime('');
  };

  const handleSaveEdit = async () => {
    if (!editingId || !editingName.trim()) return;
    if (!currentHospital) return;

    if (editingAbbr.length > 10) {
      alert('Abbreviation must be 10 characters or less');
      return;
    }

    const abbr = editingAbbr.trim() || editingName.trim().substring(0, 10).toUpperCase();
    const display = editingSessions ? `x${editingSessions}` : abbr;

    setSaving(true);
    try {
      const sessionType = sessionTypes.find(s => s.id === editingId);
      await setDoc(doc(db, 'sessionTypes', editingId), {
        hospitalId: currentHospital.id,
        name: editingName.trim(),
        abbreviation: abbr,
        displayAs: display,
        startTime: editingStartTime.trim() || undefined,
        endTime: editingEndTime.trim() || undefined,
        duration: sessionType?.duration,
        color: sessionType?.color,
        description: sessionType?.description
      });

      setEditingId(null);
      setEditingName('');
      setEditingAbbr('');
      setEditingSessions('');
      setEditingStartTime('');
      setEditingEndTime('');
      await loadSessionTypes();
    } catch (error) {
      console.error('Error updating session type:', error);
      alert('Error updating session type. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?\n\nThis cannot be undone.`)) {
      return;
    }

    setSaving(true);
    try {
      await deleteDoc(doc(db, 'sessionTypes', id));
      await loadSessionTypes();
    } catch (error) {
      console.error('Error deleting session type:', error);
      alert('Error deleting session type. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-cyan-600" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Add New Session Type */}
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex-1 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAdd();
              }
            }}
            placeholder="e.g., All Day..."
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            disabled={saving}
          />
          <input
            type="text"
            value={newAbbr}
            onChange={(e) => setNewAbbr(e.target.value.substring(0, 10))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAdd();
              }
            }}
            placeholder="Abbr (10 max)"
            maxLength={10}
            className="w-full sm:w-32 px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 uppercase"
            disabled={saving}
          />
          <div className="w-full sm:w-24">
            <label className="block text-xs text-gray-600 mb-1">Sessions</label>
            <input
              type="number"
              value={newSessions}
              onChange={(e) => setNewSessions(e.target.value === '' ? '' : Number(e.target.value))}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAdd();
                }
              }}
              placeholder="1-3"
              min="1"
              max="3"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              disabled={saving}
            />
          </div>
          <div className="w-full sm:w-32">
            <label className="block text-xs text-gray-600 mb-1">Start</label>
            <input
              type="time"
              value={newStartTime}
              onChange={(e) => setNewStartTime(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAdd();
                }
              }}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              disabled={saving}
            />
          </div>
          <div className="w-full sm:w-32">
            <label className="block text-xs text-gray-600 mb-1">End</label>
            <input
              type="time"
              value={newEndTime}
              onChange={(e) => setNewEndTime(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAdd();
                }
              }}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              disabled={saving}
            />
          </div>
        </div>
        <button
          onClick={handleAdd}
          disabled={!newName.trim() || saving}
          className="w-full md:w-auto p-2 text-sm font-medium bg-teal-600 text-white rounded shadow-sm hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          title="Add session type"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
        </button>
      </div>

      {/* Session Types List */}
      {sessionTypes.length === 0 ? (
        <div className="text-center py-8 text-gray-500 text-sm">
          No session types defined yet. Add your first session type above.
        </div>
      ) : (
        <div className="space-y-2">
          {sessionTypes.map((sessionType) => (
            <div key={sessionType.id} className="border border-gray-300 rounded overflow-hidden">
              {editingId === sessionType.id ? (
                <div className="bg-white p-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleSaveEdit();
                          } else if (e.key === 'Escape') {
                            handleCancelEdit();
                          }
                        }}
                        placeholder="Full name"
                        className="flex-1 px-3 py-2 text-sm border border-cyan-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        autoFocus
                        disabled={saving}
                      />
                      <input
                        type="text"
                        value={editingAbbr}
                        onChange={(e) => setEditingAbbr(e.target.value.substring(0, 10))}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleSaveEdit();
                          } else if (e.key === 'Escape') {
                            handleCancelEdit();
                          }
                        }}
                        placeholder="Abbr"
                        maxLength={10}
                        className="w-full sm:w-28 px-3 py-2 text-sm border border-cyan-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 uppercase"
                        disabled={saving}
                      />
                      <div className="w-full sm:w-24">
                        <label className="block text-xs text-gray-600 mb-1">Sessions</label>
                        <input
                          type="number"
                          value={editingSessions}
                          onChange={(e) => setEditingSessions(e.target.value === '' ? '' : Number(e.target.value))}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSaveEdit();
                            } else if (e.key === 'Escape') {
                              handleCancelEdit();
                            }
                          }}
                          placeholder="1-3"
                          min="1"
                          max="3"
                          className="w-full px-3 py-2 text-sm border border-cyan-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                          disabled={saving}
                        />
                      </div>
                      <div className="w-full sm:w-28">
                        <label className="block text-xs text-gray-600 mb-1">Start</label>
                        <input
                          type="time"
                          value={editingStartTime}
                          onChange={(e) => setEditingStartTime(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSaveEdit();
                            } else if (e.key === 'Escape') {
                              handleCancelEdit();
                            }
                          }}
                          className="w-full px-3 py-2 text-sm border border-cyan-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                          disabled={saving}
                        />
                      </div>
                      <div className="w-full sm:w-28">
                        <label className="block text-xs text-gray-600 mb-1">End</label>
                        <input
                          type="time"
                          value={editingEndTime}
                          onChange={(e) => setEditingEndTime(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSaveEdit();
                            } else if (e.key === 'Escape') {
                              handleCancelEdit();
                            }
                          }}
                          className="w-full px-3 py-2 text-sm border border-cyan-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                          disabled={saving}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveEdit}
                        disabled={!editingName.trim() || saving}
                        className="flex-1 px-3 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-1"
                      >
                        <Check className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        disabled={saving}
                        className="flex-1 px-3 py-2 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-1"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white hover:bg-gray-50 transition-colors p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-sm font-medium text-gray-900 truncate">{sessionType.name}</span>
                    <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded flex-shrink-0">
                      {sessionType.abbreviation}
                    </span>
                    <span className="text-xs text-purple-600 bg-purple-100 px-2 py-0.5 rounded flex-shrink-0 font-mono">
                      {sessionType.displayAs}
                    </span>
                    {sessionType.startTime && sessionType.endTime && (
                      <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded flex-shrink-0 font-mono">
                        {sessionType.startTime} - {sessionType.endTime}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleStartEdit(sessionType)}
                      disabled={saving}
                      className="p-1.5 text-cyan-600 hover:bg-cyan-50 rounded transition-colors disabled:opacity-50"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(sessionType.id, sessionType.name)}
                      disabled={saving}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <p className="text-[10px] text-gray-500 mt-2">
        Total session types: {sessionTypes.length}
      </p>
    </div>
  );
}
