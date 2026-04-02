import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount, includeSign = false) {
  const absAmount = Math.abs(amount);
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(absAmount);
  
  const sign = amount < 0 ? '- ' : (includeSign && amount > 0 ? '+ ' : '');
  return `${sign}${formatted}`;
}

export function formatCurrencyFull(amount, includeSign = true) {
  const absAmount = Math.abs(amount);
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(absAmount);

  const sign = amount < 0 ? '- ' : (includeSign && amount > 0 ? '+ ' : '');
  return `${sign}${formatted}`;
}
