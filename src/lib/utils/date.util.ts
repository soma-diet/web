import { UtilError } from "./errors";

/* dateString = YYYY-MM-DD
*/
export function makeDateFromDateString(dateString: string): Date {
  const strParts = dateString.split("-");
  if (strParts.length !== 3) throw new UtilError(`Invalid ISO string - invalid length <${dateString}>`);

  const [year, month, day] = strParts.map(Number);
  if (!year || !month || !day) throw new UtilError(`Invalid ISO string - invalid content <${dateString}>`)
  
  return new Date(year, month - 1, day); // mesice v Date indexuji od 0
}

// incoming iso should have 00 as time
export function makeDateFromISO(iso: string): Date {
  const isoFirstPart = iso.split("T")[0];
  if (!isoFirstPart) throw new UtilError(`Invalid ISO string - missing 'T' <${iso}>`);

  return makeDateFromDateString(isoFirstPart);
}

export function makeDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  
  return `${year}-${month}-${day}`;
}

/* target format = YYYY-MM-DDTHH:MM:SS
 */
export function makeLocalDateFormat(date: Date): string {
  const datePart = makeDateString(date);
  const timePart = "00:00:00";
  return `${datePart}T${timePart}`;
}