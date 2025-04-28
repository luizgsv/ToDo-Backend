export interface UpdateToDoDTO {
  title: string;
  description: string | null;
  completed?: boolean;
}