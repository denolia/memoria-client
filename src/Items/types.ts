export interface Item {
  // todo remove old props
  name: string;
  author: string;
  description: string;
  progress: number;
  id?: string;
  // new props
  title?: string;
  type: string;
}
