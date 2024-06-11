import { XFactory } from 'material/Factory/XFactory';

import { STXAppCoreINFMenuUserManuSVC } from './Menu/UserManu.Service';
import { STXAppCoreINFPerfilPerfilSVC } from './Perfil/Perfil.Service';
import { STXAppCoreINFPerfilPerfilDireitoSVC } from './Perfil/PerfilDireito.Service';
import { STXAppCoreINFMenuUserManuRLE } from './Menu/UserManu.Service.Rule';
import { STXAppCoreINFPerfilPerfilRLE } from './Perfil/Perfil.Service.Rule';
import { STXAppCoreINFPerfilPerfilDireitoRLE } from './Perfil/PerfilDireito.Service.Rule';
export const ServiceImportSTXAppCoreINF = [STXAppCoreINFMenuUserManuSVC.UserManuService,
 STXAppCoreINFMenuUserManuRLE.UserManuRule
, STXAppCoreINFPerfilPerfilSVC.PerfilService,
 STXAppCoreINFPerfilPerfilRLE.PerfilRule
, STXAppCoreINFPerfilPerfilDireitoSVC.PerfilDireitoService,
 STXAppCoreINFPerfilPerfilDireitoRLE.PerfilDireitoRule
];

export class ServiceSTXAppCoreINF
{
    static Register()
    {
        XFactory.ExternalServices[STXAppCoreINFMenuUserManuSVC.UserManuService.CID] = STXAppCoreINFMenuUserManuSVC.UserManuService;
        XFactory.ExternalServices[STXAppCoreINFPerfilPerfilSVC.PerfilService.CID] = STXAppCoreINFPerfilPerfilSVC.PerfilService;
        XFactory.ExternalServices[STXAppCoreINFPerfilPerfilDireitoSVC.PerfilDireitoService.CID] = STXAppCoreINFPerfilPerfilDireitoSVC.PerfilDireitoService;
    }
}
