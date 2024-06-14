import { Component, ElementRef, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { _ViewRepeater } from '@angular/cdk/collections';
import { XGuest, XHost } from '../Component/XComponent';
import { CommonModule } from '@angular/common';

export interface XGridEvent<T> { (pGrid: T): void; }

@Component({ selector: 'XTable', templateUrl: "./XTable.html", styles: [] })
export class XTable extends XHost
{
    constructor(pElmRef: ElementRef)
    {
        super(pElmRef);
        pElmRef.nativeElement.Instance = this;
        this.SetTitles(pElmRef.nativeElement.getAttribute("Titles"));
    }

    @ViewChild('RowTemplate', { read: TemplateRef })
    private _RowTemplate: TemplateRef<any>;

    @ViewChild('RowContainer', { read: ViewContainerRef })
    private _RowContainer: ViewContainerRef;

    @ViewChild('ColumnTemplate', { read: TemplateRef })
    private _ColumnTemplate: TemplateRef<any>;

    @ViewChild('HeadContainer', { read: ViewContainerRef })
    private _HeadContainer: ViewContainerRef;

    @ViewChild('CheckTemplate', { read: TemplateRef })
    private _CheckTemplate: TemplateRef<any>;

    @ViewChild('RowCheckTemplate', { read: TemplateRef })
    private _RowCheckTemplate: TemplateRef<any>;

    @ViewChild('TitleTemplate', { read: TemplateRef })
    private _TitleTemplate: TemplateRef<any>;

    private _DataSet: XDataSet<XDataTuple>;
    private _SortHistory: any = new Object();
    UseCheckBox: boolean = true;
    ShowState: boolean = false;
    SelectedTuple: XDataTuple;
    _Header: XArray<XTableColumn> = new XArray<XTableColumn>();

    OnSelectionChange: XGridEvent<XTable>;
    OnRowDBLClick: XGridEvent<XTable>;
    Intems: any;
    
    override ngAfterViewInit()
    {
        this._TitleTemplate = this._TitleTemplate ?? this.GetOwner().GetTemplate("TitleTemplate");
        this._RowTemplate = this._RowTemplate ?? this.GetOwner().GetTemplate("RowTemplate");
        this._ColumnTemplate = this._ColumnTemplate ?? this.GetOwner().GetTemplate("ColumnTemplate");
        this._CheckTemplate = this._CheckTemplate ?? this.GetOwner().GetTemplate("CheckTemplate");
        this._RowCheckTemplate = this._RowCheckTemplate ?? this.GetOwner().GetTemplate("RowCheckTemplate");
        this._RowContainer = this._RowContainer ?? this.GetOwner().GetContainer("RowContainer");
        this._HeadContainer = this._HeadContainer ?? this.GetOwner().GetContainer("HeadContainer");
        super.ngAfterViewInit();
        XEventManager.SetTimeOut(this, () => this.RefreshView(), 50);
    }

    SetTitles(pValue: any)
    {
        if (X.IsEmpty(pValue))
            return;
        let titles = pValue.split("|");
        for (let i = 0; i < titles.length; i += 2)
        {
            if (!this.ShowState && titles[i] == XDefault.StateFieldName)
                continue;
            this._Header.Add({ Field: titles[i], Title: titles[i + 1] } as XTableColumn)
        }
        this.RefreshView();
    }

    SetDataSet(pDataSet: any)
    {
        this.DataSet = pDataSet;
        this.RefreshView();
    }

    private RefreshView()
    {
        if (this._HeadContainer == null)
            return;
        if (this._HeadContainer.length == 0)
            this.AddHeader();
        this._RowContainer.clear();
        if (X.IsEmpty(this.DataSet?.Tuples))
            return;
        for (var i = 0; i < this.DataSet.Tuples.length; i++)
            this.AddRow(<any>this.DataSet.Tuples[i]);
    }

    private AddRow(pTuple: any)
    {
        pTuple.UseCheckBox = this.UseCheckBox;

        let ev = this._RowContainer.createEmbeddedView(this._RowTemplate, { data: pTuple });
        ev.detectChanges();
        for (var i = 0; i < this._Header.length; i++)
        {
            let tt = this._Header[i];
            if (!this.ShowState && tt.Field == XDefault.StateFieldName)
                continue;
            let cv;
            if (i == 0 && this.UseCheckBox)
            {
                cv = this._RowContainer.createEmbeddedView(this._RowCheckTemplate, { data: pTuple });
                (<HTMLElement>cv.rootNodes[0].parentElement).removeChild(cv.rootNodes[0]);
                (<HTMLElement>ev.rootNodes[0]).appendChild(cv.rootNodes[0]);
            }
            cv = this._RowContainer.createEmbeddedView(this._ColumnTemplate, { field: pTuple[tt.Field] });
            (<HTMLElement>cv.rootNodes[0].parentElement).removeChild(cv.rootNodes[0]);
            (<HTMLElement>ev.rootNodes[0]).appendChild(cv.rootNodes[0]);
        }
        pTuple.Element = ev.rootNodes.First<HTMLElement>(HTMLElement);
        pTuple.Element.onclick = (a) => this.Click(a, pTuple);
        pTuple.Element.ondblclick = (a) => this.DblClick(a, pTuple);
    }

    private AddHeader()
    {
        for (var i = 0; i < this._Header.length; i++)
        {
            let tt = <any>this._Header[i];
            tt.SortGrid = (a, b) => this.SortGrid(a, b);
            tt.CheckedAll = (a) => this.CheckedAll(a);
            Object.assign(tt, this);
            if (i == 0 && this.UseCheckBox)
                this._HeadContainer.createEmbeddedView(this._CheckTemplate, { data: tt });
            this._HeadContainer.createEmbeddedView(this._TitleTemplate, { data: tt });
        }
    }

    DblClick(pArg: Event, pTuple: XDataTuple)
    {
        this.Click(pArg, pTuple);
        this.OnRowDBLClick?.apply(this, [this]);
    }

    private Click(pArg: Event, pTuple: XDataTuple)
    {
        pArg.stopPropagation();
        pTuple.IsSelected = true;
        this.DataSet.Tuples.Where(t => t.UUID != pTuple.UUID).ForEach(t => t.IsSelected = false);
        if (pTuple.IsSelected)
            this.SelectedTuple = pTuple;
        else
            this.SelectedTuple = null;
        this.OnSelectionChange?.apply(this, [this]);
    }

    get DataSet(): XDataSet<XDataTuple>
    {
        return this._DataSet;
    }

    set DataSet(pValue: XDataSet<XDataTuple>)
    {
        this._DataSet = pValue;
        this.RefreshView();
    }

    CheckedAll(pArg: Event)
    {
        var elm = <any>pArg.target;
        this.DataSet.Tuples.ForEach(t => t.IsChecked = elm.checked);
        pArg.stopPropagation();
    }

    SortGrid(pArg: Event, pColumn: string)
    {
        var _a;
        if (X.IsEmpty(this.DataSet.Tuples))
            return;
        var elm = <any>pArg.target;
        let cols = elm.parentElement.GetChildren(c => c.tagName == "TH");
        for (var i = 0; i < cols.length; i++)
            (_a = cols[i].GetIcon()) === null || _a === void 0 ? void 0 : _a.SetVisibility(false);
        let icon = elm.GetIcon();
        if (icon != null)
        {
            icon.SetVisibility(true);
            if (this._SortHistory[pColumn] == null || this._SortHistory[pColumn] == 1)
            {
                icon.className = "bi bi-arrow-bar-down pe-none";
                this._SortHistory[pColumn] = 0;
                this.DataSet.Tuples = this.DataSet.Tuples.OrderBy(t => t[pColumn].Value);
            }
            else
            {
                icon.className = "bi bi-arrow-bar-up pe-none";
                this._SortHistory[pColumn] = 1;
                this.DataSet.Tuples = this.DataSet.Tuples.OrderByDescending(t => t[pColumn].Value);
            }
            this.RefreshView();
        }
    }
}
