export class EmployeeOrgApp implements IEmployeeOrgApp {
  ceo: IEmployee;

  constructor(ceo: IEmployee) {
    this.ceo = ceo;
  }

  move(employeeId: number, supervisorId: number) {}

  undo() {}

  redo() {}
}
