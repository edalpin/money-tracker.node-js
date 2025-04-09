export class Expense {
  constructor(
    public id: string,
    public label: string,
    public category: string,
    public value: number,
    public date: Date,
  ) {}
}
