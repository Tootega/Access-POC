//<auto-generated/>
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { XService, XRule } from 'material/Component/XComponent';
import { STXAppCoreINFMenuUserManuMDL } from './UserManu.Model';
import { STXAppCoreINFMenuUserManuRLE } from './UserManu.Service.Rule';

export namespace STXAppCoreINFMenuUserManuSVC
{

    @Injectable()
    export class UserManuService extends XService
    {
        static CID = '3E2EAA3D-00B9-42B6-8596-3184EC736459';
        constructor(private http: HttpClient, public Rule: STXAppCoreINFMenuUserManuRLE.UserManuRule)
        {
            super();
        }


        override DoSearch(pCallback: XMethod<XDataSet<XDataTuple>>)
        {
            let filter = new STXAppCoreINFMenuUserManuMDL.UserManuFilter();
            this.Search(filter, pCallback);
        }

        Search(pFilter: STXAppCoreINFMenuUserManuMDL.UserManuFilter, pCallback: XMethod<STXAppCoreINFMenuUserManuMDL.UserManuDataSet>)
        {
            let ret = this.http.post(`${environment.apiBaseURI}/STXAppCoreINF/Menu/UserManu/search`, pFilter);
            ret.subscribe({
                next: (dst) =>
                {
                    let ndst = new STXAppCoreINFMenuUserManuMDL.UserManuDataSet(<any>dst);
                    pCallback.apply(ndst, [ndst]);
                }
            });
        }

        GetByPK(pRequest: STXAppCoreINFMenuUserManuMDL.UserManuRequest, pCallback: XMethod<STXAppCoreINFMenuUserManuMDL.UserManuDataSet>)
        {
            var ret = this.http.post(`${environment.apiBaseURI}/STXAppCoreINF/Menu/UserManu/getbypk`, pRequest);
            ret.subscribe({
                next: (dst) =>
                {
                    let ndst = new STXAppCoreINFMenuUserManuMDL.UserManuDataSet(<any>dst);
                    pCallback.apply(ndst, [ndst]);
                }
            });
        }

        Save(pDataSet: STXAppCoreINFMenuUserManuMDL.UserManuDataSet, pCallback: XMethod<boolean>)
        {
            var ret = this.http.post(`${environment.apiBaseURI}/STXAppCoreINF/Menu/UserManu`, pDataSet);
            ret.subscribe({
                next: (isok) =>
                {
                    pCallback.apply(isok, [isok]);
                }
            });
        }
    }
}
