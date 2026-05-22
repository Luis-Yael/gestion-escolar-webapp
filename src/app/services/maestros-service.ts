import { Injectable } from '@angular/core';
import { ErrorsService } from './tools/errors-service';
import { ValidatorService } from './tools/validator-service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthServices } from './auth-services';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MaestrosService {

  constructor(
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private http: HttpClient,
    private authService: AuthServices
  ) {}

  /** Genera los HttpHeaders con el token de sesión si existe */
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getSessionToken();
    return token
      ? new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
      : new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  public esquemaMaestro(){
    return {
      'rol':'',
      'id_trabajador': '',
      'first_name': '',
      'last_name': '',
      'email': '',
      'password': '',
      'confirmar_password': '',
      'fecha_nacimiento': '',
      'telefono': '',
      'rfc': '',
      'cubiculo': '',
      'area_investigacion': '',
      'materias_array': []
    }

  }

  //Validación para el formulario
  public validarMaestro(data: any, editar: boolean){
    let error: any = {};

    if(!this.validatorService.required(data["id_trabajador"])){
      error["id_trabajador"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["first_name"])){
      error["first_name"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["last_name"])){
      error["last_name"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["email"])){
      error["email"] = this.errorService.required;
    }else if(!this.validatorService.maxLen(data["email"], 40)){
      error["email"] = this.errorService.max;
    }else if (!this.validatorService.email(data['email'])) {
      error['email'] = this.errorService.email;
    }

    if(!editar){
      if(!this.validatorService.required(data["password"])){
        error["password"] = this.errorService.required;
      }

      if(!this.validatorService.required(data["confirmar_password"])){
        error["confirmar_password"] = this.errorService.required;
      }
    }

    if(!this.validatorService.required(data["fecha_nacimiento"])){
      error["fecha_nacimiento"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["rfc"])){
      error["rfc"] = this.errorService.required;
    }else if(!this.validatorService.minLen(data["rfc"], 12)){
      error["rfc"] = this.errorService.min;
    }else if(!this.validatorService.maxLen(data["rfc"], 13)){
      error["rfc"] = this.errorService.max;
    }

    if(!this.validatorService.required(data["telefono"])){
      error["telefono"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["cubiculo"])){
      error["cubiculo"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["area_investigacion"])){
      error["area_investigacion"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["materias_array"])){
      error["materias_array"] = "Debes seleccionar materias para poder registrarte";
    }

    return error;
  }

  //Función para registrar un maestro, conectando con el backend
  public registrarMaestro(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url_api}/maestros/`, data, { headers: this.getAuthHeaders() });
  }

  //Función para obtener la lista de maestros registrados
  public obtenerListaMaestros(): Observable<any> {
    return this.http.get<any>(`${environment.url_api}/lista-maestros/`, { headers: this.getAuthHeaders() });
  }

  //Función para obtener un maestro por su ID
  public obtenerMaestroPorId(id: number): Observable<any> {
    return this.http.get<any>(`${environment.url_api}/maestros/?id=${id}`, { headers: this.getAuthHeaders() });
  }

  //Función para actualizar los datos de un maestro, conectando con el backend
  public actualizarMaestro(data: any): Observable<any> {
    return this.http.put<any>(`${environment.url_api}/maestros/`, data, { headers: this.getAuthHeaders() });
  }

  //Función para eliminar un maestro por su ID, conectando con el backend
  public eliminarMaestro(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.url_api}/maestros/?id=${id}`, { headers: this.getAuthHeaders() });
  }
}
