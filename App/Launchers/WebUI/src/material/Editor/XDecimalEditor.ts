import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { XDecimal } from '../Mask/XDecimal';
import { XDecimalMaskEx } from '../Mask/XDecimalMask';
import { XEditor } from './XEditor';

@Component({ selector: 'div[XDecimalEditor]', templateUrl: "XDecimalEditor.html", styles: [] })
export class XDecimalEditor extends XEditor<HTMLInputElement>
{
    constructor(ChangeDetector: ChangeDetectorRef, pElmRef: ElementRef)
    {
        super(ChangeDetector, pElmRef);
    }

    override Prepare()
    {
        this.Mask = new XDecimalMaskEx(this);
    }
}