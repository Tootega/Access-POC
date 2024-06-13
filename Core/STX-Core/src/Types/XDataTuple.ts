enum XTupleState
{
    Detached = 0,
    Unchanged = 1,
    Deleted = 2,
    Modified = 3,
    Added = 4
}

enum XFieldState
{
    Empty = 0,
    Unchanged = 1,
    NotEmpty = 2,
    Modified = 3,
    ReadOnly = 4,
}

enum XFieldType
{
    XBinary = "XBinary",
    XBoolean = "XBoolean",
    XDate = "XDate",
    XDateTime = "XDateTime",
    XFK = "XFK",
    XGuid = "XGuid",
    XInt16 = "XInt16",
    XInt32 = "XInt32",
    XInt64 = "XInt64",
    XDecimal = "XDecimal",
    XPK = "XPK",
    XString = "XString",
    XTime = "XTime",
    sXInt8 = "sXInt8",
    sXFloat = "sXFloat",
    sXText = "sXText",
    sXSysname = "sXSysname",
}

class XData
{
    JSonToInt(pValue: any, pUseNull?: boolean): any
    {
        if (X.IsEmpty(pValue))
            return pUseNull ? null : 0;
        return Number.parseInt(pValue);
    }

    JSonToBollean(pValue: any, pUseNull?: boolean): any
    {
        if (X.IsEmpty(pValue))
            return pUseNull ? null : false;
        return (pValue == "true") ? true : false;
    }

    JSonToDecimal(pValue: any, pUseNull?: boolean): any
    {
        if (X.IsEmpty(pValue))
            return pUseNull ? null : 0;
        return Number.parseFloat(pValue);
    }

    JSonToDate(pValue: any, pUseNull?: boolean): any
    {
        if (X.IsEmpty(pValue))
            return pUseNull ? null : XDefault.NullDate;
        var dtparse: XDateTimeResult;
        dtparse = Date.Parse(pValue);
        if (dtparse.IsValid)
            return dtparse.Value;
        else
            return pUseNull ? null : XDefault.NullDate;
    }

    GetFieldValue(pInput: any, pField: string): any
    {
        let field = this[pField];
        switch (field.Type())
        {
            case XFieldType.XBoolean:
                return field.Value;

            case XFieldType.XDate:
                return (<Date>field.Value).LocalDateString();

            case XFieldType.XDateTime:
                return (<Date>field.Value).LocalDateTimeString(false, true, false);

            case XFieldType.XTime:
                return (<Date>field.Value).LocalTimeString();

            case XFieldType.XDecimal:
            case XFieldType.sXFloat:
                return field.Value;

            case XFieldType.XInt16:
            case XFieldType.XInt32:
            case XFieldType.XInt64:
            case XFieldType.sXInt8:
                return field.Value;

            case XFieldType.XGuid:
            case XFieldType.XBinary:
            case XFieldType.XString:
            case XFieldType.sXText:
            default:
                return field.Value;
        }
    }

    SetFieldValue(pEvent: any, pField: string, pValue: any)
    {
        this[pField].Value = pValue;
    }
}

class XDataField extends XData
{
    constructor(public State?: XFieldState, public Type?: any, private _Mask?: any, public Value?: any, public OldValue?: any)
    {
        super();
        let os = this.State;
        this.SetValue(Value);
        this.State = os;
    }

    RawValue: any;
    Name: string;

    GetDisplayText(): string
    {
        return this.FormatText(this.Value);
    }

    FormatText(pValue: any): string
    {
        switch (this.Type())
        {
            case XFieldType.XBoolean:
                return pValue == true ? "Sim" : "Não";

            case XFieldType.XDate:
                let dt0 = pValue as Date;
                if (dt0 == null || dt0.getUTCFullYear() <= 1755)
                    return "";
                return dt0.LocalDateString();

            case XFieldType.XDateTime:
                let dt1 = pValue as Date;
                if (dt1 == null || dt1.getUTCFullYear() <= 1755)
                    return "";
                return dt1.LocalDateTimeString(false, true, false);

            case XFieldType.XTime:
                let dt2 = pValue as Date;
                if (dt2 == null || dt2.getUTCFullYear() <= 1755)
                    return "";
                return dt2.LocalTimeString();

            case XFieldType.XDecimal:
            case XFieldType.sXFloat:
                return (Math.floor(<number>pValue * 100) / 100).toString();

            case XFieldType.XInt16:
            case XFieldType.XInt32:
            case XFieldType.XInt64:
            case XFieldType.sXInt8:
                return pValue;

            case XFieldType.XGuid:
            case XFieldType.XBinary:
            case XFieldType.XString:
            case XFieldType.sXText:
            default:
                return pValue;
        }
    }

    get DisplayText(): string
    {
        return this.GetDisplayText();
    }

    SetValue(pValue: any)
    {
        switch (this.State)
        {
            case XFieldState.Empty:
                this.State = XFieldState.NotEmpty;
                break;
            case XFieldState.NotEmpty:
            case XFieldState.Unchanged:
                this.OldValue = pValue;
                this.State = XFieldState.Modified;
                break;
        }

        this.RawValue = () => pValue;
        switch (this.Type())
        {
            case XFieldType.XBoolean:
                this.Value = this.JSonToBollean(pValue);
                break;

            case XFieldType.XDate:
            case XFieldType.XDateTime:
            case XFieldType.XTime:
                this.Value = this.JSonToDate(pValue);
                break;

            case XFieldType.XDecimal:
            case XFieldType.sXFloat:
                this.Value = this.JSonToDecimal(pValue);
                break;

            case XFieldType.XInt16:
            case XFieldType.XInt32:
            case XFieldType.XInt64:
            case XFieldType.sXInt8:
                this.Value = this.JSonToInt(pValue);
                break;

            case XFieldType.XGuid:
            case XFieldType.XBinary:
            case XFieldType.XString:
            case XFieldType.sXText:
            default:
                this.Value = pValue;
                break;
        }
    }
}

class XDataTuple extends XData
{
    constructor()
    {
        super();
    }

    UUID: string;
    IsReadOnly: boolean;
    State: XTupleState = XTupleState.Unchanged;
    PKField: XDataField;

    Assign(pSource: any)
    {
        let fields = Object.getOwnPropertyNames(this);
        for (var i = 0; i < fields.length; i++)
        {
            let fname = fields[i];
            let fld = this[fname];
            if (fld instanceof XDataField)
                this[fname].SetValue(pSource[fname].Value);
            else
                this[fname] = pSource[fname];
        }
        this.UUID = Guid.NewGuid();
    }

    get IsSelected(): boolean
    {
        return XDataContainer.GetValue(this, "IsSelected");
    }

    set IsSelected(pValue: boolean)
    {
        XDataContainer.SetValue(this, "IsSelected", pValue);
    }

    get IsChecked(): boolean
    {
        return XDataContainer.GetValue(this, "IsChecked");
    }

    set IsChecked(pValue: boolean)
    {
        XDataContainer.SetValue(this, "IsChecked", pValue);
    }

    _CheckedChanged(pArg: Event, pRow: any, pRowArg: any, pBodyArg)
    {
        this.IsSelected = !this.IsSelected;
    }

    GetPKValue(): any
    {
        return null;
    }
}

class XDataSet<T extends XDataTuple>
{
    Tuples: XArray<T>;

    Assign(pClass: any, pDataSet: XDataSet<T>)
    {
        this.Tuples = new XArray<T>(pDataSet.Tuples.Select(t => new pClass(t)));
    }

    get CurrentTuple(): T
    {
        if (this.Tuples?.length == 0)
            return null;
        return this.Tuples[0];
    }
}
