import { XBaseMask } from "./XBaseMask";
import { XVarManager } from "./XVarManager";

class XBaseDateTimeMask extends XBaseMask
{
    static Convert(pMaskPatter: string)
    {
        return "<@" + pMaskPatter.ReplaceAll(" ", "@> <@").ReplaceAll("/", "@>/<@").ReplaceAll(":", "@>:<@") + "@>";
    }

    constructor(pBox: XIInputBox)
    {
        super();
        this.LoadVars();
        this.SetBox(pBox);
        this.PNativeValue = XDefault.NullDate;
    }

    private _Mask: string;

    override IsToday(pValue: any): string
    {
        let dt = pValue;
        let nw = new Date();
        if (dt.getUTCMonth() == nw.getUTCMonth())
        {
            var d = ""
            if (dt.getUTCDate() == nw.getUTCDate())
                d = '<b style="color: #38d702; font-Size: 15px;">Hoje, </b>';
            let ndt = nw.Add(XDatePart.Day, 1);
            if (dt.getUTCDate() == ndt.getUTCDate())
                d = '<b style="color: #00c3ff; font-Size: 15px;">Amanhã, </b>';
        }
        return d;
    }

    LoadVars()
    {
        XVarManager.Initialization();
    }

    override Formmat(pValue: Date, pMask: string): string
    {
        var words = pMask.split(/[-\/: ,]/g);
        var dividers = pMask.match(/[-\/: ,]/g);

        var ret = "";

        for (var i = 0; i < words.length; i++)
        {
            let word = words[i];

            if (/^<@.+?@>$/g.test(word))
                ret += XVarManager.GetVar<Date>(pValue, word);
            else
                ret += word;

            if (i < words.length - 1)
                ret += dividers[i];
        }
        ret = this.ProcessConst(pValue, ret);
        return ret;
    }

    protected override SetNativeValue(pValue: string)
    {
        let vlr = Date.ToDateTime(pValue, false);
        this.PNativeValue = vlr;
        this.JSONValue = vlr.ToISO();
    }

    override  Validate(pValue: string)
    {
        if (pValue.length == this._Mask.length)
        {
            if (this.RegexValidation != null && !this.RegexValidation.test(pValue))
                return false;

            if (/^((\d){2}\/){2}(\d){4}.*$/g.test(pValue))
            {
                let split = pValue.split("/");

                var day = Number(split[0]);
                var month = Number(split[1]) - 1;
                var year = Number(split[2].substring(0, 4));
                var time = split[2].substring(5, split[2].length);
                var hour = 0;
                var minute = 0;
                var second = 0;

                if (time.length > 0)
                {
                    split = time.trim().split(":");
                    hour = Number(split[0]);
                    minute = Number(split[1]);
                    if (split.length > 2)
                        second = Number(split[2]);
                }

                var validDate = new Date(Date.UTC(year, month, day, hour, minute, second));

                if (validDate == null)
                    return false;
                let mask = this._Mask.IndexOf("@") != -1 ? this._Mask : XBaseDateTimeMask.Convert(this._Mask);

                if (this.Formmat(validDate, mask) != pValue)
                    return false;
            }

            return true;
        }

        return pValue.length == 0;
    }

    override SetMask(pMask: string)
    {
        this._Mask = pMask = pMask.replace(/[\<@\>]/gi, "");
        this.ProcessMask(pMask.replace(/[dmyhs]/gi, "0"));
    }

    protected override SetDisplayText(pValue: string)
    {
        this.Box.SetDisplayText(pValue);
    }

    override GetDisplayValueFromNativeValue(pValue: any)
    {
        var mask = this._Mask;
        if (!X.Exists(this._Mask, "<@"))
            mask = this._Mask.replace(/(\w+)/g, "<@\$1@>");
        return pValue != null ? this.Formmat(pValue, mask) : "";
    }
}

export class XDateTimeMask extends XBaseDateTimeMask
{
    constructor(pBox: XIInputBox)
    {
        super(pBox);
        this.SetMask("<@dd@>/<@MM@>/<@yyyy@> <@HH@>:<@mm@>");
    }
}

export class XDateMask extends XBaseDateTimeMask
{
    constructor(pBox: XIInputBox)
    {
        super(pBox);
        this.SetMask("<@dd@>/<@MM@>/<@yyyy@>");
    }
}

export class XTimeMask extends XBaseDateTimeMask
{
    constructor(pBox: XIInputBox)
    {
        super(pBox);
        this.SetMask("<@HH@>:<@mm@>");
    }
}