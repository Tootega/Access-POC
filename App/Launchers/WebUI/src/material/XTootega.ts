import { NgModule } from "@angular/core";
import { XTabControl } from "./TabControl/XTabControl";
import { XSearchGrid } from "./Table/XSearchGrid";
import { XMainTabControl } from "./TabControl/XMainTabControl";
import { XFormTabControl } from "./Forms/XFormTabControl";
import { XStringEditor } from "./Editor/XStringEditor";
import { XDecimalEditor } from "./Editor/XDecimalEditor";
import { XDateTimeEditor } from "./Editor/XDateTimeEditor";
import { XDateEditor } from "./Editor/XDateEditor";
import { XTimeEditor } from "./Editor/XTimeEditor";
import { XSearchEditor } from "./Editor/XSearchEditor";
import { NgbDatepicker, NgbInputDatepicker, NgbTimepicker } from "@ng-bootstrap/ng-bootstrap";
import { XSplash } from "./Component/XSplash";
import { XSearchComponent } from "./Component/XSearchComponent";
import { XStageComponent } from "./Component/XStageComponent";
import { XDropDownEditor } from "./Editor/XDropDownEditor";
import { XDropDownGrid } from "./Table/XDropDownGrid";
import { XDataGridEditor } from "./Editor/XDataGridEditor";
import { XDataGrid } from "./Table/XDataGrid";
import { XTable } from "./Table/XTable";

@NgModule({
    declarations: [
        XSplash,
        XTabControl,
        XMainTabControl,
        XFormTabControl,
        XSearchGrid,
        XStringEditor,
        XTimeEditor,
        XDateEditor,
        XDateTimeEditor,
        XDecimalEditor,
        XSearchEditor,
        XStageComponent,
        XSearchComponent,
        XDropDownEditor,
        XDropDownGrid,
        XDataGridEditor,
        XDataGrid,
        XTable,
    ],
    imports: [NgbDatepicker, NgbTimepicker, NgbInputDatepicker],

    exports: [
        XSplash,
        XMainTabControl,
        XFormTabControl,
        XSearchGrid,
        XTabControl,
        XStringEditor,
        XTimeEditor,
        XDateEditor,
        XDateTimeEditor,
        XDecimalEditor,
        XSearchEditor,
        XStageComponent,
        XSearchComponent,
        XDropDownEditor,
        XDropDownGrid,
        XDataGridEditor,
        XDataGrid,
        XTable,
    ]
}) export class XTabControlModule
{
}
