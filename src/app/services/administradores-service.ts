import { Injectable } from '@angular/core';
import { ErrorsService } from './tools/errors-service';
import { ValidatorService } from './tools/validator-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthServices } from './auth-services';

@Injectable({
  providedIn: 'root',
})
export class AdministradoresService {

  constructor(
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private http: HttpClient,
    private authServices: AuthServices
  ) {}

  /** Genera los HttpHeaders con el token de sesión si existe */
  private getAuthHeaders(): HttpHeaders {
    const token = this.authServices.getSessionToken();
    return token
      ? new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
      : new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  public esquemaAdmin(){
    return {
      'rol':'',
      'clave_admin': '',
      'first_name': '',
      'last_name': '',
      'email': '',
      'password': '',
      'confirmar_password': '',
      'telefono': '',
      'rfc': '',
      'edad': '',
      'ocupacion': ''
    }
  }

  public validarAdmin(data: any, editar: boolean){

    let error: any = {};

     //Validaciones
    if(!this.validatorService.required(data["clave_admin"])){
      error["clave_admin"] = this.errorService.required;
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
      error["edad"] = this.errorService.numeric;
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

  //Creamos la petición POST para registrar al administrador, esta función se llamará en el método registrar() del componente registro-admin.ts
  public registrarAdmin(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url_api}/admin/`, data, { headers: this.getAuthHeaders() });
  }

  //Creamos la petición GET para obtener la lista de administradores, esta función se llamará en el método ngOnInit() del componente admin-screen.ts
  public obtenerAdmins(): Observable<any> {
    return this.http.get<any>(`${environment.url_api}/lista-admins/`, { headers: this.getAuthHeaders() });
  }

  //Creamos la petición GET para obtener los datos de un administrador por su id, esta función se llamará en el método obtenerUsuarioPorId() del componente registro-usuarios-screen.ts
  public obtenerAdminPorId(id: number): Observable<any> {
    return this.http.get<any>(`${environment.url_api}/admin/?id=${id}`, { headers: this.getAuthHeaders() });
  }

  //Creamos la petición PUT para actualizar los datos de un administrador, esta función se llamará en el método actualizar() del componente registro-admin.ts
  public actualizarAdmin(data: any): Observable<any> {
    return this.http.put<any>(`${environment.url_api}/admin/`, data, { headers: this.getAuthHeaders() });
  }

  //Creamos la petición DELETE para eliminar un administrador, esta función se llamará en el método eliminar() dentro del modal eliminar-user-modal.ts
  public eliminarAdmin(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.url_api}/admin/?id=${id}`, { headers: this.getAuthHeaders() });
  }

  //Creamos la petición PATCH para cambiar el estatus del usuario a inactivo, esta función se llamará en el método eliminarUser() dentro del modal eliminar-user-modal.ts
  public desactivarAdmin(id: number): Observable<any> {
    return this.http.patch<any>(`${environment.url_api}/admin/?id=${id}`, { id }, { headers: this.getAuthHeaders() });
  }

  //Creamos la petición GET para obtener el total de usuarios registrados por cada rol, esta función se llamará en el método obtenerTotalUsers() del componente graficas-screen.ts
  public getTotalUsuarios(): Observable<any> {
    return this.http.get<any>(`${environment.url_api}/total-usuarios/`, { headers: this.getAuthHeaders() });
  }
}
