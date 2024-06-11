class XDefault
{
    private static _CID: number = 0;
    static get iID(): number { return ++this._CID; }

    static ServiceHost: string = "";
    static UseCDN: boolean = false;

    static StateFieldName = "SYSxEstadoID";
    static IsWebView: boolean = false;
    static Version: string;
    static UserID: string;
    static UserName: string;
    static CompanyID: string;
    static CompanyName: string;
    static CompanyShortName: string;
    static IsMobile: boolean;
    static NewCID(): number { return ++XDefault._CID; }
    static ScriptPath = "static/js/";
    static Theme: string = "light";
    static StrNullDate = "1755-01-01T00:00:00+0000";
    static StrBRNullDate = "01/01/1755 00:00:00";
    static NullDate: Date = new Date(XDefault.StrNullDate);
    static IsDebug: boolean;

    static get Size(): string { return XDefault.IsMobile ? "small" : "large"; }

    static get Now(): Date { return Date.ToDateTime(new Date().ToLocalISO(), false); }
    static Services: any;
}