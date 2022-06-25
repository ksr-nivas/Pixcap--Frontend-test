export class EmployeeOrgApp implements IEmployeeOrgApp {
  ceo: IEmployee;
  history: any[] = [];

  constructor(ceo: IEmployee) {
    this.ceo = ceo;
  }

  /**
   * returns an employee from the employee hierarchy
   */
  private getEmployee(
    employeeId: number,
    subordinates: IEmployee[]
  ): IEmployee {
    return subordinates.find((employee) => {
      if (employee.uniqueId === employeeId) {
        return employee;
      } else if (employee.subordinates.length > 0) {
        return this.getEmployee(employeeId, employee.subordinates);
      }
    });
  }

  /**
   * moves an employee from one supervisor to another
   */
  move(employeeId: number, supervisorId: number) {
    // we cannot be able to move an employee as subordinate to himself
    // we cannot be able to move ceo as subordinate to any other employee in the organization
    if (employeeId === supervisorId || this.ceo.uniqueId === employeeId) {
      return;
    }

    const employee = this.getEmployee(employeeId, this.ceo.subordinates);
    const supervisor = this.getEmployee(supervisorId, this.ceo.subordinates);
    supervisor.subordinates.push(employee);
    this.history.push();
  }

  /**
   * undo the last operation
   */
  undo() {}

  /**
   * redo the last operation
   */
  redo() {}
}
