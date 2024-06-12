import { XFactory } from 'material/Factory/XFactory';

import { PerfilComponent } from './Perfil/Perfil.Component';
import { UsuarioComponent } from './Usuario/Usuario.Component';
import { PessoaFisicaComponent } from './PessoaFisica/PessoaFisica.Component';
import { PerfilEditorComponent } from './Perfil/Perfil.Edit.Component';
import { UsuarioEditorComponent } from './Usuario/Usuario.Edit.Component';
import { PessoaFisicaEditorComponent } from './PessoaFisica/PessoaFisica.Edit.Component';
export const ComponentImportSTXAppCoreINF = [PerfilComponent,
UsuarioComponent,
PessoaFisicaComponent,
PerfilEditorComponent,
UsuarioEditorComponent,
PessoaFisicaEditorComponent];

export class ComponentSTXAppCoreINF
{
    static Register()
    {
        XFactory.ExternalComponents[PerfilComponent.CID] = PerfilComponent;
        XFactory.ExternalComponents[UsuarioComponent.CID] = UsuarioComponent;
        XFactory.ExternalComponents[PessoaFisicaComponent.CID] = PessoaFisicaComponent;
        XFactory.ExternalComponents[PerfilEditorComponent.CID] = PerfilEditorComponent;
        XFactory.ExternalComponents[UsuarioEditorComponent.CID] = UsuarioEditorComponent;
        XFactory.ExternalComponents[PessoaFisicaEditorComponent.CID] = PessoaFisicaEditorComponent;
    }
}
