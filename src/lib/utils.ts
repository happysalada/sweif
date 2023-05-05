import { Decimal } from "decimal.js"

export function humanReadableDatetime(date: Date): string {
  let formattedDate = humanReadableDate(date);

  const hours = String(date.getHours()).padStart(2, "0");

  const minutes = String(date.getMinutes()).padStart(2, "0");

  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${formattedDate}  ${hours}:${minutes}:${seconds}`;
}

export function humanReadableDate(date: Date): string {
  
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`
}

export const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export function clickOutside(node: HTMLElement): { destroy: () => void } {
  const handleClick = (event: MouseEvent): void => {
    if (!node.contains(event.target as Node)) {
      node.dispatchEvent(new CustomEvent('outclick'));
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
  };
}

export function decimalToStringTable(table: FeeRateRange[]): FeeRateRangeString[] {
  return table.map(({ min, max, rate }) => ({ min: min.toString(), max: max.toString(), rate: rate.toString() }))
}

export function stringToDecimalTable(table: FeeRateRangeString[]): FeeRateRange[] {
  return table.map(({ min, max, rate }) => ({ min: new Decimal(min), max: new Decimal(max), rate: new Decimal(rate) }))
}
