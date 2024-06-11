import { ChangeDetectorRef, Component, ElementRef, Injectable, ViewChild } from '@angular/core';
import { XEditor } from './XEditor';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct, NgbInputDatepicker, NgbTimeAdapter, NgbTimepicker, NgbTimepickerConfig, NgbTimepickerI18n, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { XDecimalMask } from '../Mask/XDecimalMask';
import { XDateMask, XDateTimeMask } from '../Mask/XDateMask';

@Injectable()
export class XDateTimeParserFormatter extends NgbDateParserFormatter
{
    constructor()
    {
        super();
    }
    parse(value: string): NgbDateStruct
    {
        if (!value)
            return null
        let parts = value.split('/');
        return { year: +parts[0], month: +parts[1], day: +parts[2] } as NgbDateStruct
    }
    format(date: NgbDateStruct): string
    {
        return date ? ('0' + date.day).slice(-2) + "/" + ('0' + date.month).slice(-2) + "/" + ('0' + date.year).slice(-4) : null
    }
}

@Component({ selector: 'div[XDateTimeEditor]', templateUrl: "XDateTimeEditor.html", styles: [], providers: [{ provide: NgbDateParserFormatter, useClass: XDateTimeParserFormatter }] })
export class XDateTimeEditor extends XEditor<HTMLInputElement>
{
    constructor(protected Calendar: NgbCalendar, ChangeDetector: ChangeDetectorRef, pElmRef: ElementRef)
    {
        super(ChangeDetector, pElmRef);
    }
    @ViewChild(NgbInputDatepicker, { static: true })
    protected Datepicker: NgbInputDatepicker;

    private _Date: NgbDate
    Today = this.Calendar.getToday();

    get Date(): NgbDate
    {
        return this._Date;
    }

    set Date(pValue: NgbDate)
    {
        this._Date = pValue;
        this.OnSelected(pValue);
    }

    override Prepare()
    {
        this.Mask = new XDateTimeMask(this);
    }

    OnSelected(pDate: NgbDate)
    {
        this.SetTupleValue(pDate.day.toString().LPad(2, '0') + "/" + pDate.month.toString().LPad(2, '0') + "/" + pDate.year.toString().LPad(4, '0'));
    }

    protected override SetTupleValue(pValue: string)
    {
        let date = Date.FromBRDateTime(pValue);
        if (!date.IsValid)
            date = Date.FromBRDate(pValue);
        if (date.IsValid)
        {
            this.Tuple[this.Field].SetValue(date.Value.ToISO());
            this.SetDisplayText(pValue);
        }
    }

    override SetDisplayText(pValue: string)
    {
        this.Input.value = pValue;
    }
}