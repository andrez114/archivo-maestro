import { ICiudad } from './../models/ciudad';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CiudadService {
  public apiRoot: string;

  constructor(public http: HttpClient, public configService: ConfigService) {
    this.apiRoot = configService.config.webApiBaseUrl + '/ciudads';
  }

  obtener(parametros?: any): Observable<any> {
    return this.http.get(this.apiRoot, { params: parametros });
  }

  obtenerPorId(id): Observable<any> {
    return this.http.get(`${this.apiRoot}/${id}`);
  }

  guardar(ciudad: ICiudad): Observable<any> {
    return this.http.post(this.apiRoot, ciudad);
  }

  actualizar(ciudad: ICiudad): Observable<any> {
    return this.http.put(`${this.apiRoot}/${ciudad.id}`, ciudad);
  }

  eliminar(id: number, params?: any): Observable<any> {
    const options = {
      body: {
        id,
        params,
      },
    };
    // SIN BODI REQUEST
    // return this.http.delete(`${this.apiRoot}/${id}`);

    // CON BODY REQUEST
    return this.http.request('delete', `${this.apiRoot}/${id}`, options);
  }
}
