export class EmployeeOrgApp implements IEmployeeOrgApp {
  ceo: IEmployee;
  history: any[] = [];

  constructor(ceo: IEmployee) {
    this.ceo = ceo;
  }

  /**
   * returns an employee from the employee hierarchy and plucks if required
   */
  private getEmployee(
    employeeId: number,
    subordinates: IEmployee[],
    pluck: boolean = false
  ): IEmployee {
    if (this.ceo.uniqueId === employeeId) {
      return this.ceo;
    }
    let employee, employeeFound;
    for (let e = 0; e < subordinates.length; e++) {
      employee = subordinates[e];
      if (employee.uniqueId === employeeId) {
        if (pluck) {
          subordinates.splice(e, 1);
        }
        return employee;
      } else if (employee.subordinates.length > 0) {
        employeeFound = this.getEmployee(
          employeeId,
          employee.subordinates,
          pluck
        );
        if (employeeFound) {
          return employeeFound;
        }
      }
    }
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
    const employee = this.getEmployee(employeeId, this.ceo.subordinates, true);
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

class MoveCommand {
  employeeId: number;
  supervisorId: number;

  constructor(employeeId: number, supervisorId: number) {
    this.employeeId = employeeId;
    this.supervisorId = supervisorId;
  }

  execute() {}
}
