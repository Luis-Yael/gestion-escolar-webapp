import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorsService } from './tools/errors-service';
import { ValidatorService } from './tools/validator-service';
import { AuthServices } from './auth-services';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private authService: AuthServices
  ) { }

  /** Genera los HttpHeaders con el token de sesión si existe */
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getSessionToken();
    return token
      ? new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
      : new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  public esquemaAlumno(){
    return {
      'rol':'',
      'matricula': '',
      'first_name': '',
      'last_name': '',
      'email': '',
      'password': '',
      'confirmar_password': '',
      'fecha_nacimiento': '',
      'curp': '',
      'rfc': '',
      'edad': '',
      'telefono': '',
      'ocupacion': '',
    }
  }

  //Validación para el formulario
  public validarAlumno(data: any, editar: boolean){
    const error: any = {};

    if(!this.validatorService.required(data["matricula"])){
      error["matricula"] = this.errorService.required;
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

    if(!this.validatorService.required(data["curp"])){
      error["curp"] = this.errorService.required;
    }else if(!this.validatorService.minLen(data["curp"], 18)){
      error["curp"] = this.errorService.min;
    }else if(!this.validatorService.maxLen(data["curp"], 18)){
      error["curp"] = this.errorService.max;
    }

    if(!this.validatorService.required(data["rfc"])){
      error["rfc"] = this.errorService.required;
    }else if(!this.validatorService.minLen(data["rfc"], 12)){
      error["rfc"] = this.errorService.min;
    }else if(!this.validatorService.maxLen(data["rfc"], 13)){
      error["rfc"] = this.errorService.max;
    }

    if(!this.validatorService.required(data["edad"])){
      error["edad"] = this.errorService.required;
    }else if(!this.validatorService.numeric(data["edad"])){
      error["edad"] = "El formato es solo números";
    }else if(data["edad"]<18){
      error["edad"] = "La edad debe ser mayor o igual a 18";
    }

    if(!this.validatorService.required(data["telefono"])){
      error["telefono"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["ocupacion"])){
      error["ocupacion"] = this.errorService.required;
    }

    //Return arreglo
    return error;
  }
  //Función para registrar un alumno, esta función se llamará en el método registrar() dentro del screen registro-usuarios-screen.ts
  public registrarAlumno(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url_api}/alumnos/`, data, { headers: this.getAuthHeaders() });
  }

  //Función para obtener la lista de alumnos, esta función se llamará en el método cargarAlumnos() dentro del screen lista-alumnos-screen.ts
  public obtenerListaAlumnos(): Observable<any> {
    return this.http.get<any>(`${environment.url_api}/alumnos/`, { headers: this.getAuthHeaders() });
  }

  //Función para obtener un alumno por su ID, esta función se llamará en el método obtenerUsuarioPorId() dentro del screen registro-usuarios-screen.ts
  public obtenerAlumnoPorId(id: number): Observable<any> {
    return this.http.get<any>(`${environment.url_api}/alumnos/?id=${id}`, { headers: this.getAuthHeaders() });
  }

  //Función para actualizar un alumno, esta función se llamará en el método actualizar() dentro del screen registro-usuarios-screen.ts
  public actualizarAlumno(data: any): Observable<any> {
    return this.http.put<any>(`${environment.url_api}/alumnos/`, data, { headers: this.getAuthHeaders() });
  }

  //Función para eliminar un alumno, esta función se llamará en el método eliminar() dentro del modal eliminar-user-modal.ts
  public eliminarAlumno(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.url_api}/alumnos/?id=${id}`, { headers: this.getAuthHeaders() });
  }


}
