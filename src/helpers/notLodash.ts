export function keyBy<T>(array: T[], key: keyof T): { [key: string]: T } {
  return (array ?? []).reduce((r, x) => ({ ...r, [(key ? x[key] : x) as string]: x }), {});
}

export function groupBy<T>(arr: T[], fn: (_: T) => any) {
  return arr.reduce<Record<string, T[]>>((prev, curr) => {
    const groupKey = fn(curr);
    const group = prev[groupKey] ?? [];
    group.push(curr);
    return { ...prev, [groupKey]: group };
  }, {});
}
