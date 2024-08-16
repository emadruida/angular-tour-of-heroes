import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
      provideRouter(routes),
      provideZoneChangeDetection({ eventCoalescing: true }),
      importProvidersFrom(BrowserModule, FormsModule),
      provideHttpClient(),
  ]
};
