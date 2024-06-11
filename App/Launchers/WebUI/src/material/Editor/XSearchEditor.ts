import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { XEditor } from './XEditor';

@Component({ selector: 'div[XSearchEditor]', templateUrl: "XSearchEditor.html", styles: [] })
export class XSearchEditor extends XEditor<HTMLInputElement>
{
    constructor(ChangeDetector: ChangeDetectorRef, pElmRef: ElementRef)
    {
        super(ChangeDetector, pElmRef);
        this.Title = this.Element.getAttribute("Title")?.split('|');
        this.Field = this.Element.getAttribute("Field")?.split('|');
    }

    override get Tuple(): XFilter
    {
        return <XFilter>this.PTuple;
    }

    override set Tuple(pValue: XFilter)
    {
        this.PTuple = pValue;
    }

    override Title: [] | any;
    override Field: [] | any;

    override SetTupleValue(pValue: any)
    {
        this.Tuple.PrepareFilter(pValue, this.Field, this.Title);
    }
}