type CategoryProps = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};
export class Category {
  public id: string;
  public name: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(props: CategoryProps) {
    this.id = props.id;
    this.name = props.name;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  update(name: string) {
    this.name = name,
    this.updatedAt = new Date()
  }
}
