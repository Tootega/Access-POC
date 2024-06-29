import { HttpClient } from "@angular/common/http";
import { XComponent } from "../Component/XComponent";
import { XStageComponent } from "../Component/XStageComponent";

export class XFactory
{
    static ExternalComponents = new Object();
    static ExternalServices = new Object();
    static GlobalTimeout: number = 10 * 1000;
    static CreateApp(pStage: XStageComponent, pOwner: XComponent, pTabContainer: any, pAppID: string)
    {
        let comp = pTabContainer.createComponent(this.ExternalComponents[pAppID.toUpperCase()]);
        comp.instance.ID = pAppID;
        comp.instance.Stage = pStage;
        comp.instance.Owner = pOwner;
        return comp;
    }

    static CreateService(pServiceID: string, http: HttpClient): any
    {
        return this.ExternalServices[pServiceID.toUpperCase()].Create(http);
    }
}
