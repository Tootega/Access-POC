enum XEventType
{
    MouseMove = "mousemove",
    MouseDown = "mousedown",
    MouseUp = "mouseup",
    MouseEnter = "mouseenter",
    MouseLeave = "mouseleave",
    Input = "input",
    Paste = "paste",
    KeyDown = "keydown",
    KeyUp = "keyup",
    KeyPress = "keypress",
    LostFocus = "focusout",
    Click = "click",
    FocusIn = "focusin",
}

class XCallOnce
{
    constructor(pUUID: string, pEvent: any)
    {
        this.UUID = pUUID;
        this.Event = pEvent;
    }
    UUID: string;
    Event: any;

    Execute()
    {
        this.Event.apply(this);
    }
}
class XEventManager
{
    private static _CallOnce = new XArray<XCallOnce>();

    static AddExecOnce(pUUID: string, pEvent: any)
    {
        let co = new XCallOnce(pUUID, pEvent);
        XEventManager._CallOnce.Add(co);
    }

    static ExecOnce(pUUID: string)
    {
        let co = XEventManager._CallOnce.FirstOrNull(c => c.UUID == pUUID);
        if (co != null)
        {
            XEventManager._CallOnce.Remove(co);
            co.Execute();
        }
    }

    static AddEvent(pContext: any, pElement: any, pEvent: string, pMethod: any, pCheckSource: boolean = false)
    {
        if (pElement.Method == null)
            pElement.Method = new Object();
        XEventManager.RemoveEvent(pContext, pElement, pEvent);
        pElement.Method[pContext.UUID + "-" + pEvent] = (arg: any) =>
        {
            XEventManager.Call(pContext, pMethod, pElement, pCheckSource, arg);
        }
        pElement.addEventListener(pEvent, pElement.Method[pContext.UUID + "-" + pEvent]);
    }

    static RemoveEvent(pContext: any, pElement: any, pEvent: string)
    {
        if (pElement.Method != null && pElement.Method[pContext.UUID + "-" + pEvent] != null)
        {
            pElement.removeEventListener(pEvent, pElement.Method[pContext.UUID + "-" + pEvent]);
            pElement.Method[pContext.UUID + "-" + pEvent] = null;
        }
    }

    static Call(pCallScope: any, pEvent: any, pHTM: any, pCheckSource: boolean, pArg: any)
    {
        if (!pCheckSource || pHTM == pArg.srcElement)
            pEvent.apply(pCallScope, [pArg]);
    }

    static DelayedEvent(pContext: any, pEvent: any, pTime: number = 100)
    {
        if (pContext._Timer != null && pContext._Timer != -1)
            clearTimeout(pContext._Timer);
        pContext._Timer = setTimeout(() => { pContext._Timer = -1; pEvent.apply(pContext, []) }, pTime);
    }

    static SetTimeOut(pContext: any, pEvent: any, pTime: number = 100)
    {
        this.DelayedEvent(pContext, pEvent, pTime);
    }
}