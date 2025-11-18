// Barcode Scanner Service
// ORCA-level barcode and QR code scanning for inventory management

export interface ScanResult {
  success: boolean;
  code: string;
  format: 'barcode' | 'qr' | 'unknown';
  timestamp: Date;
  error?: string;
}

export interface ScannerConfig {
  enableCamera: boolean;
  enableUSB: boolean;
  autoFocus: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

/**
 * Initializes barcode scanner with HTML5 camera
 */
export async function initializeCameraScanner(
  videoElement: HTMLVideoElement,
  onScan: (result: ScanResult) => void
): Promise<{ success: boolean; error?: string; stream?: MediaStream }> {
  try {
    // Check if browser supports getUserMedia
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return {
        success: false,
        error: 'Camera access not supported in this browser'
      };
    }

    // Request camera access
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment', // Use rear camera on mobile
        width: { ideal: 1920 },
        height: { ideal: 1080 }
      }
    });

    // Set video source
    videoElement.srcObject = stream;
    videoElement.setAttribute('playsinline', 'true'); // Required for iOS

    return {
      success: true,
      stream
    };
  } catch (error: any) {
    console.error('Error initializing camera scanner:', error);
    return {
      success: false,
      error: error.message || 'Failed to access camera'
    };
  }
}

/**
 * Stops camera scanner
 */
export function stopCameraScanner(stream: MediaStream): void {
  stream.getTracks().forEach(track => track.stop());
}

/**
 * Processes barcode from image data
 * Uses BarcodeDetector API if available
 */
export async function detectBarcodeFromImage(
  imageData: ImageData | HTMLCanvasElement | HTMLImageElement | Blob
): Promise<ScanResult> {
  try {
    // Check if BarcodeDetector is supported
    if ('BarcodeDetector' in window) {
      const barcodeDetector = new (window as any).BarcodeDetector({
        formats: [
          'code_128',
          'code_39',
          'code_93',
          'codabar',
          'ean_13',
          'ean_8',
          'itf',
          'upc_a',
          'upc_e',
          'qr_code',
          'aztec',
          'data_matrix',
          'pdf417'
        ]
      });

      const barcodes = await barcodeDetector.detect(imageData);

      if (barcodes.length > 0) {
        const barcode = barcodes[0];
        return {
          success: true,
          code: barcode.rawValue,
          format: barcode.format.includes('qr') ? 'qr' : 'barcode',
          timestamp: new Date()
        };
      }
    }

    return {
      success: false,
      code: '',
      format: 'unknown',
      timestamp: new Date(),
      error: 'No barcode detected'
    };
  } catch (error: any) {
    console.error('Error detecting barcode:', error);
    return {
      success: false,
      code: '',
      format: 'unknown',
      timestamp: new Date(),
      error: error.message || 'Barcode detection failed'
    };
  }
}

/**
 * Simulates USB barcode scanner input
 * USB scanners typically act as keyboard input
 */
export function initializeUSBScanner(
  onScan: (result: ScanResult) => void
): { cleanup: () => void } {
  let buffer = '';
  let lastKeyTime = Date.now();

  const handleKeyPress = (event: KeyboardEvent) => {
    const currentTime = Date.now();

    // Reset buffer if too much time has passed (> 100ms between keystrokes)
    if (currentTime - lastKeyTime > 100) {
      buffer = '';
    }

    lastKeyTime = currentTime;

    // USB scanners typically end with Enter key
    if (event.key === 'Enter' && buffer.length > 0) {
      onScan({
        success: true,
        code: buffer,
        format: 'barcode',
        timestamp: new Date()
      });
      buffer = '';
      event.preventDefault();
    } else if (event.key.length === 1) {
      // Add character to buffer
      buffer += event.key;
    }
  };

  document.addEventListener('keypress', handleKeyPress);

  return {
    cleanup: () => {
      document.removeEventListener('keypress', handleKeyPress);
    }
  };
}

/**
 * Plays scan success sound
 */
export function playScanSuccessSound(): void {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (error) {
    console.error('Error playing scan sound:', error);
  }
}

/**
 * Triggers vibration feedback (mobile devices)
 */
export function vibrateOnScan(): void {
  if ('vibrate' in navigator) {
    navigator.vibrate(100);
  }
}

/**
 * Validates barcode format
 */
export function validateBarcodeFormat(code: string): {
  valid: boolean;
  format?: string;
  error?: string;
} {
  if (!code || code.length === 0) {
    return { valid: false, error: 'Empty code' };
  }

  // EAN-13 (13 digits)
  if (/^\d{13}$/.test(code)) {
    return { valid: true, format: 'EAN-13' };
  }

  // EAN-8 (8 digits)
  if (/^\d{8}$/.test(code)) {
    return { valid: true, format: 'EAN-8' };
  }

  // UPC-A (12 digits)
  if (/^\d{12}$/.test(code)) {
    return { valid: true, format: 'UPC-A' };
  }

  // Code 128 (alphanumeric)
  if (/^[\x20-\x7E]+$/.test(code)) {
    return { valid: true, format: 'Code 128' };
  }

  // QR Code (any characters)
  if (code.length > 0) {
    return { valid: true, format: 'QR Code' };
  }

  return { valid: false, error: 'Unknown format' };
}

/**
 * Generates QR code for inventory item
 */
export async function generateQRCodeForItem(
  itemId: string,
  itemName: string
): Promise<string> {
  // Returns data URL for QR code
  // In production, use a proper QR code library like qrcode.js
  const qrData = JSON.stringify({
    type: 'inventory',
    id: itemId,
    name: itemName,
    timestamp: new Date().toISOString()
  });

  // This is a placeholder - integrate with actual QR code library
  return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><text x="10" y="100">${qrData}</text></svg>`;
}

/**
 * Batch scanner for multiple items
 */
export class BatchScanner {
  private scannedItems: Set<string> = new Set();
  private onBatchUpdate: (items: string[]) => void;

  constructor(onBatchUpdate: (items: string[]) => void) {
    this.onBatchUpdate = onBatchUpdate;
  }

  addScan(code: string): void {
    if (!this.scannedItems.has(code)) {
      this.scannedItems.add(code);
      this.onBatchUpdate(Array.from(this.scannedItems));
      playScanSuccessSound();
      vibrateOnScan();
    }
  }

  removeScan(code: string): void {
    this.scannedItems.delete(code);
    this.onBatchUpdate(Array.from(this.scannedItems));
  }

  clearAll(): void {
    this.scannedItems.clear();
    this.onBatchUpdate([]);
  }

  getScannedItems(): string[] {
    return Array.from(this.scannedItems);
  }

  getCount(): number {
    return this.scannedItems.size;
  }
}

/**
 * Continuous camera scanning
 */
export class ContinuousCameraScanner {
  private videoElement: HTMLVideoElement;
  private canvasElement: HTMLCanvasElement;
  private scanning: boolean = false;
  private onScan: (result: ScanResult) => void;
  private lastScanCode: string = '';
  private lastScanTime: number = 0;
  private scanInterval: number = 500; // Scan every 500ms

  constructor(
    videoElement: HTMLVideoElement,
    canvasElement: HTMLCanvasElement,
    onScan: (result: ScanResult) => void
  ) {
    this.videoElement = videoElement;
    this.canvasElement = canvasElement;
    this.onScan = onScan;
  }

  async start(): Promise<void> {
    const result = await initializeCameraScanner(this.videoElement, this.onScan);

    if (!result.success) {
      throw new Error(result.error);
    }

    this.scanning = true;
    this.scanLoop();
  }

  private async scanLoop(): Promise<void> {
    if (!this.scanning) return;

    const ctx = this.canvasElement.getContext('2d');
    if (ctx && this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      // Draw video frame to canvas
      this.canvasElement.width = this.videoElement.videoWidth;
      this.canvasElement.height = this.videoElement.videoHeight;
      ctx.drawImage(this.videoElement, 0, 0);

      // Detect barcode
      const result = await detectBarcodeFromImage(this.canvasElement);

      if (result.success) {
        const now = Date.now();
        // Only trigger callback if it's a new code or enough time has passed
        if (result.code !== this.lastScanCode || now - this.lastScanTime > 3000) {
          this.lastScanCode = result.code;
          this.lastScanTime = now;
          this.onScan(result);
          playScanSuccessSound();
          vibrateOnScan();
        }
      }
    }

    // Continue scanning
    setTimeout(() => this.scanLoop(), this.scanInterval);
  }

  stop(): void {
    this.scanning = false;
    const stream = this.videoElement.srcObject as MediaStream;
    if (stream) {
      stopCameraScanner(stream);
    }
  }

  isScanning(): boolean {
    return this.scanning;
  }
}
