// Inspired by https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore

type Key = string | number | symbol;

export function keyBy<T>(array: T[], key: keyof T): { [key: Key]: T } {
  return (array ?? []).reduce(
    (acc, currentItem: T) => ({
      ...acc,
      [(key ? currentItem[key] : currentItem) as Key]: currentItem,
    }),
    {} as { [key: Key]: T }
  );
}

export function groupBy<T>(arr: T[], fn: (_: T) => Key): { [key: Key]: T[] } {
  return arr.reduce((prev, curr) => {
    const groupKey = fn(curr);
    const group = prev[groupKey] ?? [];
    group.push(curr);
    return { ...prev, [groupKey]: group };
  }, {} as { [key: Key]: T[] });
}
