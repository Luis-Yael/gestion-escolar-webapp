import { Component, Inject, OnInit } from '@angular/core';
import { AdministradoresService } from '../../services/administradores-service';
import { AlumnosService } from '../../services/alumnos-service';
import { MaestrosService } from '../../services/maestros-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../services/tools/notification-service';

@Component({
  selector: 'app-eliminar-user-modal',
  imports: [],
  templateUrl: './eliminar-user-modal.html',
  styleUrl: './eliminar-user-modal.scss',
})
export class EliminarUserModal implements OnInit{
  public rol: string = "";

  constructor(
    private administradoresService: AdministradoresService,
    private maestrosService: MaestrosService,
    private alumnosService: AlumnosService,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<EliminarUserModal>,
    @Inject (MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.rol = this.data.rol;
  }

  public cerrar_modal(){
    this.dialogRef.close({isDelete:false});
  }

  public eliminarUser(){
    if(this.rol === 'administrador'){
      // Lógica para eliminar administrador usando path
      this.administradoresService.desactivarAdmin(this.data.id).subscribe({
        next: (response) => {
          console.log('Administrador eliminado:', response);
          this.notificationService.success('Administrador eliminado exitosamente');
          this.dialogRef.close({isDelete:true});
        },
        error: (error) => {
          console.error('Error al eliminar administrador:', error);
          this.notificationService.error('Error al eliminar administrador');
        }
      });

    }else if(this.rol === 'maestro'){
      // Lógica para eliminar maestro usando delete
      this.maestrosService.eliminarMaestro(this.data.id).subscribe({
        next: (response) => {
          console.log('Maestro eliminado:', response);
          this.notificationService.success('Maestro eliminado exitosamente');
          this.dialogRef.close({isDelete:true});
        },
        error: (error) => {
          console.error('Error al eliminar maestro:', error);
          this.notificationService.error('Error al eliminar maestro');
        }
      });

    }else if(this.rol === 'alumno'){
      // Lógica para eliminar alumno usando delete
      //TODO: Implementar lógica para eliminar alumno usando delete

    }
  }

}
