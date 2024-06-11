import { XBaseMask } from "./XBaseMask";
import { XDecimal } from "./XDecimal";

class XBaseDecimalMask extends XBaseMask
{
    constructor(pBox: XIInputBox)
    {
        super();
        this.SetBox(pBox);
        this.PNativeValue = new XDecimal(0);
    }

    protected _DecimalSeparator: string;
    protected _MilharSeparator: string;
    protected _Mask: string;

    override    Formmat(pValue: XDecimal, pMask: string): string
    {
        var match = /^(#(\.|,))*(.)*?((0+)(\.|,)*)(0*)$/.exec(pMask);

        if (match == null)
            throw new XError("Formato da máscara Decimal inválido!")

        var milharSeparator = match[2] != null ? match[2] : "";
        var decimalSeparator = match[6] != null ? match[6] : "";
        var scale = decimalSeparator.length > 0 ? (match[7] != null && match[7] != "" ? match[7].length : -1) : 0;
        var intSize = (match[5] != null ? match[5] : "").length;

        if (this.Scale != -1)
            scale = this.Scale;

        if (!X.IsEmpty(milharSeparator) && milharSeparator == decimalSeparator)
            throw new XError("Separador de Milhar não pode ser o mesmo do decimal");

        if (pValue.GetInteger() > 0)
            var x = -0;

        var intStr = pValue.GetInteger().toString().replace("-", "").padStart(intSize, "0");
        var decimalStr = pValue.GetDecimal(scale);
        var newValue = "";

        for (var i = intStr.length - 1; i >= 0; i--)
        {
            newValue = intStr[i] + newValue;

            if (i > 0 && (intStr.length - i) % 3 == 0)
                newValue = milharSeparator + newValue;
        }

        newValue = (pValue.isNegative() ? "-" : "") + newValue;
        newValue += decimalStr.length > 0 && !X.IsEmpty(decimalSeparator) ? (decimalSeparator + decimalStr) : "";

        return newValue;
    }

    override   SetMask(pMask: string)
    {
        this._Mask = pMask;

        if (X.IsEmpty(pMask))
            return;
        var match = /^(#(\.|,))*(.)*?((0+)(\.|,)*)(0*)$/.exec(pMask)

        this._MilharSeparator = match[2] != null ? match[2] : "";
        this._DecimalSeparator = match[6] != null ? match[6] : "";
    }

    override  OnChange(pValue: string)
    {
        var value = pValue.replace(/[^\d]/g, "").replace(/^[0]*([\d]+)$/g, "$1");

        var newValue = "";

        for (var i = value.length - 1; i >= 0; i--)
        {
            newValue = value[i] + newValue;

            if (i == value.length - this.Scale)
                newValue = this._DecimalSeparator + newValue;

            var indexMilhar = value.length - i - this.Scale;

            if (i > 0 && indexMilhar > 0 && indexMilhar % 3 == 0)
                newValue = this._MilharSeparator + newValue;
        }

        for (var i = newValue.length; i < this.Scale; i++)
        {
            newValue = "0" + newValue;

            if (i == this.Scale - 1)
                newValue = "0" + this._DecimalSeparator + newValue;
        }

        if (newValue.length == this.Scale + 1)
            newValue = "0" + newValue;

        var minusMatch = pValue.match(/-/g);
        var minusSignAmount = minusMatch != null ? minusMatch.length : 0;

        if (minusSignAmount % 2 == 1)
            newValue = "-" + newValue;

        var cpos = pValue.length - this.GetCaretPosition();
        this.IsValid = this.Validate(newValue);
        this.SetNativeValue(value != "" ? newValue.ReplaceAll(".", "").ReplaceAll(",", ".") : "0");
        this.SetDisplayText(newValue);
        this.SetCaretPosition(newValue.length - cpos);

        if (this.OnValidate != null)
            this.OnValidate(this);
    }

    protected override SetNativeValue(pValue: string)
    {
        if (X.IsEmpty(pValue))
            pValue = "0";

        let vlr = new XDecimal(pValue);
        this.PNativeValue = vlr;
        this.JSONValue = pValue;
    }

    protected override OnFocusLost(pValue: string)
    {
        if (this.IsValid)
        {
            if (this.Scale > 0 && this._DecimalSeparator != "")
            {
                var intValue = pValue.indexOf(this._DecimalSeparator) > 0 ? pValue.substring(0, pValue.indexOf(this._DecimalSeparator)) : pValue;
                var decimalValue = pValue.indexOf(this._DecimalSeparator) > 0 ? pValue.substring(pValue.indexOf(this._DecimalSeparator) + 1, pValue.length) : "";

                this.SetDisplayText(intValue + this._DecimalSeparator + decimalValue.padEnd(2, "0"));
            }
        }
    }

    protected override SetDisplayText(pValue: string)
    {
        this.Box.SetDisplayText(pValue);
    }

    override  Validate(pValue: string)
    {
        if (pValue.length == 0)
            return true;

        if (pValue == "-")
            return false;
        var vlr = <string>pValue;
        if (vlr.indexOf && vlr.indexOf(",") != -1)
            pValue = vlr.ReplaceAll(".", "").ReplaceAll(",", ".");
        var value = new XDecimal(pValue);

        if (this.Max > 0 && value.greaterThan(this.Max))
            return false;

        else
            if (this.Min > 0 && value.lessThan(this.Min))
                return false;

        return true;
    }

    override   GetDisplayValueFromNativeValue(pValue: any)
    {
        if (this._Mask != null)
            return this.Formmat(pValue, this._Mask);

        return pValue;
    }
}

export class XBaseDecimalMaskEx extends XBaseDecimalMask
{
    constructor(pBox: XIInputBox)
    {
        super(pBox);
    }

    private _ScaleDecimal: number;

    override    SetMask(pMask: string)
    {
        if (X.IsEmpty(pMask))
            return;
        var match = /^(#(\.|,))*(.)*?((0+)(\.|,)*)(0*)$/.exec(pMask)

        this._MilharSeparator = match[2] != null ? match[2] : "";
        this._DecimalSeparator = match[6] != null ? match[6] : "";
        this._ScaleDecimal = (match[7] != null ? match[7] : "").length;
    }

    override  OnChange(pValue: string)
    {
        var minusMatch = pValue.match(/-/g);
        var pValue = pValue.replace(/[^\d]/g, "").replace(/^[0]*([\d]+)$/g, "$1");
        var minusSignAmount = minusMatch != null ? minusMatch.length : 0;

        pValue = (minusSignAmount % 2 == 1 ? "-" : "") + pValue.ReplaceAll("-", "");

        var nValue = "";

        if (!X.IsEmpty(pValue) && "-" != pValue)
        {
            if (this._MilharSeparator != "" && this._MilharSeparator == pValue)
            {
                this.SetDisplayText("");
            }
            else
            {
                var cValue = this.GetDecimalStrValue(pValue.substring(0, this.GetCaretPosition()));
                nValue = this.GetDecimalStrValue(pValue);

                var values = this.FormatDecimalForDisplay(nValue, cValue)
                this.SetDisplayText(values[0]);
                this.SetCaretPosition(values[1].length);
            }
        } else
        {
            nValue = pValue;
        }

        this.IsValid = this.Validate(nValue);
        this.SetNativeValue(nValue == "-" ? "0" : nValue);

        if (this.OnValidate != null)
            this.OnValidate(this);
    }

    FormatDecimalForDisplay(pValue: string, cValue: string)
    {
        var isNegative = pValue.indexOf("-") == 0;

        var decimal = pValue.indexOf(".") > 0 ? pValue.substring(pValue.indexOf(".") + 1, pValue.length) : "";
        var decimalValue = Number(decimal);

        var unidades = pValue.indexOf(".") > 0 ? pValue.substring(0, pValue.indexOf(".")) : pValue;
        unidades = unidades.replace(/^(0|-0|-)([\d]+)/g, "$2");

        var cDecimal = cValue.indexOf(".") > 0 ? cValue.substring(cValue.indexOf(".") + 1, cValue.length) : "";
        var cDecimalValue = Number(decimal);

        var cUnidades = cValue.indexOf(".") > 0 ? cValue.substring(0, cValue.indexOf(".")) : cValue;
        cUnidades = cUnidades.replace(/^([-]*[0]*)([\d]+)/g, "$2");

        var newValue = "";
        var cNewValue = "";

        for (var i = unidades.length - 1; i >= 0; i--)
        {
            newValue = unidades[i] + newValue;

            if (i > 0 && (unidades.length - i) % 3 == 0)
                newValue = this._MilharSeparator + newValue;

            if (cUnidades.length > i)
            {
                cNewValue = cUnidades[i] + cNewValue;
                if (i > 0 && (unidades.length - i) % 3 == 0)
                    cNewValue = this._MilharSeparator + cNewValue;
            }
        }

        if (decimalValue > 0 || /-*\d+\.[0]*/g.test(pValue))
            newValue += this._DecimalSeparator + decimal;

        if (cDecimalValue > 0 || /-*\d+\.[0]*/g.test(cValue))
            cNewValue += this._DecimalSeparator + cDecimal;

        if (isNegative)
        {
            newValue = "-" + newValue;
            cNewValue = "-" + cNewValue;
        }

        return [newValue, cNewValue];
    }

    protected GetDecimalStrValue(pValue: string)
    {
        var newValue = "";
        var caractereDecimal = false;
        var regex = new RegExp("[" + (this._DecimalSeparator == "." ? "\\" + this._DecimalSeparator : this._DecimalSeparator) + "-\\d]");

        for (var i = 0; i < pValue.length; i++)
        {
            if (!regex.test(pValue[i]))
                continue;

            if (this._DecimalSeparator == pValue[i])
            {
                if (!caractereDecimal)
                    caractereDecimal = true;
                else
                    continue;

                if (newValue == "-" || newValue == "")
                    newValue += "0";

                newValue += ".";

                continue;
            }
            else
                if ("-" == pValue[i])
                {
                    if (i == 0)
                        newValue = "-" + newValue;
                    continue;
                }

            newValue += pValue[i];
        }

        return newValue;
    }

    protected override SetDisplayText(pValue: string)
    {
        this.Box.SetDisplayText(pValue);
    }
}

export class XDecimalMaskEx extends XBaseDecimalMask
{
    constructor(pBox: XIInputBox)
    {
        super(pBox);
    }
}

export class XDecimalMask extends XBaseDecimalMask
{
    constructor(pBox: XIInputBox)
    {
        super(pBox);
        this.Scale = 2;
    }
}

export class XInt16Mask extends XBaseDecimalMask
{
    constructor(pBox: XIInputBox)
    {
        super(pBox);
        this.Max = Math.pow(2, 16) - 1;
        this.Min = -Math.pow(2, 16);
        this.Scale = 0;
    }
}

export class XInt32Mask extends XBaseDecimalMask
{
    constructor(pBox: XIInputBox)
    {
        super(pBox);
        this.Max = Math.pow(2, 31) - 1;
        this.Min = -Math.pow(2, 31);
        this.Scale = 0;
    }
}

export class XInt64Mask extends XBaseDecimalMask
{
    constructor(pBox: XIInputBox)
    {
        super(pBox);
        this.Max = Math.pow(2, 63) - 1;
        this.Min = -Math.pow(2, 63);
        this.Scale = 0;
    }
}