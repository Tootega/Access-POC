import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { XEditor } from './XEditor';

@Component({ selector: 'div[XStringEditor]', templateUrl: "XStringEditor.html", styles: [] })
export class XStringEditor extends XEditor<HTMLInputElement>
{
    constructor(ChangeDetector: ChangeDetectorRef, pElmRef: ElementRef)
    {
        super(ChangeDetector, pElmRef);
    }
}