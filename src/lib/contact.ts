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

export function getContactEmailHref(
  recipient: string | null,
  fields: { name: string; email: string; message: string },
) {
  if (!recipient || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(recipient))
    return null;
  const body = `Nume: ${fields.name.trim()}\nE-mail: ${fields.email.trim()}\n\n${fields.message.trim()}`;
  return `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent("Mesaj de pe website FASON")}&body=${encodeURIComponent(body)}`;
}
