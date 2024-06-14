import { ChangeDetectorRef, Component, ElementRef, Input } from '@angular/core';
import { XEditor } from './XEditor';
import { XTable } from '../Table/XTable';

@Component({ selector: 'div[XDataGridEditor]', templateUrl: "XDataGridEditor.html", styles: [] })
export class XDataGridEditor extends XEditor<HTMLInputElement>
{
    constructor(ChangeDetector: ChangeDetectorRef, pElmRef: ElementRef)
    {
        super(ChangeDetector, pElmRef);
        this.Table = this.GetChildAs<XTable>(XTable);
    }
    protected Table: XTable;
    protected PTuples: XDataTuple[];

    override ngAfterViewInit()
    {
        super.ngAfterViewInit();
        this.Table = this.GetChildAs<XTable>(XTable);
        if (this.Table)
        {
            this.Table.UseCheckBox = false;
            XEventManager.SetTimeOut(this, () =>
            {
                this.Table.DataSet = new XDataSet<XDataTuple>().SetTuples(this.Tuples);
            }, 200);
        }
    }

    @Input()
    get Tuples(): any
    {
        return this.PTuples;
    }

    override InternalPrepare()
    {
    }

    set Tuples(pValue: any)
    {
        this.PTuples = pValue;
        if (this.Table)
            this.Table.DataSet = pValue;
    }
}
