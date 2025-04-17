export const movementTypeOptions = {
  expense: "expense",
  income: "income",
} as const;

export type MovementType = keyof typeof movementTypeOptions;

export class MovementEntity {
  constructor(
    public id: string,
    public name: string,
    public type: MovementType,
    public category: string,
    public amount: number,
    public createdAt: Date,
  ) {}
}
