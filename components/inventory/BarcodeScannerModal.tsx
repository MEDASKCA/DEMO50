'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  X,
  Scan,
  CheckCircle,
  AlertCircle,
  Loader2,
  Package,
  Zap,
  Maximize,
  Info
} from 'lucide-react';
import {
  initializeCameraScanner,
  stopCameraScanner,
  detectBarcodeFromImage,
  initializeUSBScanner,
  playScanSuccessSound,
  vibrateOnScan,
  validateBarcodeFormat,
  ContinuousCameraScanner,
  ScanResult
} from '@/lib/services/barcodeScannerService';

interface BarcodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (code: string, format: string) => void;
  title?: string;
  mode?: 'single' | 'batch';
}

export default function BarcodeScannerModal({
  isOpen,
  onClose,
  onScan,
  title = 'Scan Barcode',
  mode = 'single'
}: BarcodeScannerModalProps) {
  const [scanMethod, setScanMethod] = useState<'camera' | 'usb' | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [lastScan, setLastScan] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scannedItems, setScannedItems] = useState<string[]>([]);
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'pending'>('pending');

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scannerRef = useRef<ContinuousCameraScanner | null>(null);
  const usbCleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (isOpen && scanMethod === 'camera') {
      startCameraScanning();
    }

    return () => {
      cleanup();
    };
  }, [isOpen, scanMethod]);

  const startCameraScanning = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    try {
      setIsScanning(true);
      setError(null);

      const scanner = new ContinuousCameraScanner(
        videoRef.current,
        canvasRef.current,
        handleScanResult
      );

      await scanner.start();
      scannerRef.current = scanner;
      setCameraPermission('granted');
    } catch (err: any) {
      console.error('Camera scanning error:', err);
      setError(err.message || 'Failed to start camera');
      setCameraPermission('denied');
      setIsScanning(false);
    }
  };

  const startUSBScanning = () => {
    setIsScanning(true);
    setError(null);

    const { cleanup } = initializeUSBScanner(handleScanResult);
    usbCleanupRef.current = cleanup;
  };

  const handleScanResult = (result: ScanResult) => {
    if (!result.success) {
      setError(result.error || 'Scan failed');
      return;
    }

    setLastScan(result);
    setError(null);

    // Validate format
    const validation = validateBarcodeFormat(result.code);
    if (!validation.valid) {
      setError(validation.error || 'Invalid barcode format');
      return;
    }

    if (mode === 'batch') {
      // Batch mode - accumulate scans
      if (!scannedItems.includes(result.code)) {
        setScannedItems([...scannedItems, result.code]);
        playScanSuccessSound();
        vibrateOnScan();
      }
    } else {
      // Single mode - return immediately
      onScan(result.code, validation.format || result.format);
      playScanSuccessSound();
      vibrateOnScan();

      // Close modal after short delay
      setTimeout(() => {
        cleanup();
        onClose();
      }, 500);
    }
  };

  const cleanup = () => {
    if (scannerRef.current) {
      scannerRef.current.stop();
      scannerRef.current = null;
    }

    if (usbCleanupRef.current) {
      usbCleanupRef.current();
      usbCleanupRef.current = null;
    }

    setIsScanning(false);
  };

  const handleClose = () => {
    cleanup();
    onClose();
  };

  const handleBatchComplete = () => {
    scannedItems.forEach(code => {
      const validation = validateBarcodeFormat(code);
      onScan(code, validation.format || 'barcode');
    });
    handleClose();
  };

  const removeScannedItem = (code: string) => {
    setScannedItems(scannedItems.filter(item => item !== code));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Scan className="w-6 h-6" />
            <div>
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="text-xs text-white/80">
                {mode === 'batch' ? 'Scan multiple items' : 'Scan single item'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!scanMethod ? (
            /* Method Selection */
            <div className="space-y-4">
              <div className="text-center mb-6">
                <Scan className="w-16 h-16 mx-auto mb-3 text-cyan-600" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Choose Scan Method</h3>
                <p className="text-sm text-gray-600">
                  Select how you want to scan barcodes
                </p>
              </div>

              <button
                onClick={() => setScanMethod('camera')}
                className="w-full p-6 border-2 border-gray-300 rounded-xl hover:border-cyan-500 hover:bg-cyan-50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-cyan-100 rounded-xl flex items-center justify-center group-hover:bg-cyan-200 transition-colors">
                    <Camera className="w-8 h-8 text-cyan-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-bold text-gray-900 text-lg mb-1">Camera Scanner</h4>
                    <p className="text-sm text-gray-600">
                      Use your device camera to scan barcodes and QR codes
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded font-semibold">
                        Mobile Friendly
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded font-semibold">
                        QR Support
                      </span>
                    </div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  setScanMethod('usb');
                  startUSBScanning();
                }}
                className="w-full p-6 border-2 border-gray-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <Zap className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-bold text-gray-900 text-lg mb-1">USB Scanner</h4>
                    <p className="text-sm text-gray-600">
                      Use a USB barcode scanner for fast, commercial-grade scanning
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded font-semibold">
                        Professional
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded font-semibold">
                        Ultra Fast
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          ) : scanMethod === 'camera' ? (
            /* Camera Scanning View */
            <div className="space-y-4">
              {cameraPermission === 'denied' ? (
                <div className="text-center py-12">
                  <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Camera Access Denied</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Please allow camera access in your browser settings to use the scanner.
                  </p>
                  <button
                    onClick={() => setScanMethod(null)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Go Back
                  </button>
                </div>
              ) : (
                <>
                  {/* Camera View */}
                  <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    <canvas ref={canvasRef} className="hidden" />

                    {/* Scanning Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="relative">
                        {/* Scanning Frame */}
                        <div className="w-64 h-48 border-4 border-cyan-400 rounded-xl relative">
                          {/* Corner Markers */}
                          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-xl"></div>
                          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-xl"></div>
                          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-xl"></div>
                          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-xl"></div>

                          {/* Scanning Line Animation */}
                          {isScanning && (
                            <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-400 animate-pulse"></div>
                          )}
                        </div>

                        {/* Instructions */}
                        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap">
                          <p className="text-white text-sm font-semibold bg-black/50 px-4 py-2 rounded-full backdrop-blur">
                            {isScanning ? '📷 Position barcode in frame' : '⏸️ Camera starting...'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      {isScanning ? (
                        <div className="flex items-center gap-2 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-bold">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          SCANNING
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 bg-yellow-500 text-white px-3 py-1.5 rounded-full text-xs font-bold">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          STARTING
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Last Scan Result */}
                  {lastScan && (
                    <div className="p-4 bg-green-50 border-2 border-green-300 rounded-xl">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-bold text-green-900">Scan Successful!</p>
                          <p className="text-sm text-green-700 font-mono mt-1">{lastScan.code}</p>
                          <p className="text-xs text-green-600 mt-1">
                            Format: {lastScan.format.toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Error Display */}
                  {error && (
                    <div className="p-4 bg-red-50 border-2 border-red-300 rounded-xl">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="font-bold text-red-900">Scan Error</p>
                          <p className="text-sm text-red-700 mt-1">{error}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            /* USB Scanning View */
            <div className="text-center py-12 space-y-4">
              <div className="relative inline-block">
                <Zap className="w-20 h-20 text-purple-600 animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 border-4 border-purple-300 rounded-full animate-ping"></div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900">USB Scanner Ready</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Point your USB barcode scanner at an item and scan. The code will be captured automatically.
              </p>

              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
                Listening for scans...
              </div>

              {lastScan && (
                <div className="mt-6 p-4 bg-green-50 border-2 border-green-300 rounded-xl max-w-md mx-auto">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div className="flex-1 text-left">
                      <p className="font-bold text-green-900">Scan Successful!</p>
                      <p className="text-sm text-green-700 font-mono mt-1">{lastScan.code}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Batch Mode - Scanned Items List */}
          {mode === 'batch' && scannedItems.length > 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-xl border-2 border-gray-300">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-gray-900 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Scanned Items ({scannedItems.length})
                </h4>
                <button
                  onClick={() => setScannedItems([])}
                  className="text-xs text-red-600 hover:text-red-800 font-semibold"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {scannedItems.map((code, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg"
                  >
                    <span className="font-mono text-sm text-gray-900">{code}</span>
                    <button
                      onClick={() => removeScannedItem(code)}
                      className="text-red-600 hover:bg-red-50 p-1 rounded transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex gap-3 justify-end">
            {scanMethod && (
              <button
                onClick={() => {
                  cleanup();
                  setScanMethod(null);
                }}
                className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                Change Method
              </button>
            )}

            <button
              onClick={handleClose}
              className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Cancel
            </button>

            {mode === 'batch' && scannedItems.length > 0 && (
              <button
                onClick={handleBatchComplete}
                className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all font-semibold"
              >
                Complete ({scannedItems.length})
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
