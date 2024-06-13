import { ChangeDetectorRef, Component, ElementRef, Input } from '@angular/core';
import { XEditor } from './XEditor';

@Component({ selector: 'div[XDataGridEditor]', templateUrl: "XDataGridEditor.html", styles: [] })
export class XDataGridEditor extends XEditor<HTMLInputElement>
{
    constructor(ChangeDetector: ChangeDetectorRef, pElmRef: ElementRef)
    {
        super(ChangeDetector, pElmRef);
    }
    protected PDataSet: any;

    @Input()
    get DataSet(): any
    {
        return this.PDataSet;
    }

    override InternalPrepare()
    {
    }
    set DataSet(pValue: any)
    {
        this.PDataSet = pValue;
    }    
}
