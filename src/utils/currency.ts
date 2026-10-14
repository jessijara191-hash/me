import { CountryCode } from '../types';

// Approximate live exchange rates
export const USD_TO_BDT = 120.0;
export const USD_TO_CAD = 1.36;
export const USD_TO_GBP = 0.78;

export function calculateSellingPrice(costUSD: number, marginPercent: number = 20): number {
  return Number((costUSD * (1 + marginPercent / 100)).toFixed(2));
}

export function calculateProfit(costUSD: number, marginPercent: number = 20): number {
  return Number((costUSD * (marginPercent / 100)).toFixed(2));
}

export function convertUSDToBDT(usd: number): number {
  return Math.round(usd * USD_TO_BDT);
}

export function formatPrice(amountUSD: number, currency: 'USD' | 'BDT' | 'CAD' | 'GBP' = 'USD'): string {
  switch (currency) {
    case 'BDT':
      return `৳${Math.round(amountUSD * USD_TO_BDT).toLocaleString('bn-BD')}`;
    case 'CAD':
      return `CA$${(amountUSD * USD_TO_CAD).toFixed(2)}`;
    case 'GBP':
      return `£${(amountUSD * USD_TO_GBP).toFixed(2)}`;
    case 'USD':
    default:
      return `$${amountUSD.toFixed(2)}`;
  }
}

export function getCountryFlag(code: CountryCode): string {
  switch (code) {
    case 'BD':
      return '🇧🇩';
    case 'US':
      return '🇺🇸';
    case 'CA':
      return '🇨🇦';
    case 'UK':
      return '🇬🇧';
    default:
      return '🌐';
  }
}

export function getCountryName(code: CountryCode): string {
  switch (code) {
    case 'BD':
      return 'Bangladesh (বাংলাদেশ)';
    case 'US':
      return 'United States (ইউএসএ)';
    case 'CA':
      return 'Canada (কানাডা)';
    case 'UK':
      return 'United Kingdom (ইউকে)';
    default:
      return 'Global';
  }
}
