import { XDecimal } from "./XDecimal";

export interface XValidateMaskEvent
{
    (pMask: XIMask): void;
}

export interface XIMask
{
    SetCaretPosition(length: number);
    Formmat(pValue: string | XDecimal | Date, pMask: string): string;
    GetDisplayValueFromNativeValue(pValue: any);
    Mask(pValue: string): string;
    SetBox(pBox: XIInputBox);
    SetMask(pMask: string);
    GetMasks(): XHashSet<string, number>;
    OnChange(pValue: string);
    Destroy();
    Unmasked(pValue: string): any;
    OnValidate: XValidateMaskEvent;
    IsValid: boolean;
    DataType: XType;
    NativeValue: any;
    JSONValue: string;
    Max: number;
    Min: number;
    Scale: number;
    Refresh();
    MasConst: string[];
}

export class XBaseMask implements XIMask
{
    protected static readonly REGEX_SEPARATOR = /[-\.,;/: ()+]/g;
    private static readonly REGEX_NUMBERS = /\d/g;
    private static readonly REGEX_TEXT = /\w/g;
    private static readonly REGEX_LETTERS = /[a-zA-Z]/g;
    private static readonly CHARACTERE_FIND = "§";
    private static readonly STRING_FIND = "§";
    private static readonly EMPTY = "";
    private static readonly CARACTERE_0 = '0';
    private static readonly CARACTERE_A = 'A';
    private static readonly CARACTERE_X = 'X';

    protected CharsMaskValidate: XArray<string>;
    protected Masks = new XHashSet<string, number>();
    protected CaracteresMask: XHashSet<string, number>;
    protected OldValue: string;
    protected Box: XIInputBox;
    protected Element: HTMLInputElement;
    protected RegexValidation: RegExp;
    OnValidate: XValidateMaskEvent;
    IsValid: boolean;
    JSONValue: string;
    private _DataType: XType;
    private _Scale: number = -1;
    private _Max: number;
    private _Min: number;
    protected PNativeValue: any = null;
    get Max(): number { return this._Max; }
    set Max(value: number) { this._Max = value; }
    get Min(): number { return this._Min; }
    set Min(value: number) { this._Min = value; }
    get Scale(): number { return this._Scale; }
    set Scale(value: number) { this._Scale = value; }
    MasConst: string[] = [];
    get NativeValue(): any
    {
        return this.PNativeValue;
    }

    set NativeValue(pValue: any)
    {
        this.SetNativeValue(pValue);
    }

    get DataType(): XType
    {
        return this._DataType;
    }

    set DataType(pValue: XType)
    {
        this._DataType = pValue;
    }

    SetBox(pBox: XIInputBox)
    {
        if (!X.IsEmpty(pBox))
        {
            this.Box = pBox;
            this.Element = <HTMLInputElement>pBox.Input;

            XCall.AddEvent(this, this.Element, XEventType.Input, (elm) => this.OnChange(elm.value));
            XCall.AddEvent(this, this.Element, XEventType.LostFocus, (elm) => this.OnFocusLost(elm.value));
        }
    }

    Mask(pValue: string): string
    {
        if (X.IsEmpty(pValue) || !pValue.replace)
            return "";
        let mask = pValue != null ? this.SelectMask(pValue.replace(XBaseMask.REGEX_SEPARATOR, XBaseMask.EMPTY).length) : null;
        return this.InternalFormat(pValue, mask);
    }

    Formmat(pValue: string | XDecimal | Date, pMask: string): string
    {
        if (pValue instanceof XDecimal || pValue instanceof Date)
            return "";

        return this.InternalFormat(pValue, pMask);
    }

    Refresh()
    {
        this.OnChange(this.Element.value)
    }

    protected InternalFormat(pValue: string, pMask: string)
    {
        if (X.IsEmpty(pMask) || X.IsEmpty(pValue))
            return pValue;
        if (pMask.indexOf('|') != -1)
            pMask = this.InternalSelectMask(pMask, pValue.length);
        this.PrepareMapCaracteres(pMask);
        if (this.OldValue != null && pValue.length < this.OldValue.length && this.GetCaretPosition() == pValue.length + 1)
            return "";

        var ntxt = pValue;

        if (ntxt.replace(XBaseMask.REGEX_SEPARATOR, XBaseMask.EMPTY).length > pMask.replace(XBaseMask.REGEX_SEPARATOR, XBaseMask.EMPTY).length)
            ntxt = ntxt.replace(XBaseMask.REGEX_SEPARATOR, XBaseMask.EMPTY).substring(0, pMask.replace(XBaseMask.REGEX_SEPARATOR, XBaseMask.EMPTY).length);
        else
            ntxt = ntxt.replace(XBaseMask.REGEX_SEPARATOR, XBaseMask.EMPTY);

        ntxt = ntxt.replace(XBaseMask.REGEX_SEPARATOR, XBaseMask.EMPTY);
        var builder = "";
        var fmask = this.CaracteresMask.Get(0);
        var increment = 1;

        if (fmask != null)
        {
            increment = 2;
            builder += fmask;
        }

        for (var i = 0; i < ntxt.length; i++)
        {
            if (this.CharsMaskValidate[i] == XBaseMask.CARACTERE_0 && !X.IsEmpty(ntxt[i].replace(XBaseMask.REGEX_NUMBERS, XBaseMask.EMPTY)))
                continue;
            else
                if (this.CharsMaskValidate[i] == XBaseMask.CARACTERE_A && !X.IsEmpty(ntxt[i].replace(XBaseMask.REGEX_LETTERS, XBaseMask.EMPTY)))
                    continue;
                else
                    if (this.CharsMaskValidate[i] == XBaseMask.CARACTERE_X && !X.IsEmpty(ntxt[i].replace(XBaseMask.REGEX_TEXT, XBaseMask.EMPTY)))
                        continue;

            builder += ntxt[i];
            var temp;
            while (this.CaracteresMask.Get(i + increment) != null)
            {
                temp = this.CaracteresMask.Get(i + increment);
                if (temp != null)
                {
                    increment++;
                    builder += temp;
                }
            }
        }

        var ftxt = builder;
        if (ftxt.length > pMask.length)
            ftxt = ftxt.substring(0, pMask.length);

        if (this.Element != null && this.DeleteLastFormat(this.OldValue, pValue))
            ftxt = ftxt.substring(0, ftxt.length - 1);
        ftxt = this.ProcessConst(pValue, ftxt);
        return ftxt;
    }

    ProcessConst(pValue: any, pText: string)
    {
        if (!X.IsEmpty(this.MasConst))
        {
            for (var i = 0; i < this.MasConst.length; i++)
            {
                let c = <string>this.MasConst[i].ReplaceAll('"', "");
                if (X.IsEmpty(c) || c[0] != "{")
                    continue;
                let v = "";
                switch (c)
                {
                    case "{IsToday}":
                        v = this.IsToday(pValue);
                        pText = pText.ReplaceAll(c, v);
                        break;
                    default:
                        pText = pText.ReplaceAll(c, v);
                }
            }
        }
        return pText;
    }

    IsToday(pValue: any): string
    {
        return "";
    }
    GetMasks()
    {
        return this.Masks;
    }

    SetMask(pMask: string)
    {
        this.ProcessMask(pMask);
    }

    ProcessMask(pMask: string)
    {
        if (X.IsEmpty(pMask))
            return;
        let msks = pMask.split('|').OrderByDescending(v => v.length);
        for (var i = 0; i < msks.length; i++)
        {
            let msk = msks[i];
            var length = msk.replace(XBaseMask.REGEX_SEPARATOR, XBaseMask.EMPTY).length;
            if (this.Masks.Contains(length))
                this.Masks.Remove(length);
            this.Masks.Add(msk, length);
        }
    }

    public OnChange(pValue: string)
    {
        if (X.IsEmpty(pValue))
            return;
        let mask = pValue != null ? this.SelectMask(pValue.replace(XBaseMask.REGEX_SEPARATOR, XBaseMask.EMPTY).length) : null;
        let cmask = mask != null ? this.InternalFormat(pValue.substring(0, this.GetCaretPosition()), mask) : "";

        var nValue = this.Mask(pValue)
        this.SetDisplayText(nValue);

        if (X.IsEmpty(cmask))
        {
            this.SetCaretPosition(0);
        }
        else if (cmask.length < nValue.length)
        {
            if (XBaseMask.REGEX_SEPARATOR.test(this.OldValue.substring(this.OldValue.length - 1)))
                this.SetCaretPosition(cmask.length + 1);
            else if (XBaseMask.REGEX_SEPARATOR.test(cmask.substring(cmask.length - 1)))
                this.SetCaretPosition(cmask.length - 1);
            else
                this.SetCaretPosition(cmask.length);
        }

        this.OldValue = nValue;
        this.IsValid = this.Validate(nValue);
        if (this.IsValid)
            this.SetNativeValue(nValue);
        if (this.OnValidate != null)
            this.OnValidate(this);
    }

    protected OnFocusLost(pValue: string)
    {
    }

    protected SetDisplayText(pValue: string)
    {
        this.Box.SetDisplayText(pValue);
    }

    protected SetNativeValue(pValue: string)
    {
        this.JSONValue = this.PNativeValue = this.Unmasked(pValue);
    }

    GetDisplayValueFromNativeValue(pValue: any)
    {
        return pValue != null ? this.Mask(pValue) : "";
    }

    Unmasked(pValue: string): any
    {
        if (X.IsEmpty(pValue) || !pValue.replace)
            return "";
        return pValue.replace(XBaseMask.REGEX_SEPARATOR, "");
    }

    private InternalSelectMask(pMask: string, pLength: number): string
    {
        let msks = <any[]>pMask.split('|').Select<string>(v => [v, v.replace(XBaseMask.REGEX_SEPARATOR, XBaseMask.EMPTY)]).OrderBy(m => m[0].length);
        for (var i = 0; i < msks.length; i++)
        {
            let msk = msks[i];
            if (msk[1].length >= pLength)
                return msk[0];
        }
        return "";
    }

    protected SelectMask(pLength: number)
    {
        var msk = "";
        var masks = this.Masks.List.OrderBy(v => v);
        for (var i = 0; i <= masks.length - 1; i++)
        {
            var len = masks[i];
            msk = this.Masks.Get(len);
            if (len >= pLength)
                break;
        }
        return msk;
    }

    protected PrepareMapCaracteres(pMask: string)
    {
        if (X.IsEmpty(pMask))
            return;
        this.CharsMaskValidate = pMask.replace(XBaseMask.REGEX_SEPARATOR, XBaseMask.EMPTY).split('');
        var msk = pMask.replace(XBaseMask.REGEX_SEPARATOR, XBaseMask.STRING_FIND);
        this.CaracteresMask = new XHashSet();
        for (var i = msk.indexOf(XBaseMask.CHARACTERE_FIND); i != -1 && i < msk.length; i = msk.indexOf(XBaseMask.CHARACTERE_FIND, i + 1))
            this.CaracteresMask.Add(pMask.substring(i, i + 1), i);
    }

    protected GetCaretPosition()
    {
        return this.Element.selectionStart;
    }

    public SetCaretPosition(pPosition: number)
    {
        this.Element.selectionStart = pPosition;
        this.Element.selectionEnd = pPosition;
    }

    protected DeleteLastFormat(pOldValue: string, pNewValue: string)
    {
        return this.GetCaretPosition() == pNewValue.length && pOldValue != null && pOldValue.length > pNewValue.length && XBaseMask.REGEX_SEPARATOR.test(pOldValue.substring(pOldValue.length - 1));
    }

    protected SetRegexValidation(pRegex: RegExp)
    {
        this.RegexValidation = pRegex;
    }

    public Validate(pValue: string)
    {
        if (pValue.length == 0)
            return true;

        let mask = pValue != null ? this.SelectMask(pValue.replace(XBaseMask.REGEX_SEPARATOR, XBaseMask.EMPTY).length) : null;
        return (X.IsEmpty(mask) || mask.length == pValue.length) && (this.RegexValidation == null || this.RegexValidation.test(pValue));
    }

    Destroy()
    {
        XCall.RemoveEvent(this, this.Element, XEventType.Input);
    }
}