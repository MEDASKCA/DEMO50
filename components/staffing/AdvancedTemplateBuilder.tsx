'use client';

import React, { useState, useEffect } from 'react';
import {
  Plus,
  Trash2,
  Save,
  Download,
  Upload,
  Copy,
  Grid3x3,
  Type,
  Palette,
  Settings,
  Eye,
  Edit3,
  FolderOpen,
  Move,
  Maximize2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  ChevronDown,
  Undo2,
  Redo2
} from 'lucide-react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useHospital } from '@/lib/hospitalContext';

// System-provided data fields
const SYSTEM_FIELDS = [
  // Theatre Information
  { id: 'theatreName', value: '{{theatreName}}', label: 'Theatre Name', category: 'Theatre', type: 'text' },
  { id: 'unitLocation', value: '{{unitLocation}}', label: 'Unit Location', category: 'Theatre', type: 'text' },
  { id: 'unitName', value: '{{unitName}}', label: 'Unit Name', category: 'Theatre', type: 'text' },
  { id: 'specialty', value: '{{specialty}}', label: 'Specialty', category: 'Theatre', type: 'text' },
  { id: 'subspecialty', value: '{{subspecialty}}', label: 'Subspecialty', category: 'Theatre', type: 'text' },

  // Session Information
  { id: 'sessionType', value: '{{sessionType}}', label: 'Session Type', category: 'Session', type: 'text' },
  { id: 'sessionStart', value: '{{sessionStart}}', label: 'Session Start Time', category: 'Session', type: 'text' },
  { id: 'sessionEnd', value: '{{sessionEnd}}', label: 'Session End Time', category: 'Session', type: 'text' },

  // Date/Time
  { id: 'date', value: '{{date}}', label: 'Date', category: 'General', type: 'date' },
  { id: 'dayOfWeek', value: '{{dayOfWeek}}', label: 'Day of Week', category: 'General', type: 'text' },

  // Staff Information
  { id: 'staffName', value: '{{staffName}}', label: 'Staff Name', category: 'Staff', type: 'text' },
  { id: 'staffRole', value: '{{staffRole}}', label: 'Staff Role', category: 'Staff', type: 'text' },
  { id: 'staffBand', value: '{{staffBand}}', label: 'Staff Band', category: 'Staff', type: 'text' },
  { id: 'shiftPattern', value: '{{shiftPattern}}', label: 'Shift Pattern', category: 'Staff', type: 'text' },
  { id: 'shiftStart', value: '{{shiftStart}}', label: 'Shift Start', category: 'Staff', type: 'text' },
  { id: 'shiftEnd', value: '{{shiftEnd}}', label: 'Shift End', category: 'Staff', type: 'text' },

  // Coordinator
  { id: 'coordinator', value: '{{coordinator}}', label: 'Coordinator Name', category: 'Staff', type: 'text' },
  { id: 'coordinatorRole', value: '{{coordinatorRole}}', label: 'Coordinator Role', category: 'Staff', type: 'text' },

  // Roles (for role requirements)
  { id: 'roleName', value: '{{roleName}}', label: 'Role Name', category: 'Roles', type: 'text' },
  { id: 'roleQuantity', value: '{{roleQuantity}}', label: 'Role Quantity', category: 'Roles', type: 'number' },

  // Hospital/Organization
  { id: 'hospitalName', value: '{{hospitalName}}', label: 'Hospital Name', category: 'General', type: 'text' }
];

// Custom field definition
interface CustomField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'dropdown' | 'checkbox' | 'formula';
  category: string;
  defaultValue?: string;
  options?: string[]; // For dropdown
  formula?: string; // For calculated fields
}

// Font families available
const FONT_FAMILIES = [
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Courier New',
  'Georgia',
  'Verdana',
  'Trebuchet MS',
  'Comic Sans MS',
  'Impact',
  'Roboto',
  'Open Sans'
];

// Color palette for quick selection
const COLOR_PALETTE = [
  { name: 'White', value: '#FFFFFF' },
  { name: 'Light Gray', value: '#F3F4F6' },
  { name: 'Gray', value: '#9CA3AF' },
  { name: 'Dark Gray', value: '#4B5563' },
  { name: 'Black', value: '#000000' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Orange', value: '#F97316' },
  { name: 'Yellow', value: '#FBBF24' },
  { name: 'Green', value: '#10B981' },
  { name: 'Teal', value: '#14B8A6' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Indigo', value: '#6366F1' },
  { name: 'Purple', value: '#A855F7' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Light Red', value: '#FEE2E2' },
  { name: 'Light Orange', value: '#FED7AA' },
  { name: 'Light Yellow', value: '#FEF3C7' },
  { name: 'Light Green', value: '#D1FAE5' },
  { name: 'Light Teal', value: '#CCFBF1' },
  { name: 'Light Blue', value: '#DBEAFE' },
  { name: 'Light Indigo', value: '#E0E7FF' },
  { name: 'Light Purple', value: '#F3E8FF' },
  { name: 'Light Pink', value: '#FCE7F3' },
];

// Cell types
type CellType = 'header' | 'data' | 'static' | 'merged';

// Cell styling
interface CellStyle {
  backgroundColor?: string;
  textColor?: string;
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
  fontSize?: number;
  fontFamily?: string;
  textAlign?: 'left' | 'center' | 'right';
  borderColor?: string;
  borderWidth?: number;
  padding?: number;
  verticalAlign?: 'top' | 'middle' | 'bottom';
}

// Cell configuration
interface TemplateCell {
  id: string;
  row: number;
  col: number;
  rowSpan: number;
  colSpan: number;
  type: CellType;
  content: string; // Can include {{variables}}
  dataBinding?: string; // Direct data field binding
  style: CellStyle;
  width?: number; // Pixel width
  height?: number; // Pixel height
}

// Template configuration
interface StaffingTemplateConfig {
  id?: string;
  name: string;
  description?: string;
  rows: number;
  cols: number;
  cells: TemplateCell[];
  customFields: CustomField[]; // User-defined fields
  defaultCellWidth: number;
  defaultCellHeight: number;
  columnWidths?: number[]; // Width for each column
  rowHeights?: number[]; // Height for each row
  pageSize?: 'A4' | 'A3' | 'Letter' | 'Legal' | 'Tabloid';
  orientation?: 'portrait' | 'landscape';
  createdAt?: string;
  updatedAt?: string;
}

export default function AdvancedTemplateBuilder() {
  const { currentHospital } = useHospital();
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');
  const [templates, setTemplates] = useState<StaffingTemplateConfig[]>([]);
  const [currentTemplate, setCurrentTemplate] = useState<StaffingTemplateConfig>({
    name: 'New Template',
    rows: 10,
    cols: 3,
    cells: [],
    customFields: [],
    defaultCellWidth: 200,
    defaultCellHeight: 42,
    pageSize: 'A4',
    orientation: 'landscape'
  });

  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<{ row: number; col: number } | null>(null);
  const [isSelectingRows, setIsSelectingRows] = useState(false);
  const [isSelectingColumns, setIsSelectingColumns] = useState(false);
  const [rowSelectionStart, setRowSelectionStart] = useState<number | null>(null);
  const [columnSelectionStart, setColumnSelectionStart] = useState<number | null>(null);
  const [selectionUpdateQueued, setSelectionUpdateQueued] = useState(false);
  const [clipboard, setClipboard] = useState<{cells: TemplateCell[], isCut: boolean} | null>(null);
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false);
  const [showStylePanel, setShowStylePanel] = useState(false);
  const [showFieldsPanel, setShowFieldsPanel] = useState(false);
  const [showPageSetup, setShowPageSetup] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [resizingCell, setResizingCell] = useState<{ cellId: string; direction: 'width' | 'height'; startX: number; startY: number; startWidth: number; startHeight: number } | null>(null);
  const [resizingColumn, setResizingColumn] = useState<{ colIndex: number; startX: number; startWidth: number } | null>(null);
  const [resizingRow, setResizingRow] = useState<{ rowIndex: number; startY: number; startHeight: number } | null>(null);

  // Undo/Redo history
  const [history, setHistory] = useState<StaffingTemplateConfig[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Load saved templates
  useEffect(() => {
    if (currentHospital) {
      loadTemplates();
    }
  }, [currentHospital]);

  // Initialize default grid
  useEffect(() => {
    if (currentTemplate.cells.length === 0) {
      initializeGrid();
    }
  }, []);

  // Handle resize mouse events
  useEffect(() => {
    if (!resizingCell) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!resizingCell) return;

      const deltaX = e.clientX - resizingCell.startX;
      const deltaY = e.clientY - resizingCell.startY;

      const cell = currentTemplate.cells.find(c => c.id === resizingCell.cellId);
      if (!cell) return;

      if (resizingCell.direction === 'width') {
        const newWidth = Math.max(50, resizingCell.startWidth + deltaX);
        updateCell(resizingCell.cellId, { width: newWidth }, true); // Skip history during resize
      } else {
        const newHeight = Math.max(30, resizingCell.startHeight + deltaY);
        updateCell(resizingCell.cellId, { height: newHeight }, true); // Skip history during resize
      }
    };

    const handleMouseUp = () => {
      setResizingCell(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizingCell]);

  // Handle column resize
  useEffect(() => {
    if (!resizingColumn) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!resizingColumn) return;

      const deltaX = e.clientX - resizingColumn.startX;
      const newWidth = Math.max(50, resizingColumn.startWidth + deltaX);

      const newColumnWidths = [...(currentTemplate.columnWidths || Array(currentTemplate.cols).fill(currentTemplate.defaultCellWidth))];
      newColumnWidths[resizingColumn.colIndex] = newWidth;

      setCurrentTemplate({ ...currentTemplate, columnWidths: newColumnWidths });
    };

    const handleMouseUp = () => {
      setResizingColumn(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizingColumn]);

  // Handle row resize
  useEffect(() => {
    if (!resizingRow) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!resizingRow) return;

      const deltaY = e.clientY - resizingRow.startY;
      const newHeight = Math.max(30, resizingRow.startHeight + deltaY);

      const newRowHeights = [...(currentTemplate.rowHeights || Array(currentTemplate.rows).fill(currentTemplate.defaultCellHeight))];
      newRowHeights[resizingRow.rowIndex] = newHeight;

      setCurrentTemplate({ ...currentTemplate, rowHeights: newRowHeights });
    };

    const handleMouseUp = () => {
      setResizingRow(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizingRow]);

  const loadTemplates = async () => {
    try {
      const templatesSnap = await getDocs(collection(db, 'staffingTemplates'));
      const loadedTemplates: StaffingTemplateConfig[] = [];
      templatesSnap.forEach(doc => {
        loadedTemplates.push({ id: doc.id, ...doc.data() } as StaffingTemplateConfig);
      });
      setTemplates(loadedTemplates);
    } catch (error) {
      console.error('Error loading templates:', error);
    }
  };

  const initializeGrid = () => {
    const cells: TemplateCell[] = [];
    let cellId = 0;

    // Initialize column widths and row heights
    const columnWidths = Array(currentTemplate.cols).fill(currentTemplate.defaultCellWidth);
    const rowHeights = Array(currentTemplate.rows).fill(currentTemplate.defaultCellHeight);

    for (let row = 0; row < currentTemplate.rows; row++) {
      for (let col = 0; col < currentTemplate.cols; col++) {
        cells.push({
          id: `cell-${cellId++}`,
          row,
          col,
          rowSpan: 1,
          colSpan: 1,
          type: row === 0 ? 'header' : 'data',
          content: '',
          style: {
            backgroundColor: '#ffffff',
            textColor: '#111827',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontSize: 12,
            fontFamily: 'Arial',
            textAlign: 'center',
            borderColor: '#1f2937',
            borderWidth: 1,
            padding: 8,
            verticalAlign: 'middle'
          },
          width: currentTemplate.defaultCellWidth,
          height: currentTemplate.defaultCellHeight
        });
      }
    }

    setCurrentTemplate({ ...currentTemplate, cells, columnWidths, rowHeights });
  };

  const addRow = () => {
    const newRow = currentTemplate.rows;
    const newCells: TemplateCell[] = [];

    for (let col = 0; col < currentTemplate.cols; col++) {
      newCells.push({
        id: `cell-${Date.now()}-${col}`,
        row: newRow,
        col,
        rowSpan: 1,
        colSpan: 1,
        type: 'data',
        content: '',
        style: {
          backgroundColor: '#ffffff',
          textColor: '#111827',
          fontWeight: 'normal',
          fontStyle: 'normal',
          fontSize: 12,
          fontFamily: 'Arial',
          textAlign: 'left',
          borderColor: '#1f2937',
          borderWidth: 1,
          padding: 8,
          verticalAlign: 'middle'
        },
        width: currentTemplate.defaultCellWidth,
        height: currentTemplate.defaultCellHeight
      });
    }

    setCurrentTemplate({
      ...currentTemplate,
      rows: currentTemplate.rows + 1,
      cells: [...currentTemplate.cells, ...newCells]
    });
  };

  const addColumn = () => {
    const newCol = currentTemplate.cols;
    const newCells: TemplateCell[] = [];

    for (let row = 0; row < currentTemplate.rows; row++) {
      newCells.push({
        id: `cell-${Date.now()}-${row}`,
        row,
        col: newCol,
        rowSpan: 1,
        colSpan: 1,
        type: row === 0 ? 'header' : 'data',
        content: row === 0 ? `Column ${newCol + 1}` : '',
        style: {
          backgroundColor: row === 0 ? '#f3f4f6' : '#ffffff',
          textColor: '#111827',
          fontWeight: row === 0 ? 'bold' : 'normal',
          fontStyle: 'normal',
          fontSize: 12,
          fontFamily: 'Arial',
          textAlign: 'center',
          borderColor: '#1f2937',
          borderWidth: 1,
          padding: 8,
          verticalAlign: 'middle'
        },
        width: currentTemplate.defaultCellWidth,
        height: currentTemplate.defaultCellHeight
      });
    }

    setCurrentTemplate({
      ...currentTemplate,
      cols: currentTemplate.cols + 1,
      cells: [...currentTemplate.cells, ...newCells]
    });
  };

  const deleteRow = (rowIndex: number) => {
    if (currentTemplate.rows <= 1) return;

    const updatedCells = currentTemplate.cells
      .filter(cell => cell.row !== rowIndex)
      .map(cell => ({
        ...cell,
        row: cell.row > rowIndex ? cell.row - 1 : cell.row
      }));

    setCurrentTemplate({
      ...currentTemplate,
      rows: currentTemplate.rows - 1,
      cells: updatedCells
    });
  };

  const deleteColumn = (colIndex: number) => {
    if (currentTemplate.cols <= 1) return;

    const updatedCells = currentTemplate.cells
      .filter(cell => cell.col !== colIndex)
      .map(cell => ({
        ...cell,
        col: cell.col > colIndex ? cell.col - 1 : cell.col
      }));

    setCurrentTemplate({
      ...currentTemplate,
      cols: currentTemplate.cols - 1,
      cells: updatedCells
    });
  };

  const updateCell = (cellId: string, updates: Partial<TemplateCell>, skipHistory: boolean = false) => {
    if (!skipHistory) {
      saveToHistory();
    }
    const updatedCells = currentTemplate.cells.map(cell =>
      cell.id === cellId ? { ...cell, ...updates } : cell
    );
    setCurrentTemplate({ ...currentTemplate, cells: updatedCells });
  };

  const insertDataField = (field: string) => {
    if (!selectedCell) return;

    const cell = currentTemplate.cells.find(c => c.id === selectedCell);
    if (!cell) return;

    const newContent = cell.content + ' ' + field;
    updateCell(selectedCell, { content: newContent });
  };

  const addCustomField = (field: CustomField) => {
    setCurrentTemplate({
      ...currentTemplate,
      customFields: [...currentTemplate.customFields, field]
    });
  };

  const deleteCustomField = (fieldId: string) => {
    setCurrentTemplate({
      ...currentTemplate,
      customFields: currentTemplate.customFields.filter(f => f.id !== fieldId)
    });
  };

  // Multi-cell selection helpers
  const handleCellClick = (cellId: string, row: number, col: number, event: React.MouseEvent) => {
    if (mode !== 'edit') return;

    if (event.ctrlKey || event.metaKey) {
      // Ctrl/Cmd+click: toggle cell in selection
      const newSelected = new Set(selectedCells);
      if (newSelected.has(cellId)) {
        newSelected.delete(cellId);
      } else {
        newSelected.add(cellId);
      }
      setSelectedCells(newSelected);
      setSelectedCell(cellId);
    } else if (event.shiftKey && selectedCell) {
      // Shift+click: select range from last selected cell to this cell
      const lastCell = currentTemplate.cells.find(c => c.id === selectedCell);
      if (lastCell) {
        const minRow = Math.min(lastCell.row, row);
        const maxRow = Math.max(lastCell.row, row);
        const minCol = Math.min(lastCell.col, col);
        const maxCol = Math.max(lastCell.col, col);

        const newSelected = new Set<string>();
        currentTemplate.cells.forEach(cell => {
          if (cell.row >= minRow && cell.row <= maxRow && cell.col >= minCol && cell.col <= maxCol) {
            newSelected.add(cell.id);
          }
        });
        setSelectedCells(newSelected);
      }
    } else {
      // Normal click: select single cell
      setSelectedCell(cellId);
      setSelectedCells(new Set([cellId]));
    }
  };

  const handleCellMouseDown = (cellId: string, row: number, col: number, event: React.MouseEvent) => {
    if (mode !== 'edit') return;
    if (event.ctrlKey || event.metaKey || event.shiftKey) return; // Let click handler deal with these

    // Start drag selection
    setIsSelecting(true);
    setSelectionStart({ row, col });
    setSelectedCell(cellId);
    setSelectedCells(new Set([cellId]));
  };

  const handleCellMouseOver = (cellId: string, row: number, col: number) => {
    if (!isSelecting || !selectionStart || mode !== 'edit') return;

    // Throttle updates using requestAnimationFrame to prevent flickering
    if (selectionUpdateQueued) return;

    setSelectionUpdateQueued(true);
    requestAnimationFrame(() => {
      // Update selection as user drags
      const minRow = Math.min(selectionStart.row, row);
      const maxRow = Math.max(selectionStart.row, row);
      const minCol = Math.min(selectionStart.col, col);
      const maxCol = Math.max(selectionStart.col, col);

      const newSelected = new Set<string>();
      currentTemplate.cells.forEach(cell => {
        if (cell.row >= minRow && cell.row <= maxRow && cell.col >= minCol && cell.col <= maxCol) {
          newSelected.add(cell.id);
        }
      });
      setSelectedCells(newSelected);
      setSelectionUpdateQueued(false);
    });
  };

  const handleMouseUp = () => {
    if (isSelecting) {
      setIsSelecting(false);
    }
    if (isSelectingRows) {
      setIsSelectingRows(false);
      setRowSelectionStart(null);
    }
    if (isSelectingColumns) {
      setIsSelectingColumns(false);
      setColumnSelectionStart(null);
    }
  };

  // Add mouseup listener to document
  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isSelecting, isSelectingRows, isSelectingColumns]);

  // Row selection handlers
  const handleRowHeaderMouseDown = (rowIndex: number) => {
    if (mode !== 'edit') return;
    setIsSelectingRows(true);
    setRowSelectionStart(rowIndex);

    // Select all cells in this row
    const newSelected = new Set<string>();
    currentTemplate.cells.forEach(cell => {
      if (cell.row === rowIndex) {
        newSelected.add(cell.id);
      }
    });
    setSelectedCells(newSelected);
  };

  const handleRowHeaderMouseOver = (rowIndex: number) => {
    if (!isSelectingRows || rowSelectionStart === null || mode !== 'edit') return;

    // Throttle updates using requestAnimationFrame
    if (selectionUpdateQueued) return;

    setSelectionUpdateQueued(true);
    requestAnimationFrame(() => {
      const minRow = Math.min(rowSelectionStart, rowIndex);
      const maxRow = Math.max(rowSelectionStart, rowIndex);

      // Select all cells in the dragged rows
      const newSelected = new Set<string>();
      currentTemplate.cells.forEach(cell => {
        if (cell.row >= minRow && cell.row <= maxRow) {
          newSelected.add(cell.id);
        }
      });
      setSelectedCells(newSelected);
      setSelectionUpdateQueued(false);
    });
  };

  // Column selection handlers
  const handleColumnHeaderMouseDown = (colIndex: number) => {
    if (mode !== 'edit') return;
    setIsSelectingColumns(true);
    setColumnSelectionStart(colIndex);

    // Select all cells in this column
    const newSelected = new Set<string>();
    currentTemplate.cells.forEach(cell => {
      if (cell.col === colIndex) {
        newSelected.add(cell.id);
      }
    });
    setSelectedCells(newSelected);
  };

  const handleColumnHeaderMouseOver = (colIndex: number) => {
    if (!isSelectingColumns || columnSelectionStart === null || mode !== 'edit') return;

    // Throttle updates using requestAnimationFrame
    if (selectionUpdateQueued) return;

    setSelectionUpdateQueued(true);
    requestAnimationFrame(() => {
      const minCol = Math.min(columnSelectionStart, colIndex);
      const maxCol = Math.max(columnSelectionStart, colIndex);

      // Select all cells in the dragged columns
      const newSelected = new Set<string>();
      currentTemplate.cells.forEach(cell => {
        if (cell.col >= minCol && cell.col <= maxCol) {
          newSelected.add(cell.id);
        }
      });
      setSelectedCells(newSelected);
      setSelectionUpdateQueued(false);
    });
  };

  // Save current state to history (for undo/redo)
  const saveToHistory = () => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(currentTemplate)));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Undo
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentTemplate(JSON.parse(JSON.stringify(history[historyIndex - 1])));
    }
  };

  // Redo
  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentTemplate(JSON.parse(JSON.stringify(history[historyIndex + 1])));
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle shortcuts in edit mode
      if (mode !== 'edit') return;

      // Ctrl+Z: Undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      // Ctrl+Y or Ctrl+Shift+Z: Redo
      else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
      }
      // Ctrl+A: Select all cells
      else if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        e.preventDefault();
        const allCellIds = new Set(currentTemplate.cells.map(c => c.id));
        setSelectedCells(allCellIds);
      }
      // Ctrl+C: Copy selected cells
      else if ((e.ctrlKey || e.metaKey) && e.key === 'c' && selectedCells.size > 0) {
        e.preventDefault();
        const cellsToCopy = Array.from(selectedCells).map(id =>
          currentTemplate.cells.find(c => c.id === id)
        ).filter(c => c !== undefined) as TemplateCell[];
        setClipboard({ cells: cellsToCopy, isCut: false });
      }
      // Ctrl+X: Cut selected cells
      else if ((e.ctrlKey || e.metaKey) && e.key === 'x' && selectedCells.size > 0) {
        e.preventDefault();
        const cellsToCut = Array.from(selectedCells).map(id =>
          currentTemplate.cells.find(c => c.id === id)
        ).filter(c => c !== undefined) as TemplateCell[];
        setClipboard({ cells: cellsToCut, isCut: true });
      }
      // Ctrl+V: Paste cells
      else if ((e.ctrlKey || e.metaKey) && e.key === 'v' && clipboard && selectedCell) {
        e.preventDefault();
        saveToHistory();

        const targetCell = currentTemplate.cells.find(c => c.id === selectedCell);
        if (!targetCell) return;

        // Calculate offset from the first copied cell
        const firstCopiedCell = clipboard.cells[0];
        const rowOffset = targetCell.row - firstCopiedCell.row;
        const colOffset = targetCell.col - firstCopiedCell.col;

        const updatedCells = [...currentTemplate.cells];

        clipboard.cells.forEach(copiedCell => {
          const targetRow = copiedCell.row + rowOffset;
          const targetCol = copiedCell.col + colOffset;

          // Find the cell at the target position
          const cellIndex = updatedCells.findIndex(c => c.row === targetRow && c.col === targetCol);
          if (cellIndex !== -1) {
            // Paste content and style
            updatedCells[cellIndex] = {
              ...updatedCells[cellIndex],
              content: copiedCell.content,
              style: { ...copiedCell.style }
            };
          }
        });

        // If it was a cut operation, clear the original cells
        if (clipboard.isCut) {
          clipboard.cells.forEach(cutCell => {
            const cellIndex = updatedCells.findIndex(c => c.id === cutCell.id);
            if (cellIndex !== -1) {
              updatedCells[cellIndex] = {
                ...updatedCells[cellIndex],
                content: '',
                style: {
                  ...updatedCells[cellIndex].style,
                  backgroundColor: '#ffffff',
                  textColor: '#111827',
                  fontWeight: 'normal',
                  fontStyle: 'normal'
                }
              };
            }
          });
          setClipboard(null);
        }

        setCurrentTemplate({ ...currentTemplate, cells: updatedCells });
      }
      // Delete/Backspace: Clear selected cells content
      else if ((e.key === 'Delete' || e.key === 'Backspace') && selectedCells.size > 0) {
        e.preventDefault();
        saveToHistory();

        const updatedCells = currentTemplate.cells.map(cell => {
          if (selectedCells.has(cell.id)) {
            return { ...cell, content: '' };
          }
          return cell;
        });

        setCurrentTemplate({ ...currentTemplate, cells: updatedCells });
      }
      // Ctrl+B: Bold
      else if ((e.ctrlKey || e.metaKey) && e.key === 'b' && selectedCells.size > 0) {
        e.preventDefault();
        const firstSelectedCell = currentTemplate.cells.find(c => selectedCells.has(c.id));
        const newWeight = firstSelectedCell?.style.fontWeight === 'bold' ? 'normal' : 'bold';
        applyStyleToSelected({ fontWeight: newWeight });
      }
      // Ctrl+I: Italic
      else if ((e.ctrlKey || e.metaKey) && e.key === 'i' && selectedCells.size > 0) {
        e.preventDefault();
        const firstSelectedCell = currentTemplate.cells.find(c => selectedCells.has(c.id));
        const newStyle = firstSelectedCell?.style.fontStyle === 'italic' ? 'normal' : 'italic';
        applyStyleToSelected({ fontStyle: newStyle });
      }
      // Escape: Clear selection
      else if (e.key === 'Escape') {
        clearSelection();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [historyIndex, history, mode, selectedCells, selectedCell, currentTemplate, clipboard]);

  // Close color picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (showColorPicker && !target.closest('.color-picker-container')) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColorPicker]);

  const clearSelection = () => {
    setSelectedCells(new Set());
    setSelectedCell(null);
  };

  const applyStyleToSelected = (styleUpdates: Partial<CellStyle>) => {
    // Save to history before making changes
    saveToHistory();

    // Batch update all selected cells at once
    const updatedCells = currentTemplate.cells.map(cell => {
      if (selectedCells.has(cell.id)) {
        return {
          ...cell,
          style: { ...cell.style, ...styleUpdates }
        };
      }
      return cell;
    });

    setCurrentTemplate({ ...currentTemplate, cells: updatedCells });
  };

  const mergeCells = () => {
    if (selectedCells.size < 2) {
      alert('Please select at least 2 cells to merge');
      return;
    }

    // Save to history before merging
    saveToHistory();

    // Get all selected cells that are visible (not hidden by previous merge)
    const cellsToMerge = Array.from(selectedCells)
      .map(id => currentTemplate.cells.find(c => c.id === id))
      .filter(c => c !== undefined && c.rowSpan > 0 && c.colSpan > 0) as TemplateCell[];

    if (cellsToMerge.length < 2) {
      alert('Please select at least 2 visible cells to merge');
      return;
    }

    const minRow = Math.min(...cellsToMerge.map(c => c.row));
    const maxRow = Math.max(...cellsToMerge.map(c => c.row));
    const minCol = Math.min(...cellsToMerge.map(c => c.col));
    const maxCol = Math.max(...cellsToMerge.map(c => c.col));

    const rowSpan = maxRow - minRow + 1;
    const colSpan = maxCol - minCol + 1;

    // Verify we have all cells in the rectangular area
    const expectedCellCount = rowSpan * colSpan;
    let actualCellCount = 0;

    for (let r = minRow; r <= maxRow; r++) {
      for (let c = minCol; c <= maxCol; c++) {
        const cell = currentTemplate.cells.find(cell =>
          cell.row === r && cell.col === c && cell.rowSpan > 0 && cell.colSpan > 0
        );
        if (cell) actualCellCount++;
      }
    }

    if (actualCellCount !== expectedCellCount) {
      alert(`Please select a complete rectangular area. Selected ${actualCellCount} out of ${expectedCellCount} cells.`);
      return;
    }

    // Find the top-left cell
    let topLeftCell = cellsToMerge.find(c => c.row === minRow && c.col === minCol);
    if (!topLeftCell) {
      alert('Could not find top-left cell. Please try again.');
      return;
    }

    // Combine content from all cells (non-empty content only)
    const combinedContent = cellsToMerge
      .filter(c => c.content && c.content.trim())
      .map(c => c.content)
      .join(' ');

    // Update all cells
    const updatedCells = currentTemplate.cells.map(cell => {
      // Update the top-left cell to span the merged area
      if (cell.id === topLeftCell.id) {
        return {
          ...cell,
          rowSpan,
          colSpan,
          content: combinedContent || cell.content
        };
      }

      // Hide other cells in the merged area
      if (cell.row >= minRow && cell.row <= maxRow &&
          cell.col >= minCol && cell.col <= maxCol &&
          cell.id !== topLeftCell.id) {
        return { ...cell, rowSpan: 0, colSpan: 0 };
      }

      return cell;
    });

    setCurrentTemplate({
      ...currentTemplate,
      cells: updatedCells
    });

    clearSelection();
    setSelectedCell(topLeftCell.id);
    setSelectedCells(new Set([topLeftCell.id]));
  };

  const splitCell = () => {
    if (!selectedCell) {
      alert('Please select a merged cell to split');
      return;
    }

    const cell = currentTemplate.cells.find(c => c.id === selectedCell);
    if (!cell || (cell.rowSpan <= 1 && cell.colSpan <= 1)) {
      alert('This cell is not merged');
      return;
    }

    // Save to history before splitting
    saveToHistory();

    const originalRowSpan = cell.rowSpan;
    const originalColSpan = cell.colSpan;

    // Reset the merged cell to single cell
    const updatedCells = currentTemplate.cells.map(c => {
      if (c.id === selectedCell) {
        return { ...c, rowSpan: 1, colSpan: 1 };
      }
      return c;
    });

    // Restore cells that were marked as removed (rowSpan/colSpan = 0)
    const restoredCells = updatedCells.map(c => {
      // Check if this cell was in the merged area and was hidden
      if (c.rowSpan === 0 && c.colSpan === 0) {
        // Check if it's within the merged area
        if (c.row >= cell.row && c.row < cell.row + originalRowSpan &&
            c.col >= cell.col && c.col < cell.col + originalColSpan) {
          return {
            ...c,
            rowSpan: 1,
            colSpan: 1,
            content: '',
            style: {
              backgroundColor: '#ffffff',
              textColor: '#111827',
              fontWeight: 'normal',
              fontStyle: 'normal',
              fontSize: 12,
              fontFamily: 'Arial',
              textAlign: 'center',
              borderColor: '#1f2937',
              borderWidth: 1,
              padding: 8,
              verticalAlign: 'middle'
            }
          };
        }
      }
      return c;
    });

    setCurrentTemplate({
      ...currentTemplate,
      cells: restoredCells
    });

    clearSelection();
  };

  const saveTemplate = async () => {
    try {
      const templateData = {
        ...currentTemplate,
        updatedAt: new Date().toISOString()
      };

      if (currentTemplate.id) {
        await updateDoc(doc(db, 'staffingTemplates', currentTemplate.id), templateData);
      } else {
        const docRef = await addDoc(collection(db, 'staffingTemplates'), {
          ...templateData,
          createdAt: new Date().toISOString()
        });
        setCurrentTemplate({ ...currentTemplate, id: docRef.id });
      }

      await loadTemplates();
      alert('Template saved successfully!');
    } catch (error) {
      console.error('Error saving template:', error);
      alert('Failed to save template');
    }
  };

  const loadTemplate = (template: StaffingTemplateConfig) => {
    setCurrentTemplate(template);
    setShowTemplateLibrary(false);
  };

  const exportToExcel = () => {
    let csv = '';
    for (let row = 0; row < currentTemplate.rows; row++) {
      const rowCells = currentTemplate.cells.filter(c => c.row === row && c.colSpan > 0);
      const rowData = rowCells.map(c => `"${c.content}"`).join(',');
      csv += rowData + '\n';
    }

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentTemplate.name}.csv`;
    a.click();
  };

  const getCellAtPosition = (row: number, col: number): TemplateCell | undefined => {
    return currentTemplate.cells.find(cell => cell.row === row && cell.col === col);
  };

  const getSelectedCellData = (): TemplateCell | undefined => {
    return currentTemplate.cells.find(c => c.id === selectedCell);
  };

  // Convert column index to Excel-style letter (0 -> A, 1 -> B, ... 25 -> Z, 26 -> AA, etc.)
  const getColumnLabel = (colIndex: number): string => {
    let label = '';
    let num = colIndex;

    while (num >= 0) {
      label = String.fromCharCode(65 + (num % 26)) + label;
      num = Math.floor(num / 26) - 1;
    }

    return label;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Toolbar */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <input
              type="text"
              value={currentTemplate.name}
              onChange={(e) => setCurrentTemplate({ ...currentTemplate, name: e.target.value })}
              className="text-xl font-bold border-b-2 border-transparent hover:border-gray-300 focus:border-cyan-500 focus:outline-none px-2 py-1"
            />
            <p className="text-sm text-gray-500 mt-1">Visual template designer with data binding</p>
          </div>

          <div className="flex items-center gap-2">
            {/* Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setMode('edit')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  mode === 'edit' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'
                }`}
              >
                <Edit3 className="w-4 h-4" />
                Design
              </button>
              <button
                onClick={() => setMode('preview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  mode === 'preview' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'
                }`}
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
            </div>

            <button
              onClick={() => setShowTemplateLibrary(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              <FolderOpen className="w-4 h-4" />
              Templates
            </button>

            <button
              onClick={saveTemplate}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-md hover:from-blue-700 hover:to-cyan-700 transition-colors text-sm font-medium"
            >
              <Save className="w-4 h-4" />
              Save
            </button>

            <button
              onClick={exportToExcel}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-md hover:from-blue-700 hover:to-cyan-700 transition-colors text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              Export
            </button>

            <div className="h-8 w-px bg-gray-300 mx-2"></div>

            <button
              onClick={undo}
              disabled={historyIndex <= 0}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              title="Undo (Ctrl+Z)"
            >
              <Undo2 className="w-4 h-4" />
              Undo
            </button>

            <button
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              title="Redo (Ctrl+Y)"
            >
              <Redo2 className="w-4 h-4" />
              Redo
            </button>
          </div>
        </div>

        {/* Design Toolbar */}
        {mode === 'edit' && (
          <div className="flex items-center gap-3 flex-wrap pt-4 border-t">
            <button
              onClick={addRow}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Row
            </button>

            <button
              onClick={addColumn}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Column
            </button>

            <div className="h-6 w-px bg-gray-300"></div>

            <button
              onClick={() => setShowStylePanel(!showStylePanel)}
              disabled={!selectedCell}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-md hover:bg-purple-100 transition-colors text-sm disabled:opacity-50"
            >
              <Palette className="w-4 h-4" />
              Style
            </button>

            <button
              onClick={() => setShowFieldsPanel(!showFieldsPanel)}
              disabled={!selectedCell}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-700 rounded-md hover:bg-orange-100 transition-colors text-sm disabled:opacity-50"
            >
              <Type className="w-4 h-4" />
              Fields
            </button>

            <div className="h-6 w-px bg-gray-300"></div>

            <button
              onClick={mergeCells}
              disabled={selectedCells.size < 2}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-50 text-cyan-700 rounded-md hover:bg-cyan-100 transition-colors text-sm disabled:opacity-50"
              title="Select multiple cells to merge"
            >
              <Grid3x3 className="w-4 h-4" />
              Merge Cells
            </button>

            <button
              onClick={splitCell}
              disabled={!selectedCell || (selectedCell && currentTemplate.cells.find(c => c.id === selectedCell)?.rowSpan === 1 && currentTemplate.cells.find(c => c.id === selectedCell)?.colSpan === 1)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 text-teal-700 rounded-md hover:bg-teal-100 transition-colors text-sm disabled:opacity-50"
              title="Split merged cell"
            >
              <Grid3x3 className="w-4 h-4" />
              Split Cell
            </button>
          </div>
        )}
      </div>

      <div className="flex">
        {/* Main Canvas */}
        <div className="flex-1 p-6 overflow-auto">
          {/* Multi-cell selection toolbar */}
          {selectedCells.size > 1 && mode === 'edit' && (
            <div className="mb-4 p-3 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg shadow-md">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-cyan-900">
                  {selectedCells.size} cells selected
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={mergeCells}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-md hover:from-blue-700 hover:to-cyan-700 transition-colors text-sm"
                  >
                    <Grid3x3 className="w-4 h-4" />
                    Merge Cells
                  </button>
                  <div className="relative color-picker-container">
                    <button
                      onClick={() => setShowColorPicker(!showColorPicker)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors text-sm"
                    >
                      <Palette className="w-4 h-4" />
                      Apply Color
                    </button>
                    {showColorPicker && (
                      <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-xl p-3 z-50 w-64">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-medium text-gray-700">Select Color</span>
                          <button onClick={() => setShowColorPicker(false)} className="text-gray-500 hover:text-gray-700 text-xl">×</button>
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                          {COLOR_PALETTE.map(color => (
                            <button
                              key={color.value}
                              onClick={() => {
                                applyStyleToSelected({ backgroundColor: color.value });
                                setShowColorPicker(false);
                              }}
                              className="w-10 h-10 rounded border-2 border-gray-300 hover:border-cyan-500 transition-colors hover:scale-110"
                              style={{ backgroundColor: color.value }}
                              title={color.name}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => applyStyleToSelected({ fontWeight: 'bold' })}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors text-sm"
                  >
                    <Bold className="w-4 h-4" />
                    Bold
                  </button>
                  <button
                    onClick={() => applyStyleToSelected({ textAlign: 'center' })}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors text-sm"
                  >
                    <AlignCenter className="w-4 h-4" />
                    Center
                  </button>
                  <button
                    onClick={() => {
                      const width = prompt('Enter width in pixels (e.g., 200):');
                      const height = prompt('Enter height in pixels (e.g., 50):');
                      if (width || height) {
                        const updates: any = {};
                        if (width) updates.width = parseInt(width);
                        if (height) updates.height = parseInt(height);
                        selectedCells.forEach(cellId => {
                          updateCell(cellId, updates);
                        });
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors text-sm"
                  >
                    <Maximize2 className="w-4 h-4" />
                    Set Size
                  </button>
                  <button
                    onClick={clearSelection}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm ml-auto"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-lg border border-gray-200 inline-block">
            <table className="border-collapse">
              <thead>
                {mode === 'edit' && (
                  <tr>
                    <th className="border border-gray-300 bg-gray-50" style={{ width: '30px', height: '30px' }}>
                      {/* Corner cell */}
                    </th>
                    {Array.from({ length: currentTemplate.cols }).map((_, colIdx) => {
                      const colWidth = currentTemplate.columnWidths?.[colIdx] || currentTemplate.defaultCellWidth;
                      const isColumnSelected = columnSelectionStart !== null && (
                        (columnSelectionStart <= colIdx && colIdx <= (columnSelectionStart)) ||
                        Array.from(selectedCells).some(cellId => {
                          const cell = currentTemplate.cells.find(c => c.id === cellId);
                          return cell?.col === colIdx;
                        })
                      );
                      return (
                        <th
                          key={colIdx}
                          className={`border border-gray-300 bg-gray-50 relative cursor-pointer hover:bg-cyan-100 transition-colors ${
                            isColumnSelected ? 'bg-cyan-200' : ''
                          }`}
                          style={{ width: `${colWidth}px`, minWidth: `${colWidth}px`, height: '30px' }}
                          onMouseDown={() => handleColumnHeaderMouseDown(colIdx)}
                          onMouseOver={() => handleColumnHeaderMouseOver(colIdx)}
                        >
                          <div className="flex items-center justify-center text-xs text-gray-600 font-semibold">
                            {getColumnLabel(colIdx)}
                          </div>
                          {/* Column resize handle */}
                          <div
                            className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-cyan-500 transition-colors z-10"
                            onMouseDown={(e) => {
                              e.stopPropagation();
                              setResizingColumn({
                                colIndex: colIdx,
                                startX: e.clientX,
                                startWidth: colWidth
                              });
                            }}
                          />
                        </th>
                      );
                    })}
                  </tr>
                )}
              </thead>
              <tbody>
                {Array.from({ length: currentTemplate.rows }).map((_, rowIdx) => {
                  const rowHeight = currentTemplate.rowHeights?.[rowIdx] || currentTemplate.defaultCellHeight;
                  const isRowSelected = rowSelectionStart !== null && (
                    (rowSelectionStart <= rowIdx && rowIdx <= (rowSelectionStart)) ||
                    Array.from(selectedCells).some(cellId => {
                      const cell = currentTemplate.cells.find(c => c.id === cellId);
                      return cell?.row === rowIdx;
                    })
                  );
                  return (
                    <tr key={rowIdx} style={{ height: `${rowHeight}px` }}>
                      {mode === 'edit' && (
                        <td
                          className={`border border-gray-300 bg-gray-100 p-1 text-center align-middle relative cursor-pointer hover:bg-cyan-100 transition-colors ${
                            isRowSelected ? 'bg-cyan-200' : ''
                          }`}
                          style={{ width: '30px', height: `${rowHeight}px` }}
                          onMouseDown={() => handleRowHeaderMouseDown(rowIdx)}
                          onMouseOver={() => handleRowHeaderMouseOver(rowIdx)}
                        >
                          <div className="flex items-center justify-center text-xs text-gray-600 font-semibold">
                            {rowIdx + 1}
                          </div>
                          {/* Row resize handle */}
                          <div
                            className="absolute left-0 right-0 bottom-0 h-1 cursor-row-resize hover:bg-cyan-500 transition-colors z-10"
                            onMouseDown={(e) => {
                              e.stopPropagation();
                              setResizingRow({
                                rowIndex: rowIdx,
                                startY: e.clientY,
                                startHeight: rowHeight
                              });
                            }}
                          />
                        </td>
                      )}

                    {Array.from({ length: currentTemplate.cols }).map((_, colIdx) => {
                      const cell = getCellAtPosition(rowIdx, colIdx);

                      if (!cell || cell.rowSpan === 0 || cell.colSpan === 0) {
                        return null;
                      }

                      const colWidth = currentTemplate.columnWidths?.[colIdx] || currentTemplate.defaultCellWidth;

                      return (
                        <td
                          key={colIdx}
                          rowSpan={cell.rowSpan}
                          colSpan={cell.colSpan}
                          onClick={(e) => handleCellClick(cell.id, cell.row, cell.col, e)}
                          onMouseDown={(e) => handleCellMouseDown(cell.id, cell.row, cell.col, e)}
                          onMouseOver={() => handleCellMouseOver(cell.id, cell.row, cell.col)}
                          onContextMenu={(e) => {
                            e.preventDefault();
                            handleCellClick(cell.id, cell.row, cell.col, e);
                            setShowStylePanel(true);
                          }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            e.currentTarget.classList.add('bg-cyan-100');
                          }}
                          onDragLeave={(e) => {
                            e.currentTarget.classList.remove('bg-cyan-100');
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            e.currentTarget.classList.remove('bg-cyan-100');
                            const fieldData = e.dataTransfer.getData('field');
                            if (fieldData) {
                              updateCell(cell.id, { content: fieldData });
                            }
                          }}
                          onDoubleClick={() => {
                            if (mode === 'edit' && cell.content) {
                              // Double-click to clear content
                              if (confirm('Clear this cell content?')) {
                                updateCell(cell.id, { content: '' });
                              }
                            }
                          }}
                          className={`relative cursor-pointer transition-all group ${
                            selectedCells.has(cell.id) ? 'ring-2 ring-cyan-500 ring-inset bg-cyan-50' : ''
                          } ${selectedCell === cell.id ? 'ring-4' : ''}`}
                          style={{
                            backgroundColor: cell.style.backgroundColor,
                            color: cell.style.textColor,
                            fontWeight: cell.style.fontWeight,
                            fontStyle: cell.style.fontStyle,
                            fontSize: `${cell.style.fontSize}px`,
                            fontFamily: cell.style.fontFamily,
                            textAlign: cell.style.textAlign,
                            border: `${cell.style.borderWidth}px solid ${cell.style.borderColor}`,
                            padding: `${cell.style.padding}px`,
                            width: `${colWidth}px`,
                            height: `${rowHeight}px`,
                            verticalAlign: cell.style.verticalAlign,
                            minWidth: `${colWidth}px`,
                            minHeight: `${rowHeight}px`
                          }}
                        >
                          <div className="w-full h-full flex items-center justify-center">
                            {cell.content ? (
                              <span>{cell.content}</span>
                            ) : mode === 'edit' ? (
                              <span className="text-gray-400 text-sm italic opacity-0 group-hover:opacity-100 transition-opacity">Drop field here</span>
                            ) : null}
                          </div>

                          {/* Resize handles */}
                          {mode === 'edit' && selectedCell === cell.id && (
                            <>
                              {/* Corner resize handle (both width and height) */}
                              <div
                                className="absolute bottom-0 right-0 w-3 h-3 bg-cyan-500 cursor-se-resize hover:bg-cyan-600"
                                onMouseDown={(e) => {
                                  e.stopPropagation();
                                  setResizingCell({
                                    cellId: cell.id,
                                    direction: 'width',
                                    startX: e.clientX,
                                    startY: e.clientY,
                                    startWidth: cell.width || currentTemplate.defaultCellWidth,
                                    startHeight: cell.height || currentTemplate.defaultCellHeight
                                  });
                                }}
                              />
                              {/* Right edge resize handle (width only) */}
                              <div
                                className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-cyan-400 opacity-0 hover:opacity-50"
                                onMouseDown={(e) => {
                                  e.stopPropagation();
                                  setResizingCell({
                                    cellId: cell.id,
                                    direction: 'width',
                                    startX: e.clientX,
                                    startY: e.clientY,
                                    startWidth: cell.width || currentTemplate.defaultCellWidth,
                                    startHeight: cell.height || currentTemplate.defaultCellHeight
                                  });
                                }}
                              />
                              {/* Bottom edge resize handle (height only) */}
                              <div
                                className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize hover:bg-cyan-400 opacity-0 hover:opacity-50"
                                onMouseDown={(e) => {
                                  e.stopPropagation();
                                  setResizingCell({
                                    cellId: cell.id,
                                    direction: 'height',
                                    startX: e.clientX,
                                    startY: e.clientY,
                                    startWidth: cell.width || currentTemplate.defaultCellWidth,
                                    startHeight: cell.height || currentTemplate.defaultCellHeight
                                  });
                                }}
                              />
                            </>
                          )}
                        </td>
                      );
                    })}
                    </tr>
                  );
                })}

                {mode === 'edit' && (
                  <tr>
                    <td className="border border-gray-300 bg-gray-100 p-1"></td>
                    {Array.from({ length: currentTemplate.cols }).map((_, colIdx) => (
                      <td key={colIdx} className="border border-gray-300 bg-gray-100 p-1 text-center">
                        <button
                          onClick={() => deleteColumn(colIdx)}
                          className="text-red-600 hover:text-red-800 p-0.5"
                          title="Delete column"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </td>
                    ))}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar - Style Panel */}
        {mode === 'edit' && showStylePanel && selectedCell && (
          <StylePanel
            cell={getSelectedCellData()!}
            onUpdate={(updates) => updateCell(selectedCell, updates)}
            onClose={() => setShowStylePanel(false)}
          />
        )}

        {/* Right Sidebar - Fields Panel */}
        {mode === 'edit' && showFieldsPanel && selectedCell && (
          <FieldsPanel
            systemFields={SYSTEM_FIELDS}
            customFields={currentTemplate.customFields}
            onInsert={insertDataField}
            onAddCustomField={addCustomField}
            onDeleteCustomField={deleteCustomField}
            onClose={() => setShowFieldsPanel(false)}
          />
        )}
      </div>

      {/* Template Library Modal */}
      {showTemplateLibrary && (
        <TemplateLibraryModal
          templates={templates}
          onLoad={loadTemplate}
          onClose={() => setShowTemplateLibrary(false)}
        />
      )}
    </div>
  );
}

// Style Panel Component
interface StylePanelProps {
  cell: TemplateCell;
  onUpdate: (updates: Partial<TemplateCell>) => void;
  onClose: () => void;
}

function StylePanel({ cell, onUpdate, onClose }: StylePanelProps) {
  const updateStyle = (styleUpdates: Partial<CellStyle>) => {
    onUpdate({ style: { ...cell.style, ...styleUpdates } });
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">Cell Style</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ×
        </button>
      </div>

      <div className="space-y-4">
        {/* Font Family */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Font</label>
          <select
            value={cell.style.fontFamily}
            onChange={(e) => updateStyle({ fontFamily: e.target.value })}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md"
          >
            {FONT_FAMILIES.map(font => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>
        </div>

        {/* Font Size */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Size: {cell.style.fontSize}px</label>
          <input
            type="range"
            min="8"
            max="72"
            value={cell.style.fontSize}
            onChange={(e) => updateStyle({ fontSize: parseInt(e.target.value) })}
            className="w-full"
          />
        </div>

        {/* Font Style */}
        <div className="flex gap-2">
          <button
            onClick={() => updateStyle({ fontWeight: cell.style.fontWeight === 'bold' ? 'normal' : 'bold' })}
            className={`flex-1 px-3 py-2 rounded border ${
              cell.style.fontWeight === 'bold' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            <Bold className="w-4 h-4 mx-auto" />
          </button>
          <button
            onClick={() => updateStyle({ fontStyle: cell.style.fontStyle === 'italic' ? 'normal' : 'italic' })}
            className={`flex-1 px-3 py-2 rounded border ${
              cell.style.fontStyle === 'italic' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            <Italic className="w-4 h-4 mx-auto" />
          </button>
        </div>

        {/* Text Align */}
        <div className="flex gap-2">
          <button
            onClick={() => updateStyle({ textAlign: 'left' })}
            className={`flex-1 px-3 py-2 rounded border ${
              cell.style.textAlign === 'left' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            <AlignLeft className="w-4 h-4 mx-auto" />
          </button>
          <button
            onClick={() => updateStyle({ textAlign: 'center' })}
            className={`flex-1 px-3 py-2 rounded border ${
              cell.style.textAlign === 'center' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            <AlignCenter className="w-4 h-4 mx-auto" />
          </button>
          <button
            onClick={() => updateStyle({ textAlign: 'right' })}
            className={`flex-1 px-3 py-2 rounded border ${
              cell.style.textAlign === 'right' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            <AlignRight className="w-4 h-4 mx-auto" />
          </button>
        </div>

        {/* Colors */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Background Color</label>
          <input
            type="color"
            value={cell.style.backgroundColor}
            onChange={(e) => updateStyle({ backgroundColor: e.target.value })}
            className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Text Color</label>
          <input
            type="color"
            value={cell.style.textColor}
            onChange={(e) => updateStyle({ textColor: e.target.value })}
            className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Border Color</label>
          <input
            type="color"
            value={cell.style.borderColor}
            onChange={(e) => updateStyle({ borderColor: e.target.value })}
            className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Border Width: {cell.style.borderWidth}px</label>
          <input
            type="range"
            min="0"
            max="10"
            value={cell.style.borderWidth}
            onChange={(e) => updateStyle({ borderWidth: parseInt(e.target.value) })}
            className="w-full"
          />
        </div>

        {/* Cell Dimensions */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Width: {cell.width}px</label>
          <input
            type="number"
            value={cell.width}
            onChange={(e) => onUpdate({ width: parseInt(e.target.value) || 100 })}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Height: {cell.height}px</label>
          <input
            type="number"
            value={cell.height}
            onChange={(e) => onUpdate({ height: parseInt(e.target.value) || 42 })}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md"
          />
        </div>

        {/* Padding */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Padding: {cell.style.padding}px</label>
          <input
            type="range"
            min="0"
            max="32"
            value={cell.style.padding}
            onChange={(e) => updateStyle({ padding: parseInt(e.target.value) })}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

// Fields Panel Component with Define and Insert tabs
interface FieldsPanelProps {
  systemFields: typeof SYSTEM_FIELDS;
  customFields: CustomField[];
  onInsert: (field: string) => void;
  onAddCustomField: (field: CustomField) => void;
  onDeleteCustomField: (fieldId: string) => void;
  onClose: () => void;
}

function FieldsPanel({ systemFields, customFields, onInsert, onAddCustomField, onDeleteCustomField, onClose }: FieldsPanelProps) {
  const [activeTab, setActiveTab] = useState<'insert' | 'define'>('insert');
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFieldType, setNewFieldType] = useState<CustomField['type']>('text');
  const [newFieldCategory, setNewFieldCategory] = useState('');
  const [newFieldDefaultValue, setNewFieldDefaultValue] = useState('');
  const [newFieldOptions, setNewFieldOptions] = useState('');
  const [newFieldFormula, setNewFieldFormula] = useState('');

  const handleAddField = () => {
    if (!newFieldName || !newFieldLabel || !newFieldCategory) {
      alert('Please fill in all required fields (Name, Label, Category)');
      return;
    }

    const field: CustomField = {
      id: `custom-${Date.now()}`,
      name: newFieldName,
      label: newFieldLabel,
      type: newFieldType,
      category: newFieldCategory,
      defaultValue: newFieldDefaultValue || undefined,
      options: newFieldType === 'dropdown' && newFieldOptions ? newFieldOptions.split(',').map(o => o.trim()) : undefined,
      formula: newFieldType === 'formula' && newFieldFormula ? newFieldFormula : undefined
    };

    onAddCustomField(field);

    // Reset form
    setNewFieldName('');
    setNewFieldLabel('');
    setNewFieldType('text');
    setNewFieldCategory('');
    setNewFieldDefaultValue('');
    setNewFieldOptions('');
    setNewFieldFormula('');
  };

  // Group system fields by category
  const groupedSystemFields = systemFields.reduce((acc, field) => {
    if (!acc[field.category]) acc[field.category] = [];
    acc[field.category].push(field);
    return acc;
  }, {} as Record<string, typeof systemFields>);

  // Group custom fields by category
  const groupedCustomFields = customFields.reduce((acc, field) => {
    if (!acc[field.category]) acc[field.category] = [];
    acc[field.category].push(field);
    return acc;
  }, {} as Record<string, CustomField[]>);

  return (
    <div className="w-96 bg-white border-l border-gray-200 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">Fields</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">
            ×
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('insert')}
            className={`flex-1 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              activeTab === 'insert' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'
            }`}
          >
            Insert
          </button>
          <button
            onClick={() => setActiveTab('define')}
            className={`flex-1 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              activeTab === 'define' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'
            }`}
          >
            Define
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'insert' ? (
          <div className="space-y-6">
            <p className="text-xs text-gray-600">
              <strong>Drag and drop</strong> fields into your template cells. They will be replaced with actual data when used.
            </p>

            {/* System Fields */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-3">System Fields</h4>
              <div className="space-y-4">
                {Object.entries(groupedSystemFields).map(([category, fields]) => (
                  <div key={category}>
                    <h5 className="text-xs font-semibold text-gray-700 mb-2 uppercase">{category}</h5>
                    <div className="space-y-1">
                      {fields.map(field => (
                        <div
                          key={field.id}
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData('field', field.value);
                            e.dataTransfer.effectAllowed = 'copy';
                          }}
                          className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-cyan-50 hover:text-cyan-700 rounded-md transition-colors cursor-move"
                        >
                          {field.label}
                          <span className="block text-xs text-gray-500 mt-0.5 font-mono">{field.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Fields */}
            {customFields.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-3">Custom Fields</h4>
                <div className="space-y-4">
                  {Object.entries(groupedCustomFields).map(([category, fields]) => (
                    <div key={category}>
                      <h5 className="text-xs font-semibold text-gray-700 mb-2 uppercase">{category}</h5>
                      <div className="space-y-1">
                        {fields.map(field => (
                          <div
                            key={field.id}
                            draggable
                            onDragStart={(e) => {
                              e.dataTransfer.setData('field', `{{${field.name}}}`);
                              e.dataTransfer.effectAllowed = 'copy';
                            }}
                            className="w-full text-left px-3 py-2 text-sm bg-purple-50 hover:bg-purple-100 hover:text-purple-700 rounded-md transition-colors cursor-move"
                          >
                            {field.label}
                            <span className="block text-xs text-gray-500 mt-0.5 font-mono">{`{{${field.name}}}`}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-xs text-gray-600">
              Create custom fields for your template. These can be text, numbers, dates, dropdowns, checkboxes, or calculated values.
            </p>

            {/* Add New Field Form */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <h4 className="text-sm font-bold text-gray-900 mb-3">Add New Field</h4>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Field Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newFieldName}
                  onChange={(e) => setNewFieldName(e.target.value)}
                  placeholder="e.g., customerId"
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md"
                />
                <p className="text-xs text-gray-500 mt-0.5">Used in templates as {`{{${newFieldName || 'fieldName'}}}`}</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Label <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newFieldLabel}
                  onChange={(e) => setNewFieldLabel(e.target.value)}
                  placeholder="e.g., Customer ID"
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={newFieldType}
                  onChange={(e) => setNewFieldType(e.target.value as CustomField['type'])}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md"
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                  <option value="dropdown">Dropdown</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="formula">Formula</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newFieldCategory}
                  onChange={(e) => setNewFieldCategory(e.target.value)}
                  placeholder="e.g., Patient, Billing, Custom"
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Default Value</label>
                <input
                  type="text"
                  value={newFieldDefaultValue}
                  onChange={(e) => setNewFieldDefaultValue(e.target.value)}
                  placeholder="Optional default value"
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md"
                />
              </div>

              {newFieldType === 'dropdown' && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Options (comma-separated)</label>
                  <input
                    type="text"
                    value={newFieldOptions}
                    onChange={(e) => setNewFieldOptions(e.target.value)}
                    placeholder="e.g., Option 1, Option 2, Option 3"
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md"
                  />
                </div>
              )}

              {newFieldType === 'formula' && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Formula</label>
                  <input
                    type="text"
                    value={newFieldFormula}
                    onChange={(e) => setNewFieldFormula(e.target.value)}
                    placeholder="e.g., {{field1}} + {{field2}}"
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md"
                  />
                </div>
              )}

              <button
                onClick={handleAddField}
                className="w-full px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-md hover:from-blue-700 hover:to-cyan-700 transition-colors text-sm font-medium"
              >
                Add Field
              </button>
            </div>

            {/* Existing Custom Fields */}
            {customFields.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-3">Existing Custom Fields</h4>
                <div className="space-y-2">
                  {customFields.map(field => (
                    <div key={field.id} className="bg-white border border-gray-200 rounded-lg p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-sm text-gray-900">{field.label}</div>
                          <div className="text-xs text-gray-500 font-mono mt-0.5">{`{{${field.name}}}`}</div>
                          <div className="flex items-center gap-2 mt-2 text-xs">
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                              {field.type}
                            </span>
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
                              {field.category}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => onDeleteCustomField(field.id)}
                          className="text-red-600 hover:text-red-800 ml-2"
                          title="Delete field"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Template Library Modal
interface TemplateLibraryModalProps {
  templates: StaffingTemplateConfig[];
  onLoad: (template: StaffingTemplateConfig) => void;
  onClose: () => void;
}

function TemplateLibraryModal({ templates, onLoad, onClose }: TemplateLibraryModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Template Library</h2>
          <p className="text-sm text-gray-600 mt-1">Load a saved template</p>
        </div>

        <div className="p-6 overflow-y-auto max-h-96">
          {templates.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Grid3x3 className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>No saved templates</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {templates.map(template => (
                <div
                  key={template.id}
                  onClick={() => onLoad(template)}
                  className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-cyan-500 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-900 truncate">{template.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{template.description}</p>
                  <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                    <span>{template.rows}×{template.cols}</span>
                    <span>•</span>
                    <span>{template.cells.length} cells</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
