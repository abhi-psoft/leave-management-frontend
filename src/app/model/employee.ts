export class Employee {
  id!: number;
  name!: string;
  leaveType!: string;
  notes!: string;
  leaveStartDate!: string;
  leaveEndDate!: string;
  emailAddress!:string;
  status:boolean=false;
  


  constructor(
    _id: number,
    _name: string,
    _leaveStartDate: string,
    _leaveEndDate: string,
    _leaveType: string,
    _notes: string,
    _emailAddress:string,
    _status: boolean,
 ) { }
}

