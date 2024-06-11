import { XFactory } from 'material/Factory/XFactory';

import { STXAppCoreINFPerfilPerfilSVC } from './Perfil/Perfil.Service';
import { STXAppCoreINFPerfilPerfilDireitoSVC } from './Perfil/PerfilDireito.Service';
import { STXAppCoreINFPerfilPerfilRLE } from './Perfil/Perfil.Service.Rule';
import { STXAppCoreINFPerfilPerfilDireitoRLE } from './Perfil/PerfilDireito.Service.Rule';
export const ServiceImportSTXAppCoreINF = [STXAppCoreINFPerfilPerfilSVC.PerfilService,
 STXAppCoreINFPerfilPerfilRLE.PerfilRule
, STXAppCoreINFPerfilPerfilDireitoSVC.PerfilDireitoService,
 STXAppCoreINFPerfilPerfilDireitoRLE.PerfilDireitoRule
];

export class ServiceSTXAppCoreINF
{
    static Register()
    {
        XFactory.ExternalServices[STXAppCoreINFPerfilPerfilSVC.PerfilService.CID] = STXAppCoreINFPerfilPerfilSVC.PerfilService;
        XFactory.ExternalServices[STXAppCoreINFPerfilPerfilDireitoSVC.PerfilDireitoService.CID] = STXAppCoreINFPerfilPerfilDireitoSVC.PerfilDireitoService;
    }
}
