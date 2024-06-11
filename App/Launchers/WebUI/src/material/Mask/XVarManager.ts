import { XIMask } from "./XBaseMask";
import { XDateMask, XDateTimeMask, XTimeMask } from "./XDateMask";
import { XDecimalMask, XDecimalMaskEx, XInt16Mask, XInt32Mask, XInt64Mask } from "./XDecimalMask";
import { XStringMask } from "./XStringMask";

export class XVarManager
{
    private static _Vars = new Object();

    static Initialization()
    {
        if (!XVarManager.Exists("Date"))
        {
            XVarManager.SetVar("Date");
            XVarManager.SetVar<Date>("<@yyyy@>", (pValue) => pValue.getUTCFullYear().toString());
            XVarManager.SetVar<Date>("<@yyy@>", (pValue) => pValue.getUTCFullYear().toString());
            XVarManager.SetVar<Date>("<@yy@>", (pValue) => pValue.getUTCFullYear().toString().substring(1, 4));
            XVarManager.SetVar<Date>("<@y@>", (pValue) => pValue.getUTCFullYear().toString().substring(2, 4));
            XVarManager.SetVar<Date>("<@hh@>", (pValue) => (pValue.getUTCHours() % 12).toString().padStart(2, '0'));
            XVarManager.SetVar<Date>("<@h@>", (pValue) => (pValue.getUTCHours() % 12).toString());
            XVarManager.SetVar<Date>("<@HH@>", (pValue) => pValue.getUTCHours().toString().padStart(2, '0'));
            XVarManager.SetVar<Date>("<@H@>", (pValue) => pValue.getUTCHours().toString());
            XVarManager.SetVar<Date>("<@mm@>", (pValue) => pValue.getUTCMinutes().toString().padStart(2, '0'));
            XVarManager.SetVar<Date>("<@m@>", (pValue) => pValue.getUTCMinutes().toString());
            XVarManager.SetVar<Date>("<@ss@>", (pValue) => pValue.getUTCSeconds().toString().padStart(2, '0'))
            XVarManager.SetVar<Date>("<@s@>", (pValue) => pValue.getUTCSeconds().toString())
            XVarManager.SetVar<Date>("<@K@>", (pValue) => (pValue.getTimezoneOffset() > 0 ? "-" : "+") + (pValue.getTimezoneOffset() / 60).toString().padStart(2, '0') + ":00")
            XVarManager.SetVar<Date>("<@zzz@>", (pValue) => (pValue.getTimezoneOffset() > 0 ? "-" : "+") + (pValue.getTimezoneOffset() / 60).toString().padStart(2, '0') + ":00")
            XVarManager.SetVar<Date>("<@zz@>", (pValue) => (pValue.getTimezoneOffset() > 0 ? "-" : "+") + (pValue.getTimezoneOffset() / 60).toString().padStart(2, '0'))
            XVarManager.SetVar<Date>("<@z@>", (pValue) => (pValue.getTimezoneOffset() > 0 ? "-" : "+") + (pValue.getTimezoneOffset() / 60).toString())
            XVarManager.SetVar<Date>("<@fffffff@>", (pValue) => pValue.getUTCMilliseconds().toString().substring(0, 7).padEnd(7, '0'))
            XVarManager.SetVar<Date>("<@ffffff@>", (pValue) => pValue.getUTCMilliseconds().toString().substring(0, 6).padEnd(6, '0'))
            XVarManager.SetVar<Date>("<@fffff@>", (pValue) => pValue.getUTCMilliseconds().toString().substring(0, 5).padEnd(5, '0'))
            XVarManager.SetVar<Date>("<@ffff@>", (pValue) => pValue.getUTCMilliseconds().toString().substring(0, 4).padEnd(4, '0'))
            XVarManager.SetVar<Date>("<@fff@>", (pValue) => pValue.getUTCMilliseconds().toString().substring(0, 3).padEnd(3, '0'))
            XVarManager.SetVar<Date>("<@ff@>", (pValue) => pValue.getUTCMilliseconds().toString().substring(0, 2).padEnd(2, '0'))
            XVarManager.SetVar<Date>("<@f@>", (pValue) => pValue.getUTCMilliseconds().toString().substring(0, 1).padEnd(1, '0'))
            XVarManager.SetVar<Date>("<@MMMM@>", (pValue) => pValue.Month())
            XVarManager.SetVar<Date>("<@MMM@>", (pValue) => pValue.Month().substring(0, 3))
            XVarManager.SetVar<Date>("<@MM@>", (pValue) => (pValue.getUTCMonth() + 1).toString().padStart(2, '0'))
            XVarManager.SetVar<Date>("<@M@>", (pValue) => (pValue.getUTCMonth() + 1).toString())
            XVarManager.SetVar<Date>("<@tt@>", (pValue) => pValue.getUTCHours() >= 12 ? "PM" : "AM")
            XVarManager.SetVar<Date>("<@t@>", (pValue) => pValue.getUTCHours() >= 12 ? "P" : "A")
            XVarManager.SetVar<Date>("<@dddd@>", (pValue) => pValue.WeekDay())
            XVarManager.SetVar<Date>("<@ddd@>", (pValue) => pValue.WeekDay().substring(0, 3))
            XVarManager.SetVar<Date>("<@dd@>", (pValue) => pValue.getUTCDate().toString().padStart(2, '0'))
            XVarManager.SetVar<Date>("<@d@>", (pValue) => pValue.getUTCDate().toString())
        }
    }
    static GetDateTime(pDate: Date): string
    {
        return XVarManager.GetVars("/", pDate, "<@dd@>", "<@MM@>", "<@yyyy@>");
    }

    static GetDateTimeS(pDate: Date): string
    {
        return XVarManager.GetVars("/", pDate, "<@dd@>", "<@MM@>", "<@yyyy@>") + " " + XVarManager.GetVars(":", pDate, "<@HH@>", "<@mm@>");
    }

    static GetTimeS(pDate: Date): string
    {
        return XVarManager.GetVars(":", pDate, "<@HH@>", "<@mm@>");
    }

    static GetVars<T>(pSeparetor: string, pDate: T, ...pVars: string[]): string
    {
        var ret = [];
        for (var i = 0; i < pVars.length; i++)
            ret[ret.length] = XVarManager.GetVar(pDate, pVars[i]);
        return ret.join(pSeparetor);
    }

    static GetVar<T>(pValue: T, pVar: string): XValue<T>
    {
        if (!this.Exists(pVar))
            throw new XError("Variável [" + pVar + "] não foi inicializada.");

        return this._Vars[pVar](pValue);
    }

    static SetVar<T>(pVar: string, pLambda?: XValue<T>)
    {
        if (this.Exists(pVar))
            throw new XError("Variável [" + pVar + "] já inicializada.");
        if (X.IsEmpty(pLambda))
            this._Vars[pVar] = pVar;
        else
            this._Vars[pVar] = pLambda;
    }

    static Replace<T>(pVar: string, pLambda?: XValue<T>)
    {
        this._Vars[pVar] = pLambda;
    }

    static Exists(pVar: string): boolean
    {
        return this._Vars[pVar] != null;
    }

    static Create(pTypeID: XType, pScale: number, pBox: XIInputBox, pMaskPattern: string): XIMask
    {
        var fmt: XIMask;
        switch (pTypeID)
        {
            case XType.DateTime:
                fmt = new XDateTimeMask(pBox);
                break;
            case XType.Date:
                fmt = new XDateMask(pBox);
                break;
            case XType.Time:
                fmt = new XTimeMask(pBox);
                break;
            case XType.Int16:
                fmt = new XInt16Mask(pBox);
                break;
            case XType.Int32:
                fmt = new XInt32Mask(pBox);
                break;
            case XType.Int64:
                fmt = new XInt64Mask(pBox);
                break;
            case XType.Decimal:
                if (pScale != -1)
                    fmt = new XDecimalMask(pBox);
                else
                    fmt = new XDecimalMaskEx(pBox);
                break;
            case XType.String:
            default:
                fmt = new XStringMask(pBox);
                break;
        }
        if (!X.IsEmpty(pMaskPattern))
            fmt.SetMask(pMaskPattern);
        fmt.DataType = pTypeID;
        return fmt;
    }
}
