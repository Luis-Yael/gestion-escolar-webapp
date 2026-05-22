import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';

/* =========================
   Router
   ========================= */
import { RouterModule } from '@angular/router';
//Agregar ngClass para el navbar
import { NgClass } from '@angular/common';

/*Elementos de angular material*/
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';

/* =========================
   ngx-mask (inputs de código)
   ========================= */
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

/* =========================
    Gráficas
   ========================= */
// Modulo para las gráficas (ng2-charts ahora exporta directivas standalone)
import { BaseChartDirective } from 'ng2-charts';

/**
 * SHARED_IMPORTS
 * ---------------------------------------------------------
 * Colección de módulos/directivas reutilizables en
 * componentes standalone.
 *
 * Se importa así:
 * imports: [...SHARED_IMPORTS, HeaderApp, FooterApp]
 */

export const SHARED_IMPORTS = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  NgOptimizedImage,
  RouterModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatRadioModule,
  MatDatepickerModule,
  MatSelectModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatTableModule,
  MatPaginatorModule,
  NgxMaskDirective,
  NgxMaskPipe,
  NgClass,
  MatDialogModule,
  BaseChartDirective,
];
