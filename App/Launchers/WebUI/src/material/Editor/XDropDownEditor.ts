import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { XService } from '../Component/XComponent';
import { XDropDownGrid } from '../Table/XDropDownGrid';
import { XTable } from '../Table/XTable';
import { XEditor } from './XEditor';
import { XFactory } from '../Factory/XFactory';

@Component({ selector: 'div[XDropDownEditor]', templateUrl: "XDropDownEditor.html", styles: [] })
export class XDropDownEditor extends XEditor<HTMLInputElement> implements XIPopup
{
    constructor(ChangeDetector: ChangeDetectorRef, pElmRef: ElementRef, private http: HttpClient)
    {
        super(ChangeDetector, pElmRef);
    }

    DropDownElement: HTMLElement;
    DropDownGrid: XDropDownGrid;
    Service: XService;
    SourceFields = new XArray<string>();
    TargetFields = new XArray<string>();

    override Prepare()
    {
        super.Prepare();
        this.DropDownElement = this.Element.querySelector("#POP" + this.UUID);
        this.DropDownGrid = (<any>this.Element.querySelector("#GRD" + this.UUID)).Instance;
        this.DropDownGrid.UseCheckBox = false;
        this.DropDownGrid.OnSelectionChange = (t) => this.Selected(t);
        XEventManager.AddEvent(this, this.DropDownElement, XEventType.Click, this.DoShow);
        this.DropDownGrid.SetTitles(this.Element.getAttribute("GridColumns"));
        this.Service = XFactory.CreateService(this.Element.getAttribute("ServiceID"), this.http);
        this.Service.DoSearch((dst) => this.ShowData(dst));

        this.TargetFields.AddRange(X.Split(this.Element.getAttribute("TDisplayField"), "|"));
        this.SourceFields.AddRange(X.Split(this.Element.getAttribute("SDisplayField"), "|"));
    }

    Selected(pGrid: XDropDownGrid)
    {
        XPopupManager.HideAll();

        if (pGrid.SelectedTuple == null)
            return;
        this.Tuple[this.Field].SetValue(pGrid.SelectedTuple.GetPKValue());
        for (var i = 0; i < this.SourceFields.length; i++)
            this.Tuple[this.TargetFields[i]].Value = pGrid.SelectedTuple[this.SourceFields[i]].Value;
    }

    override SetDisplayText(pValue: string)
    {
        //this.Input.value = pValue;
    }

    override get DisplayText(): string
    {
        return this.GetDisplayText();
    }

    ShowData(DataSet: any)
    {
        this.DropDownGrid.SetDataSet(DataSet);
    }

    Align()
    {
        this.DropDownElement.style.position = "unset";
        this.DropDownElement.style.left = "unset";
        let r = this.Input.GetRectRelative(document.body);
        if (r.Right > document.body.clientWidth * 0.66)
        {
            this.DropDownElement.style.position = "absolute";
            this.DropDownElement.style.left = (r.Right - this.DropDownElement.clientWidth) + "px";
        }
    }

    protected override GetDisplayText(): string
    {
        if (this.TargetFields.length == 0 || this.Tuple == null)
            return null;
        return this.Tuple[this.TargetFields[0]].Value;
    }

    protected override SetTupleValue(pValue: any)
    {
    }

    DoShow(pEvent: any)
    {
        XPopupManager.Show(this);
        XEventManager.SetTimeOut(this, () => this.Align(), 100);
    }

    get IsVisible(): boolean
    {
        return this.DropDownElement.style.display == "block";
    }

    set IsVisible(pValue: boolean)
    {
        if (pValue)
            this.DropDownElement.style.display = "block";
        else
            this.DropDownElement.style.display = "none";
    }

    Show()
    {
        this.IsVisible = true;
    }

    CallPopupClosed()
    {
    }

    CanClose(pElement: HTMLElement): boolean
    {
        return !pElement.IsChildOf(this.Element, true) && this.IsVisible && !pElement.IsChildOf(this.Element, true);
    }
}
