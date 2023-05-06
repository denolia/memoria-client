// a little function to help us with reordering the result
export const reorder = <T>(list: T[], startIndex: number, endIndex: number): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export function moveItem<T>(
  sourceList: T[],
  startIndex: number,
  destinationList: T[],
  destinationIndex: number
) {
  const startTaskIds = Array.from(sourceList);
  const [removed] = startTaskIds.splice(startIndex, 1);

  const finishTaskIds = Array.from(destinationList);
  finishTaskIds.splice(destinationIndex, 0, removed);
  return { startTaskIds, finishTaskIds, removed };
}
