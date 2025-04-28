type ToDoProps = {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class ToDo {
  public id: string;
  public title: string;
  public description: string | null;
  public completed: boolean;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(props: ToDoProps) {
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.completed = props.completed ?? false;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  markAsCompleted() {
    this.completed = true;
    this.updatedAt = new Date();
  }

  update(title: string, description: string) {
    this.title = title;
    this.description = description;
    this.updatedAt = new Date();
  }
}
