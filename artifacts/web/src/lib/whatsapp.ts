export function openWhatsApp(message: string) {
  const url = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}