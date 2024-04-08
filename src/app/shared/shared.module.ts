import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisplayUserNamePipe } from './pipes/display-user-name.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SnackBarComponent } from './components/snack-bar-component/snack-bar.component';
import { MaterialModule } from './material.module';
import { PwaComponent } from './components/pwa/pwa.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    DisplayUserNamePipe,
    SnackBarComponent,
    PwaComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MaterialModule
  ],
  providers: [
    DisplayUserNamePipe,
  ],
  exports: [
    ReactiveFormsModule,
    DisplayUserNamePipe,
    SnackBarComponent,
    PwaComponent,
    NavbarComponent,
    FooterComponent
  ]
})
export class SharedModule {
}
