export function formatCurrency(value: number): string {
  return `£${Math.floor(value).toLocaleString()}`;
}

export function formatMileage(value: number): string {
  return `${Math.floor(value).toLocaleString()} km`;
}

export function formatNumber(value: number): string {
  return Math.floor(value).toLocaleString();
}

export function formatAuctionDate(value: string): string {
  const date: Date = new Date(value);
  const timestamp: number = date.getTime();

  if (Number.isNaN(timestamp)) {
    return value;
  }

  const day: number = date.getDate();
  const month: string = date.toLocaleString('en-GB', { month: 'short' });
  const year: number = date.getFullYear();
  const hours: string = String(date.getHours()).padStart(2, '0');
  const minutes: string = String(date.getMinutes()).padStart(2, '0');

  return `${month} ${String(day).padStart(2, '0')} ${year} ${hours}:${minutes}`;
}

export function formatAuctionCountdown(auctionDateTime: string): string {
  const nowMs: number = Date.now();
  const auctionMs: number = new Date(auctionDateTime).getTime();

  if (Number.isNaN(auctionMs) || auctionMs <= nowMs) {
    return 'LIVE NOW';
  }

  const diffMinutes: number = Math.floor((auctionMs - nowMs) / 60_000);
  const hours: number = Math.floor(diffMinutes / 60);
  const minutes: number = diffMinutes % 60;

  return `${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
}
