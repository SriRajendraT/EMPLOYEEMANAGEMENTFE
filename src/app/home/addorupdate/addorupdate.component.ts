import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/Models/City';
import { Department } from 'src/app/Models/Department';
import { EmpExt, Employee } from 'src/app/Models/Employee';
import { Gender } from 'src/app/Models/Gender';
import { KeyValue } from 'src/app/Models/KeyValues';
import { State } from 'src/app/Models/State';
import { BasicGets } from 'src/app/Services/Api-servies/BasicGets-Api-Service';
import { EmployeeApi } from 'src/app/Services/Api-servies/Employee-Api-Service';
import { StorageService } from 'src/app/Services/Storage-services/StorageService';

@Component({
  selector: 'app-addorupdate',
  templateUrl: './addorupdate.component.html',
  styleUrls: ['./addorupdate.component.css'],
})
export class AddorupdateComponent implements OnInit {
  genders: Gender[] = [];
  departments: Department[] = [];
  states: State[] = [];
  cities: City[] = [];
  enableCity: boolean = false;
  empFormGroup: FormGroup = new FormGroup({});
  title: string = 'Register';
  isEdit: boolean = true;

  constructor(
    private bgapi: BasicGets,
    private empapi: EmployeeApi,
    private builder: FormBuilder,
    private router: Router,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    console.log('AddorupdateComponent');
    this.inItForm();
    this.getAllGenders();
    this.getAllDepts();
    this.getAllStates();
    this.onView();
  }

  inItForm() {
    this.empFormGroup = this.builder.group({
      empid: [0],
      empname: ['', [Validators.required]],
      empemail: ['', [Validators.required, Validators.email]],
      empphone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      empaddress: ['', [Validators.required]],
      empgender: [0, [Validators.required]],
      empdept: [0, [Validators.required, this.invalidZero]],
      empstate: [0, [Validators.required, this.invalidZero]],
      empcity: [0],
      empsal:[0,[Validators.required]],
      empdoj:['',[Validators.required]],
      empdob:['',[Validators.required]]
    });
    this.empFormGroup.controls['empcity'].disable();
  }

  async getAllGenders() {
    (await this.bgapi.getAllGenders()).subscribe((result: Gender[]) => {
      result.length > 0 ? (this.genders = result) : (this.genders = []);
    });
  }

  async getAllDepts() {
    (await this.bgapi.getAllDepts()).subscribe((result: Department[]) => {
      result.length > 0 ? (this.departments = result) : (this.departments = []);
    });
  }

  async getAllStates() {
    (await this.bgapi.getAllStates()).subscribe((result: State[]) => {
      result.length > 0 ? (this.states = result) : (this.states = []);
    });
  }

  getCitiesByStateId(event: any) {
    var state_id = parseInt(
      (event.target.value ?? '') == '' ? '0' : event.target.value
    );
    this.getCititesBySelectedState(state_id);
  }

  async getCititesBySelectedState(stateid: number) {
    var kv = new KeyValue();
    kv.key1 = stateid;
    (await this.bgapi.getCitiesBystates(kv)).subscribe((result: City[]) => {
      if (result.length > 0) {
        this.cities = result;
        this.empFormGroup.controls['empcity'].enable();
      } else {
        this.cities = [];
        this.empFormGroup.controls['empcity'].disable();
      }
    });
  }

  invalidZero(c: AbstractControl) {
    return c.value === 0 || c.value === '0' ? { invalidZero: true } : null;
  }

  onBack() {
    this.router.navigate(['']);
  }

  async addOrUpdateEmp() {
    let emp = this.empFormGroup.value as Employee;
    await (await this.empapi.addOrUpdateEmp(emp)).subscribe((result:boolean)=>{
      if (result) this.onBack();
    });
  }

  async onView() {
    let ch = this.storage.get('empbyid');
    if (ch) {
      let obj = JSON.parse(ch);
      var kv = new KeyValue();
      kv.key1 = obj.id;
      await this.empapi.getEmpById(kv).subscribe((result: EmpExt) => {
        if (result) {
          this.getCititesBySelectedState(result.empstate);
          this.empFormGroup.patchValue(result);
          if (obj.isView) {
            this.empFormGroup.disable();
            this.title = 'View';
          } else {
            this.title = 'Edit';
          }
          this.isEdit = !obj.isView;
        }
      });
    }
  }
  
}
