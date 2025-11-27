/**
 * Tarihi Türkçe formatta formatlar
 * @param date - Formatlanacak tarih (string veya Date)
 * @returns Türkçe formatlanmış tarih string'i veya boş string
 */
export function formatTurkishDate(date: string | Date | null | undefined): string {
  if (!date) return "";
  
  const d = new Date(date);
  
  if (Number.isNaN(d.getTime())) {
    return String(date);
  }
  
  return d.toLocaleDateString("tr-TR");
}

/**
 * Saat değerini formatlar
 * @param hours - Saat değeri
 * @returns Formatlanmış saat string'i ("5h" gibi)
 */
export function formatHours(hours: number | null | undefined): string {
  return hours != null ? `${hours}h` : "";
}
