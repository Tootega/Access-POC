class XDefault {
    static get iID() { return ++this._CID; }
    static NewCID() { return ++XDefault._CID; }
    static get Size() { return XDefault.IsMobile ? "small" : "large"; }
    static get Now() { return Date.ToDateTime(new Date().ToLocalISO(), false); }
}
XDefault._CID = 0;
XDefault.ServiceHost = "";
XDefault.UseCDN = false;
XDefault.StateFieldName = "SYSxEstadoID";
XDefault.IsWebView = false;
XDefault.ScriptPath = "static/js/";
XDefault.Theme = "light";
XDefault.StrNullDate = "1755-01-01T00:00:00+0000";
XDefault.StrBRNullDate = "01/01/1755 00:00:00";
XDefault.NullDate = new Date(XDefault.StrNullDate);
class XDataContainer {
    static GetValue(pContext, pField) {
        var data = this._Data.FirstOrNull(r => (r === null || r === void 0 ? void 0 : r.deref()) == pContext);
        if (data != null)
            return data[pField];
        return null;
    }
    static SetValue(pContext, pField, pValue) {
        if (this._Data.length > 100)
            this.Wash();
        var data = this._Data.FirstOrNull(r => (r === null || r === void 0 ? void 0 : r.deref()) == pContext);
        if (data == null) {
            data = new WeakRef(pContext);
            this._Data.Add(data);
        }
        data[pField] = pValue;
        return pValue;
    }
    static Wash() {
        let towash = this._Data.Where(w => w.deref() == null);
        towash.ForEach(d => this._Data.Remove(d));
    }
}
XDataContainer._Data = new Array();
class XKeyValue {
}
class Guid {
    static NewGuid() {
        return Guid.NewUUID();
    }
    static IsEmpty(pGuid) {
        return !this.IsFull(pGuid);
    }
    static IsFull(pValue) {
        return !X.IsEmpty(pValue) && pValue.length == 36 && pValue != this.Empty;
    }
    static NewUUID() {
        var d = new Date().getTime();
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16;
            if (d > 0) {
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            }
            else {
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16).toUpperCase();
        });
    }
}
Guid.Empty = "00000000-0000-0000-0000-000000000000";
document.Styles = document.styleSheets;
DOMTokenList.prototype.Any = function (pPredicade) {
    for (var i = 0; i < this.length; i++)
        if (pPredicade(this[i]))
            return true;
    return false;
};
DOMTokenList.prototype.Add = function (pStyle) {
    if (!this.Any(c => c == "active"))
        this.add("active");
};
DOMTokenList.prototype.Remove = function (pStyle) {
    this.remove("active");
};
Array.prototype.GroupBy = function (pValue) {
    var ar = new Array();
    var ord = this.OrderBy(e => pValue(e));
    var lvlr = null;
    var lar;
    for (var i = 0; i < ord.length; i++) {
        let vlr = pValue(ord[i]);
        if (lvlr != vlr) {
            lar = new XKeyValue();
            lar.Key = vlr;
            lar.Value = new XArray();
            ar.Add(lar);
        }
        lar.Value.Add(ord[i]);
        lvlr = vlr;
    }
    return ar;
};
Array.prototype.IsEqual = function (pOther, pPredicate) {
    if (pOther == null || this.length != pOther.length)
        return false;
    for (var i = 0; i < this.length; i++)
        if (!pPredicate([this[i], pOther[i]]))
            return false;
    return true;
};
Array.prototype.GetRandom = function (pCount) {
    var ar = this.ToArray();
    if (pCount <= 0 || pCount == null)
        pCount = this.length;
    var curidx = Math.min(pCount, ar.length);
    var rndidx = 0;
    XMath.Seed();
    while (0 !== curidx) {
        rndidx = Math.floor(XMath.Random() * curidx);
        curidx--;
        [ar[curidx], ar[rndidx]] = [ar[rndidx], ar[curidx]];
    }
    return ar;
};
Array.prototype.PreviousNOrFirst = function (pN, pPredicate) {
    for (var i = this.length - 1; i >= 0; i--) {
        if ((pPredicate == null || pPredicate(this[i])))
            if (i - pN > 0)
                return this[i - pN];
            else
                return this[0];
    }
    return null;
};
Array.prototype.NextNOrLest = function (pN, pPredicate) {
    for (var i = 0; i < this.length; i++) {
        if ((pPredicate == null || pPredicate(this[i])))
            if (this.length > i + pN)
                return this[i + pN];
            else
                return this[this.length - 1];
    }
    return null;
};
Array.prototype.PreviousFrom = function (pPredicate) {
    for (var i = this.length - 1; i >= 0; i--) {
        var item = this[i];
        if ((pPredicate == null || pPredicate(item)) && i > 0)
            return this[i - 1];
    }
    return null;
};
Array.prototype.NextFrom = function (pPredicate) {
    for (var i = 0; i < this.length; i++) {
        var item = this[i];
        if ((pPredicate == null || pPredicate(item)) && this.length > i + 1)
            return this[i + 1];
    }
    return null;
};
Array.prototype.ToArray = function () {
    var ar = new XArray();
    for (var i = 0; i < this.length; i++)
        ar[i] = this[i];
    return ar;
};
Array.prototype.Assign = function (pArgments) {
    for (var i = 0; i < pArgments.length; i++)
        this[i] = pArgments[i];
};
Array.prototype.First = function (pClass) {
    for (var i = 0; i < this.length; i++) {
        var item = this[i];
        if (item instanceof pClass)
            return item;
    }
    return null;
};
Array.prototype.FirstOr = function (pPredicate) {
    for (var i = 0; i < this.length; i++) {
        var item = this[i];
        if (pPredicate == null || pPredicate(item))
            return item;
    }
    return null;
};
Array.prototype.ForEach = function (pPredicade) {
    for (var i = 0; i < this.length; i++)
        pPredicade(this[i]);
};
Array.prototype.GetAs = function (pIndex) {
    return this[pIndex];
};
Array.prototype.Any = function (pPredicade) {
    for (var i = 0; i < this.length; i++)
        if (pPredicade(this[i]))
            return true;
    return false;
};
Array.prototype.IndexOf = function (pPredicade) {
    var ar = new XArray();
    for (var i = 0; i < this.length; i++) {
        var data = this[i];
        if (pPredicade(data))
            return i;
    }
    return -1;
};
Array.prototype.SelectDistinct = function (pValue) {
    var ar = [];
    for (var i = 0; i < this.length; i++) {
        let vlr = pValue(this[i]);
        if (!ar.Contains(vlr))
            ar.Add(vlr);
    }
    return ar;
};
Array.prototype.Select = function (pValue) {
    var ar = [];
    for (var i = 0; i < this.length; i++)
        ar.Add(pValue(this[i]));
    return ar;
};
Array.prototype.Where = function (pPredicade) {
    var ar = new XArray();
    for (var i = 0; i < this.length; i++) {
        var data = this[i];
        if (pPredicade(data))
            ar[ar.length] = data;
    }
    return ar;
};
Array.prototype.LPad = function (pLength) {
    var ar = new XArray();
    ar.length = pLength;
    var ed = this.length - 1;
    for (var i = pLength - 1; i >= 0; i--, ed--)
        ar[i] = this[ed];
    return ar;
};
Array.prototype.Delete = function (pStart, pEnd) {
    var p = 0;
    for (var i = 0; i < this.length; i++) {
        if (i >= pStart && i <= pEnd)
            continue;
        this[p++] = this[i];
    }
    this.length = p;
};
Array.prototype.Insert = function (pIndex, pValue) {
    this.length = this.length + 1;
    for (var i = this.length - 1; i >= pIndex; i--)
        this[i] = this[i - 1];
    this[pIndex] = pValue;
};
Array.prototype.FirstBy = function (pValue) {
    var v = null;
    var r = null;
    for (let value of this) {
        var vv = pValue(value);
        if (vv < v || v == null) {
            r = value;
            v = vv;
        }
    }
    return r;
};
Array.prototype.Contains = function (pValue, pStart, pEnd) {
    if (pStart == null || pStart == null) {
        for (var i = 0; i < this.length; i++)
            if (pValue == this[i])
                return true;
    }
    else {
        var e = Math.max(pStart, pEnd);
        var s = Math.min(pStart, pEnd);
        if (e == s)
            return false;
        for (var i = s; i < e; i++) {
            if (i >= 0 && i < this.length)
                if (this[i] == pValue)
                    return true;
        }
    }
    return false;
};
Array.prototype.Count = function (pPredicate) {
    var vlr = 0;
    for (var i = 0; i < this.length; i++) {
        if (pPredicate(this[i]))
            vlr++;
    }
    return vlr;
};
Array.prototype.Sum = function (pPredicate) {
    var vlr = 0;
    for (var i = 0; i < this.length; i++)
        vlr += pPredicate(this[i]);
    return vlr;
};
Array.prototype.Max = function (pPredicate) {
    var vlr = 0;
    for (var i = 0; i < this.length; i++)
        vlr = Math.max(pPredicate(this[i]), vlr);
    return vlr;
};
Array.prototype.Clear = function () {
    this.length = 0;
};
Array.prototype.Add = function (pItem) {
    this[this.length] = pItem;
};
Array.prototype.AddRange = function (pValue) {
    if (X.IsEmpty(pValue))
        return;
    for (var i = 0; i < pValue.length; i++)
        this.Add(pValue[i]);
};
Array.prototype.Remove = function (pItem) {
    var idx = this.indexOf(pItem);
    if (idx >= 0) {
        for (var i = idx; i < this.length - 1; i++)
            this[i] = this[i + 1];
        this.length -= 1;
    }
};
Array.prototype.Get = function (pID) {
    var r;
    for (var i = 0; i < this.length; i++)
        if (this[i].ID == pID)
            r = this[i];
    return r;
};
Array.prototype.FirstOrNull = function (pPredicate) {
    for (var i = 0; i < this.length; i++) {
        var item = this[i];
        if (pPredicate == null || pPredicate(item))
            return item;
    }
    return null;
};
Array.prototype.LastOrNull = function (pPredicate) {
    for (var i = this.length - 1; i >= 0; i--) {
        var item = this[i];
        if (pPredicate == null || pPredicate(item))
            return item;
    }
    return null;
};
Array.prototype.OrderByDescending = function (pValue) {
    return this.slice().sort((l, r) => XComparer.Compare(pValue(r), pValue(l)));
};
Array.prototype.OrderBy = function (pValue) {
    let ret = this.slice().sort((l, r) => XComparer.Compare(pValue(l), pValue(r)));
    return ret;
};
HTMLElement.prototype.GetIntance = function (pClass, pCanSelf) {
    let x = pClass;
    let elm = this.parentElement;
    if (pCanSelf)
        elm = this;
    while (elm != null) {
        if ((elm === null || elm === void 0 ? void 0 : elm.Instance) instanceof x)
            return elm.Instance;
        elm = elm.parentElement;
    }
    return null;
};
HTMLElement.prototype.Hide = function () {
    this.style.display = "none";
};
HTMLElement.prototype.Show = function () {
    this.removeAttribute("style");
};
HTMLElement.prototype.ToggleStyle = function (pClass, pAdd) {
    if (pAdd) {
        if (!this.classList.Any(c => c == pClass))
            this.classList.add(pClass);
    }
    else {
        if (this.classList.Any(c => c == pClass))
            this.classList.remove(pClass);
    }
};
HTMLElement.prototype.SetVisibility = function (pVisible) {
    if (pVisible) {
        this.classList.remove("invisible");
        if (!this.classList.Any(c => c == "visible"))
            this.classList.add("visible");
    }
    else {
        this.classList.remove("visible");
        if (!this.classList.Any(c => c == "invisible"))
            this.classList.add("invisible");
    }
};
HTMLElement.prototype.GetChildren = function (pPredicate) {
    let ar = new Array();
    for (var i = 0; i < this.childNodes.length; i++) {
        var item = this.childNodes.item(i);
        if (pPredicate == null || pPredicate(item))
            ar.Add(item);
    }
    return ar;
};
HTMLElement.prototype.GetIcon = function () {
    for (var i = 0; i < this.children.length; i++) {
        var item = this.childNodes.item(i);
        if (item.tagName == "i" || item.tagName == "I")
            return item;
    }
    return null;
};
HTMLElement.prototype.GetChild = function GetChild(pPredicate) {
    for (var i = 0; i < this.childNodes.length; i++) {
        var item = this.childNodes.item(i);
        if (pPredicate == null || pPredicate(item))
            return item;
    }
    return null;
};
HTMLElement.prototype.GetRect = function (pInternal = false) {
    let or = this.getBoundingClientRect();
    if (pInternal) {
        let r = new XRect(or);
        let bl = this.StyleValue("border-left");
        let bt = this.StyleValue("border-top");
        let br = this.StyleValue("border-right");
        let bb = this.StyleValue("border-bottom");
        return new XRect(r.Left - bl, r.Top - bt, r.Width - bl - br, r.Height - bt - bb);
    }
    return new XRect(or);
};
HTMLElement.prototype.GetRectRelative = function (pRelative) {
    let or = this.getBoundingClientRect();
    let rr = pRelative.getBoundingClientRect();
    return new XRect(or.left - rr.left, or.top - rr.top, or.width, or.height);
};
HTMLElement.prototype.GetTextWidth = function (pText, pFont) {
    var canvas = window.Canvas || (window.Canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = pFont;
    var metrics = context.measureText(pText);
    return metrics.width;
};
HTMLElement.prototype.Location = function (pReference) {
    var elm = this;
    var r1 = elm.getBoundingClientRect();
    var r2 = pReference.getBoundingClientRect();
    return new XPoint(r1.left - r2.left, r1.top - r2.top);
};
HTMLElement.prototype.Swap = function (pLeft, pRight) {
    this.insertBefore(this.childNodes[pLeft], this.childNodes[pRight]);
    this.insertBefore(this.childNodes[pRight], this.childNodes[pLeft]);
};
Node.prototype.ForEachChildren = function (pAction, pPredicate) {
    for (var i = 0; i < this.children.length; i++)
        if (pPredicate == null || pPredicate(this.children[i]))
            pAction(this.children[i]);
};
Node.prototype.StyleStrValue = function (pItemName) {
    var styleValue = "";
    if (document.defaultView && document.defaultView.getComputedStyle)
        styleValue = document.defaultView.getComputedStyle(this, "").getPropertyValue(pItemName);
    else if (this.currentStyle) {
        pItemName = pItemName.replace(/\-(\w)/g, (strMatch, p1) => p1.toUpperCase());
        styleValue = this.currentStyle[pItemName];
    }
    return styleValue;
};
Node.prototype.StyleValue = function (pItemName) {
    return parseInt(this.StyleStrValue(pItemName));
};
Node.prototype.IsChildOf = function (pElement, pOrIsSelf) {
    var elm = this;
    if (pOrIsSelf && elm == pElement)
        return true;
    while (elm != null) {
        if (elm.parentElement == pElement)
            return true;
        elm = elm.parentElement;
    }
    return false;
};
Node.prototype.Any = function (pPredicate) {
    var elm = this;
    while (elm != null) {
        if (pPredicate(elm))
            return true;
        elm = elm.parentElement;
    }
    return false;
};
Node.prototype.StyleValue = function (pItemName) {
    var styleValue = 0;
    if (document.defaultView && document.defaultView.getComputedStyle)
        styleValue = Number.parseInt(document.defaultView.getComputedStyle(this, "").getPropertyValue(pItemName));
    else if (this.currentStyle) {
        pItemName = pItemName.replace(/\-(\w)/g, (strMatch, p1) => p1.toUpperCase());
        styleValue = this.currentStyle[pItemName];
    }
    return styleValue;
};
Node.prototype.IsChildOf = function (pElement, pOrIsSelf) {
    var elm = this;
    if (pOrIsSelf && elm == pElement)
        return true;
    while (elm != null) {
        if (elm.parentElement == pElement)
            return true;
        elm = elm.parentElement;
    }
    return false;
};
Node.prototype.Any = function (pPredicate) {
    var elm = this;
    while (elm != null) {
        if (pPredicate(elm))
            return true;
        elm = elm.parentElement;
    }
    return false;
};
String.prototype.Count = function (pChar) {
    var cnt = 0;
    for (var i = 0; i < this.length; i++)
        if (this[i] == pChar)
            cnt++;
    return cnt;
};
String.prototype.Exchange = function (pPos, pChar) {
    var ret = "";
    for (var i = 0; i < this.length; i++) {
        if (i == pPos)
            ret += pChar;
        else
            ret += this[i];
    }
    return ret;
};
String.prototype.Split = function (pSeparator) {
    var ret = new XArray();
    let prts = this.split(pSeparator);
    for (var i = 0; i < prts.length; i++) {
        let str = prts[i];
        if (X.IsEmpty(str))
            continue;
        ret[ret.length] = str;
    }
    return ret;
};
String.prototype.LPad = function (pCount, pChar) {
    var str = this == null ? "" : this;
    if (str.length > pCount)
        return str.substr(str.length - pCount, pCount);
    if (X.IsEmpty(pChar))
        pChar = " ";
    return pChar.repeat(pCount - str.length) + str;
};
String.prototype.RPad = function (pCount, pChar) {
    var str = this == null ? "" : this;
    if (str.length > pCount)
        return str.substr(0, pCount);
    if (X.IsEmpty(pChar))
        pChar = " ";
    return str.Add(pChar, pCount - str.length);
};
String.prototype.Add = function (pChar, pCount) {
    var str = this == null ? "" : this;
    for (var i = 0; i < pCount; i++)
        str = str + pChar;
    return str;
};
String.prototype.ReplaceAll = function (pSearch, pValue) {
    return this.split(pSearch).join(pValue);
};
String.prototype.Exist = function (pValue) {
    return this.indexOf(pValue) != -1;
};
String.prototype.IndexOf = function (pValue) {
    return this.indexOf(pValue);
};
String.prototype.IsEqual = function (pValue) {
    var str = this;
    if (X.IsEmpty(str) || X.IsEmpty(pValue))
        return false;
    return str == pValue;
};
String.prototype.Contains = function (pValue) {
    if (X.IsEmpty(pValue))
        return false;
    for (var x = 0; x < pValue.length; x++)
        if (this.indexOf(pValue[x].toLowerCase()) == -1)
            return false;
    return true;
};
class XDateTimeResult {
    constructor() {
        this.IsValid = false;
        this.Value = XDefault.NullDate;
        this.IsEmpty = true;
    }
}
var XDatePart;
(function (XDatePart) {
    XDatePart["Year"] = "year";
    XDatePart["Month"] = "month";
    XDatePart["Week"] = "week";
    XDatePart["Day"] = "day";
    XDatePart["Hour"] = "hour";
    XDatePart["Minute"] = "minute";
    XDatePart["Second"] = "second";
})(XDatePart || (XDatePart = {}));
Date.prototype.Add = function (pPart, pValue) {
    var ret = new Date(this);
    var CheckRollover = function () {
        if (ret.getDate() != this.getDate())
            ret.setDate(0);
    };
    switch (pPart) {
        case 'year':
            ret.setFullYear(ret.getFullYear() + pValue);
            CheckRollover();
            break;
        case 'month':
            ret.setMonth(ret.getMonth() + pValue);
            CheckRollover();
            break;
        case 'week':
            ret.setDate(ret.getDate() + 7 * pValue);
            break;
        case 'day':
            ret.setDate(ret.getDate() + pValue);
            break;
        case 'hour':
            ret.setTime(ret.getTime() + pValue * 3600000);
            break;
        case 'minute':
            ret.setTime(ret.getTime() + pValue * 60000);
            break;
        case 'second':
            ret.setTime(ret.getTime() + pValue * 1000);
            break;
        default:
            ret = this;
            break;
    }
    return ret;
};
Date.prototype.IsToday = function () {
    let now = new Date();
    let it = this;
    return it.getUTCDate() == now.getUTCDate() && it.getUTCMonth() == now.getUTCMonth() && it.getUTCFullYear() == now.getUTCFullYear();
};
Date.prototype.IsLeapYear = function () {
    return Date.IsLeapYear(this.getFullYear());
};
Date.prototype.GetUTCDaysInMonth = function () {
    return Date.GetDaysInMonth(this.getUTCFullYear(), this.getUTCMonth());
};
Date.prototype.AddMonths = function (pValue) {
    var n = this.getUTCDate();
    this.setUTCDate(1);
    this.setUTCMonth(this.getUTCMonth() + pValue);
    this.setUTCDate(Math.min(n, this.GetUTCDaysInMonth()));
    return this;
};
Date.prototype.WeekDay = function () {
    return ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'][this.getDay()];
};
Date.prototype.Month = function () {
    return ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'][this.getMonth()];
};
Date.prototype.LocalDateTimeString = function (pShortY, pShortH, pShowDecimal) {
    return this.LocalDateString(pShortY) + ' ' + this.LocalTimeString(pShortH, pShowDecimal);
};
Date.prototype.DateTimeString = function () {
    return this.DateString() + ' ' + this.TimeString();
};
Date.prototype.LocalTimeString = function (pShort, pShowDecimal) {
    if (pShort)
        return X.PadStart(this.getHours(), 2, "0") + ":" + X.PadStart(this.getMinutes(), 2, "0");
    if (pShowDecimal)
        return X.PadStart(this.getHours(), 2, "0") + ":" + X.PadStart(this.getMinutes(), 2, "0") + ":" + X.PadStart(this.getSeconds(), 2, "0") + "," + X.PadStart(this.getMilliseconds(), 3, "0");
    return X.PadStart(this.getHours(), 2, "0") + ":" + X.PadStart(this.getMinutes(), 2, "0");
};
Date.prototype.LocalDateString = function (pShort) {
    if (pShort)
        return X.PadStart(this.getDate().toString(), 2, "0") + "/" + X.PadStart(this.getMonth() + 1, 2, "0") + "/" + this.getFullYear().toString().LPad(2, '0');
    return X.PadStart(this.getDate().toString(), 2, "0") + "/" + X.PadStart(this.getMonth() + 1, 2, "0") + "/" + this.getFullYear().toString();
};
Date.prototype.DateString = function () {
    var dstr = X.PadStart(this.getUTCDate().toString(), 2, "0") + "/" + X.PadStart(this.getUTCMonth() + 1, 2, "0") + "/" + this.getUTCFullYear().toString();
    return dstr;
};
Date.prototype.TimeString = function (pShort = false) {
    if (!pShort)
        return X.PadStart(this.getUTCHours(), 2, "0") + ":" + X.PadStart(this.getUTCMinutes(), 2, "0") + ":" + X.PadStart(this.getUTCSeconds(), 2, "0");
    return X.PadStart(this.getUTCHours(), 2, "0") + ":" + X.PadStart(this.getUTCMinutes(), 2, "0");
};
Date.prototype.ToLocalISO = function (pShort) {
    var dstr = this.getFullYear() + "-" + X.PadStart(this.getMonth() + 1, 2, "0") + "-" + X.PadStart(this.getDate(), 2, "0") + "T" +
        X.PadStart(this.getHours(), 2, "0") + ":" + X.PadStart(this.getMinutes().toString(), 2, "0") + ":" +
        X.PadStart(this.getSeconds(), 2, "0") + (pShort ? "" : "." + X.PadStart(this.getUTCMilliseconds(), 6, "0"));
    return dstr;
};
Date.prototype.ToISO = function (pShort) {
    var dstr = this.getUTCFullYear() + "-" + X.PadStart(this.getUTCMonth() + 1, 2, "0") + "-" + X.PadStart(this.getUTCDate(), 2, "0") + "T" +
        X.PadStart(this.getUTCHours(), 2, "0") + ":" + X.PadStart(this.getUTCMinutes().toString(), 2, "0") + ":" +
        X.PadStart(this.getUTCSeconds(), 2, "0") + (pShort ? "" : "." + X.PadStart(this.getUTCMilliseconds(), 6, "0"));
    return dstr;
};
Date.prototype.OnlyTime = function () {
    var dstr = "1755-01-01T" + X.PadStart(this.getUTCHours(), 2, "0") + ":" + X.PadStart(this.getUTCMinutes().toString(), 2, "0") + ":" +
        X.PadStart(this.getUTCSeconds(), 2, "0") + "." + X.PadStart(this.getUTCMilliseconds(), 6, "0");
    return Date.ToDateTime(dstr, true);
};
Date.prototype.OnlyDate = function () {
    var dstr = this.getUTCFullYear() + "-" + X.PadStart(this.getUTCMonth() + 1, 2, "0") + "-" + X.PadStart(this.getUTCDate(), 2, "0") + "T00:00:00.000000";
    return Date.ToDateTime(dstr, true);
};
Date.prototype.Full = function () {
    var dstr = this.getUTCFullYear() + "-" + X.PadStart(this.getUTCMonth() + 1, 2, "0") + "-" + X.PadStart(this.getUTCDate(), 2, "0") + "T" +
        X.PadStart(this.getUTCHours(), 2, "0") + ":" + X.PadStart(this.getUTCMinutes().toString(), 2, "0") + ":" + X.PadStart(this.getUTCSeconds(), 2, "0") + " " + this.getUTCMilliseconds();
    return dstr;
};
Date.prototype.ToString = function () {
    var dstr = X.PadStart(this.getUTCDate().toString(), 2, "0") + "/" + X.PadStart(this.getUTCMonth() + 1, 2, "0") + "/" + this.getUTCFullYear().toString() + " " +
        X.PadStart(this.getUTCHours(), 2, "0") + ":" + X.PadStart(this.getUTCMinutes(), 2, "0") + ":" + X.PadStart(this.getUTCSeconds(), 2, "0");
    return dstr;
};
Date.prototype.FormatDateTime = function (pTypeID, pPattern) {
    if (this.getFullYear() <= 1755)
        return "";
    if (pPattern.length > 16)
        return this.LocalDateTimeString(false, false, true); // 01/01/0001 01:01
    if (pPattern.length == 16)
        return this.LocalDateTimeString(false, true); // 01/01/0001 01:01
    if (pPattern.length == 14)
        return this.LocalDateTimeString(true, true); // 01/01/01 01:01
    if (pPattern.length == 10)
        return this.LocalDateString(); // 01/01/0001
    if (pPattern.length == 8)
        if (pPattern.indexOf(':') == -1)
            return this.LocalDateString(true); // 01/01/01
        else
            return this.LocalTimeString(); // 01:01:01
    if (pPattern.length == 5)
        return this.LocalTimeString(true); // 01:01
    return this.LocalDateTimeString(); // 01/01/0001 01:01:01
};
Date.IsEmpty = function (pValue) {
    if (pValue == null || Date.IsNullDateOrTime(pValue))
        return true;
    return pValue == XDefault.NullDate;
};
Date.IsLeapYear = function (pYear) {
    return (((pYear % 4 === 0) && (pYear % 100 !== 0)) || (pYear % 400 === 0));
};
Date.GetDaysInMonth = function (pYear, pMonth) {
    return [31, (Date.IsLeapYear(pYear) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][pMonth];
};
Date.Parse = function (pValue) {
    var res = new XDateTimeResult();
    if (X.IsEmpty(pValue))
        return res;
    if (Date.IsBRDateTime(pValue))
        res = Date.FromBRDateTime(pValue);
    else if (Date.IsBRDate(pValue))
        res = Date.FromBRDate(pValue);
    else if (Date.IsBRTime(pValue))
        res = Date.FromBRTime(pValue);
    if (Date.IsDateTime(pValue))
        res = Date.FromDateTime(pValue);
    else if (Date.IsDate(pValue))
        res = Date.FromDate(pValue);
    else if (Date.IsTime(pValue))
        res = Date.FromTime(pValue);
    res.IsEmpty = res.IsValid && res.Value.getUTCFullYear() <= 1755;
    return res;
};
Date.IsBRDate = function (pValue) {
    return Date.FromBRDate(pValue).IsValid;
};
Date.FromBRDate = function (pValue) {
    var res = new XDateTimeResult();
    try {
        if (X.IsEmpty(pValue))
            return res;
        pValue = pValue.trim();
        var strs1 = pValue.split(" ");
        if (strs1.length != 1)
            return res;
        var strs2 = strs1[0].split("/");
        if (strs2.length != 3)
            return res;
        var d = new Number(strs2[0]);
        var m = new Number(strs2[1]);
        var y = new Number(strs2[2]);
        if (d < 0 || m <= 0 || y <= 1754)
            return res;
        var iso = strs2[2] + "-" + strs2[1] + "-" + strs2[0] + "T00:00:00+0000";
        var dt = new Date(Date.parse(iso));
        if (dt.getUTCDate() != d || dt.getUTCMonth() + 1 != m || dt.getUTCFullYear() != y)
            return res;
        res.IsValid = true;
        res.Value = dt;
        return res;
    }
    catch (pError) {
        return res;
    }
};
Date.IsBRTime = function (pValue) {
    return Date.FromBRTime(pValue).IsValid;
};
Date.FromBRTime = function (pValue) {
    var res = new XDateTimeResult();
    try {
        if (X.IsEmpty(pValue))
            return res;
        var strs1 = pValue.split(" ");
        var strs2;
        if (strs1.length != 2)
            strs2 = pValue.split(":");
        else
            strs2 = strs1[0].split(":");
        if (strs2.length < 2 || strs2.length > 3)
            return res;
        if (strs2.length == 2)
            strs2[2] = "00";
        var h = Number.parseInt(strs2[0]);
        var m = Number.parseInt(strs2[1]);
        var s = Number.parseInt(strs2[2]);
        if (s > 60 || m > 60 || h > 23)
            return res;
        var iso = "1755-01-01T" + strs2[0] + ":" + strs2[1] + ":" + strs2[2] + "+0000";
        var dt = new Date(Date.parse(iso));
        if (dt.getUTCHours() != h || dt.getUTCMinutes() != m || dt.getUTCSeconds() != s)
            return res;
        res.IsValid = true;
        res.Value = dt;
        return res;
    }
    catch (pError) {
        return res;
    }
};
Date.IsNullDateOrTime = function (pValue) {
    if (X.IsEmpty(pValue))
        return true;
    if (pValue instanceof Date)
        if (pValue.toJSON() == XDefault.NullDate.toJSON() || pValue.getUTCFullYear() <= 1755)
            return true;
        else
            return false;
    if (!Date.IsDateOrTime(pValue))
        return true;
    if (pValue.indexOf('.') == -1)
        pValue = pValue + "+0000";
    var dt = new Date(pValue);
    return dt.toJSON() == XDefault.NullDate.toJSON() || dt.getUTCFullYear() <= 1755;
};
Date.IsDateOrTime = function (pValue) {
    if (X.IsEmpty(pValue))
        return false;
    if (pValue.getUTCDate)
        return true;
    return Date.IsDate(pValue) || Date.IsTime(pValue) || Date.IsDateTime(pValue) || Date.IsBRDate(pValue) || Date.IsBRTime(pValue) || Date.IsBRDateTime(pValue);
};
Date.ToDateTime = function (pValue, pAsUTC) {
    var ret = null;
    if (Date.IsDateTime(pValue))
        ret = this.FromDateTime(pValue).Value;
    else if (Date.IsTime(pValue))
        ret = this.FromTime(pValue).Value;
    else if (Date.IsDate(pValue))
        ret = this.FromDate(pValue).Value;
    if (Date.IsBRDateTime(pValue))
        ret = this.FromBRDateTime(pValue).Value;
    else if (Date.IsBRDate(pValue))
        ret = this.FromBRDate(pValue).Value;
    else if (Date.IsBRTime(pValue))
        ret = this.FromBRTime(pValue).Value;
    if (ret != null)
        return ret;
    return XDefault.NullDate;
};
Date.IsDate = function (pValue) {
    return this.FromDate(pValue).IsValid;
};
Date.FromDate = function (pValue) {
    var res = new XDateTimeResult();
    try {
        if (X.IsEmpty(pValue))
            return res;
        var strs1 = pValue.split("T");
        if (strs1.length != 2)
            return res;
        var strs2 = strs1[0].split("-");
        if (strs2.length != 3)
            return res;
        var y = Number.parseInt(strs2[0]);
        var m = Number.parseInt(strs2[1]);
        var d = Number.parseInt(strs2[2]);
        if (d < 0 || d > 32 || m < 0 || m > 11 || y <= 1754)
            return res;
        var iso = strs2[0] + "-" + strs2[1] + "-" + strs2[2] + "T00:00:00+0000";
        var dt = new Date(Date.parse(iso));
        if (dt.getUTCDate() != d || dt.getUTCMonth() + 1 != m || dt.getUTCFullYear() != y)
            return res;
        res.IsValid = true;
        res.Value = dt;
        return res;
    }
    catch (pError) {
        return res;
    }
};
Date.IsTime = function (pValue) {
    return this.FromTime(pValue).IsValid;
};
Date.FromTime = function (pValue) {
    var res = new XDateTimeResult();
    try {
        if (X.IsEmpty(pValue))
            return res;
        var strs1 = pValue.split(" ");
        var strs2;
        if (strs1.length != 2)
            strs2 = pValue.split(":");
        else
            strs2 = strs1[0].split(":");
        if (strs2.length < 2 || strs2.length > 3)
            return res;
        if (strs2.length == 2)
            strs2[2] = "00";
        var h = Number.parseInt(strs2[0]);
        var m = Number.parseInt(strs2[1]);
        var s = Number.parseInt(strs2[2]);
        if (s > 60 || m > 60 || h > 23)
            return res;
        var iso = "1755-01-01T" + strs2[0] + ":" + strs2[1] + ":" + strs2[2] + "+0000";
        var dt = new Date(Date.parse(iso));
        if (dt.getUTCHours() != h || dt.getUTCMinutes() != m || dt.getUTCSeconds() != s)
            return res;
        res.IsValid = true;
        res.Value = dt;
        return res;
    }
    catch (pError) {
        return res;
    }
};
Date.IsDateTime = function (pValue) {
    return this.FromDateTime(pValue).IsValid;
};
Date.FromDateTime = function (pValue) {
    var res = new XDateTimeResult();
    try {
        if (X.IsEmpty(pValue))
            return res;
        var strs1 = pValue.split("T");
        if (strs1.length != 2)
            return res;
        var strs2 = strs1[0].split("-");
        if (strs2.length != 3)
            return res;
        var y = Number.parseInt(strs2[0]);
        var m = Number.parseInt(strs2[1]);
        var d = Number.parseInt(strs2[2]);
        if (d < 0 || d > 31 || m < 0 || m > 12 || y <= 1754)
            return res;
        var strs3 = strs1[1].split(":");
        if (strs3.length < 2 || strs3.length > 3)
            return res;
        if (strs2.length == 2)
            strs3[2] = "00";
        var h = Number.parseInt(strs3[0]);
        var n = Number.parseInt(strs3[1]);
        var s = Number.parseInt(strs3[2]);
        if (s > 60 || n > 60 || h > 23)
            return res;
        var iso = "" + strs2[0] + "-" + strs2[1] + "-" + strs2[2] + "T" + strs3[0] + ":" + strs3[1] + ":" + strs3[2] + "+0000";
        var dt = new Date(Date.parse(iso));
        if (dt.getUTCDate() != d || dt.getUTCMonth() + 1 != m || dt.getUTCFullYear() != y || dt.getUTCHours() != h || dt.getUTCMinutes() != n || dt.getUTCSeconds() != s)
            return res;
        res.IsValid = true;
        res.Value = dt;
        return res;
    }
    catch (pError) {
        return res;
    }
};
Date.IsBRDateTime = function (pValue) {
    return this.FromBRDateTime(pValue).IsValid;
};
Date.FromBRDateTime = function (pValue) {
    var res = new XDateTimeResult();
    try {
        if (X.IsEmpty(pValue))
            return res;
        var strs1 = pValue.split(" ");
        if (strs1.length != 2)
            return res;
        var strs2 = strs1[0].split("/");
        if (strs2.length != 3)
            return res;
        var d = Number.parseInt(strs2[0]);
        var m = Number.parseInt(strs2[1]);
        var y = Number.parseInt(strs2[2]);
        if (d < 0 || m <= 0 || y <= 1754)
            return res;
        var strs3 = strs1[1].split(":");
        if (strs3.length < 2 || strs3.length > 3)
            return res;
        if (strs3.length == 2)
            strs3[2] = "00";
        var h = Number.parseInt(strs3[0]);
        var n = Number.parseInt(strs3[1]);
        var s = Number.parseInt(strs3[2]);
        if (s > 60 || n > 60 || h > 23)
            return res;
        var iso = strs2[2] + "-" + strs2[1] + "-" + strs2[0] + "T" + strs3[0] + ":" + strs3[1] + ":" + strs3[2] + "+0000";
        var dt = new Date(Date.parse(iso));
        if (dt.getUTCDate() != d || dt.getUTCMonth() + 1 != m || dt.getUTCFullYear() != y || dt.getUTCHours() != h || dt.getUTCMinutes() != n || dt.getUTCSeconds() != s)
            return res;
        res.IsValid = true;
        res.Value = dt;
        return res;
    }
    catch (pError) {
        return res;
    }
};
class X {
    static FirstOrNull(pSource, pPredicate) {
        for (var i = 0; i < pSource.length; i++) {
            var item = pSource[i];
            if (pPredicate == null || pPredicate(item))
                return item;
        }
        return null;
    }
    ;
    static DataIsEmpty(pValue) {
        return X.IsEmpty(pValue) || ["NI", "NA"].Contains(pValue);
    }
    static AddNL(pSource, ...pValues) {
        if (!X.IsEmpty(pSource))
            return pValues + "\r\n" + pValues.join("\r\n");
        return pValues.join("\r\n");
    }
    static GetLogic(pLeft, pLogic, pRight) {
        if (X.IsEmpty(this._Logic["IsOk"])) {
            this._Logic[1] = "&& '<@V@>'";
            this._Logic[2] = "|| '<@V@>'";
            this._Logic[3] = "( '<@V@>'";
            this._Logic[4] = ") '<@V@>'";
            this._Logic[5] = "== '<@V@>'";
            this._Logic[6] = "!= '<@V@>'";
            this._Logic[7] = "> '<@V@>'";
            this._Logic[8] = ">= '<@V@>'";
            this._Logic[9] = "<= '<@V@>'";
            this._Logic[10] = "< '<@V@>'";
            this._Logic[11] = "X.IsEmpty('<@V@>')";
            this._Logic[12] = "!X.IsEmpty('<@V@>')";
            //this._Logic["Like = 13                      ;
            //this._Logic["LikeBegin = 14                 ;
            //this._Logic["LikeEnd = 15                   ;
            //this._Logic[".Contais('<@V@>')"] = 16;
            //this._Logic[".Contais('<@V@>')"] = 17;
        }
        return "" + pLeft + this._Logic[pLogic].ReplaceAll("<@V@>", pRight);
    }
    static Lower(pString) {
        if (X.IsEmpty(pString))
            return pString;
        return pString.toLowerCase();
    }
    static Split(pValue, pSeparetor) {
        if (X.IsEmpty(pValue))
            return [];
        var prts = pValue.split(pSeparetor);
        var ret = [];
        for (var i = 0; i < prts.length; i++) {
            var prt = prts[i];
            if (!X.IsEmpty(prt))
                prt = prt.trim();
            if (X.IsEmpty(prt))
                continue;
            ret.Add(prt);
        }
        return ret;
    }
    static In(pValue, ...pValues) {
        for (var i = 0; i < pValues.length; i++)
            if (pValue == pValues[i])
                return true;
        return false;
    }
    static Exists(pData, ...pValues) {
        if (X.IsEmpty(pData) || X.IsEmpty(pValues))
            return false;
        for (var i = 0; i < pValues.length; i++) {
            if (pData.IndexOf(pValues[i]) != -1)
                return true;
        }
        return false;
    }
    static ToDate(pValue) {
        return new Date(pValue);
    }
    static IsNumber(pValue) {
        if (X.IsEmpty(pValue))
            return false;
        return !isNaN(Number(pValue.toString()));
    }
    static IsF5(pArg) {
        return ((pArg.which || pArg.keyCode) == XKey.K_F5);
    }
    static IsAlpha(pValue) {
        return pValue >= "A" && pValue <= "Z" || pValue >= "a" && pValue <= "z";
    }
    static IsNum(pValue) {
        return pValue >= "0" && pValue <= "9";
    }
    static Sleep(pTime) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++)
            if ((new Date().getTime() - start) > pTime)
                break;
    }
    static Length(pValue) {
        if (pValue != null && pValue.length)
            return pValue.length;
        return -1;
    }
    static PadStart(pString, pSize, pAdd) {
        pString = pString.toString();
        if (pString.padStart)
            return pString.padStart(pSize, pAdd);
        if (X.IsEmpty(pAdd) || pAdd == "undefined")
            pAdd = ' ';
        if (X.IsEmpty(pString))
            pString = " ";
        else
            pString = pString.toString();
        if (pString.length < pSize)
            pString = pAdd.repeat(pSize + 1) + pString;
        return pString.substring(pString.length - pSize, pString.length);
    }
    static IfNull(pString, pValue) {
        if (X.IsEmpty(pString))
            return pValue;
        return pString;
    }
    static As(pValue) {
        return pValue;
    }
    static Void(pArg) {
        return false;
    }
    static IsChar(pValue) {
        if (X.IsEmpty(pValue) && pValue == " ")
            return false;
        return pValue.length == 1 && (pValue == " " || (pValue >= "0" && pValue <= "9") || (pValue >= "A" && pValue <= "Z") || (pValue >= "a" && pValue <= "z"));
    }
    static IsEmpty(pValue) {
        if (pValue == Guid.Empty)
            return true;
        return pValue == null || pValue == "undefined" || pValue.toString() == "" || (pValue.length != null && (pValue.length == 0 || pValue == " ".repeat(pValue.length)));
    }
    static Contains(pArray, pValue) {
        return !X.IsEmpty(pArray) && pArray.Contains(pValue);
    }
}
X._Logic = new Object();
class XCall {
    static AddEvent(pContext, pElement, pEvent, pMethod) {
        if (pElement.Method == null)
            pElement.Method = new Object();
        pElement.Method[pContext.UUID + pEvent] = (arg) => XCall.Call(pContext, pMethod, [pElement]);
        pElement.addEventListener(pEvent, pElement.Method[pContext.UUID + pEvent]);
    }
    static RemoveEvent(pContext, pElement, pEvent) {
        if (pElement.Method != null && pElement.Method[pContext.UUID + pEvent] != null)
            pElement.removeEventListener(pEvent, pElement.Method[pContext.UUID + pEvent]);
    }
    static RemoveAll(pElement) {
        if (pElement.Method != null)
            for (var vle in pElement.Method)
                pElement.removeEventListener(vle, pElement.Method[vle]);
    }
    static Call(pCallScope, pEvent, pArg) {
        pEvent.apply(pCallScope, pArg);
    }
}
var XDefaultRights;
(function (XDefaultRights) {
    XDefaultRights[XDefaultRights["Restaurar"] = 5] = "Restaurar";
    XDefaultRights[XDefaultRights["Configurar"] = 6] = "Configurar";
    XDefaultRights[XDefaultRights["Visualizar"] = 2] = "Visualizar";
    XDefaultRights[XDefaultRights["Inativar"] = 4] = "Inativar";
    XDefaultRights[XDefaultRights["Alterar"] = 3] = "Alterar";
    XDefaultRights[XDefaultRights["Incluir"] = 1] = "Incluir";
})(XDefaultRights || (XDefaultRights = {}));
class XComparer {
    static Compare(pLeft, pRight) {
        if (X.IsEmpty(pLeft) && X.IsEmpty(pRight))
            return 0;
        if (X.IsEmpty(pLeft))
            return 1;
        if (X.IsEmpty(pRight))
            return -1;
        if (pLeft instanceof Date || pLeft.constructor.name === "Number")
            return pLeft.valueOf() - pRight.valueOf();
        if (typeof pLeft === "string")
            return pLeft.localeCompare(pRight);
        return 0;
    }
}
var XKey;
(function (XKey) {
    XKey[XKey["K_CANCEL"] = 3] = "K_CANCEL";
    XKey[XKey["K_HELP"] = 6] = "K_HELP";
    XKey[XKey["K_BACK_SPACE"] = 8] = "K_BACK_SPACE";
    XKey[XKey["K_TAB"] = 9] = "K_TAB";
    XKey[XKey["K_CLEAR"] = 12] = "K_CLEAR";
    XKey[XKey["K_RETURN"] = 13] = "K_RETURN";
    XKey[XKey["K_ENTER"] = 14] = "K_ENTER";
    XKey[XKey["K_SHIFT"] = 16] = "K_SHIFT";
    XKey[XKey["K_CONTROL"] = 17] = "K_CONTROL";
    XKey[XKey["K_ALT"] = 18] = "K_ALT";
    XKey[XKey["K_PAUSE"] = 19] = "K_PAUSE";
    XKey[XKey["K_CAPS_LOCK"] = 20] = "K_CAPS_LOCK";
    XKey[XKey["K_ESCAPE"] = 27] = "K_ESCAPE";
    XKey[XKey["K_SPACE"] = 32] = "K_SPACE";
    XKey[XKey["K_PAGE_UP"] = 33] = "K_PAGE_UP";
    XKey[XKey["K_PAGE_DOWN"] = 34] = "K_PAGE_DOWN";
    XKey[XKey["K_END"] = 35] = "K_END";
    XKey[XKey["K_HOME"] = 36] = "K_HOME";
    XKey[XKey["K_LEFT"] = 37] = "K_LEFT";
    XKey[XKey["K_UP"] = 38] = "K_UP";
    XKey[XKey["K_RIGHT"] = 39] = "K_RIGHT";
    XKey[XKey["K_DOWN"] = 40] = "K_DOWN";
    XKey[XKey["K_PRINTSCREEN"] = 44] = "K_PRINTSCREEN";
    XKey[XKey["K_INSERT"] = 45] = "K_INSERT";
    XKey[XKey["K_DELETE"] = 46] = "K_DELETE";
    XKey[XKey["K_0"] = 48] = "K_0";
    XKey[XKey["K_1"] = 49] = "K_1";
    XKey[XKey["K_2"] = 50] = "K_2";
    XKey[XKey["K_3"] = 51] = "K_3";
    XKey[XKey["K_4"] = 52] = "K_4";
    XKey[XKey["K_5"] = 53] = "K_5";
    XKey[XKey["K_6"] = 54] = "K_6";
    XKey[XKey["K_7"] = 55] = "K_7";
    XKey[XKey["K_8"] = 56] = "K_8";
    XKey[XKey["K_9"] = 57] = "K_9";
    XKey[XKey["K_SEMICOLON"] = 59] = "K_SEMICOLON";
    XKey[XKey["K_EQUALS"] = 61] = "K_EQUALS";
    XKey[XKey["K_A"] = 65] = "K_A";
    XKey[XKey["K_B"] = 66] = "K_B";
    XKey[XKey["K_C"] = 67] = "K_C";
    XKey[XKey["K_D"] = 68] = "K_D";
    XKey[XKey["K_E"] = 69] = "K_E";
    XKey[XKey["K_F"] = 70] = "K_F";
    XKey[XKey["K_G"] = 71] = "K_G";
    XKey[XKey["K_H"] = 72] = "K_H";
    XKey[XKey["K_I"] = 73] = "K_I";
    XKey[XKey["K_J"] = 74] = "K_J";
    XKey[XKey["K_K"] = 75] = "K_K";
    XKey[XKey["K_L"] = 76] = "K_L";
    XKey[XKey["K_M"] = 77] = "K_M";
    XKey[XKey["K_N"] = 78] = "K_N";
    XKey[XKey["K_O"] = 79] = "K_O";
    XKey[XKey["K_P"] = 80] = "K_P";
    XKey[XKey["K_Q"] = 81] = "K_Q";
    XKey[XKey["K_R"] = 82] = "K_R";
    XKey[XKey["K_S"] = 83] = "K_S";
    XKey[XKey["K_T"] = 84] = "K_T";
    XKey[XKey["K_U"] = 85] = "K_U";
    XKey[XKey["K_V"] = 86] = "K_V";
    XKey[XKey["K_W"] = 87] = "K_W";
    XKey[XKey["K_X"] = 88] = "K_X";
    XKey[XKey["K_Y"] = 89] = "K_Y";
    XKey[XKey["K_Z"] = 90] = "K_Z";
    XKey[XKey["K_CONTEXT_MENU"] = 93] = "K_CONTEXT_MENU";
    XKey[XKey["K_NUMPAD0"] = 96] = "K_NUMPAD0";
    XKey[XKey["K_NUMPAD1"] = 97] = "K_NUMPAD1";
    XKey[XKey["K_NUMPAD2"] = 98] = "K_NUMPAD2";
    XKey[XKey["K_NUMPAD3"] = 99] = "K_NUMPAD3";
    XKey[XKey["K_NUMPAD4"] = 100] = "K_NUMPAD4";
    XKey[XKey["K_NUMPAD5"] = 101] = "K_NUMPAD5";
    XKey[XKey["K_NUMPAD6"] = 102] = "K_NUMPAD6";
    XKey[XKey["K_NUMPAD7"] = 103] = "K_NUMPAD7";
    XKey[XKey["K_NUMPAD8"] = 104] = "K_NUMPAD8";
    XKey[XKey["K_NUMPAD9"] = 105] = "K_NUMPAD9";
    XKey[XKey["K_MULTIPLY"] = 106] = "K_MULTIPLY";
    XKey[XKey["K_ADD"] = 107] = "K_ADD";
    XKey[XKey["K_SEPARATOR"] = 108] = "K_SEPARATOR";
    XKey[XKey["K_SUBTRACT"] = 109] = "K_SUBTRACT";
    XKey[XKey["K_DECIMAL"] = 110] = "K_DECIMAL";
    XKey[XKey["K_DIVIDE"] = 111] = "K_DIVIDE";
    XKey[XKey["K_F1"] = 112] = "K_F1";
    XKey[XKey["K_F2"] = 113] = "K_F2";
    XKey[XKey["K_F3"] = 114] = "K_F3";
    XKey[XKey["K_F4"] = 115] = "K_F4";
    XKey[XKey["K_F5"] = 116] = "K_F5";
    XKey[XKey["K_F6"] = 117] = "K_F6";
    XKey[XKey["K_F7"] = 118] = "K_F7";
    XKey[XKey["K_F8"] = 119] = "K_F8";
    XKey[XKey["K_F9"] = 120] = "K_F9";
    XKey[XKey["K_F10"] = 121] = "K_F10";
    XKey[XKey["K_F11"] = 122] = "K_F11";
    XKey[XKey["K_F12"] = 123] = "K_F12";
    XKey[XKey["K_F13"] = 124] = "K_F13";
    XKey[XKey["K_F14"] = 125] = "K_F14";
    XKey[XKey["K_F15"] = 126] = "K_F15";
    XKey[XKey["K_F16"] = 127] = "K_F16";
    XKey[XKey["K_F17"] = 128] = "K_F17";
    XKey[XKey["K_F18"] = 129] = "K_F18";
    XKey[XKey["K_F19"] = 130] = "K_F19";
    XKey[XKey["K_F20"] = 131] = "K_F20";
    XKey[XKey["K_F21"] = 132] = "K_F21";
    XKey[XKey["K_F22"] = 133] = "K_F22";
    XKey[XKey["K_F23"] = 134] = "K_F23";
    XKey[XKey["K_F24"] = 135] = "K_F24";
    XKey[XKey["K_NUM_LOCK"] = 144] = "K_NUM_LOCK";
    XKey[XKey["K_SCROLL_LOCK"] = 145] = "K_SCROLL_LOCK";
    XKey[XKey["K_COMMA"] = 188] = "K_COMMA";
    XKey[XKey["K_PERIOD"] = 190] = "K_PERIOD";
    XKey[XKey["K_SLASH"] = 191] = "K_SLASH";
    XKey[XKey["K_BACK_QUOTE"] = 192] = "K_BACK_QUOTE";
    XKey[XKey["K_OPEN_BRACKET"] = 219] = "K_OPEN_BRACKET";
    XKey[XKey["K_BACK_SLASH"] = 220] = "K_BACK_SLASH";
    XKey[XKey["K_CLOSE_BRACKET"] = 221] = "K_CLOSE_BRACKET";
    XKey[XKey["K_QUOTE"] = 222] = "K_QUOTE";
    XKey[XKey["K_META"] = 224] = "K_META";
})(XKey || (XKey = {}));
var XMouseButton;
(function (XMouseButton) {
    XMouseButton[XMouseButton["None"] = 0] = "None";
    XMouseButton[XMouseButton["Left"] = 1] = "Left";
    XMouseButton[XMouseButton["Right"] = 2] = "Right";
})(XMouseButton || (XMouseButton = {}));
var Maps = [
    {
        'base': 'A',
        'letters': /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g
    },
    { 'base': 'AA', 'letters': /[\uA732]/g },
    { 'base': 'AE', 'letters': /[\u00C6\u01FC\u01E2]/g },
    { 'base': 'AO', 'letters': /[\uA734]/g },
    { 'base': 'AU', 'letters': /[\uA736]/g },
    { 'base': 'AV', 'letters': /[\uA738\uA73A]/g },
    { 'base': 'AY', 'letters': /[\uA73C]/g },
    { 'base': 'B', 'letters': /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g },
    { 'base': 'C', 'letters': /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g },
    { 'base': 'D', 'letters': /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g },
    { 'base': 'DZ', 'letters': /[\u01F1\u01C4]/g },
    { 'base': 'Dz', 'letters': /[\u01F2\u01C5]/g },
    {
        'base': 'E',
        'letters': /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g
    },
    { 'base': 'F', 'letters': /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g },
    {
        'base': 'G',
        'letters': /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g
    },
    { 'base': 'H', 'letters': /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g },
    {
        'base': 'I',
        'letters': /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g
    },
    { 'base': 'J', 'letters': /[\u004A\u24BF\uFF2A\u0134\u0248]/g },
    { 'base': 'K', 'letters': /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g },
    {
        'base': 'L',
        'letters': /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g
    },
    { 'base': 'LJ', 'letters': /[\u01C7]/g },
    { 'base': 'Lj', 'letters': /[\u01C8]/g },
    { 'base': 'M', 'letters': /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g },
    {
        'base': 'N',
        'letters': /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g
    },
    { 'base': 'NJ', 'letters': /[\u01CA]/g },
    { 'base': 'Nj', 'letters': /[\u01CB]/g },
    {
        'base': 'O',
        'letters': /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g
    },
    { 'base': 'OI', 'letters': /[\u01A2]/g },
    { 'base': 'OO', 'letters': /[\uA74E]/g },
    { 'base': 'OU', 'letters': /[\u0222]/g },
    { 'base': 'P', 'letters': /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g },
    { 'base': 'Q', 'letters': /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g },
    {
        'base': 'R',
        'letters': /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g
    },
    {
        'base': 'S',
        'letters': /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g
    },
    {
        'base': 'T',
        'letters': /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g
    },
    { 'base': 'TZ', 'letters': /[\uA728]/g },
    {
        'base': 'U',
        'letters': /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g
    },
    { 'base': 'V', 'letters': /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g },
    { 'base': 'VY', 'letters': /[\uA760]/g },
    { 'base': 'W', 'letters': /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g },
    { 'base': 'X', 'letters': /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g },
    {
        'base': 'Y',
        'letters': /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g
    },
    { 'base': 'Z', 'letters': /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g },
    {
        'base': 'a',
        'letters': /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g
    },
    { 'base': 'aa', 'letters': /[\uA733]/g },
    { 'base': 'ae', 'letters': /[\u00E6\u01FD\u01E3]/g },
    { 'base': 'ao', 'letters': /[\uA735]/g },
    { 'base': 'au', 'letters': /[\uA737]/g },
    { 'base': 'av', 'letters': /[\uA739\uA73B]/g },
    { 'base': 'ay', 'letters': /[\uA73D]/g },
    { 'base': 'b', 'letters': /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g },
    { 'base': 'c', 'letters': /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g },
    { 'base': 'd', 'letters': /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g },
    { 'base': 'dz', 'letters': /[\u01F3\u01C6]/g },
    {
        'base': 'e',
        'letters': /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g
    },
    { 'base': 'f', 'letters': /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g },
    {
        'base': 'g',
        'letters': /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g
    },
    {
        'base': 'h',
        'letters': /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g
    },
    { 'base': 'hv', 'letters': /[\u0195]/g },
    {
        'base': 'i',
        'letters': /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g
    },
    { 'base': 'j', 'letters': /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g },
    { 'base': 'k', 'letters': /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g },
    {
        'base': 'l',
        'letters': /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g
    },
    { 'base': 'lj', 'letters': /[\u01C9]/g },
    { 'base': 'm', 'letters': /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g },
    {
        'base': 'n',
        'letters': /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g
    },
    { 'base': 'nj', 'letters': /[\u01CC]/g },
    {
        'base': 'o',
        'letters': /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g
    },
    { 'base': 'oi', 'letters': /[\u01A3]/g },
    { 'base': 'ou', 'letters': /[\u0223]/g },
    { 'base': 'oo', 'letters': /[\uA74F]/g },
    { 'base': 'p', 'letters': /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g },
    { 'base': 'q', 'letters': /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g },
    {
        'base': 'r',
        'letters': /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g
    },
    {
        'base': 's',
        'letters': /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g
    },
    {
        'base': 't',
        'letters': /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g
    },
    { 'base': 'tz', 'letters': /[\uA729]/g },
    {
        'base': 'u',
        'letters': /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g
    },
    { 'base': 'v', 'letters': /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g },
    { 'base': 'vy', 'letters': /[\uA761]/g },
    { 'base': 'w', 'letters': /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g },
    { 'base': 'x', 'letters': /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g },
    {
        'base': 'y',
        'letters': /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g
    },
    { 'base': 'z', 'letters': /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g }
];
var XTupleState;
(function (XTupleState) {
    XTupleState[XTupleState["Detached"] = 0] = "Detached";
    XTupleState[XTupleState["Unchanged"] = 1] = "Unchanged";
    XTupleState[XTupleState["Deleted"] = 2] = "Deleted";
    XTupleState[XTupleState["Modified"] = 3] = "Modified";
    XTupleState[XTupleState["Added"] = 4] = "Added";
})(XTupleState || (XTupleState = {}));
var XFieldState;
(function (XFieldState) {
    XFieldState[XFieldState["Empty"] = 0] = "Empty";
    XFieldState[XFieldState["Unchanged"] = 1] = "Unchanged";
    XFieldState[XFieldState["NotEmpty"] = 2] = "NotEmpty";
    XFieldState[XFieldState["Modified"] = 3] = "Modified";
    XFieldState[XFieldState["ReadOnly"] = 4] = "ReadOnly";
})(XFieldState || (XFieldState = {}));
var XFieldType;
(function (XFieldType) {
    XFieldType["XBinary"] = "XBinary";
    XFieldType["XBoolean"] = "XBoolean";
    XFieldType["XDate"] = "XDate";
    XFieldType["XDateTime"] = "XDateTime";
    XFieldType["XFK"] = "XFK";
    XFieldType["XGuid"] = "XGuid";
    XFieldType["XInt16"] = "XInt16";
    XFieldType["XInt32"] = "XInt32";
    XFieldType["XInt64"] = "XInt64";
    XFieldType["XDecimal"] = "XDecimal";
    XFieldType["XPK"] = "XPK";
    XFieldType["XString"] = "XString";
    XFieldType["XTime"] = "XTime";
    XFieldType["sXInt8"] = "sXInt8";
    XFieldType["sXFloat"] = "sXFloat";
    XFieldType["sXText"] = "sXText";
    XFieldType["sXSysname"] = "sXSysname";
})(XFieldType || (XFieldType = {}));
class XData {
    JSonToInt(pValue, pUseNull) {
        if (X.IsEmpty(pValue))
            return pUseNull ? null : 0;
        return Number.parseInt(pValue);
    }
    JSonToBollean(pValue, pUseNull) {
        if (X.IsEmpty(pValue))
            return pUseNull ? null : false;
        return (pValue == "true") ? true : false;
    }
    JSonToDecimal(pValue, pUseNull) {
        if (X.IsEmpty(pValue))
            return pUseNull ? null : 0;
        return Number.parseFloat(pValue);
    }
    JSonToDate(pValue, pUseNull) {
        if (X.IsEmpty(pValue))
            return pUseNull ? null : XDefault.NullDate;
        var dtparse;
        dtparse = Date.Parse(pValue);
        if (dtparse.IsValid)
            return dtparse.Value;
        else
            return pUseNull ? null : XDefault.NullDate;
    }
    GetFieldValue(pInput, pField) {
        let field = this[pField];
        switch (field.Type()) {
            case XFieldType.XBoolean:
                return field.Value;
            case XFieldType.XDate:
                return field.Value.LocalDateString();
            case XFieldType.XDateTime:
                return field.Value.LocalDateTimeString(false, true, false);
            case XFieldType.XTime:
                return field.Value.LocalTimeString();
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
    SetFieldValue(pEvent, pField, pValue) {
        this[pField].Value = pValue;
    }
}
class XDataField extends XData {
    constructor(State, Type, _Mask, Value, OldValue) {
        super();
        this.State = State;
        this.Type = Type;
        this._Mask = _Mask;
        this.Value = Value;
        this.OldValue = OldValue;
        let os = this.State;
        this.SetValue(Value);
        this.State = os;
    }
    GetDisplayText() {
        return this.FormatText(this.Value);
    }
    FormatText(pValue) {
        switch (this.Type()) {
            case XFieldType.XBoolean:
                return pValue == true ? "Sim" : "Não";
            case XFieldType.XDate:
                let dt0 = pValue;
                if (dt0 == null || dt0.getUTCFullYear() <= 1755)
                    return "";
                return dt0.LocalDateString();
            case XFieldType.XDateTime:
                let dt1 = pValue;
                if (dt1 == null || dt1.getUTCFullYear() <= 1755)
                    return "";
                return dt1.LocalDateTimeString(false, true, false);
            case XFieldType.XTime:
                let dt2 = pValue;
                if (dt2 == null || dt2.getUTCFullYear() <= 1755)
                    return "";
                return dt2.LocalTimeString();
            case XFieldType.XDecimal:
            case XFieldType.sXFloat:
                return (Math.floor(pValue * 100) / 100).toString();
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
    get DisplayText() {
        return this.GetDisplayText();
    }
    SetValue(pValue) {
        switch (this.State) {
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
        switch (this.Type()) {
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
class XDataTuple extends XData {
    constructor() {
        super();
        this.State = XTupleState.Unchanged;
    }
    Assign(pSource) {
        let fields = Object.getOwnPropertyNames(this);
        for (var i = 0; i < fields.length; i++) {
            let fname = fields[i];
            let fld = this[fname];
            if (fld instanceof XDataField)
                this[fname].SetValue(pSource[fname].Value);
            else
                this[fname] = pSource[fname];
        }
        this.UUID = Guid.NewGuid();
    }
    get IsSelected() {
        return XDataContainer.GetValue(this, "IsSelected");
    }
    set IsSelected(pValue) {
        XDataContainer.SetValue(this, "IsSelected", pValue);
    }
    get IsChecked() {
        return XDataContainer.GetValue(this, "IsChecked");
    }
    set IsChecked(pValue) {
        XDataContainer.SetValue(this, "IsChecked", pValue);
    }
    _CheckedChanged(pArg, pRow, pRowArg, pBodyArg) {
        this.IsSelected = !this.IsSelected;
    }
    GetPKValue() {
        return null;
    }
}
class XDataSet {
    Assign(pClass, pDataSet) {
        this.Tuples = new XArray(pDataSet.Tuples.Select(t => new pClass(t)));
    }
    get CurrentTuple() {
        var _a;
        if (((_a = this.Tuples) === null || _a === void 0 ? void 0 : _a.length) == 0)
            return null;
        return this.Tuples[0];
    }
}
var XErrorType;
(function (XErrorType) {
    XErrorType[XErrorType["None"] = 0] = "None";
    XErrorType[XErrorType["Error"] = 1] = "Error";
    XErrorType[XErrorType["Warning"] = 2] = "Warning";
    XErrorType[XErrorType["Unconformity"] = 3] = "Unconformity";
    XErrorType[XErrorType["Message"] = 4] = "Message";
})(XErrorType || (XErrorType = {}));
class XException extends Error {
    static ShowStack() {
        try {
            var ix = "";
            ix.dont.exist += 0;
        }
        catch (e) {
            try {
                var strs = e.stack.split("\n");
                var str = "***********************  [  Begin  ]  ***********************\n";
                for (var i = 2; i < strs.length; i++)
                    str = str + strs[i] + "\n";
            }
            catch (ee) {
                console.log("Erro ao recuperar StackTrace\n" + ee.message);
            }
        }
    }
    constructor(pType, pMessage, pDetail = null, pStack = null, pCallBack = null) {
        super(pMessage);
        this.Type = pType;
        this.stack = pStack;
        this.Detail = pDetail;
        this.CallBack = pCallBack;
    }
    toString() {
        return this.message + "\r\n" + this.Detail + "\r\n" + this.stack;
    }
}
class XError extends XException {
    constructor(pMessage, pDetail = "", pStack = "", pCallBack = "") {
        super(XErrorType.Error, pMessage, pDetail, pStack, pCallBack);
    }
}
class XWarning extends XException {
    constructor(pMessage, pDetail = null, pStack = null, pCallBack = null) {
        super(XErrorType.Warning, pMessage, pDetail, pStack, pCallBack);
    }
}
class XUnconformity extends XException {
    constructor(pMessage, pDetail = null, pStack = null, pCallBack = null) {
        super(XErrorType.Warning, pMessage, pDetail, pStack, pCallBack);
    }
}
class XMessage extends XException {
    constructor(pMessage, pDetail = null, pStack = null, pCallBack = null) {
        super(XErrorType.Message, pMessage, pDetail, pStack, pCallBack);
    }
}
class XRequest extends XData {
}
class XFilter extends XDataTuple {
    constructor() {
        super(...arguments);
        this.TakeRows = 10;
        this.SkipRows = 0;
    }
    get Column() {
        return XDataContainer.GetValue(this, "Column");
    }
    set Column(pValue) {
        XDataContainer.SetValue(this, "Column", pValue);
    }
    PrepareFilter(pValue, pSearch, pTitles) {
        let prts = pValue.split(",");
        for (var i = 0; i < pSearch.length; i++) {
            this[pSearch[i]].Value = null;
            this[pSearch[i]].State = XFieldState.Empty;
        }
        for (var i = 0; i < prts.length; i++)
            if (X.IsEmpty(prts))
                continue;
            else
                this[pSearch[i]].SetValue(prts[i]);
        if (prts.length > 0)
            this.Column = pTitles[prts.length - 1];
    }
}
class XSearchTuple {
    constructor() {
        this.UUID = Guid.NewGuid();
    }
}
class XSort {
    static Sort(pArray, pSwap, pComparer, pOwner) {
        XSort.QuickSort(pArray, 0, pArray.length - 1, pSwap, pComparer, pOwner);
        return pArray;
    }
    static QuickSort(map, left, right, pSwap, pComparer, pOwner) {
        do {
            var i = left;
            var j = right;
            var elm = map[i + ((j - i) >> 1)];
            do {
                while (i < map.length && pComparer.call(pOwner, elm, map[i]) > 0)
                    i++;
                while (j >= 0 && pComparer.call(pOwner, elm, map[j]) < 0)
                    j--;
                if (i > j)
                    break;
                if (i < j)
                    pSwap.call(pOwner, map, i, j);
                i++;
                j--;
            } while (i <= j);
            if (j - left <= right - i) {
                if (left < j)
                    XSort.QuickSort.call(pOwner, map, left, j, pSwap, pComparer, pOwner);
                left = i;
            }
            else {
                if (i < right)
                    XSort.QuickSort.call(pOwner, map, i, right, pSwap, pComparer, pOwner);
                right = j;
            }
        } while (left < right);
    }
    static Swap(pArray, pLeft, pRight) {
        var tmp = pArray[pLeft];
        pArray[pLeft] = pArray[pRight];
        pArray[pRight] = tmp;
    }
}
class XTableColumn {
}
class XType {
    static IsDateTime(pTypeID) {
        return [XType.DateTime, XType.Date, XType.Time].Contains(pTypeID);
    }
    static IsNumber(pTypeID) {
        return [XType.Decimal, XType.Int16, XType.Int32, XType.Int64].Contains(pTypeID);
    }
}
XType.None = Guid.Empty;
XType.Binary = "B678215D-317B-4E8D-861A-B4F6FCA8AF45";
XType.Boolean = "B42D0699-00B6-4999-BD36-244B12990C2F";
XType.Date = "0A34C03B-458F-4BDA-BE51-22175CAAF1E0";
XType.DateTime = "6C9A2A8B-8418-4475-96DF-51F18B29F381";
XType.Decimal = "0B16C95D-7DB8-425F-8DFB-F0A9DBA06400";
XType.Guid = "8C5DEBC0-4165-4429-B106-1554552F802E";
XType.Int16 = "5BD72111-603B-42E5-9488-53A4299E45EB";
XType.Int32 = "FAADA046-C1B9-4E89-9B64-310E272FC0CC";
XType.Int64 = "ADD41C4D-6BB4-49A6-856E-4CAA566DEBC2";
XType.String = "8A656713-0DBB-4D25-9CF9-8DA0DBAD4E62";
XType.Time = "424A36CB-FD57-4FF6-ABA4-8010970352CE";
XType.DefaultMasked = [XType.DateTime, XType.Date, XType.Time, XType.Decimal, XType.Int16, XType.Int32, XType.Int64];
class XHashSet {
    constructor() {
        this.Items = new Object();
        this.List = new XArray();
    }
    get Count() {
        if (this.List == null)
            return 0;
        return this.List.length;
    }
    Add(pItem, pID) {
        this.Items[pID] = pItem;
        this.List.Add(pID);
        return pItem;
    }
    Contains(pID) {
        return this.Items[pID] != null;
    }
    Get(pID) {
        return this.Items[pID];
    }
    Remove(pID) {
        for (var i = 0; i < this.List.length; i++) {
            var v = this.List[i];
            if (v.ID == pID) {
                this.List.Remove(v);
                break;
            }
        }
        this.Items[pID] = null;
    }
}
var XAction;
(function (XAction) {
    XAction[XAction["Save"] = 1] = "Save";
    XAction[XAction["Close"] = 2] = "Close";
    XAction[XAction["NewTuple"] = 3] = "NewTuple";
})(XAction || (XAction = {}));
class XArray extends Array {
    constructor(pArg) {
        super();
        if (pArg != null) {
            if (pArg.length > 0) {
                for (var i = 0; i < pArg.length; i++)
                    this[i] = pArg[i];
            }
            else {
                if (pArg > 0) {
                    this.length = pArg;
                    for (var i = 0; i < this.length; i++)
                        this[i] = null;
                }
            }
        }
    }
}
var XDragType;
(function (XDragType) {
    XDragType[XDragType["LeftTop"] = 0] = "LeftTop";
    XDragType[XDragType["Top"] = 1] = "Top";
    XDragType[XDragType["RightTop"] = 2] = "RightTop";
    XDragType[XDragType["Right"] = 3] = "Right";
    XDragType[XDragType["RightBottom"] = 4] = "RightBottom";
    XDragType[XDragType["Bottom"] = 5] = "Bottom";
    XDragType[XDragType["LeftBottom"] = 6] = "LeftBottom";
    XDragType[XDragType["Left"] = 7] = "Left";
    XDragType[XDragType["Drag"] = 8] = "Drag";
    XDragType[XDragType["Error"] = 9] = "Error";
})(XDragType || (XDragType = {}));
class XHSLColor {
    constructor(pH, pS, pL) {
        this.A = 1;
        this.H = pH;
        this.S = pS;
        this.L = pL;
    }
    get RGB() { return XHSLColor.HSLToRGB(this.H, this.S, this.L, this.A); }
    static StringToRGB(pColor) {
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(pColor)) {
            c = pColor.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return [(c >> 16) & 255, (c >> 8) & 255, c & 255];
        }
        return [0, 0, 0];
    }
    static RGBToHSL(pR, pG, pB) {
        pR /= 255, pG /= 255, pB /= 255;
        var max = Math.max(pR, pG, pB);
        var min = Math.min(pR, pG, pB);
        var h, s, l = (max + min) / 2;
        if (max == min) {
            h = s = 0; // achromatic
        }
        else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case pR:
                    h = (pG - pB) / d + (pG < pB ? 6 : 0);
                    break;
                case pG:
                    h = (pB - pR) / d + 2;
                    break;
                case pB:
                    h = (pR - pG) / d + 4;
                    break;
            }
            h /= 6;
        }
        return new XHSLColor(h, s, l);
    }
    static HSLToRGB(pH, pS, pL, pA) {
        var r, g, b;
        if (pS == 0)
            r = g = b = pL;
        else {
            var hue2rgb = function hue2rgb(p, q, t) {
                if (t < 0)
                    t += 1;
                if (t > 1)
                    t -= 1;
                if (t < 1 / 6)
                    return p + (q - p) * 6 * t;
                if (t < 1 / 2)
                    return q;
                if (t < 2 / 3)
                    return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            var q = pL < 0.5 ? pL * (1 + pS) : pL + pS - pL * pS;
            var p = 2 * pL - q;
            r = hue2rgb(p, q, pH + 1 / 3);
            g = hue2rgb(p, q, pH);
            b = hue2rgb(p, q, pH - 1 / 3);
        }
        return "#" + Math.round(r * 255).toString(16).LPad(2, '0') + Math.round(g * 255).toString(16).LPad(2, '0') + Math.round(b * 255).toString(16).LPad(2, '0') + Math.round(pA * 255).toString(16).LPad(2, '0');
    }
}
class XPoint {
    constructor(pX = Number.NaN, pY = Number.NaN) {
        this.X = pX;
        this.Y = pY;
    }
    get IsLessZero() {
        return this.X < 0 || this.Y < 0;
    }
    Equals(pOther) {
        return this.X == pOther.X && this.Y == pOther.Y;
    }
    LocationType(pW, pH, pSize = 4, pDragArea = 35) {
        var x = this.X;
        var y = this.Y;
        if (x <= pSize && y <= pSize)
            return XDragType.LeftTop;
        else if (x >= pW - pSize && y <= pSize)
            return XDragType.RightTop;
        else if (x >= pW - pSize && y >= pH - pSize)
            return XDragType.RightBottom;
        else if (x <= pSize && y >= pH - pSize)
            return XDragType.LeftBottom;
        else if (y <= pSize)
            return XDragType.Top;
        else if (x >= pW - pSize)
            return XDragType.Right;
        else if (y >= pH - pSize)
            return XDragType.Bottom;
        else if (x <= pSize)
            return XDragType.Left;
        else if (y > pSize && y <= pDragArea)
            return XDragType.Drag;
        return XDragType.Error;
    }
    AsString() {
        return this.X + " " + this.Y;
    }
    toString() {
        return "X=" + this.X + " Y=" + this.Y;
    }
}
class XRect {
    static FromPoints(pLeftTop, pRightBottom) {
        return new XRect(pLeftTop.X, pLeftTop.Y, pRightBottom.X - pLeftTop.X, pRightBottom.Y - pLeftTop.Y);
    }
    constructor(pLeft = 0, pTop = 0, pWidth = 0, pHeight = 0) {
        if (pLeft instanceof DOMRect) {
            let r = pLeft;
            pLeft = r.left;
            pTop = r.top;
            pWidth = r.width;
            pHeight = r.height;
        }
        if (!XUtils.IsNumber(pLeft)) {
            var pts = pLeft.split(';');
            pLeft = Number.parseInt(pts[0]);
            pTop = Number.parseInt(pts[1]);
            pWidth = Number.parseInt(pts[2]);
            pHeight = Number.parseInt(pts[3]);
        }
        this.SetValue(pLeft, pTop, pWidth, pHeight);
    }
    get IsEmpty() { return this.Width <= 0 || this.Height <= 0; }
    get LeftTop() { return new XPoint(this.Left, this.Top); }
    get RightTop() { return new XPoint(this.Left + this.Width, this.Top); }
    get LeftBottom() { return new XPoint(this.Left, this.Top + this.Height); }
    get RightBottom() { return new XPoint(this.Left + this.Width, this.Top + this.Height); }
    get X() { return this.Left; }
    get Y() { return this.Top; }
    get AsPath() {
        var d = ["M", this.Left, this.Top, "L", this.Right, this.Top, this.Right, this.Bottom, this.Left, this.Bottom, this.Left, this.Top, "Z"].join(" ");
        return d;
    }
    toString() {
        return [this.Left, this.Top, this.Width, this.Height].join(" ");
    }
    IntersectsWith(pRect) {
        if (this.IsEmpty || pRect.IsEmpty)
            return false;
        return (pRect.Left <= this.Right) && (pRect.Right >= this.Left) && (pRect.Top <= this.Bottom) && (pRect.Bottom >= this.Top);
    }
    Clone() {
        return new XRect(this.Left, this.Top, this.Width, this.Height);
    }
    ApplyStyle(pStyle) {
        pStyle.left = this.Left + "px";
        pStyle.top = this.Top + "px";
        pStyle.width = this.Width + "px";
        pStyle.height = this.Height + "px";
    }
    Union(pRect) {
        if (this.IsEmpty) {
            this.SetValue(pRect.Left, pRect.Top, pRect.Width, pRect.Height);
            return;
        }
        var l = Math.min(this.Left, pRect.Left);
        var t = Math.min(this.Top, pRect.Top);
        var w = Math.max(this.Right, pRect.Right) - l;
        var h = Math.max(this.Bottom, pRect.Bottom) - t;
        this.SetValue(l, t, w, h);
    }
    SetValue(pLeft, pTop, pWidth, pHeight) {
        this.Left = pLeft;
        this.Top = pTop;
        this.Width = pWidth;
        this.Height = pHeight;
        this.Bottom = pTop + pHeight;
        this.Right = pLeft + pWidth;
        this.Size = new XSize(pWidth, pHeight);
    }
    Inflate(pWidth, pHeight) {
        var l = this.Left - pWidth;
        var t = this.Top - pHeight;
        var w = this.Width + pWidth * 2;
        var h = this.Height + pHeight * 2;
        this.SetValue(l, t, w, h);
    }
    AsSelectPath(pValue = 2) {
        var d = ["M", this.Left, this.Top, "L", this.Right, this.Top, this.Right, this.Bottom - pValue, this.Left, this.Bottom - pValue, "Z"].join(" ");
        return d;
    }
    Center() {
        return new XPoint(this.Left + (this.Width / 2), this.Top + (this.Height / 2));
    }
    Contains(pPoint) {
        return ((pPoint.X >= this.Left) && (pPoint.X - this.Width <= this.Left) && (pPoint.Y >= this.Top) && (pPoint.Y - this.Height <= this.Top));
    }
    Postion(pTarget) {
        if (this.Right < pTarget.Left) {
            if (this.Top > pTarget.Bottom)
                return XDragType.RightTop;
            if (this.Bottom < pTarget.Top)
                return XDragType.RightBottom;
            return XDragType.Right;
        }
        if (pTarget.Right < this.Left) {
            if (pTarget.Bottom < this.Top)
                return XDragType.LeftTop;
            if (pTarget.Top > this.Bottom)
                return XDragType.LeftBottom;
            return XDragType.Left;
        }
        if (this.Top < pTarget.Bottom)
            return XDragType.Bottom;
        if (this.Bottom > pTarget.Top)
            return XDragType.Top;
        return XDragType.Error;
    }
}
class XSize {
    constructor(pWidth = null, pHeight = null) {
        this.Width = pWidth;
        this.Height = pHeight;
    }
    Equal(pOther) {
        return pOther != null && pOther.Width == this.Width && pOther.Height == this.Height;
    }
}
var XEventType;
(function (XEventType) {
    XEventType["MouseMove"] = "mousemove";
    XEventType["MouseDown"] = "mousedown";
    XEventType["MouseUp"] = "mouseup";
    XEventType["MouseEnter"] = "mouseenter";
    XEventType["MouseLeave"] = "mouseleave";
    XEventType["Input"] = "input";
    XEventType["Paste"] = "paste";
    XEventType["KeyDown"] = "keydown";
    XEventType["KeyUp"] = "keyup";
    XEventType["KeyPress"] = "keypress";
    XEventType["LostFocus"] = "focusout";
    XEventType["Click"] = "click";
    XEventType["FocusIn"] = "focusin";
})(XEventType || (XEventType = {}));
class XCallOnce {
    constructor(pUUID, pEvent) {
        this.UUID = pUUID;
        this.Event = pEvent;
    }
    Execute() {
        this.Event.apply(this);
    }
}
class XEventManager {
    static AddExecOnce(pUUID, pEvent) {
        let co = new XCallOnce(pUUID, pEvent);
        XEventManager._CallOnce.Add(co);
    }
    static ExecOnce(pUUID) {
        let co = XEventManager._CallOnce.FirstOrNull(c => c.UUID == pUUID);
        if (co != null) {
            XEventManager._CallOnce.Remove(co);
            co.Execute();
        }
    }
    static AddEvent(pContext, pElement, pEvent, pMethod, pCheckSource = false) {
        if (pElement.Method == null)
            pElement.Method = new Object();
        XEventManager.RemoveEvent(pContext, pElement, pEvent);
        pElement.Method[pContext.UUID + "-" + pEvent] = (arg) => {
            XEventManager.Call(pContext, pMethod, pElement, pCheckSource, arg);
        };
        pElement.addEventListener(pEvent, pElement.Method[pContext.UUID + "-" + pEvent]);
    }
    static RemoveEvent(pContext, pElement, pEvent) {
        if (pElement.Method != null && pElement.Method[pContext.UUID + "-" + pEvent] != null) {
            pElement.removeEventListener(pEvent, pElement.Method[pContext.UUID + "-" + pEvent]);
            pElement.Method[pContext.UUID + "-" + pEvent] = null;
        }
    }
    static Call(pCallScope, pEvent, pHTM, pCheckSource, pArg) {
        if (!pCheckSource || pHTM == pArg.srcElement)
            pEvent.apply(pCallScope, [pArg]);
    }
    static DelayedEvent(pContext, pEvent, pTime = 100) {
        if (pContext._Timer != null && pContext._Timer != -1)
            clearTimeout(pContext._Timer);
        pContext._Timer = setTimeout(() => { pContext._Timer = -1; pEvent.apply(pContext, []); }, pTime);
    }
    static SetTimeOut(pContext, pEvent, pTime = 100) {
        this.DelayedEvent(pContext, pEvent, pTime);
    }
}
XEventManager._CallOnce = new XArray();
class XMath {
    //static AddCorner(pCorner: XPoint, pRound: number, pOut1: XPoint, pOut2: XPoint): XArray<XPoint>
    //{
    //    if (!pCorner.Equals(pOut1) && !pCorner.Equals(pOut2) && ((pOut1.Y == pCorner.Y && pCorner.X == pOut2.X) || (pOut1.X == pCorner.X && pCorner.Y == pOut2.Y)))
    //    {
    //        let x1 = pCorner.X == pOut1.X ? pRound * 2 : Math.abs(pCorner.X - pOut1.X);
    //        let y1 = pCorner.Y == pOut1.Y ? pRound * 2 : Math.abs(pCorner.Y - pOut1.Y);
    //        let x2 = pCorner.X == pOut2.X ? pRound * 2 : Math.abs(pCorner.X - pOut2.X);
    //        let y2 = pCorner.Y == pOut2.Y ? pRound * 2 : Math.abs(pCorner.Y - pOut2.Y);
    //        let size = Math.min(Math.min(x1, y1), Math.min(x2, y2));
    //        pRound = size / 2;
    //    }
    //    else
    //        pRound = 0;
    //    pOut1 = XMath.PointCircle(pCorner, pOut1, pRound);
    //    pOut2 = XMath.PointCircle(pCorner, pOut2, pRound);
    //    return [pOut1, pCorner, pOut2];
    //}
    static CreateArrow(pt, pt2, pWidth) {
        let dg = this.AngleInRad(pt, pt2) / Math.PI * 180 - 90;
        let ln1 = XMath.RotatePoints(pt, [pt, new XPoint(pt.X + pWidth, pt.Y)], dg - 22.5);
        let ln2 = XMath.RotatePoints(pt, ln1, 45);
        return [ln1[0], ln1[1], ln2[1], ln2[0]];
    }
    static RotatePoints(pCenter, pPoints, pDegree) {
        let ret = new XArray();
        for (var i = 0; i < pPoints.length; i++)
            ret.Add(XMath.RotatePoint(pCenter, pPoints[i], pDegree));
        return ret;
    }
    static RotatePoint(pCenter, pPoint, pDegree) {
        let length = XMath.Distance2Points(pPoint, pCenter);
        let degree = XMath.AngleInRad(pPoint, pCenter) + ((pDegree * Math.PI) / 180);
        return new XPoint(pCenter.X - (length * Math.sin(degree)), pCenter.Y - (length * Math.cos(degree)));
    }
    static Round(pRect, pFactor) {
        return new XRect(XMath.RoundN(pRect.Left, pFactor), XMath.RoundN(pRect.Top, pFactor), XMath.RoundN(pRect.Width, pFactor), XMath.RoundN(pRect.Height, pFactor));
    }
    static RoundN(pValue, pFactor) {
        if (Number.isNaN(pValue))
            return 0;
        var v = Math.floor(pValue / pFactor);
        return v * pFactor;
    }
    static Distance2Points(pPoint, pCenter) {
        return Math.sqrt(Math.pow(pPoint.X - pCenter.X, 2) + Math.pow(pPoint.Y - pCenter.Y, 2));
    }
    static LineIntersectsRect(pRect, p1, p2) {
        return XMath.LineIntersectsLine(p1, p2, new XPoint(pRect.X, pRect.Y), new XPoint(pRect.X + pRect.Width, pRect.Y)) ||
            XMath.LineIntersectsLine(p1, p2, new XPoint(pRect.X + pRect.Width, pRect.Y), new XPoint(pRect.X + pRect.Width, pRect.Y + pRect.Height)) ||
            XMath.LineIntersectsLine(p1, p2, new XPoint(pRect.X + pRect.Width, pRect.Y + pRect.Height), new XPoint(pRect.X, pRect.Y + pRect.Height)) ||
            XMath.LineIntersectsLine(p1, p2, new XPoint(pRect.X, pRect.Y + pRect.Height), new XPoint(pRect.X, pRect.Y)) ||
            (pRect.Contains(p1) && pRect.Contains(p2));
    }
    static LineIntersectsLine(l1p1, l1p2, l2p1, l2p2) {
        var q = (l1p1.Y - l2p1.Y) * (l2p2.X - l2p1.X) - (l1p1.X - l2p1.X) * (l2p2.Y - l2p1.Y);
        var d = (l1p2.X - l1p1.X) * (l2p2.Y - l2p1.Y) - (l1p2.Y - l1p1.Y) * (l2p2.X - l2p1.X);
        if (d == 0)
            return false;
        var r = q / d;
        q = (l1p1.Y - l2p1.Y) * (l1p2.X - l1p1.X) - (l1p1.X - l2p1.X) * (l1p2.Y - l1p1.Y);
        var s = q / d;
        if (r < 0 || r > 1 || s < 0 || s > 1)
            return false;
        return true;
    }
    static LineIntersection(pP1Line1, pP2Line1, pP1Line2, pP2Line2) {
        var dx1 = pP2Line1.X - pP1Line1.X;
        var dy1 = pP2Line1.Y - pP1Line1.Y;
        var dx2 = pP2Line2.X - pP1Line2.X;
        var dy2 = pP2Line2.Y - pP1Line2.Y;
        var det = (dx2 * dy1) - (dy2 * dx1);
        if (det == 0)
            return new XPoint(Number.NaN, Number.NaN);
        var mu = (((pP1Line1.X - pP1Line2.X) * dy1) - ((pP1Line1.Y - pP1Line2.Y) * dx1)) / det;
        var mu2 = (((pP1Line1.X - pP1Line2.X) * dy2) - ((pP1Line1.Y - pP1Line2.Y) * dx2)) / det;
        if (mu >= 0 && mu <= 1 && mu2 >= 0 && mu2 <= 1)
            return new XPoint(pP1Line2.X + (mu * dx2), pP1Line2.Y + (mu * dy2));
        return new XPoint(Number.NaN, Number.NaN);
    }
    static ToPolygonEx(pRect, pInflateLine = 0) {
        var list = new XArray();
        list[0] = [new XPoint(pRect.Left - pInflateLine, pRect.Top), new XPoint(pRect.Right + pInflateLine, pRect.Top)];
        list[1] = [new XPoint(pRect.Right, pRect.Top - pInflateLine), new XPoint(pRect.Right, pRect.Bottom + pInflateLine)];
        list[2] = [new XPoint(pRect.Right + pInflateLine, pRect.Bottom), new XPoint(pRect.Left - pInflateLine, pRect.Bottom)];
        list[3] = [new XPoint(pRect.Left, pRect.Bottom + pInflateLine), new XPoint(pRect.Left, pRect.Top - pInflateLine)];
        return list;
    }
    static AddCorner(pCorner, pRound, pP1, pP2) {
        if (!pCorner.Equals(pP1) && !pCorner.Equals(pP2) && ((Math.floor(pP1.Y) == Math.floor(pCorner.Y) && Math.floor(pCorner.X) == Math.floor(pP2.X)) ||
            (Math.floor(pP1.X) == Math.floor(pCorner.X) && Math.floor(pCorner.Y) == Math.floor(pP2.Y)))) {
            var x1 = pCorner.X == pP1.X ? pRound * 2 : Math.abs(pCorner.X - pP1.X);
            var y1 = pCorner.Y == pP1.Y ? pRound * 2 : Math.abs(pCorner.Y - pP1.Y);
            var x2 = pCorner.X == pP2.X ? pRound * 2 : Math.abs(pCorner.X - pP2.X);
            var y2 = pCorner.Y == pP2.Y ? pRound * 2 : Math.abs(pCorner.Y - pP2.Y);
            var size = Math.min(Math.min(x1, y1), Math.min(x2, y2));
            pRound = size / 2;
        }
        else
            pRound = 0;
        return [XMath.PointCircle(pCorner, pP1, pRound), pCorner, XMath.PointCircle(pCorner, pP2, pRound)];
    }
    static PointCircle(pCenter, pPoint, pRadiusX, pRadiusY = -1) {
        if (pRadiusY == -1)
            pRadiusY = pRadiusX;
        var dg = XMath.AngleInRad(pCenter, pPoint) + Math.PI;
        return new XPoint(pCenter.X - (pRadiusX * Math.sin(dg)), pCenter.Y - (pRadiusY * Math.cos(dg)));
    }
    static AngleInRad(pFirst, pSecond) {
        var degree = 0;
        if (pFirst.X == pSecond.X)
            if (pFirst.Y < pSecond.Y)
                degree = Math.PI * 1.5;
            else
                degree = Math.PI / 2.0;
        else
            degree = Math.atan((pSecond.Y - pFirst.Y) / (pFirst.X - pSecond.X));
        if (pSecond.X < pFirst.X)
            degree = degree + Math.PI;
        degree = degree + (Math.PI / 2.0);
        return degree;
    }
    static PolarToCartesian(pCenter, pRadius, pDegrees) {
        var rad = (pDegrees - 90) * Math.PI / 180.0;
        return new XPoint(pCenter.X + (pRadius * Math.cos(rad)), pCenter.Y + (pRadius * Math.sin(rad)));
    }
    static DonutSlice(pCenter, pRadius, pStartDegrees, pEndDegrees, pWidth) {
        var start = XMath.PolarToCartesian(pCenter, pRadius, pEndDegrees);
        var end = XMath.PolarToCartesian(pCenter, pRadius, pStartDegrees);
        var iradius = pRadius - pWidth;
        var istart = XMath.PolarToCartesian(pCenter, iradius, pEndDegrees);
        var iend = XMath.PolarToCartesian(pCenter, iradius, pStartDegrees);
        var flag = pEndDegrees - pStartDegrees <= 180 ? "0" : "1";
        var x = "";
        var d = ["M", start.X, start.Y, "A", pRadius, pRadius, 0, flag, 0, end.X, end.Y, "L", iend.X, iend.Y, "A", iradius, iradius, 0, flag, 1, istart.X, istart.Y, "Z", x].join(" ");
        return d;
    }
    static PieSlice(pCenter, pRadius, pStartDegrees, pEndDegrees) {
        var start = XMath.PolarToCartesian(pCenter, pRadius, pEndDegrees);
        var end = XMath.PolarToCartesian(pCenter, pRadius, pStartDegrees);
        var flag = pEndDegrees - pStartDegrees <= 180 ? "0" : "1";
        var d = ["M", pCenter.X, pCenter.Y, "L", start.X, start.Y, "A", pRadius, pRadius, 0, flag, 0, end.X, end.Y, "L", pCenter.X, pCenter.Y].join(" ");
        return d;
    }
    static Arc(pCenter, pRadius, pStartDegrees, pEndDegrees) {
        var start = XMath.PolarToCartesian(pCenter, pRadius, pEndDegrees);
        var end = XMath.PolarToCartesian(pCenter, pRadius, pStartDegrees);
        var flag = pEndDegrees - pStartDegrees <= 180 ? "0" : "1";
        var d = ["M", start.X, start.Y, "A", pRadius, pRadius, 0, flag, 0, end.X, end.Y].join(" ");
        return d;
    }
    static Seed(pSeed = -1) {
        if (pSeed == -1)
            pSeed = new Date().getTime();
        XMath.m_w = (123456789 + pSeed) & XMath.mask;
        XMath.m_z = (987654321 - pSeed) & XMath.mask;
    }
    static Random() {
        XMath.m_z = (36969 * (XMath.m_z & 65535) + (XMath.m_z >> 16)) & XMath.mask;
        XMath.m_w = (18000 * (XMath.m_w & 65535) + (XMath.m_w >> 16)) & XMath.mask;
        var result = ((XMath.m_z << 16) + (XMath.m_w & 65535)) >>> 0;
        result /= 4294967296;
        return result;
    }
}
XMath.m_w = 123456789;
XMath.m_z = 987654321;
XMath.mask = 0xffffffff;
class XPopupManager {
    static AddAutoEvent(pContext, pMethod, pOnce = true) {
        var obj = { Context: pContext, Method: pMethod, Once: pOnce };
        this.AutoEvent.Add(obj);
    }
    static Remove(pView) {
        XPopupManager.PopupList.Remove(pView);
    }
    static Show(pView) {
        if (!this.PopupList.Any(p => p.UUID == pView.UUID))
            this.PopupList.Add(pView);
        pView.Show();
        //pView.HTML.scrollIntoView();
    }
    static Add(pView) {
        XPopupManager.PopupList.Add(pView);
    }
    static HideAll(pArg, pValid = false) {
        if (pArg != null && this.UseCrl && !pArg.ctrlKey)
            return;
        var ar = XPopupManager.AutoEvent.ToArray();
        for (var i = 0; i < ar.length; i++) {
            var m = ar[i];
            if (pArg != null && !m.Context.CanClose(pArg.target))
                continue;
            m.Method.apply(m.Context);
            if (m.Once)
                XPopupManager.AutoEvent.Remove(m);
        }
        for (var i = 0; i < XPopupManager.PopupList.length; i++) {
            var elm = XPopupManager.PopupList[i];
            if (!elm.IsVisible)
                continue;
            if (pArg == null || elm.CanClose(pArg.target)) {
                if (!pValid)
                    elm.CallPopupClosed();
                elm.IsVisible = false;
            }
        }
    }
}
XPopupManager.PopupList = new XArray();
XPopupManager.AutoEvent = new XArray();
XPopupManager.UseCrl = false;
window.onmousedown = (arg) => XPopupManager.HideAll(arg);
class XBase64 {
    static ToString(pData) {
        return decodeURIComponent(escape(window.atob(pData)));
    }
    static FromString(pData) {
        return btoa(unescape(encodeURIComponent(pData)));
    }
}
class XUtils {
    static SetValue(pObject, pProperty, pValue) {
        if (pObject == null)
            return;
        if (typeof pProperty === "string")
            pProperty = pProperty.split(".");
        if (pProperty.length > 1) {
            var e = pProperty.shift();
            if (X.IsEmpty(e))
                return;
            if (e.indexOf(':') != -1) {
                let pts = e.split(':');
                XUtils.SetValue(pObject[pts[0]][pts[1]], pProperty, pValue);
            }
            else
                XUtils.SetValue(pObject[e], pProperty, pValue);
        }
        else
            pObject[pProperty[0]] = pValue;
    }
    static IsImage(pExtension) {
        return X.In(pExtension, ".jpeg", ".jpg", ".gif", ".png", ".apng", ".svg", ".bmp");
    }
    static HasIntersection(pStartA, pEndA, pStartB, pEndB) {
        return XUtils.Intersection(pStartA, pEndA, pStartB, pEndB).length > 0;
    }
    static Intersection(pStartA, pEndA, pStartB, pEndB) {
        if (pStartA > pEndA)
            throw new XError("Final de A [" + pEndA.DateTimeString() + "] está antes do Início[" + pStartA.DateTimeString() + "].");
        if (pStartB > pEndB)
            throw new XError("Final de B [" + pEndB.DateTimeString() + "] está antes do Início[" + pStartB.DateTimeString() + "].");
        if (pStartA == pEndA)
            throw new XError("Final [" + pEndA.DateTimeString() + "] e Início [" + pStartA.DateTimeString() + "] de A são iguais.");
        if (pStartB == pEndB)
            throw new XError("Final [" + pEndB.DateTimeString() + "] e Início [" + pStartB.DateTimeString() + "] de B são iguais.");
        if (pEndA < pStartB) //  C-1
            return [];
        if (pStartA > pEndB) //  C-2
            return [];
        if (pStartA == pStartB && pEndA == pEndB)
            return [pStartA, pEndA]; //  C-3
        if (pStartA < pStartB) {
            if (pEndA < pEndB)
                return [pStartB, pEndA]; //  C-4
            if (pEndA > pEndB)
                return [pStartB, pEndB]; //  C-6
        }
        else {
            if (pEndA > pEndB)
                return [pStartA, pEndB]; //  C-5
            if (pEndA < pEndB)
                return [pStartA, pEndA]; //  C-7
        }
        return [];
    }
    static CheckCPF(pCPF) {
        pCPF = XUtils.OnlyNumbers(pCPF);
        if (X.IsEmpty(pCPF) || pCPF.length != 11)
            return false;
        let dig = XUtils.CalculateCPF(pCPF.substring(0, 9));
        return pCPF.substring(9, 11) == dig;
    }
    static CheckCNPJ(pCNPJ) {
        pCNPJ = XUtils.OnlyNumbers(pCNPJ);
        if (X.IsEmpty(pCNPJ) || pCNPJ.length != 14)
            return false;
        let dig = XUtils.CalculateCNPJ(pCNPJ.substring(0, 12));
        return pCNPJ.substring(12, 14) == dig;
    }
    static CalculateCNPJ(pCNPJ) {
        if (X.IsEmpty(pCNPJ) || pCNPJ.length != 12)
            return "";
        let multiplicador1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        let multiplicador2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        var soma;
        var rst;
        var dig;
        var str = pCNPJ;
        soma = 0;
        for (var i = 0; i < 12; i++)
            soma += Number.parseInt(str[i]) * multiplicador1[i];
        rst = soma % 11;
        if (rst < 2)
            rst = 0;
        else
            rst = 11 - rst;
        dig = rst.toString();
        str = str + dig;
        soma = 0;
        for (var i = 0; i < 13; i++)
            soma += Number.parseInt(str[i]) * multiplicador2[i];
        rst = soma % 11;
        if (rst < 2)
            rst = 0;
        else
            rst = 11 - rst;
        dig = dig + rst.toString();
        return dig;
    }
    static CalculateCPF(pCPF) {
        if (X.IsEmpty(pCPF) || pCPF.length != 9)
            return "";
        let multiplicador1 = [10, 9, 8, 7, 6, 5, 4, 3, 2];
        let multiplicador2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
        var dig;
        var soma;
        var rst;
        var str = pCPF;
        soma = 0;
        for (var i = 0; i < 9; i++)
            soma += Number.parseInt(str[i]) * multiplicador1[i];
        rst = soma % 11;
        if (rst < 2)
            rst = 0;
        else
            rst = 11 - rst;
        dig = rst.toString();
        str = str + dig;
        soma = 0;
        for (var i = 0; i < 10; i++)
            soma += Number.parseInt(str[i]) * multiplicador2[i];
        rst = soma % 11;
        if (rst < 2)
            rst = 0;
        else
            rst = 11 - rst;
        dig = dig + rst.toString();
        return dig;
    }
    static Parse(pString, pStart, pEnd) {
        var ov = false;
        var strl = pString.length;
        var stvar = -1;
        var result = [];
        var lix = 0;
        for (var i = 0; i < strl; i++) {
            let c = pString[i];
            if (!ov && pStart[0] == c) {
                ov = this.HasToken(pString, pStart, strl, i);
                if (ov) {
                    stvar = i;
                    i += pStart.length;
                }
            }
            if (ov && pEnd[0] == c) {
                if (this.HasToken(pString, pEnd, strl, i)) {
                    ov = false;
                    i += pEnd.length;
                    if (lix < stvar)
                        result[result.length] = pString.substring(lix, stvar);
                    result[result.length] = pString.substring(stvar, i);
                    lix = i;
                }
            }
        }
        if (lix > 0 && lix < strl - 1)
            result[result.length] = pString.substring(lix, strl - 1);
        return result;
    }
    static HasToken(pString, pToken, pStrLen, pPos) {
        for (var s = 1; s < pToken.length; s++) {
            pPos++;
            if (pPos >= pStrLen || pToken[s] != pString[pPos])
                return false;
        }
        return true;
    }
    static DoDownload(pURL) {
        var element = document.createElement('a');
        try {
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(pURL));
            element.setAttribute('download', pURL);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
        }
        finally {
            document.body.removeChild(element);
        }
    }
    static GetExtension(pFileName) {
        for (var i = pFileName.length; --i >= 0;) {
            let ch = pFileName[i];
            if (ch == '.') {
                if (i != length - 1)
                    return pFileName.substring(i);
                else
                    return null;
            }
            if (ch == "/" || ch == '\\' || ch == ":")
                break;
        }
        return null;
    }
    static AsName(pID, pPrefix = "") {
        return pPrefix + pID.ReplaceAll("-", "");
    }
    static GetAllCSSVariable(pStyleSheets, pElement) {
        var vars = [];
        for (var i = 0; i < pStyleSheets.length; i++) {
            try {
                for (var j = 0; j < pStyleSheets[i].cssRules.length; j++) {
                    try {
                        for (var k = 0; k < pStyleSheets[i].cssRules[j].style.length; k++) {
                            let name = pStyleSheets[i].cssRules[j].style[k];
                            if (name.startsWith('--') && vars.indexOf(name) == -1)
                                vars.push(name);
                        }
                    }
                    catch (_a) {
                    }
                }
            }
            catch (_b) {
            }
        }
        var ret = new XArray();
        var style = window.getComputedStyle(pElement);
        for (var i = 0; i < vars.length; i++) {
            var name = vars[i];
            var cl = style.getPropertyValue(name).trim().toUpperCase();
            if (cl[0] != '#')
                continue;
            var sh = "FF";
            if (cl.length > 7)
                sh = cl.substring(7, 9);
            ret[i] = { Name: name, Color: cl.substring(0, 9), Style: style, Opacity: sh };
        }
        return ret;
    }
    static RandomName(pMin, pMax) {
        var ret = "";
        for (var i = 0; i < pMax - pMin + 1; i++) {
            var result = [];
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var c = 0; c < Math.floor(Math.random() * 10 + 2); c++) {
                result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
            }
            if (ret != "")
                ret += " ";
            ret += result.join('');
        }
        return ret;
    }
    static RemoveAccent(pValue) {
        if (X.IsEmpty(pValue))
            return "";
        var ret = "";
        for (var i = 0; i < pValue.length; i++) {
            switch (pValue[i]) {
                case 'á':
                case 'à':
                case 'ã':
                case 'â':
                case 'ä':
                    ret += 'a';
                    break;
                case 'À':
                case 'Â':
                case 'Ã':
                case 'Á':
                case 'Ä':
                    ret += 'A';
                    break;
                case 'é':
                case 'ê':
                case 'ë':
                case 'è':
                    ret += 'e';
                    break;
                case 'É':
                case 'Ê':
                case 'Ë':
                case 'È':
                    ret += 'E';
                    break;
                case 'í':
                case 'ì':
                case 'ï':
                case 'î':
                    ret += 'i';
                    break;
                case 'Í':
                case 'Ì':
                case 'Ï':
                case 'Î':
                    ret += 'I';
                    break;
                case 'ó':
                case 'ô':
                case 'õ':
                case 'ö':
                case 'ò':
                    ret += 'o';
                    break;
                case 'Ó':
                case 'Ô':
                case 'Õ':
                case 'Ö':
                case 'Ò':
                    ret += 'O';
                    break;
                case 'ú':
                case 'ü':
                case 'ù':
                case 'û':
                    ret += 'u';
                    break;
                case 'Ú':
                case 'Ü':
                case 'Ù':
                case 'Û':
                    ret += 'U';
                    break;
                case 'ç':
                    ret += 'c';
                    break;
                case 'Ç':
                    ret += 'C';
                    break;
                default:
                    ret += pValue[i];
                    break;
            }
        }
        return ret;
    }
    static SelectAll(pNode) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(pNode);
        selection.removeAllRanges();
        selection.addRange(range);
    }
    static NearValue(pValue, pAvg, pMaxCount) {
        var v1 = pValue / pMaxCount;
        while (v1 < pAvg && pMaxCount + 1 > 0) {
            pMaxCount--;
            v1 = pValue / pMaxCount;
            if (v1 >= pAvg)
                return v1;
        }
        return v1;
    }
    static Eval(pContext, pJS) {
        var result = function (str) { return eval(str); }.call(pContext, pJS);
        return result;
    }
    static BIRTDate(pValue) {
        var prts = pValue.split(' ');
        return prts[2] + '/' + XUtils._Month.indexOf(prts[1]) + "/" + prts[5] + " 00:00:00;DateTime";
    }
    static IIF(pBoolean, pV1, pV2) {
        if (pBoolean)
            return pV1;
        return pV2;
    }
    static NoNumbers(pValue) {
        if (X.IsEmpty(pValue))
            return null;
        var str = "";
        for (var i = 0; i < pValue.length; i++)
            if (!(pValue[i] >= "0" && pValue[i] <= "9"))
                str += pValue[i];
        return str;
    }
    static OnlyNumbers(pValue) {
        if (X.IsEmpty(pValue))
            return null;
        var str = "";
        for (var i = 0; i < pValue.length; i++)
            if (pValue[i] >= "0" && pValue[i] <= "9")
                str += pValue[i];
        return str;
    }
    static FixDecimal(pValue, pDecimal) {
        var vlr = Math.floor(pValue * Math.pow(10, pDecimal)) / Math.pow(10, pDecimal);
        return vlr;
    }
    static Up2Dec(pValue) {
        var vlr = Math.floor((pValue + 0.009) * Math.pow(10, 2));
        return vlr;
    }
    static Down2Dec(pValue) {
        var vlr = pValue / Math.pow(10, 2);
        return vlr;
    }
    static DecodeUnicode(pValue) {
        return decodeURIComponent(atob(pValue).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }
    static Base64ToString(pValue) {
        if (pValue == "null" || pValue == null)
            return null;
        return atob(pValue);
    }
    static StringToBase64(pValue) {
        return btoa(pValue);
    }
    static Base64ToBlob(pData, pType = "application/octet-stream") {
        const binStr = atob(pData);
        const len = binStr.length;
        const arr = new Uint8Array(len);
        for (let i = 0; i < len; i++)
            arr[i] = binStr.charCodeAt(i);
        return new Blob([arr], { type: pType });
    }
    static To64(pValue) {
        return btoa(pValue);
    }
    static From64(pData) {
        var chrdata = atob(pData);
        var bytes = [];
        for (var offset = 0; offset < chrdata.length; offset += 512) {
            var slice = chrdata.slice(offset, offset + 512);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++)
                byteNumbers[i] = slice.charCodeAt(i);
            var byteArray = new Uint8Array(byteNumbers);
            bytes.push(byteArray);
        }
        return bytes;
    }
    static IndexOf(pElement, pPredicate) {
        for (var i = 0; i < pElement.length; i++) {
            var x = pElement[i];
            if (pPredicate(x))
                return i;
        }
        return -1;
    }
    static GetValue(pElement, pPredicate) {
        for (var i = 0; i < pElement.length; i++) {
            var x = pElement[i];
            if (pPredicate(x))
                return x;
        }
        return null;
    }
    static HasParent(pElement, pPredicate) {
        return XUtils.GetParent(pElement, pPredicate) != null;
    }
    static GetParent(pElement, pPredicate) {
        var p = pElement;
        while (p != null) {
            if (pPredicate(p))
                return p;
            p = p.parentElement;
        }
        return null;
    }
    static NumberToString(pValue, pScale) {
        if (X.IsEmpty(pValue))
            pValue = 0;
        var vlr = pValue.toString();
        var vlrs = vlr.split('.');
        if (pScale > 0) {
            if (vlrs.length == 1)
                vlrs[1] = "0";
            return vlrs[0] + vlrs[1].RPad(pScale, "0");
        }
        return vlrs[0];
    }
    static IsNumber(pValue) {
        return !isNaN(parseFloat(pValue)) && isFinite(pValue);
    }
    static GetSplitLiteral(pValue) {
        if (X.IsEmpty(pValue))
            return [];
        var str = new XArray();
        var st = "";
        var cnt = -1;
        for (var cnt = 0; cnt < pValue.length; cnt++) {
            if (pValue[cnt] != ' ' && pValue[cnt] != '"')
                st += pValue[cnt];
            if (pValue[cnt] == '"') {
                for (; cnt < pValue.length; cnt++) {
                    if (pValue[cnt] != '"')
                        st += pValue[cnt];
                    if (pValue[cnt] == '"' && st != "") {
                        str.Add(st);
                        st = "";
                        break;
                    }
                }
            }
            if (pValue[cnt] == ' ' && st != "") {
                str.Add(st);
                st = "";
            }
        }
        if (st != "")
            str.Add(st);
        var ret = new XArray();
        for (var i = 0; i < str.length; i++)
            if (!X.IsEmpty(str[i])) {
                var vl = str[i].replace('"', '');
                if (!X.IsEmpty(vl))
                    ret.Add(vl);
            }
        return ret;
    }
    static GetString(pCount) {
        var str = "";
        for (var i = 0; i < pCount; i++) {
            var c = Math.floor(Math.random() * XUtils._Str.length);
            str = str + XUtils._Str[c];
        }
        return str;
    }
    static Is(pInstance) {
        return pInstance != null;
    }
    static LoadJS(pDoc, pURL, pCallback) {
        var link = pDoc.createElement('script');
        link.src = pURL;
        link.async = true;
        link.type = "text/javascript";
        link.onload = pCallback;
        pDoc.head.appendChild(link);
        return link;
    }
    static LoadCSS(pDoc, pURL) {
        var link = pDoc.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = pURL;
        link.media = 'screen,print';
        pDoc.head.appendChild(link);
        return link;
    }
    static NewElement(pOwner, pType, pClass, pInsert) {
        var elm;
        if (pClass instanceof Document)
            elm = pClass.createElement(pType);
        else
            elm = document.createElement(pType);
        if (pInsert && pOwner.childNodes.length > 0)
            pOwner.insertBefore(elm, pOwner.childNodes[0]);
        else
            pOwner.appendChild(elm);
        if (!(pClass instanceof Document) && pClass != null)
            elm.className = pClass;
        return elm;
    }
    static SetCursor(pElement, pType) {
        switch (pType) {
            case XDragType.LeftTop:
                pElement.style.cursor = "nw-resize;";
                break;
            case XDragType.Top:
                pElement.style.cursor = "n-resize";
                break;
            case XDragType.RightTop:
                pElement.style.cursor = "ne-resize";
                break;
            case XDragType.Right:
                pElement.style.cursor = "e-resize";
                break;
            case XDragType.RightBottom:
                pElement.style.cursor = "se-resize";
                break;
            case XDragType.Bottom:
                pElement.style.cursor = "s-resize";
                break;
            case XDragType.LeftBottom:
                pElement.style.cursor = "sw-resize";
                break;
            case XDragType.Left:
                pElement.style.cursor = "w-resize";
                break;
            case XDragType.Drag:
                pElement.style.cursor = "move";
                break;
            default:
                pElement.style.cursor = "default";
                break;
        }
    }
    static Add(pArray, pItem) {
        pArray[pArray.length] = pItem;
    }
    static Remove(pArray, pItem) {
        var idx = pArray.indexOf(pItem);
        if (idx >= 0) {
            for (var i = idx; i < pArray.length - 1; i++)
                pArray[i] = pArray[i + 1];
            pArray.length -= 1;
        }
    }
    static Find(pArray, pItem) {
        for (var i = 0; i < pArray.length; i++)
            if (pArray[i] === pItem)
                return pArray[i];
        return null;
    }
    static Location(pElement) {
        var prect = null;
        if (pElement.parentElement != null)
            prect = pElement.parentElement.getBoundingClientRect();
        var rect = pElement.getBoundingClientRect();
        if (prect != null)
            return new XPoint(rect.left - prect.left, rect.top - prect.top);
        return new XPoint(rect.left, rect.top);
    }
    static IsOut(pRect, pLocation, pWidth, pHeight) {
        return (pLocation.IsLessZero || (pRect.width < pWidth + pLocation.X) || (pRect.height < pHeight + pLocation.Y));
    }
    static Replace(pText, pChar, pPosition) {
        var t = pText.split('');
        t[pPosition] = pChar;
        return t.join('');
    }
}
XUtils._Str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
XUtils._Month = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//# sourceMappingURL=index.js.map