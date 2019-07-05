import { NgModule } from '@angular/core';

import { LayoutModule } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
//
// Form Controls
//

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';

import { MatNativeDateModule } from '@angular/material';
// import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  imports: [
    MatToolbarModule,MatDialogModule,
    MatProgressBarModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
  NoopAnimationsModule,
  LayoutModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatCardModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatNativeDateModule,
  MatProgressSpinnerModule],
  declarations: [],
  providers: [],
  bootstrap: [],
  exports:[MatToolbarModule,MatDialogModule,
    MatProgressBarModule,
    MatDividerModule,
    MatListModule
    ,MatIconModule,NoopAnimationsModule,
  LayoutModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatCardModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatNativeDateModule,
  MatProgressSpinnerModule
  ],
})
export class AngularMaterialModule {
}