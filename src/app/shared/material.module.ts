import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';
@NgModule({
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogContent,
    MatDialogTitle,
    MatTabsModule,
    MatTooltipModule,
    MatSortModule,
    MatCardModule,
    
  ],
  declarations: [],
  exports: [
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogContent,
    MatDialogTitle,
    MatTabsModule,
    MatTooltipModule,
    MatSortModule,
    MatCardModule,
  ]
})
export class MaterialModule { }