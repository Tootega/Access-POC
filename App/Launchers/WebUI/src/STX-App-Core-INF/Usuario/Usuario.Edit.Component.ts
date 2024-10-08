//<auto-generated/>
import { Component, ElementRef } from '@angular/core';
import { STXAppCoreINFUsuarioUsuarioSVC } from './Usuario.Service';
import { STXAppCoreINFUsuarioUsuarioMDL } from './Usuario.Model';

import { XEditorComponent } from '../../material/Component/XEditorComponent';

    @Component({
    templateUrl: './Usuario.Edit.Component.html'
        })
    export class UsuarioEditorComponent extends XEditorComponent
    {

        static CID = '98F19B33-0739-4748-AD89-5FCCE6074048';

        constructor(pElmRef: ElementRef, private _UsuarioService: STXAppCoreINFUsuarioUsuarioSVC.UsuarioService)
        {
             super(pElmRef);
            this.ID = '98F19B33-0739-4748-AD89-5FCCE6074048';
        }

        override DataSet: STXAppCoreINFUsuarioUsuarioMDL.UsuarioDataSet

        GetByPK(pPKValue: any)
        {
            let request = new STXAppCoreINFUsuarioUsuarioMDL.UsuarioRequest();
            request.CORxUsuarioID = pPKValue;
            this._UsuarioService.GetByPK(request, (dst) => {this.DataSet = dst});
        }
    }

