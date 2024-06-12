import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StageComponent } from './stage.component';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../app/app.menu';
import { UserMenuService } from '../app/user-menu.service';

import { GlobalErrorHandler } from './GlobalErrorHandler';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { XTabControlModule } from '../material/XTootega';
import { XFactory } from '../material/Factory/XFactory';
import { CommonModule, registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { NgbDatepicker, NgbDatepickerModule, NgbModule, NgbTimepicker, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';

registerLocaleData(ptBr)
import { ComponentSTXAppCoreINF, ComponentImportSTXAppCoreINF } from '../STX-App-Core-INF/RegisterComponent';
import { ServiceImportSTXAppCoreINF, ServiceSTXAppCoreINF } from '../STX-App-Core-INF/RegisterService';
import { ComponentImportSTXCoreAccess, ComponentSTXCoreAccess } from '../STX-Core-Access/RegisterComponent';
import { ServiceImportSTXCoreAccess, ServiceSTXCoreAccess } from '../STX-Core-Access/RegisterService';



@NgModule({
    declarations: [
        StageComponent,
        MenuComponent,
        ComponentImportSTXAppCoreINF, 
    ],
    imports: [
        NgbDatepickerModule, NgbDatepicker, NgbTimepicker, NgbTimepickerModule,
        HttpClientModule,
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        NgbModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule,
        MatButtonToggleModule,
        A11yModule,
        ClipboardModule,
        DragDropModule,
        PortalModule,
        ScrollingModule,
        CdkStepperModule,
        CdkTableModule,
        CdkTreeModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule, XTabControlModule, CommonModule
    ],
    providers: [UserMenuService,
        ServiceImportSTXAppCoreINF,

        { provide: ErrorHandler, useClass: GlobalErrorHandler, },
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
        { provide: LOCALE_ID, useValue: 'pt-PT' },
    ],
    exports: [],
    bootstrap: [StageComponent]
})
export class StageModule
{
    constructor()
    {
        ServiceSTXAppCoreINF.Register();
        ComponentSTXAppCoreINF.Register();
        ComponentSTXCoreAccess.Register();
        ServiceSTXCoreAccess.Register();
    }
}
