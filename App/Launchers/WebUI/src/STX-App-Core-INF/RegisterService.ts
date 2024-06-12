import { XFactory } from 'material/Factory/XFactory';

import { STXAppCoreINFMenuUserManuSVC } from './Menu/UserManu.Service';
import { STXAppCoreINFPerfilPerfilSVC } from './Perfil/Perfil.Service';
import { STXAppCoreINFPerfilPerfilDireitoSVC } from './Perfil/PerfilDireito.Service';
import { STXAppCoreINFUsuarioUsuarioSVC } from './Usuario/Usuario.Service';
import { STXAppCoreINFPessoaFisicaPessoaFisicaSVC } from './PessoaFisica/PessoaFisica.Service';
import { STXAppCoreINFMenuUserManuRLE } from './Menu/UserManu.Service.Rule';
import { STXAppCoreINFPerfilPerfilRLE } from './Perfil/Perfil.Service.Rule';
import { STXAppCoreINFPerfilPerfilDireitoRLE } from './Perfil/PerfilDireito.Service.Rule';
import { STXAppCoreINFUsuarioUsuarioRLE } from './Usuario/Usuario.Service.Rule';
import { STXAppCoreINFPessoaFisicaPessoaFisicaRLE } from './PessoaFisica/PessoaFisica.Service.Rule';
export const ServiceImportSTXAppCoreINF = [STXAppCoreINFMenuUserManuSVC.UserManuService,
 STXAppCoreINFMenuUserManuRLE.UserManuRule
, STXAppCoreINFPerfilPerfilSVC.PerfilService,
 STXAppCoreINFPerfilPerfilRLE.PerfilRule
, STXAppCoreINFPerfilPerfilDireitoSVC.PerfilDireitoService,
 STXAppCoreINFPerfilPerfilDireitoRLE.PerfilDireitoRule
, STXAppCoreINFUsuarioUsuarioSVC.UsuarioService,
 STXAppCoreINFUsuarioUsuarioRLE.UsuarioRule
, STXAppCoreINFPessoaFisicaPessoaFisicaSVC.PessoaFisicaService,
 STXAppCoreINFPessoaFisicaPessoaFisicaRLE.PessoaFisicaRule
];

export class ServiceSTXAppCoreINF
{
    static Register()
    {
        XFactory.ExternalServices[STXAppCoreINFMenuUserManuSVC.UserManuService.CID] = STXAppCoreINFMenuUserManuSVC.UserManuService;
        XFactory.ExternalServices[STXAppCoreINFPerfilPerfilSVC.PerfilService.CID] = STXAppCoreINFPerfilPerfilSVC.PerfilService;
        XFactory.ExternalServices[STXAppCoreINFPerfilPerfilDireitoSVC.PerfilDireitoService.CID] = STXAppCoreINFPerfilPerfilDireitoSVC.PerfilDireitoService;
        XFactory.ExternalServices[STXAppCoreINFUsuarioUsuarioSVC.UsuarioService.CID] = STXAppCoreINFUsuarioUsuarioSVC.UsuarioService;
        XFactory.ExternalServices[STXAppCoreINFPessoaFisicaPessoaFisicaSVC.PessoaFisicaService.CID] = STXAppCoreINFPessoaFisicaPessoaFisicaSVC.PessoaFisicaService;
    }
}
