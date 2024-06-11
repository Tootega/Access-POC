class XBase64
{
    static ToString(pData: string): string
    {
        return decodeURIComponent(escape(window.atob(pData)));
    }

    static FromString(pData: string): string
    {
        return btoa(unescape(encodeURIComponent(pData)))
    }
}

class XUtils
{
    static SetValue(pObject: any, pProperty: any, pValue: any)
    {
        if (pObject == null)
            return;
        if (typeof pProperty === "string")
            pProperty = pProperty.split(".");

        if (pProperty.length > 1)
        {
            var e = pProperty.shift();
            if (X.IsEmpty(e))
                return;
            if (e.indexOf(':') != -1)
            {
                let pts = e.split(':');
                XUtils.SetValue(pObject[pts[0]][pts[1]], pProperty, pValue);
            }
            else
                XUtils.SetValue(pObject[e], pProperty, pValue);
        }
        else
            pObject[pProperty[0]] = pValue;
    }

    static IsImage(pExtension: string): boolean
    {
        return X.In(pExtension, ".jpeg", ".jpg", ".gif", ".png", ".apng", ".svg", ".bmp");
    }

    static HasIntersection(pStartA: Date, pEndA: Date, pStartB: Date, pEndB: Date): boolean
    {
        return XUtils.Intersection(pStartA, pEndA, pStartB, pEndB).length > 0;
    }

    static Intersection(pStartA: Date, pEndA: Date, pStartB: Date, pEndB: Date): XArray<Date>
    {
        if (pStartA > pEndA)
            throw new XError("Final de A [" + pEndA.DateTimeString() + "] está antes do Início[" + pStartA.DateTimeString() + "].");
        if (pStartB > pEndB)
            throw new XError("Final de B [" + pEndB.DateTimeString() + "] está antes do Início[" + pStartB.DateTimeString() + "].");

        if (pStartA == pEndA)
            throw new XError("Final [" + pEndA.DateTimeString() + "] e Início [" + pStartA.DateTimeString() + "] de A são iguais.");
        if (pStartB == pEndB)
            throw new XError("Final [" + pEndB.DateTimeString() + "] e Início [" + pStartB.DateTimeString() + "] de B são iguais.");

        if (pEndA < pStartB)                           //  C-1
            return [];

        if (pStartA > pEndB)                           //  C-2
            return [];

        if (pStartA == pStartB && pEndA == pEndB)
            return [pStartA, pEndA];                   //  C-3

        if (pStartA < pStartB)
        {
            if (pEndA < pEndB)
                return [pStartB, pEndA];               //  C-4
            if (pEndA > pEndB)
                return [pStartB, pEndB];               //  C-6
        }
        else
        {
            if (pEndA > pEndB)
                return [pStartA, pEndB];               //  C-5
            if (pEndA < pEndB)
                return [pStartA, pEndA];               //  C-7
        }
        return [];
    }

    static CheckCPF(pCPF: string): boolean
    {
        pCPF = XUtils.OnlyNumbers(pCPF);
        if (X.IsEmpty(pCPF) || pCPF.length != 11)
            return false;
        let dig = XUtils.CalculateCPF(pCPF.substring(0, 9));
        return pCPF.substring(9, 11) == dig;
    }

    static CheckCNPJ(pCNPJ: string): boolean
    {
        pCNPJ = XUtils.OnlyNumbers(pCNPJ);
        if (X.IsEmpty(pCNPJ) || pCNPJ.length != 14)
            return false;
        let dig = XUtils.CalculateCNPJ(pCNPJ.substring(0, 12));
        return pCNPJ.substring(12, 14) == dig;
    }

    static CalculateCNPJ(pCNPJ: string): string
    {
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

    public static CalculateCPF(pCPF: string): string
    {
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

    static Parse(pString: string, pStart: string, pEnd: string): string[]
    {
        var ov = false;
        var strl = pString.length;
        var stvar = -1;
        var result = [];
        var lix = 0;
        for (var i = 0; i < strl; i++)
        {
            let c = pString[i];
            if (!ov && pStart[0] == c)
            {
                ov = this.HasToken(pString, pStart, strl, i);
                if (ov)
                {
                    stvar = i;
                    i += pStart.length;
                }
            }
            if (ov && pEnd[0] == c)
            {
                if (this.HasToken(pString, pEnd, strl, i))
                {
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

    private static HasToken(pString: string, pToken: string, pStrLen: number, pPos: number): boolean
    {
        for (var s = 1; s < pToken.length; s++)
        {
            pPos++;
            if (pPos >= pStrLen || pToken[s] != pString[pPos])
                return false;
        }
        return true;
    }

    static DoDownload(pURL: any)
    {
        var element = document.createElement('a');
        try
        {
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(pURL));
            element.setAttribute('download', pURL);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
        }
        finally
        {
            document.body.removeChild(element);
        }
    }

    static GetExtension(pFileName: string): string
    {
        for (var i = pFileName.length; --i >= 0;)
        {
            let ch = pFileName[i];
            if (ch == '.')
            {
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

    static AsName(pID: string, pPrefix: string = ""): string
    {
        return pPrefix + pID.ReplaceAll("-", "");
    }

    static GetAllCSSVariable(pStyleSheets: any, pElement: HTMLElement): XArray<{ Name: string, Color: string, Style: CSSStyleDeclaration, Opacity: string }>
    {
        var vars = [];
        for (var i = 0; i < pStyleSheets.length; i++)
        {
            try
            {
                for (var j = 0; j < pStyleSheets[i].cssRules.length; j++)
                {
                    try
                    {
                        for (var k = 0; k < pStyleSheets[i].cssRules[j].style.length; k++)
                        {
                            let name = pStyleSheets[i].cssRules[j].style[k];
                            if (name.startsWith('--') && vars.indexOf(name) == -1)
                                vars.push(name);
                        }
                    }
                    catch
                    {
                    }
                }
            } catch
            {
            }
        }
        var ret = new XArray<{ Name: string, Color: string, Style: CSSStyleDeclaration, Opacity: string }>();
        var style = window.getComputedStyle(pElement);
        for (var i = 0; i < vars.length; i++)
        {
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

    static RandomName(pMin: number, pMax: number): string
    {
        var ret = "";
        for (var i = 0; i < pMax - pMin + 1; i++)
        {
            var result = [];
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var c = 0; c < Math.floor(Math.random() * 10 + 2); c++)
            {
                result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
            }
            if (ret != "")
                ret += " ";
            ret += result.join('');
        }
        return ret;
    }

    private static _Str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static _Month = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    static RemoveAccent(pValue: string): string
    {
        if (X.IsEmpty(pValue))
            return "";
        var ret = "";
        for (var i = 0; i < pValue.length; i++)
        {
            switch (pValue[i])
            {
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

    static SelectAll(pNode: Node)
    {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(pNode);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    public static NearValue(pValue: number, pAvg: number, pMaxCount: number): number
    {
        var v1 = pValue / pMaxCount;
        while (v1 < pAvg && pMaxCount + 1 > 0)
        {
            pMaxCount--;
            v1 = pValue / pMaxCount;
            if (v1 >= pAvg)
                return v1;
        }
        return v1;
    }

    public static Eval(pContext: any, pJS: string): any
    {
        var result = function (str) { return eval(str); }.call(pContext, pJS);
        return result;
    }

    public static BIRTDate(pValue: string): string
    {
        var prts = pValue.split(' ');
        return prts[2] + '/' + XUtils._Month.indexOf(prts[1]) + "/" + prts[5] + " 00:00:00;DateTime";
    }

    public static IIF<T>(pBoolean: boolean, pV1: any, pV2: any): T
    {
        if (pBoolean)
            return pV1;
        return pV2;
    }

    public static NoNumbers(pValue: string): string
    {
        if (X.IsEmpty(pValue))
            return null;
        var str = "";
        for (var i = 0; i < pValue.length; i++)
            if (!(pValue[i] >= "0" && pValue[i] <= "9"))
                str += pValue[i];
        return str;
    }

    public static OnlyNumbers(pValue: string): string
    {
        if (X.IsEmpty(pValue))
            return null;
        var str = "";
        for (var i = 0; i < pValue.length; i++)
            if (pValue[i] >= "0" && pValue[i] <= "9")
                str += pValue[i];
        return str;
    }

    public static FixDecimal(pValue: number, pDecimal: number): number
    {
        var vlr = Math.floor(pValue * Math.pow(10, pDecimal)) / Math.pow(10, pDecimal);
        return vlr;
    }

    public static Up2Dec(pValue: number): number
    {
        var vlr = Math.floor((pValue + 0.009) * Math.pow(10, 2));
        return vlr;
    }

    public static Down2Dec(pValue: number): number
    {
        var vlr = pValue / Math.pow(10, 2);
        return vlr;
    }

    public static DecodeUnicode(pValue: string): string
    {
        return decodeURIComponent(atob(pValue).split('').map(function (c)
        {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    public static Base64ToString(pValue: any): string
    {
        if (pValue == "null" || pValue == null)
            return null;
        return atob(pValue);
    }

    public static StringToBase64(pValue: any): string
    {
        return btoa(pValue);
    }

    public static Base64ToBlob(pData: string, pType: string = "application/octet-stream")
    {
        const binStr = atob(pData);
        const len = binStr.length;
        const arr = new Uint8Array(len);
        for (let i = 0; i < len; i++)
            arr[i] = binStr.charCodeAt(i);
        return new Blob([arr], { type: pType });
    }

    public static To64(pValue: any): string
    {
        return btoa(pValue);
    }

    public static From64(pData: any): any[]
    {
        var chrdata = atob(pData);
        var bytes = [];
        for (var offset = 0; offset < chrdata.length; offset += 512)
        {
            var slice = chrdata.slice(offset, offset + 512);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++)
                byteNumbers[i] = slice.charCodeAt(i);
            var byteArray = new Uint8Array(byteNumbers);
            bytes.push(byteArray);
        }
        return bytes;
    }

    public static IndexOf(pElement: HTMLCollection, pPredicate: XFunc<any>): number
    {
        for (var i = 0; i < pElement.length; i++)
        {
            var x = pElement[i];
            if (pPredicate(x))
                return i;
        }
        return -1;
    }

    public static GetValue(pElement: HTMLCollection, pPredicate: XFunc<any>)
    {
        for (var i = 0; i < pElement.length; i++)
        {
            var x = pElement[i];
            if (pPredicate(x))
                return x;
        }
        return null;
    }

    public static HasParent(pElement: Element, pPredicate: XFunc<Element>)
    {
        return XUtils.GetParent(pElement, pPredicate) != null;
    }

    public static GetParent(pElement: Node, pPredicate: XFunc<any>): any
    {
        var p = pElement;
        while (p != null)
        {
            if (pPredicate(p))
                return p;
            p = p.parentElement;
        }
        return null;
    }

    public static NumberToString(pValue: number, pScale: number): string
    {
        if (X.IsEmpty(pValue))
            pValue = 0;
        var vlr = pValue.toString();
        var vlrs = vlr.split('.');
        if (pScale > 0)
        {
            if (vlrs.length == 1)
                vlrs[1] = "0";
            return vlrs[0] + vlrs[1].RPad(pScale, "0");
        }
        return vlrs[0];
    }

    public static IsNumber(pValue: any): boolean
    {
        return !isNaN(parseFloat(pValue)) && isFinite(pValue);
    }
    public static GetSplitLiteral(pValue: string): XArray<string>
    {
        if (X.IsEmpty(pValue))
            return [];
        var str = new XArray<string>();

        var st = "";
        var cnt = -1;
        for (var cnt = 0; cnt < pValue.length; cnt++)
        {
            if (pValue[cnt] != ' ' && pValue[cnt] != '"')
                st += pValue[cnt];
            if (pValue[cnt] == '"')
            {
                for (; cnt < pValue.length; cnt++)
                {
                    if (pValue[cnt] != '"')
                        st += pValue[cnt];
                    if (pValue[cnt] == '"' && st != "")
                    {
                        str.Add(st);
                        st = "";
                        break;
                    }
                }
            }
            if (pValue[cnt] == ' ' && st != "")
            {
                str.Add(st);
                st = "";
            }
        }
        if (st != "")
            str.Add(st);
        var ret = new XArray<string>();
        for (var i = 0; i < str.length; i++)
            if (!X.IsEmpty(str[i]))
            {
                var vl = str[i].replace('"', '');
                if (!X.IsEmpty(vl))
                    ret.Add(vl);
            }
        return ret;
    }

    public static GetString(pCount: number): string
    {
        var str = "";
        for (var i = 0; i < pCount; i++)
        {
            var c = Math.floor(Math.random() * XUtils._Str.length);
            str = str + XUtils._Str[c];
        }
        return str;
    }

    public static Is<T>(pInstance: any): boolean
    {
        return (pInstance as T) != null;
    }

    public static LoadJS(pDoc: Document, pURL: string, pCallback: any): any
    {
        var link = pDoc.createElement('script');
        link.src = pURL;
        link.async = true;
        link.type = "text/javascript";
        link.onload = pCallback;
        pDoc.head.appendChild(link);
        return link;
    }

    public static LoadCSS(pDoc: Document, pURL: string): any
    {
        var link = pDoc.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = pURL;
        link.media = 'screen,print';
        pDoc.head.appendChild(link);
        return link;
    }

    public static NewElement<T extends Element>(pOwner: Node, pType: string, pClass?: string | Document, pInsert?: boolean): T
    {
        var elm: Element;
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
        return <T>elm;
    }

    static SetCursor(pElement: HTMLElement, pType: XDragType)
    {
        switch (pType)
        {
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

    static Add(pArray: Array<any>, pItem: any)
    {
        pArray[pArray.length] = pItem;
    }

    static Remove(pArray: Array<any>, pItem: any)
    {
        var idx = pArray.indexOf(pItem);
        if (idx >= 0)
        {
            for (var i = idx; i < pArray.length - 1; i++)
                pArray[i] = pArray[i + 1];
            pArray.length -= 1;
        }
    }

    static Find(pArray: Array<any>, pItem: any)
    {
        for (var i = 0; i < pArray.length; i++)
            if (pArray[i] === pItem)
                return pArray[i];
        return null;
    }

    static Location(pElement: HTMLElement): XPoint
    {
        var prect: ClientRect = null;
        if (pElement.parentElement != null)
            prect = pElement.parentElement.getBoundingClientRect();
        var rect: ClientRect = pElement.getBoundingClientRect();
        if (prect != null)
            return new XPoint(rect.left - prect.left, rect.top - prect.top);
        return new XPoint(rect.left, rect.top);
    }

    static IsOut(pRect: ClientRect, pLocation: XPoint, pWidth: number, pHeight: number): Boolean
    {
        return (pLocation.IsLessZero || (pRect.width < pWidth + pLocation.X) || (pRect.height < pHeight + pLocation.Y));
    }

    static Replace(pText: string, pChar: string, pPosition: number): string
    {
        var t = pText.split('');
        t[pPosition] = pChar;
        return t.join('');
    }
}