interface XIInputBox
{
    SetDisplayText(pValue: string): unknown;
    Input: HTMLElement;
}

interface XMouseEvent { (pArg: MouseEvent): void; }
interface XIUUIDTypes
{
    UUID: string;
}

interface XISelectable
{
    IsSelected: boolean;
}

interface XIDargSize
{
    DragType: XDragType;
    Name: string;
    HTML: any;
    IsCaptured: boolean;
}

interface XIHTML
{
}

interface XILayout
{
    SetTitle(pTitle: string): void;

    FormTitle: string;
    HTML: HTMLElement;
}

interface XIAskDialog
{
}

interface XIError extends Error
{
    Type: XErrorType;
    CallBack: any;
}

interface XIErrorHandle
{
    ShowError(pError: Error): void;
}

interface XIOwner
{
    Owner: XIOwner;

    GetOwner<T>(pClass: T): any;
    GetOwnerOrSelf<T>(pClass: T): any;
}

interface XICSBroker
{
    getURL(): any;

    setURL(pValue: string): any;

    saveCondig(pValue: any[]);
}

interface Window
{
    ErrorDialog: any;
    Wait: any;
    Canvas: any;
    InitializeMap: any;
    CITHook: any;
}