import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrls } from 'src/app/Models/ApiUrls';
import { EmpExt, Employee } from 'src/app/Models/Employee';
import { KeyValue } from 'src/app/Models/KeyValues';

@Injectable({
  providedIn: 'root',
})
export class EmployeeApi {
  constructor(private http: HttpClient) {}

  async getAllEmps(): Promise<Observable<EmpExt[]>> {
    return await this.http.post<EmpExt[]>(
      ApiUrls.EmployeeURL + 'GetAllEmps',
      ''
    );
  }

  async getEmpsByName(kv: KeyValue): Promise<Observable<EmpExt[]>> {
    return await this.http.post<EmpExt[]>(
      ApiUrls.EmployeeURL + 'GetEmpsByName',
      kv
    );
  }

  getEmpById(kv: KeyValue): Observable<EmpExt> {
    return this.http.post<EmpExt>(ApiUrls.EmployeeURL + 'GetEmpById', kv);
  }

  async addOrUpdateEmp(employee: Employee): Promise<Observable<boolean>> {
    return await this.http.post<boolean>(
      ApiUrls.EmployeeURL + 'AddorUpdateEmp',
      employee
    );
  }

  async deleteEmp(employee: Employee): Promise<Observable<boolean>> {
    return await this.http.post<boolean>(
      ApiUrls.EmployeeURL + 'DeleteEmp',
      employee
    );
  }
}
