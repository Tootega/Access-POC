import { XFactory } from 'material/Factory/XFactory';

import { STXAppCoreINFPerfilPerfilSVC } from './Perfil/Perfil.Service';
import { STXAppCoreINFPerfilPerfilDireitoSVC } from './Perfil/PerfilDireito.Service';
import { STXAppCoreINFMenuUserManuSVC } from './Menu/UserManu.Service';
import { STXAppCoreINFPerfilPerfilRLE } from './Perfil/Perfil.Service.Rule';
import { STXAppCoreINFPerfilPerfilDireitoRLE } from './Perfil/PerfilDireito.Service.Rule';
import { STXAppCoreINFMenuUserManuRLE } from './Menu/UserManu.Service.Rule';
export const ServiceImportSTXAppCoreINF = [STXAppCoreINFPerfilPerfilSVC.PerfilService,
 STXAppCoreINFPerfilPerfilRLE.PerfilRule
, STXAppCoreINFPerfilPerfilDireitoSVC.PerfilDireitoService,
 STXAppCoreINFPerfilPerfilDireitoRLE.PerfilDireitoRule
, STXAppCoreINFMenuUserManuSVC.UserManuService,
 STXAppCoreINFMenuUserManuRLE.UserManuRule
];

export class ServiceSTXAppCoreINF
{
    static Register()
    {
        XFactory.ExternalServices[STXAppCoreINFPerfilPerfilSVC.PerfilService.CID] = STXAppCoreINFPerfilPerfilSVC.PerfilService;
        XFactory.ExternalServices[STXAppCoreINFPerfilPerfilDireitoSVC.PerfilDireitoService.CID] = STXAppCoreINFPerfilPerfilDireitoSVC.PerfilDireitoService;
        XFactory.ExternalServices[STXAppCoreINFMenuUserManuSVC.UserManuService.CID] = STXAppCoreINFMenuUserManuSVC.UserManuService;
    }
}
