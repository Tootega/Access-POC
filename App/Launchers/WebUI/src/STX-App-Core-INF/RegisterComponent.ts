import { XFactory } from 'material/Factory/XFactory';

import { PerfilComponent } from './Perfil/Perfil.Component';
import { UsuarioComponent } from './Usuario/Usuario.Component';
import { PerfilEditorComponent } from './Perfil/Perfil.Edit.Component';
import { UsuarioEditorComponent } from './Usuario/Usuario.Edit.Component';
export const ComponentImportSTXAppCoreINF = [PerfilComponent,
UsuarioComponent,
PerfilEditorComponent,
UsuarioEditorComponent];

export class ComponentSTXAppCoreINF
{
    static Register()
    {
        XFactory.ExternalComponents[PerfilComponent.CID] = PerfilComponent;
        XFactory.ExternalComponents[UsuarioComponent.CID] = UsuarioComponent;
        XFactory.ExternalComponents[PerfilEditorComponent.CID] = PerfilEditorComponent;
        XFactory.ExternalComponents[UsuarioEditorComponent.CID] = UsuarioEditorComponent;
    }
}
