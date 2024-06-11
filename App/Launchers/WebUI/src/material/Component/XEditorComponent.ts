import { ElementRef } from "@angular/core";
import { XComponent } from "./XComponent";

export class XEditorComponent extends XComponent
{
    constructor(pElmRef: ElementRef)
    {
        super(pElmRef);
    }
    DataSet: XDataSet<XDataTuple>;
    //CurrentTuple: XDataTuple;
}
