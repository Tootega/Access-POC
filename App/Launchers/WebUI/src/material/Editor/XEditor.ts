import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { _ViewRepeater } from '@angular/cdk/collections';
import { XGuest } from '../Component/XComponent';
import Decimal from 'decimal.js';
import { XBaseMask } from '../Mask/XBaseMask';

@Component({ selector: '', template: "", styles: [] })
export abstract class XEditor<T extends HTMLElement> extends XGuest implements XIInputBox
{
    constructor(protected ChangeDetector: ChangeDetectorRef, pElmRef: ElementRef)
    {
        super(pElmRef);
        this.Title = this.Element.getAttribute("Title");
        this.Field = this.Element.getAttribute("Field");
    }

    protected PTuple: any;
    @Input()
    get Tuple(): any
    {
        return this.PTuple;
    }

    set Tuple(pValue: any)
    {
        this.PTuple = pValue;
    }

    Title: string;
    Field: string;
    DataField: XDataField;
    Mask: XBaseMask;
    Input: T | any;
    Label: HTMLLabelElement;
    Dec: Decimal;
    protected Tag: string = null;

    override ngAfterViewInit()
    {
        super.ngAfterViewInit();
        XEventManager.SetTimeOut(this, () => this.InternalPrepare(), 50);
    }

    private InternalPrepare()
    {
        this.Input = this.Element.querySelector(this.Tag ?? "input") as T;

        if (this.Tuple != null)
        {
            this.DataField = this.Tuple[this.Field];
            if (this.DataField != null)
                this.DataField.GetDisplayText = () => this.GetDisplayText();
            XEventManager.AddEvent(this, this.Input, XEventType.Input, (a) => this.OnDataChanged(a));
        }
        this.Label = this.Element.querySelector("label");
        if (this.Input != null)
            this.Input.id = this.Element.getAttribute("ttg-id");
        if (this.Element.hasAttribute("readonly"))
        {
            this.Input.setAttribute("readonly", "");
            this.Input.setAttribute("disabled", "");
        }
        this.Label?.setAttribute("for", this.Input.id);
        this.ChangeDetector.detectChanges();
        this.Prepare();
        if (this.DataField != null && this.Tuple != null)
            this.RefreshView();
    }

    RefreshView()
    {
        this.SetDisplayText(this.GetDisplayText());
    }

    get DisplayText(): string
    {
        return this.GetDisplayText();
    }

    Prepare()
    {
    }

    protected GetDisplayText(): string
    {
        return this.DataField?.FormatText(this.DataField?.Value);
    }

    private OnDataChanged(pEvent: Event)
    {
        this.InternalSetTupleValue(this.Input.value);
    }

    private InternalSetTupleValue(pValue: any)
    {
        this.SetTupleValue(pValue);
        if (pValue != this.GetDisplayText())
            this.SetDisplayText(pValue);
    }

    SetDisplayText(pValue: string)
    {
        this.Input.value = pValue;
    }

    protected SetTupleValue(pValue: any)
    {
        this.Tuple[this.Field].SetValue(pValue);
    }
}