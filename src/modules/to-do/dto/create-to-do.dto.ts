export interface CreateToDoDTO { 
  title: string;
  description: string | null;
  completed?: boolean;
}