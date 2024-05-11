import { Injectable } from '@angular/core';
import { ICentro } from '../models/centro';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CentroService {
  public apiRoot: string;

  constructor(public http: HttpClient, public configService: ConfigService) {
    this.apiRoot = configService.config.webApiBaseUrl + '/centros';
  }

  obtener(parametros?: any): Observable<any> {
    return this.http.get(this.apiRoot, { params: parametros });
  }

  obtenerPorId(id: number, queryParams?: any): Observable<any> {
    return this.http.get(`${this.apiRoot}/${id}`, { params: queryParams });
  }

  guardar(centro: ICentro): Observable<any> {
    return this.http.post(this.apiRoot, centro);
  }

  actualizar(centro: ICentro): Observable<any> {
    return this.http.put(`${this.apiRoot}/${centro.id}`, centro);
  }

  eliminar(id: number, params?: any): Observable<any> {
    const options = {
      body: {
        params,
      },
    };
    // SIN BODY REQUEST
    // return this.http.delete(`${this.apiRoot}/${id}`, options);

    // CON BODY REQUEST
    return this.http.request('delete', `${this.apiRoot}/${id}`, options);
  }

  obtenerPdf(): Observable<any> {
    return this.http.get(`${this.apiRoot}/pdf`, { responseType: 'blob' });
  }
}
