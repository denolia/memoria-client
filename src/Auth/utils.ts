export function getUsernameInitials(name: string | null | undefined) {
  if (!name) return "";

  return `${name[0]?.toUpperCase()}`;
}
