import { Component, ElementRef, Input } from "@angular/core";
import { Modal } from "bootstrap";
import { XGuest, XHost, XISplashable } from "./XComponent";
import { XSearchComponent } from "./XSearchComponent";

@Component({
    selector: 'div[XSplash]',
    template: `
<div class="modal fade show" id="AppError" tabindex="-1" aria-labelledby="TTLAppError" aria-modal="true" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable  modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header bg-danger">
                <h5 class="modal-title" id="TTLAppError">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="MSGAppError">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary bg-danger " data-bs-dismiss="modal">Fechar</button>
            </div>
        </div>
    </div>
</div>`, styles: []
})
export class XSplash extends XGuest
{
    constructor(pElmRef: ElementRef)
    {
        super(pElmRef);
    }

    @Input()
    override ID: string;
    private _Dialog: HTMLElement;
    private _Title: HTMLElement;
    private _Msg: HTMLElement;
    private _Modal: Modal;

    override ngAfterViewInit()
    {
        super.ngAfterViewInit();
        this.OwnerAs<XISplashable>(XSearchComponent).Splash = this;
        this._Dialog = this.Element.querySelector('#AppError') as HTMLElement;
        this._Title = this.Element.querySelector('#TTLAppError') as HTMLElement;
        this._Msg = this.Element.querySelector('#MSGAppError') as HTMLElement;
        this._Modal = new Modal(this._Dialog, { backdrop: "static", keyboard: false });
    }

    ShowError(pErr: any, pTitle: string, pTarget?: HTMLElement)
    {
        var message = "";
        var stack = "";
        switch (pErr?.Type)
        {
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

        this._Title.innerText = pTitle;
        this._Msg.innerHTML = "<p>" + message + "</p>\r\n<p>" + stack + "</p>";
        this._Modal.show(pTarget);
    }
}
