import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideNgxMask } from 'ngx-mask';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from './shared/spanish-paginator-intl';
/* =========================
    Gráficas
   ========================= */
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

/* =========================
   Configuración global de la aplicación
   ========================= */
/* =========================
   Configuración global de la aplicación
   ========================= */

/**
 * appConfig
 * ---------------------------------------------------------
 * Configuración global de la aplicación, incluyendo:
 * - Proveedores de servicios (HTTP, enrutamiento, etc.)
 * - Configuraciones específicas de bibliotecas (ngx-mask, Angular Material)
 *
 * Se utiliza en main.ts al arrancar la aplicación.
 */

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNgxMask(),
    { provide: MAT_DATE_LOCALE, useValue: 'es-MX' },
    { provide: MatPaginatorIntl, useFactory: getSpanishPaginatorIntl },
    provideCharts(
      withDefaultRegisterables()
    )
  ]
};
