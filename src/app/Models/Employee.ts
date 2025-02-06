export class Employee
{
    empid:number;
    empname:string;
    empemail:string;
    empphone:string;
    empaddress:string;
    empgender:number;
    empdept:number;
    empstate:number;
    empcity:number;
    empsal:number;
}

export class EmpExt extends Employee {
    empstatename:string;
    empcityname:string;
    empdeptname:string;
    empgendername:string;
}