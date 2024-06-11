interface XIPopup
{
    Show(): unknown;
    CallPopupClosed(): unknown;
    CanClose(pElement: HTMLElement): boolean;
    IsVisible: any;
    UUID: string;
}

interface XPopupClosedEvent { (pPopupPanel: XIPopup): void; }

class XPopupManager
{
    private static PopupList: Array<XIPopup> = new XArray<XIPopup>();
    private static AutoEvent: XArray<{ Context: any, Method: XEvent, Once: boolean }> = new XArray<{ Context: any, Method: XEvent, Once: boolean }>();
    static UseCrl: boolean = false;

    static AddAutoEvent(pContext: any, pMethod: any, pOnce: boolean = true)
    {
        var obj = { Context: pContext, Method: pMethod, Once: pOnce };
        this.AutoEvent.Add(obj);
    }

    static Remove(pView: XIPopup)
    {
        XPopupManager.PopupList.Remove(pView);
    }

    static Show(pView: XIPopup)
    {
        if (!this.PopupList.Any(p => p.UUID == pView.UUID))
            this.PopupList.Add(pView);
        pView.Show();
        //pView.HTML.scrollIntoView();
    }

    static Add(pView: XIPopup)
    {
        XPopupManager.PopupList.Add(pView);
    }

    static HideAll(pArg?: MouseEvent, pValid: boolean = false)
    {
        if (pArg != null && this.UseCrl && !pArg.ctrlKey)
            return;
        var ar = XPopupManager.AutoEvent.ToArray();
        for (var i = 0; i < ar.length; i++)
        {
            var m = ar[i];
            if (pArg != null && !m.Context.CanClose(<HTMLElement>pArg.target))
                continue;
            m.Method.apply(m.Context);
            if (m.Once)
                XPopupManager.AutoEvent.Remove(m);
        }
        for (var i = 0; i < XPopupManager.PopupList.length; i++)
        {
            var elm = XPopupManager.PopupList[i];
            if (!elm.IsVisible)
                continue;
            if (pArg == null || elm.CanClose(<HTMLElement>pArg.target))
            {
                if (!pValid)
                    elm.CallPopupClosed();
                elm.IsVisible = false;
            }
        }
    }
}
window.onmousedown = (arg) => XPopupManager.HideAll(arg);