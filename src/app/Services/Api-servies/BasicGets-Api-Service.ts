import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrls } from 'src/app/Models/ApiUrls';
import { City } from 'src/app/Models/City';
import { Department } from 'src/app/Models/Department';
import { Gender } from 'src/app/Models/Gender';
import { KeyValue } from 'src/app/Models/KeyValues';
import { State } from 'src/app/Models/State';

@Injectable({
  providedIn: 'root',
})
export class BasicGets {
  constructor(private http: HttpClient) {}

  async getAllGenders(): Promise<Observable<Gender[]>> {
    return await this.http.post<Gender[]>(ApiUrls.BasicGetURL + 'GetAllGenders', '');
  }

  async getAllDepts(): Promise<Observable<Department[]>> {
    return await this.http.post<Department[]>(
      ApiUrls.BasicGetURL + 'GetAllDepts',
      ''
    );
  }

  async getAllStates(): Promise<Observable<State[]>> {
    return await this.http.post<State[]>(ApiUrls.BasicGetURL + 'GetAllStates', '');
  }

  async getCitiesBystates(kv: KeyValue): Promise<Observable<City[]>> {
    return await this.http.post<City[]>(
      ApiUrls.BasicGetURL + 'GetCitiesByStates',
      kv
    );
  }
}
