//<auto-generated/>
import { Component, ElementRef } from '@angular/core';
import { STXAppCoreINFPerfilPerfilSVC } from './Perfil.Service';
import { STXAppCoreINFPerfilPerfilMDL } from './Perfil.Model';

import { XSearchComponent } from 'material/Component/XSearchComponent';

    @Component({
        templateUrl: './Perfil.Component.html',
        styleUrls: ['./Perfil.Component.css']
    })
    export class PerfilComponent extends XSearchComponent<STXAppCoreINFPerfilPerfilMDL.PerfilTuple, STXAppCoreINFPerfilPerfilMDL.PerfilDataSet>
    {
        static CID = '99DF499E-844F-47EE-AEE6-C6462B18A3E0';

        constructor(pElmRef: ElementRef, private _PerfilService: STXAppCoreINFPerfilPerfilSVC.PerfilService)
        {
            super(pElmRef);
            this.ID = '99DF499E-844F-47EE-AEE6-C6462B18A3E0';
            this.EditorID = '657A9FA0-53A7-493F-90BB-9286D46C50C6';
        }

        override Rights = [XDefaultRights.Alterar, XDefaultRights.Configurar, XDefaultRights.Inativar, XDefaultRights.Incluir, XDefaultRights.Restaurar, XDefaultRights.Visualizar];
        override  DoLoadByPK(pPKValue: any, pCallBack: XMethod<STXAppCoreINFPerfilPerfilMDL.PerfilDataSet>)
        {
            let request = new STXAppCoreINFPerfilPerfilMDL.PerfilRequest();
            request.CORxPerfilID = pPKValue;
            this._PerfilService.GetByPK(request, pCallBack);
        }

        override DoSave(pDataSet: STXAppCoreINFPerfilPerfilMDL.PerfilDataSet, pCallBack: XMethod<boolean>)
        {
            this._PerfilService.Save(pDataSet, pCallBack);
        }
    }

