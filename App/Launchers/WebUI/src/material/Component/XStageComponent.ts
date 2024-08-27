import {Component, ElementRef} from "@angular/core";
import {UserMenuTuple} from "../Data/Menu.Model";
import {XMainTabControl} from "../TabControl/XMainTabControl";
import {XTabControl, XTabData} from "../TabControl/XTabControl";
import {XComponent} from "./XComponent";

export enum XStageState {
    Searching = 1,
    Editing = 2,
    Viewing = 3
}

@Component({template: ""})
export class XStageComponent extends XComponent {
    private static _Instance: XStageComponent;

    static ShowError(pError: any) {
        XStageComponent._Instance.PrepareError(new XError("Erro não previsto", pError?.message, pError?.stack), "Erro");
    }

    constructor(pElmRef: ElementRef) {
        super(pElmRef);
        XStageComponent._Instance = this;
    }

    _State: XStageState;
    CurrentApp: any;
    TabControl: XTabControl;

    private existingTabs: Set<string> = new Set();

    get State(): XStageState {
        return this._State;
    }

    set State(pValue: XStageState) {
        this._State = pValue;
        if (this.CurrentApp != null)
            this.CurrentApp.State = this.State;
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this.TabControl = this.Children.First<XMainTabControl>(XMainTabControl);
    }

    CloseByID(pID: string) {
        this.TabControl.Close(pID);
        this.existingTabs.delete(pID);
    }

    CloseView(pElement: any) {
    }

    PrepareError(pErr: any, pTitle: string, pTarget?: HTMLElement) {
        var message = "";
        var stack = "";
        switch (pErr?.Type) {
            case XErrorType.Error:
                message = pErr.message;
                stack = pErr.toString();
                break;
            case XErrorType.Unconformity:
                message = pErr.message;
                stack = pErr.toString();
                break;
            case XErrorType.Message:
                message = pErr.message;
                stack = pErr.toString();
                break;
            case XErrorType.Warning:
                message = pErr.message;
                stack = pErr.toString();
                break;
            default:
                message = pErr.message;
                stack = pErr.stack;
                break;
        }
        let dialog = document.getElementById('AppError') as HTMLElement;
        if (dialog == null) {
            throw pErr;
        }
        let title = document.getElementById('TTLAppError') as HTMLElement;
        let msg = document.getElementById('MSGAppError') as HTMLElement;
        title.innerText = pTitle;
        msg.innerHTML = "<p>" + message + "</p>\r\n<p>" + stack + "</p>";
        this.ShowError(dialog);
    }

    ShowError(pElement: HTMLElement) {
    }

    ShowApp(pID: string) {
        this.TabControl.Show(pID);
    }

    Premiere(pItem: UserMenuTuple) {
        const tabID = pItem.CORxRecursoID.Value;

        if (!this.existingTabs.has(tabID)) {
            let td = new XTabData();
            td.ID = tabID;
            td.Title = pItem.Titulo.Value;
            this.TabControl.AddTab(td);
            this.existingTabs.add(tabID);

            this.CreateApp(td.TabElement, pItem);
        }

        this.ShowApp(tabID);
    }

    CreateApp(pElement: HTMLElement, pItem: UserMenuTuple) {
        this.DoLoad(pElement, pItem);
    }

    DoLoad(pContainer: HTMLElement, pItem: UserMenuTuple) {
    }
}
