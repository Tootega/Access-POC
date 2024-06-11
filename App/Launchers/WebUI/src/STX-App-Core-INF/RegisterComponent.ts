import { XFactory } from 'material/Factory/XFactory';

import { PerfilComponent } from './Perfil/Perfil.Component';
import { PerfilEditorComponent } from './Perfil/Perfil.Edit.Component';
export const ComponentImportSTXAppCoreINF = [PerfilComponent,
PerfilEditorComponent];

export class ComponentSTXAppCoreINF
{
    static Register()
    {
        XFactory.ExternalComponents[PerfilComponent.CID] = PerfilComponent;
        XFactory.ExternalComponents[PerfilEditorComponent.CID] = PerfilEditorComponent;
    }
}
