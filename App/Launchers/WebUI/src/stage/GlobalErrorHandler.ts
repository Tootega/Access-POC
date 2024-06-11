import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { XStageComponent } from "../material/Component/XStageComponent";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler
{
    constructor(private zone: NgZone)
    {
    }

    handleError(pError: any)
    {
        XStageComponent.ShowError(pError);
    }
}