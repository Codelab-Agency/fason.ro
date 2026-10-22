/** Contact numbers are configured in international format, including country code. */
export function getPhoneHref(phone: string | null) {
  const number = phone?.replace(/[\s().-]/g, "");
  return number && /^\+?[1-9]\d{6,14}$/.test(number) ? `tel:${number}` : null;
}

export function getWhatsAppHref(phone: string | null, service?: string) {
  const number = phone?.replace(/[\s()+.-]/g, "");
  if (!number || !/^[1-9]\d{6,14}$/.test(number)) return null;

  const message = service
    ? `Bună! Mă interesează ${service}. Aș vrea să discutăm despre o vizită la FASON.`
    : "Bună! Aș vrea să discutăm despre o vizită la FASON.";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
