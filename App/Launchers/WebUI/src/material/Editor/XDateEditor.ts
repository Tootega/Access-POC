import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { XDateMask } from '../Mask/XDateMask';
import { XDateTimeEditor } from './XDateTimeEditor';

@Component({ selector: 'div[XDateEditor]', templateUrl: "XDateEditor.html", styles: [] })
export class XDateEditor extends XDateTimeEditor
{
    constructor(Calendar: NgbCalendar, ChangeDetector: ChangeDetectorRef, pElmRef: ElementRef)
    {
        super(Calendar, ChangeDetector, pElmRef);
    }

    override Prepare()
    {
        this.Input.type = "date";
        this.Mask = new XDateMask(this);
    }

    protected override SetTupleValue(pValue: string)
    {
        let date = Date.FromBRDate(pValue);
        if (date.IsValid)
        {
            this.Tuple[this.Field].SetValue(date.Value.ToISO());
            this.SetDisplayText(pValue);
        }
    }
}