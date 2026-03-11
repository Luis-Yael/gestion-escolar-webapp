import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';

/* =========================
   Router
   ========================= */
import { RouterModule } from '@angular/router';

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
  RouterModule
];
