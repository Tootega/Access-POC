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
        XFactory.SetService(STXAppCoreINFPerfilPerfilSVC.PerfilService, 'C622AE73-BC2E-4E1B-9AFE-CF9579A69E1F');
        XFactory.SetService(STXAppCoreINFPerfilPerfilDireitoSVC.PerfilDireitoService, 'D653C667-14D8-4FEC-8B91-931A9F9AF041');
    }
}
