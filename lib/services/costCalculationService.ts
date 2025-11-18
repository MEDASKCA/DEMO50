// Cost Calculation Service
// Estimates procedure costs based on PCS complexity scores
// Uses simplified NHS tariff model

/**
 * Calculate estimated procedure cost based on PCS score
 * Based on NHS tariff bands and typical procedure costs
 */
export function calculateProcedureCost(pcsScore: number, specialty?: string): number {
  // Base cost by PCS score range
  let baseCost = 0;

  if (pcsScore <= 5) {
    // Minor procedures: £800-£1,200
    baseCost = 800 + (pcsScore * 80);
  } else if (pcsScore <= 8) {
    // Standard procedures: £2,000-£4,000
    baseCost = 2000 + ((pcsScore - 5) * 666);
  } else if (pcsScore <= 12) {
    // Major procedures: £5,000-£8,000
    baseCost = 5000 + ((pcsScore - 8) * 750);
  } else {
    // Complex major: £10,000-£15,000
    baseCost = 10000 + ((pcsScore - 12) * 1250);
  }

  // Specialty modifiers (some specialties have higher tariffs)
  const specialtyMultiplier = getSpecialtyTariffMultiplier(specialty);

  return Math.round(baseCost * specialtyMultiplier);
}

/**
 * Get specialty tariff multiplier
 * Some specialties have higher NHS tariffs due to equipment/complexity
 */
function getSpecialtyTariffMultiplier(specialty?: string): number {
  if (!specialty) return 1.0;

  const specialtyLower = specialty.toLowerCase();

  // Higher cost specialties
  if (specialtyLower.includes('cardiac')) return 1.5;
  if (specialtyLower.includes('neurosurg')) return 1.4;
  if (specialtyLower.includes('transplant')) return 1.6;
  if (specialtyLower.includes('vascular')) return 1.2;
  if (specialtyLower.includes('spine')) return 1.3;

  // Standard cost specialties
  if (specialtyLower.includes('ortho')) return 1.1;
  if (specialtyLower.includes('general surgery')) return 1.0;
  if (specialtyLower.includes('gynaecology')) return 0.9;
  if (specialtyLower.includes('urology')) return 1.0;

  // Lower cost specialties
  if (specialtyLower.includes('ent')) return 0.8;
  if (specialtyLower.includes('ophthalmology')) return 0.7;
  if (specialtyLower.includes('endoscopy')) return 0.6;

  return 1.0; // Default
}

/**
 * Calculate total session revenue
 */
export function calculateSessionRevenue(
  procedureCosts: number[]
): number {
  return procedureCosts.reduce((sum, cost) => sum + cost, 0);
}

/**
 * Calculate revenue per minute of theatre time
 */
export function calculateRevenuePerMinute(
  totalRevenue: number,
  totalMinutes: number
): number {
  if (totalMinutes === 0) return 0;
  return totalRevenue / totalMinutes;
}

/**
 * Calculate potential revenue lost due to unused theatre time
 */
export function calculatePotentialRevenueLost(
  revenuePerMinute: number,
  unusedMinutes: number
): number {
  return Math.round(revenuePerMinute * unusedMinutes);
}

/**
 * Get cost summary statistics for display
 */
export interface CostSummary {
  totalRevenue: number;
  averageCostPerCase: number;
  revenuePerMinute: number;
  potentialRevenueLost: number;
  utilizationPercentage: number;
}

export function calculateCostSummary(
  procedureCosts: number[],
  totalMinutesUsed: number,
  totalMinutesAvailable: number
): CostSummary {
  const totalRevenue = calculateSessionRevenue(procedureCosts);
  const averageCostPerCase = procedureCosts.length > 0
    ? Math.round(totalRevenue / procedureCosts.length)
    : 0;

  const revenuePerMinute = calculateRevenuePerMinute(totalRevenue, totalMinutesUsed);
  const unusedMinutes = totalMinutesAvailable - totalMinutesUsed;
  const potentialRevenueLost = calculatePotentialRevenueLost(revenuePerMinute, unusedMinutes);
  const utilizationPercentage = totalMinutesAvailable > 0
    ? Math.round((totalMinutesUsed / totalMinutesAvailable) * 100)
    : 0;

  return {
    totalRevenue,
    averageCostPerCase,
    revenuePerMinute,
    potentialRevenueLost,
    utilizationPercentage
  };
}

/**
 * Format currency for display (£X,XXX)
 */
export function formatCurrency(amount: number): string {
  return `£${amount.toLocaleString('en-GB')}`;
}
