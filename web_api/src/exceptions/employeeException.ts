import HttpException from './httpException';

export class EmployeeAlreadyExistsException extends HttpException {
  constructor(data: string) {
    super(500, `Employee ${data} is exist.`);
  }
}

export class EmailAlreadyExistsException extends HttpException {
  constructor(data: string) {
    super(500, `Email ${data} is exist.`);
  }
}

