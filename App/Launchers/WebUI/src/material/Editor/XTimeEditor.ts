import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { XTimeMask } from '../Mask/XDateMask';
import { XDateTimeEditor } from './XDateTimeEditor';

@Component({ selector: 'div[XTimeEditor]', templateUrl: "XTimeEditor.html", styles: [] })
export class XTimeEditor extends XDateTimeEditor
{
    constructor(Calendar: NgbCalendar, ChangeDetector: ChangeDetectorRef, pElmRef: ElementRef)
    {
        super(Calendar, ChangeDetector, pElmRef);
    }

    override Prepare()
    {
        this.Input.type = "time";
        this.Mask = new XTimeMask(this);
    }

    protected override SetTupleValue(pValue: string)
    {
        let date = Date.FromBRTime(pValue);
        if (date.IsValid)
        {
            this.Tuple[this.Field].SetValue(date.Value.ToISO());
            this.SetDisplayText(pValue);
        }
    }
}