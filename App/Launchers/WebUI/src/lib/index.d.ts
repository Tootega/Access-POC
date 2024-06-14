declare class XDefault {
    private static _CID;
    static get iID(): number;
    static ServiceHost: string;
    static UseCDN: boolean;
    static StateFieldName: string;
    static IsWebView: boolean;
    static Version: string;
    static UserID: string;
    static UserName: string;
    static CompanyID: string;
    static CompanyName: string;
    static CompanyShortName: string;
    static IsMobile: boolean;
    static NewCID(): number;
    static ScriptPath: string;
    static Theme: string;
    static StrNullDate: string;
    static StrBRNullDate: string;
    static NullDate: Date;
    static IsDebug: boolean;
    static get Size(): string;
    static get Now(): Date;
    static Services: any;
}
declare class XDataContainer {
    private static _Data;
    static GetValue(pContext: any, pField: string): any;
    static SetValue(pContext: any, pField: string, pValue: any): any;
    static Wash(): void;
}
declare class XKeyValue<K, V> {
    Key: K;
    Value: V;
}
declare class Guid {
    static Empty: string;
    static NewGuid(): any;
    static IsEmpty(pGuid: string): boolean;
    static IsFull(pValue: string): boolean;
    static NewUUID(): string;
}
interface Document {
    Styles: StyleSheetList;
}
interface DOMTokenList {
    Any<T>(pPredicate: XFunc<T>): boolean;
    Add(pStyle: string): any;
    Remove(pStyle: string): any;
}
interface Array<T> {
    Oder: any;
    ToArray(): Array<T>;
    Get(pID: string): T;
    GetAs<Tx>(pIndex: number): Tx;
    FirstOrNull(pPredicate?: XFunc<T>): T;
    LastOrNull(pPredicate?: XFunc<T>): T;
    FirstOr<T>(pPredicate?: XFunc<T>): T;
    First<T>(pClass: any): T;
    Count<T>(pPredicate: XFunc<T>): number;
    Sum(pPredicate: XFuncNumber<T>): number;
    Max(pPredicate: XFuncNumber<T>): number;
    Add(pItem: T): void;
    GetRandom(pCount?: number): Array<T>;
    AddRange(pValue: Array<T>): void;
    Remove(pItem: T): void;
    Clear(): void;
    OrderBy(pOrder: XValue<T>): Array<T>;
    OrderByDescending(pOrder: XValue<T>): Array<T>;
    Contains(pValue: T, pStart?: number, pEnd?: number): boolean;
    FirstBy<T>(pVvalue: XValue<T>): T;
    Insert(pIndex: number, pValue: T): void;
    Delete(pStart: number, pEnd: number): void;
    LPad(pLength: number): Array<T>;
    Where(pPredicade: XFunc<T>): Array<T>;
    Select<R>(pValue: XValue<T>): Array<R>;
    SelectDistinct<R>(pValue: XValue<T>): Array<R>;
    GroupBy<T>(pValue: XValue<T>): Array<XKeyValue<any, XArray<XArray<T>>>>;
    Any(pPredicate: XFunc<T>): boolean;
    IndexOf(pPredicate: XFunc<T>): number;
    ForEach(pPredicade: XMethod<T>): void;
    Assign(pArgments: IArguments): void;
    NextFrom(pPredicate: XFunc<T>): T;
    PreviousFrom(pPredicate: XFunc<T>): T;
    NextNOrLest(pN: number, pPredicate: XFunc<T>): T;
    PreviousNOrFirst(pN: number, pPredicate: XFunc<T>): T;
    IsEqual(pOther: Array<T>, pPredicate: XFuncEx<T>): any;
}
interface HTMLElement {
    Location(pReference: HTMLElement): XPoint;
    Name: string;
    GetTextWidth(pText: string, pFont: string): number;
    Swap(pLeft: number, pRight: number): any;
    GetRectRelative(pRelative: HTMLElement): XRect;
    GetRect(pInternal?: boolean): XRect;
    GetChild(pPredicate?: XFunc<HTMLElement>): HTMLElement;
    GetIcon(): HTMLElement;
    GetChildren(pPredicate?: XFunc<HTMLElement>): Array<HTMLElement>;
    SetVisibility(pVisible: boolean): void;
    ToggleStyle(pClass: string, pAdd: boolean): void;
    Hide(): void;
    Show(): void;
    Instance: any;
    GetIntance<T>(pClass: any, pCanSelf?: boolean): T;
    GetChildAs<T>(pClass: any, pCanSelf?: boolean): T;
}
interface Node {
    IsChildOf(pElement: Node, pOrIsSelf?: boolean): boolean;
    Any(pPredicate: XFunc<Node>): boolean;
    Name: string;
    StyleValue(pItemName: string): number;
    StyleStrValue(pItemName: string): string;
    ForEachChildren<T>(pAction: XMethod<T>, pPredicate?: XFunc<T>): any;
}
interface String {
    IsEqual(pValue: string): boolean;
    Split(pSeparator: string): XArray<String>;
    Contains(pValue: string[]): boolean;
    IndexOf(pValue: string): number;
    Exist(pValue: String): boolean;
    ReplaceAll(pSearch: string, pValue: string): string;
    Exchange(pPos: number, pChar: string): string;
    Add(pChar: any, pCount: number): string;
    RPad(pCount: number, pChar?: any): string;
    LPad(pCount: number, pChar?: any): string;
    Count(pChar: string): number;
}
declare class XDateTimeResult {
    IsValid: boolean;
    Value: Date;
    IsEmpty: boolean;
}
declare enum XDatePart {
    Year = "year",
    Month = "month",
    Week = "week",
    Day = "day",
    Hour = "hour",
    Minute = "minute",
    Second = "second"
}
interface Date {
    FormatDateTime(pTypeID: string, pPattern: string): string;
    ToString(): string;
    DateTimeString(): string;
    TimeString(pShort?: boolean): string;
    DateString(): string;
    LocalDateTimeString(pShortY?: boolean, pShortH?: boolean, pShowDecimal?: boolean): string;
    LocalTimeString(pShort?: boolean, pShowDecimal?: boolean): string;
    LocalDateString(pShort?: boolean): string;
    ToISO(pShort?: boolean): string;
    ToLocalISO(pShort?: boolean): string;
    Full(): string;
    WeekDay(): string;
    Month(): string;
    IsLeapYear(): boolean;
    GetUTCDaysInMonth(): number;
    AddMonths(pValue: number): any;
    OnlyDate(): Date;
    OnlyTime(): Date;
    IsToday(): boolean;
    Add(pPart: XDatePart, pValue: number): Date;
}
interface DateConstructor {
    IsBRDateTime(pValue: string): boolean;
    FromBRDateTime(pValue: string): XDateTimeResult;
    FromBRTime(pValue: string): XDateTimeResult;
    IsNullDateOrTime(pValue: any): boolean;
    IsDateOrTime(pValue: any): any;
    boolean: any;
    ToDateTime(pValue: string, pAsUTC?: boolean): Date;
    IsDate(pValue: string): boolean;
    FromDate(pValue: string): XDateTimeResult;
    IsTime(pValue: string): boolean;
    FromTime(pValue: string): XDateTimeResult;
    IsDateTime(pValue: string): boolean;
    FromDateTime(pValue: string): XDateTimeResult;
    FromBRDate(pValue: string): XDateTimeResult;
    IsBRTime(pValue: string): boolean;
    IsBRDate(pValue: string): boolean;
    Parse(pValue: string): XDateTimeResult;
    IsLeapYear(pYear: number): boolean;
    GetDaysInMonth(pYear: number, pMonth: number): number;
    IsEmpty(pValue: Date): boolean;
}
declare class X {
    static readonly _Logic: Object;
    static FirstOrNull<T>(pSource: any, pPredicate?: XFunc<T>): T;
    static DataIsEmpty(pValue: string): boolean;
    static AddNL(pSource: string, ...pValues: string[]): string;
    static GetLogic(pLeft: any, pLogic: any, pRight: any): string;
    static Lower(pString: string): string;
    static Split(pValue: string, pSeparetor: string): Array<string>;
    static In<T>(pValue: T, ...pValues: T[]): boolean;
    static Exists(pData: string, ...pValues: string[]): boolean;
    static ToDate(pValue: string): Date;
    static IsNumber(pValue: any): boolean;
    static IsF5(pArg: KeyboardEvent): boolean;
    static IsAlpha(pValue: string): boolean;
    static IsNum(pValue: string): boolean;
    static Sleep(pTime: number): void;
    static Length(pValue: any): any;
    static PadStart(pString: any, pSize: number, pAdd: string): string;
    static IfNull(pString: string, pValue: string): string;
    static As(pValue: any): any;
    static Void(pArg: any): boolean;
    static IsChar(pValue: string): boolean;
    static IsEmpty(pValue: any): boolean;
    static Contains(pArray: Array<any>, pValue: any): boolean;
}
declare class XCall {
    static AddEvent(pContext: any, pElement: any, pEvent: string, pMethod: any): void;
    static RemoveEvent(pContext: any, pElement: any, pEvent: string): void;
    static RemoveAll(pElement: any): void;
    static Call(pCallScope: any, pEvent: any, pArg?: any[]): void;
}
declare enum XDefaultRights {
    Restaurar = 5,
    Configurar = 6,
    Visualizar = 2,
    Inativar = 4,
    Alterar = 3,
    Incluir = 1
}
declare class XComparer {
    static Compare(pLeft: any, pRight: any): number;
}
declare enum XKey {
    K_CANCEL = 3,
    K_HELP = 6,
    K_BACK_SPACE = 8,
    K_TAB = 9,
    K_CLEAR = 12,
    K_RETURN = 13,
    K_ENTER = 14,
    K_SHIFT = 16,
    K_CONTROL = 17,
    K_ALT = 18,
    K_PAUSE = 19,
    K_CAPS_LOCK = 20,
    K_ESCAPE = 27,
    K_SPACE = 32,
    K_PAGE_UP = 33,
    K_PAGE_DOWN = 34,
    K_END = 35,
    K_HOME = 36,
    K_LEFT = 37,
    K_UP = 38,
    K_RIGHT = 39,
    K_DOWN = 40,
    K_PRINTSCREEN = 44,
    K_INSERT = 45,
    K_DELETE = 46,
    K_0 = 48,
    K_1 = 49,
    K_2 = 50,
    K_3 = 51,
    K_4 = 52,
    K_5 = 53,
    K_6 = 54,
    K_7 = 55,
    K_8 = 56,
    K_9 = 57,
    K_SEMICOLON = 59,
    K_EQUALS = 61,
    K_A = 65,
    K_B = 66,
    K_C = 67,
    K_D = 68,
    K_E = 69,
    K_F = 70,
    K_G = 71,
    K_H = 72,
    K_I = 73,
    K_J = 74,
    K_K = 75,
    K_L = 76,
    K_M = 77,
    K_N = 78,
    K_O = 79,
    K_P = 80,
    K_Q = 81,
    K_R = 82,
    K_S = 83,
    K_T = 84,
    K_U = 85,
    K_V = 86,
    K_W = 87,
    K_X = 88,
    K_Y = 89,
    K_Z = 90,
    K_CONTEXT_MENU = 93,
    K_NUMPAD0 = 96,
    K_NUMPAD1 = 97,
    K_NUMPAD2 = 98,
    K_NUMPAD3 = 99,
    K_NUMPAD4 = 100,
    K_NUMPAD5 = 101,
    K_NUMPAD6 = 102,
    K_NUMPAD7 = 103,
    K_NUMPAD8 = 104,
    K_NUMPAD9 = 105,
    K_MULTIPLY = 106,
    K_ADD = 107,
    K_SEPARATOR = 108,
    K_SUBTRACT = 109,
    K_DECIMAL = 110,
    K_DIVIDE = 111,
    K_F1 = 112,
    K_F2 = 113,
    K_F3 = 114,
    K_F4 = 115,
    K_F5 = 116,
    K_F6 = 117,
    K_F7 = 118,
    K_F8 = 119,
    K_F9 = 120,
    K_F10 = 121,
    K_F11 = 122,
    K_F12 = 123,
    K_F13 = 124,
    K_F14 = 125,
    K_F15 = 126,
    K_F16 = 127,
    K_F17 = 128,
    K_F18 = 129,
    K_F19 = 130,
    K_F20 = 131,
    K_F21 = 132,
    K_F22 = 133,
    K_F23 = 134,
    K_F24 = 135,
    K_NUM_LOCK = 144,
    K_SCROLL_LOCK = 145,
    K_COMMA = 188,
    K_PERIOD = 190,
    K_SLASH = 191,
    K_BACK_QUOTE = 192,
    K_OPEN_BRACKET = 219,
    K_BACK_SLASH = 220,
    K_CLOSE_BRACKET = 221,
    K_QUOTE = 222,
    K_META = 224
}
declare enum XMouseButton {
    None = 0,
    Left = 1,
    Right = 2
}
declare var Maps: {
    base: string;
    letters: RegExp;
}[];
declare enum XTupleState {
    Detached = 0,
    Unchanged = 1,
    Deleted = 2,
    Modified = 3,
    Added = 4
}
declare enum XFieldState {
    Empty = 0,
    Unchanged = 1,
    NotEmpty = 2,
    Modified = 3,
    ReadOnly = 4
}
declare enum XFieldType {
    XBinary = "XBinary",
    XBoolean = "XBoolean",
    XDate = "XDate",
    XDateTime = "XDateTime",
    XFK = "XFK",
    XGuid = "XGuid",
    XInt16 = "XInt16",
    XInt32 = "XInt32",
    XInt64 = "XInt64",
    XDecimal = "XDecimal",
    XPK = "XPK",
    XString = "XString",
    XTime = "XTime",
    sXInt8 = "sXInt8",
    sXFloat = "sXFloat",
    sXText = "sXText",
    sXSysname = "sXSysname"
}
declare class XData {
    JSonToInt(pValue: any, pUseNull?: boolean): any;
    JSonToBollean(pValue: any, pUseNull?: boolean): any;
    JSonToDecimal(pValue: any, pUseNull?: boolean): any;
    JSonToDate(pValue: any, pUseNull?: boolean): any;
    GetFieldValue(pInput: any, pField: string): any;
    SetFieldValue(pEvent: any, pField: string, pValue: any): void;
}
declare class XDataField extends XData {
    State?: XFieldState;
    Type?: any;
    private _Mask?;
    Value?: any;
    OldValue?: any;
    constructor(State?: XFieldState, Type?: any, _Mask?: any, Value?: any, OldValue?: any);
    RawValue: any;
    Name: string;
    GetDisplayText(): string;
    FormatText(pValue: any): string;
    get DisplayText(): string;
    SetValue(pValue: any): void;
}
declare class XDataTuple extends XData {
    constructor();
    UUID: string;
    IsReadOnly: boolean;
    State: XTupleState;
    PKField: XDataField;
    Assign(pSource: any): void;
    get IsSelected(): boolean;
    set IsSelected(pValue: boolean);
    get IsChecked(): boolean;
    set IsChecked(pValue: boolean);
    _CheckedChanged(pArg: Event, pRow: any, pRowArg: any, pBodyArg: any): void;
    GetPKValue(): any;
}
declare enum XErrorType {
    None = 0,
    Error = 1,
    Warning = 2,
    Unconformity = 3,
    Message = 4
}
declare class XException extends Error {
    static ShowStack(): void;
    constructor(pType: XErrorType, pMessage: string, pDetail?: string, pStack?: string, pCallBack?: any);
    Type: XErrorType;
    CallBack: any;
    Detail: string;
    toString(): string;
}
declare class XError extends XException {
    constructor(pMessage: string, pDetail?: string, pStack?: string, pCallBack?: any);
}
declare class XWarning extends XException {
    constructor(pMessage: string, pDetail?: string, pStack?: string, pCallBack?: any);
}
declare class XUnconformity extends XException {
    constructor(pMessage: string, pDetail?: string, pStack?: string, pCallBack?: any);
}
declare class XMessage extends XException {
    constructor(pMessage: string, pDetail?: string, pStack?: string, pCallBack?: any);
}
declare class XRequest extends XData {
}
declare class XFilter extends XDataTuple {
    TakeRows: number;
    SkipRows: number;
    get Column(): string;
    set Column(pValue: string);
    PrepareFilter(pValue: string, pSearch: string[], pTitles: string[]): void;
}
interface XIInputBox {
    SetDisplayText(pValue: string): unknown;
    Input: HTMLElement;
}
interface XMouseEvent {
    (pArg: MouseEvent): void;
}
interface XIUUIDTypes {
    UUID: string;
}
interface XISelectable {
    IsSelected: boolean;
}
interface XIDargSize {
    DragType: XDragType;
    Name: string;
    HTML: any;
    IsCaptured: boolean;
}
interface XIHTML {
}
interface XILayout {
    SetTitle(pTitle: string): void;
    FormTitle: string;
    HTML: HTMLElement;
}
interface XIAskDialog {
}
interface XIError extends Error {
    Type: XErrorType;
    CallBack: any;
}
interface XIErrorHandle {
    ShowError(pError: Error): void;
}
interface XIOwner {
    Owner: XIOwner;
    GetOwner<T>(pClass: T): any;
    GetOwnerOrSelf<T>(pClass: T): any;
}
interface XICSBroker {
    getURL(): any;
    setURL(pValue: string): any;
    saveCondig(pValue: any[]): any;
}
interface Window {
    ErrorDialog: any;
    Wait: any;
    Canvas: any;
    InitializeMap: any;
    CITHook: any;
}
declare class XSearchTuple {
    constructor();
    UUID: string;
}
interface XSortCompare<T> {
    (pLeft: T, pRight: T): number;
}
interface XSortSwap<T> {
    (pArray: Array<T>, pLeft: number, pRight: number): void;
}
declare class XSort {
    static Sort<T>(pArray: Array<T>, pSwap: XSortSwap<T>, pComparer: XSortCompare<T>, pOwner: any): Array<T>;
    private static QuickSort;
    static Swap<T>(pArray: Array<T>, pLeft: number, pRight: number): void;
}
declare class XTableColumn {
    Field: string;
    Title: string;
}
declare class XType {
    static None: string;
    static Binary: string;
    static Boolean: string;
    static Date: string;
    static DateTime: string;
    static Decimal: string;
    static Guid: string;
    static Int16: string;
    static Int32: string;
    static Int64: string;
    static String: string;
    static Time: string;
    static DefaultMasked: string[];
    static IsDateTime(pTypeID: string): boolean;
    static IsNumber(pTypeID: string): boolean;
}
declare class XHashSet<T, I> {
    Items: any;
    List: XArray<any>;
    get Count(): number;
    Add(pItem: T, pID: I): T;
    Contains(pID: I): boolean;
    Get(pID: I): T;
    Remove(pID: I): void;
}
declare enum XAction {
    Save = 1,
    Close = 2,
    NewTuple = 3
}
interface XActionEvent {
    (pAction: XAction): void;
}
interface XFunc<T> {
    (pItem: T): Boolean;
}
interface XFuncEx<T> {
    (pItem: T[]): Boolean;
}
interface XFuncNumber<T> {
    (pItem: T): number;
}
interface XMethod<T> {
    (pItem: T): void;
}
interface XMethodEx<T1, T2> {
    (pItem1: T1, pItem2: T2): void;
}
interface XEvent {
    (): void;
}
interface XOwnerEvent<T> {
    (pSender: T): void;
}
interface XValue<T> {
    (pValue: T): any;
}
declare class XArray<T> extends Array<T> {
    constructor(pArg?: number | T[] | any);
}
declare enum XDragType {
    LeftTop = 0,
    Top = 1,
    RightTop = 2,
    Right = 3,
    RightBottom = 4,
    Bottom = 5,
    LeftBottom = 6,
    Left = 7,
    Drag = 8,
    Error = 9
}
declare class XHSLColor {
    constructor(pH: number, pS: number, pL: number);
    H: number;
    S: number;
    L: number;
    A: number;
    get RGB(): string;
    static StringToRGB(pColor: string): XArray<number>;
    static RGBToHSL(pR: number, pG: number, pB: number): XHSLColor;
    static HSLToRGB(pH: number, pS: number, pL: number, pA: number): string;
}
declare class XPoint {
    constructor(pX?: number, pY?: number);
    X: number;
    Y: number;
    Tag: any;
    get IsLessZero(): Boolean;
    Equals(pOther: XPoint): boolean;
    LocationType(pW: number, pH: number, pSize?: number, pDragArea?: number): XDragType;
    AsString(): string;
    toString(): string;
}
declare class XRect {
    static FromPoints(pLeftTop: XPoint, pRightBottom: XPoint): XRect;
    constructor(pLeft?: number | any, pTop?: number, pWidth?: number, pHeight?: number);
    Left: number;
    Top: number;
    Width: number;
    Height: number;
    Bottom: number;
    Right: number;
    Size: XSize;
    get IsEmpty(): boolean;
    get LeftTop(): XPoint;
    get RightTop(): XPoint;
    get LeftBottom(): XPoint;
    get RightBottom(): XPoint;
    get X(): number;
    get Y(): number;
    get AsPath(): string;
    toString(): string;
    IntersectsWith(pRect: XRect): boolean;
    Clone(): XRect;
    ApplyStyle(pStyle: CSSStyleDeclaration): void;
    Union(pRect: XRect): void;
    private SetValue;
    Inflate(pWidth: number, pHeight: number): void;
    AsSelectPath(pValue?: number): string;
    Center(): XPoint;
    Contains(pPoint: XPoint): boolean;
    Postion(pTarget: XRect): XDragType;
}
declare class XSize {
    constructor(pWidth?: number, pHeight?: number);
    Width: number;
    Height: number;
    Equal(pOther: XSize): boolean;
}
declare enum XEventType {
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
    FocusIn = "focusin"
}
declare class XCallOnce {
    constructor(pUUID: string, pEvent: any);
    UUID: string;
    Event: any;
    Execute(): void;
}
declare class XEventManager {
    private static _CallOnce;
    static AddExecOnce(pUUID: string, pEvent: any): void;
    static ExecOnce(pUUID: string): void;
    static AddEvent(pContext: any, pElement: any, pEvent: string, pMethod: any, pCheckSource?: boolean): void;
    static RemoveEvent(pContext: any, pElement: any, pEvent: string): void;
    static Call(pCallScope: any, pEvent: any, pHTM: any, pCheckSource: boolean, pArg: any): void;
    static DelayedEvent(pContext: any, pEvent: any, pTime?: number): void;
    static SetTimeOut(pContext: any, pEvent: any, pTime?: number): void;
}
declare class XMath {
    private static m_w;
    private static m_z;
    private static mask;
    static CreateArrow(pt: XPoint, pt2: XPoint, pWidth: number): XArray<XPoint>;
    static RotatePoints(pCenter: XPoint, pPoints: XPoint[], pDegree: number): XArray<XPoint>;
    static RotatePoint(pCenter: XPoint, pPoint: XPoint, pDegree: number): XPoint;
    static Round(pRect: XRect, pFactor: number): XRect;
    static RoundN(pValue: number, pFactor: number): number;
    static Distance2Points(pPoint: XPoint, pCenter: XPoint): number;
    static LineIntersectsRect(pRect: XRect, p1: XPoint, p2: XPoint): boolean;
    private static LineIntersectsLine;
    static LineIntersection(pP1Line1: any, pP2Line1: XPoint, pP1Line2: XPoint, pP2Line2: XPoint): XPoint;
    static ToPolygonEx(pRect: XRect, pInflateLine?: number): XArray<XArray<XPoint>>;
    static AddCorner(pCorner: XPoint, pRound: number, pP1: XPoint, pP2: XPoint): XArray<XPoint>;
    static PointCircle(pCenter: XPoint, pPoint: XPoint, pRadiusX: number, pRadiusY?: number): XPoint;
    static AngleInRad(pFirst: XPoint, pSecond: XPoint): number;
    static PolarToCartesian(pCenter: XPoint, pRadius: number, pDegrees: number): XPoint;
    static DonutSlice(pCenter: XPoint, pRadius: number, pStartDegrees: number, pEndDegrees: number, pWidth: number): string;
    static PieSlice(pCenter: XPoint, pRadius: number, pStartDegrees: number, pEndDegrees: number): string;
    static Arc(pCenter: XPoint, pRadius: number, pStartDegrees: number, pEndDegrees: number): string;
    static Seed(pSeed?: number): void;
    static Random(): number;
}
interface XIPopup {
    Show(): unknown;
    CallPopupClosed(): unknown;
    CanClose(pElement: HTMLElement): boolean;
    IsVisible: any;
    UUID: string;
}
interface XPopupClosedEvent {
    (pPopupPanel: XIPopup): void;
}
declare class XPopupManager {
    private static PopupList;
    private static AutoEvent;
    static UseCrl: boolean;
    static AddAutoEvent(pContext: any, pMethod: any, pOnce?: boolean): void;
    static Remove(pView: XIPopup): void;
    static Show(pView: XIPopup): void;
    static Add(pView: XIPopup): void;
    static HideAll(pArg?: MouseEvent, pValid?: boolean): void;
}
declare class XBase64 {
    static ToString(pData: string): string;
    static FromString(pData: string): string;
}
declare class XUtils {
    static SetValue(pObject: any, pProperty: any, pValue: any): void;
    static IsImage(pExtension: string): boolean;
    static HasIntersection(pStartA: Date, pEndA: Date, pStartB: Date, pEndB: Date): boolean;
    static Intersection(pStartA: Date, pEndA: Date, pStartB: Date, pEndB: Date): XArray<Date>;
    static CheckCPF(pCPF: string): boolean;
    static CheckCNPJ(pCNPJ: string): boolean;
    static CalculateCNPJ(pCNPJ: string): string;
    static CalculateCPF(pCPF: string): string;
    static Parse(pString: string, pStart: string, pEnd: string): string[];
    private static HasToken;
    static DoDownload(pURL: any): void;
    static GetExtension(pFileName: string): string;
    static AsName(pID: string, pPrefix?: string): string;
    static GetAllCSSVariable(pStyleSheets: any, pElement: HTMLElement): XArray<{
        Name: string;
        Color: string;
        Style: CSSStyleDeclaration;
        Opacity: string;
    }>;
    static RandomName(pMin: number, pMax: number): string;
    private static _Str;
    private static _Month;
    static RemoveAccent(pValue: string): string;
    static SelectAll(pNode: Node): void;
    static NearValue(pValue: number, pAvg: number, pMaxCount: number): number;
    static Eval(pContext: any, pJS: string): any;
    static BIRTDate(pValue: string): string;
    static IIF<T>(pBoolean: boolean, pV1: any, pV2: any): T;
    static NoNumbers(pValue: string): string;
    static OnlyNumbers(pValue: string): string;
    static FixDecimal(pValue: number, pDecimal: number): number;
    static Up2Dec(pValue: number): number;
    static Down2Dec(pValue: number): number;
    static DecodeUnicode(pValue: string): string;
    static Base64ToString(pValue: any): string;
    static StringToBase64(pValue: any): string;
    static Base64ToBlob(pData: string, pType?: string): Blob;
    static To64(pValue: any): string;
    static From64(pData: any): any[];
    static IndexOf(pElement: HTMLCollection, pPredicate: XFunc<any>): number;
    static GetValue(pElement: HTMLCollection, pPredicate: XFunc<any>): Element;
    static HasParent(pElement: Element, pPredicate: XFunc<Element>): boolean;
    static GetParent(pElement: Node, pPredicate: XFunc<any>): any;
    static NumberToString(pValue: number, pScale: number): string;
    static IsNumber(pValue: any): boolean;
    static GetSplitLiteral(pValue: string): XArray<string>;
    static GetString(pCount: number): string;
    static Is<T>(pInstance: any): boolean;
    static LoadJS(pDoc: Document, pURL: string, pCallback: any): any;
    static LoadCSS(pDoc: Document, pURL: string): any;
    static NewElement<T extends Element>(pOwner: Node, pType: string, pClass?: string | Document, pInsert?: boolean): T;
    static SetCursor(pElement: HTMLElement, pType: XDragType): void;
    static Add(pArray: Array<any>, pItem: any): void;
    static Remove(pArray: Array<any>, pItem: any): void;
    static Find(pArray: Array<any>, pItem: any): any;
    static Location(pElement: HTMLElement): XPoint;
    static IsOut(pRect: ClientRect, pLocation: XPoint, pWidth: number, pHeight: number): Boolean;
    static Replace(pText: string, pChar: string, pPosition: number): string;
}
declare class XDataSet<T extends XDataTuple> {
    Tuples: XArray<T>;
    SetTuples(pTuples: XArray<T>): XDataSet<T>;
    Assign(pClass: any, pDataSet: XDataSet<T>): void;
    get CurrentTuple(): T;
}
