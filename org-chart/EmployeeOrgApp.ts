export class EmployeeOrgApp implements IEmployeeOrgApp {
  ceo: IEmployee;
  private history: string[] = [];
  private undoAction: any[] = [];

  constructor(ceo: IEmployee) {
    this.ceo = ceo;
  }

  private getSuperVisor(employeeId: number, employee: IEmployee): IEmployee {
    let subordinate: IEmployee;
    for (let i = 0; i < employee.subordinates.length; i++) {
      subordinate = employee.subordinates[i];
      if (subordinate.uniqueId === employeeId) {
        return employee;
      } else if (subordinate.subordinates.length > 0 && this.getSuperVisor(employeeId, subordinate)) {
        return employee;
      }
    }
  }

  /**
   * returns an employee from the employee hierarchy and plucks if required
   */
  private getEmployee(employeeId: number, subordinates: IEmployee[], pluck: boolean = false): IEmployee {
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
        employeeFound = this.getEmployee(employeeId, employee.subordinates, pluck);
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
    const currentSuperVisorId = this.getSuperVisor(employeeId, this.ceo).uniqueId;
    const employee = this.getEmployee(employeeId, this.ceo.subordinates, true);
    const newSupervisor = this.getEmployee(supervisorId, this.ceo.subordinates);
    newSupervisor.subordinates.push(employee);
    if (currentSuperVisorId) {
      this.history.push(`${currentSuperVisorId}-${employee.uniqueId}-${supervisorId}`);
    }
  }

  /**
   * undo the last operation
   */
  undo() {
    this.undoAction = this.history.pop().split('-');
    this.move(Number(this.undoAction[1]), Number(this.undoAction[0]));
  }

  /**
   * redo the last operation
   */
  redo() {
    this.move(Number(this.undoAction[1]), Number(this.undoAction[2]));
  }
}
