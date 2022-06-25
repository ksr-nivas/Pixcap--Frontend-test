interface IEmployeeOrgApp {
  ceo: IEmployee;
  move(employeeId: number, supervisorId: number): void;
  undo(): void;
  redo(): void;
}
