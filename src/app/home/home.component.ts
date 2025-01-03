import { Component, OnInit } from '@angular/core';
import { EmpExt } from '../Models/Employee';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from '../Services/Storage-services/StorageService';
import { EmployeeApi } from '../Services/Api-servies/Employee-Api-Service';
import { KeyValue } from '../Models/KeyValues';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  employees: EmpExt[] = [];
  selectedEmp: EmpExt = new EmpExt();
  clickedView: boolean = false;

  constructor(
    private empapi: EmployeeApi,
    private router: Router,
    private storage: StorageService
  ) {}

  ngOnInit() {
    console.log('HomeComponent');
    this.getAllEmployees();
  }

  async getAllEmployees() {
    (await this.empapi.getAllEmps()).subscribe((result: EmpExt[]) => {
      if (result.length > 0) {
        this.employees = result;
      } else {
        this.employees = [];
      }
    });
  }

  getEmpsName(name: string) {
    this.getEmpsByName(name);
  }

  async getEmpsByName(ename: string) {
    var kv = new KeyValue();
    kv.value1 = ename;
    (await this.empapi.getEmpsByName(kv)).subscribe((result: EmpExt[]) => {
      if (result.length > 0) {
        this.employees = result;
      } else {
        this.employees = [];
      }
    });
  }

  addEmp() {
    this.storage.set('empbyid', '');
    this.router.navigate(['/signup']);
  }

  async deleteEmployee() {
    if (this.selectedEmp) {
      (await this.empapi.deleteEmp(this.selectedEmp)).subscribe(
        (result: boolean) => {
          if (result) {
            this.employees = this.employees.filter(
              (x) => x.empid !== this.selectedEmp.empid
            );
            this.selectedEmp = null;
          }
        }
      );
    }
  }

  onView(id: number) {
    this.storage.set('empbyid', JSON.stringify({ id: id, isView: true }));
    this.router.navigate(['/signup']);
  }

  async getEmployeeDetailsById(id: number) {
    var kv = new KeyValue();
    kv.key1 = id;
    await this.empapi.getEmpById(kv).subscribe((result: EmpExt) => {
      this.selectedEmp = result;
    });
  }

  onEdit(id: number) {
    this.storage.set('empbyid', JSON.stringify({ id: id, isView: false }));
    this.router.navigate(['/signup']);
  }
}
