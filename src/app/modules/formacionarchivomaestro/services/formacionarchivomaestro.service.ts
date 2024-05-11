import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormacionarchivomaestroService {

  constructor(
    private http: HttpClient) { }

  public consultarTiendas(opcion) {
    return this.http.get(environment.menuSorm + "api/v1/tiendas?opcion=" + opcion);
  }

  public formacionArchivoMaestro(opcionTienda, tienda, error, numEmpleado) {
    return this.http.get(environment.menuSorm + "api/v1/archivo/maestro?opcionTienda=" + opcionTienda
                                                                    + "&tienda=" + tienda
                                                                    + "&error=" + error
                                                                    + "&numEmpleado=" + numEmpleado);
  }

  public procesarTransmisionTablas(opcionTienda, numEmpleado, tienda) {
    return this.http.get(environment.menuSorm + "api/v1/transmision/tablas?opcionTienda=" + opcionTienda
                                                                        + "&tienda=" + tienda
                                                                        + "&numEmpleado=" + numEmpleado);
  }

  public consultarMaestro(tienda) {
    return this.http.get(environment.menuSorm + "api/v1/maestro?tienda=" + tienda);
  }

  public generarPdfNormal(tienda) {
    return this.http.get(environment.menuSorm + "api/v1/reporte/normal?tienda=" + tienda);
  }

  public generarPdfNuevo(tienda) {
    return this.http.get(environment.menuSorm + "api/v1/reporte/nuevo?tienda=" + tienda);
  }
}
