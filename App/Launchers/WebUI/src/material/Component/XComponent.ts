import { AfterViewInit, Component, Directive, ElementRef, Input, OnDestroy, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from "@angular/core";
import { XSplash } from "./XSplash";
import { XStageComponent } from "./XStageComponent";

export enum XNavBarButton
{
    Close = "CL-BTN",
    Search = "SR-BTN",
    Preview = "PR-BTN",
    Edit = "ED-BTN",
    Save = "SV-BTN",
    Delete = "DL-BTN",
    Recycle = "RC-BTN",
}

export enum XAppArea
{
    Search = "SR-AR",
    Form = "FM-AR",
    Splash = "SP-AR",
}

export interface XISplashable
{
    Splash: XSplash
    BeginWait();
    EndWait();
    ShowError(pError: any);
}
export class XRule<T extends XDataSet<XDataTuple>>
{
    DataSet: T;
}

export class XService
{
    DoSearch(pCallback: XMethod<XDataSet<XDataTuple>>)
    {
    }
}

@Component({ template: '' })
export class XGuest implements OnDestroy, AfterViewInit
{
    constructor(pElmRef: ElementRef)
    {
        this.Element = pElmRef.nativeElement;
        this.Element.Instance = this;
        this.UUID = Guid.NewGuid();
    }

    ID: string;
    ElementRef: ElementRef
    Element: HTMLElement;
    UUID: string;
    Owner: XHost;

    protected PrepareOwner()
    {
        this.Owner = this.GetOwner();
        this.Owner?.AddGuest(this);
        if (this.Owner == null)
            console.log(this);
    }

    GetHTMLElement(pID: string): HTMLElement
    {
        return document.getElementById(pID);
    }

    GetOwner(): XHost
    {
        return this.Element?.GetIntance<XHost>(XHost, false);
    }
    OwnerAs<T>(pClass: any): T
    {
        return this.Element?.GetIntance<T>(pClass, false);
    }

    ngAfterViewInit(): void
    {
        this.PrepareOwner();
    }

    ngOnDestroy(): void
    {
        this.Owner?.RemoveGuest(this);
    }
    GetChildDeep<T extends XGuest>(pID: string): T
    {
        return null;
    }
}

@Component({ template: '' })
export class XHost extends XGuest
{
    constructor(pElmRef: ElementRef)
    {
        super(pElmRef);
    }

    @ViewChildren('Template', { read: TemplateRef })
    Template: QueryList<any>;

    @ViewChildren('Container', { read: ViewContainerRef })
    Container: QueryList<any>;

    @ViewChildren('Input', { read: ViewContainerRef })
    Inputs: QueryList<any>;

    Children: XArray<XGuest> = new XArray<XGuest>();
    AddGuest(pGuest: XGuest)
    {
        this.Children.Add(pGuest);
    }

    override GetChildDeep<T extends XGuest>(pID: string): T
    {
        if (!this.Children)
            return null;
        var t = this.Children.Get(pID);
        if (t != null)
            return t as T;
        if (this.Owner != null)
            t = this.Owner.GetChildDeep<T>(pID);
        return t as T;
    }

    RemoveGuest(pGuest: XGuest)
    {
        this.Children.Remove(pGuest);
    }

    GetTemplate(pName: string): TemplateRef<any>
    {
        if (!this.Template)
            return null;
        for (var i = 0; i < this.Template.length; i++)
        {
            let t = this.Template.get(i);
            if (this.CheckName(t["_declarationTContainer"].attrs, pName))
                return t
        }
        return null;
    }

    private CheckName(pAttr: XArray<string>, pName: string): boolean
    {
        for (var i = 0; i < pAttr.length - 1; i++)
        {
            if (pAttr[i] == "name" && pAttr[i + 1] == pName)
                return true;
        }
        return false;
    }

    GetContainer(pName: string): ViewContainerRef
    {
        if (!this.Container)
            return null;
        for (var i = 0; i < this.Container.length; i++)
        {
            let t = this.Container.get(i);
            if (this.CheckName(t["_hostTNode"].attrs, pName))
                return t
        }
        return null;
    }

    GetInput(pName: string): ViewContainerRef
    {
        if (!this.Container)
            return null;
        for (var i = 0; i < this.Container.length; i++)
        {
            let t = this.Container.get(i);
            if (this.CheckName(t["_hostTNode"].attrs, pName))
                return t
        }
        return null;
    }
}

@Component({ template: '' })
export class XComponent extends XHost
{
    constructor(pElmRef: ElementRef)
    {
        super(pElmRef);
    }

    Stage: XStageComponent;
    SortHistory = new Object();
    App: HTMLElement;
    @ViewChild('SearchGrid', { read: ViewContainerRef })
    ElementContainer!: ViewContainerRef;

    get CloseBtnID(): string { return XNavBarButton.Close + this.ID; }
    get SearchBtnID(): string { return XNavBarButton.Search + this.ID; }
    get PreviewBtnID(): string { return XNavBarButton.Preview + this.ID; }
    get EditBtnID(): string { return XNavBarButton.Edit + this.ID; }
    get SaveBtnID(): string { return XNavBarButton.Save + this.ID; }
    get DeleteBtnID(): string { return XNavBarButton.Delete + this.ID; }
    get RecycleBtnID(): string { return XNavBarButton.Recycle + this.ID; }

    get SearchAreaID(): string { return XAppArea.Search + this.ID; }
    get FormAreaID(): string { return XAppArea.Form + this.ID; }
    get SplashAreaID(): string { return XAppArea.Splash + this.ID; }

    CreateView(pID: string): any
    {
        return null;
    }
}
