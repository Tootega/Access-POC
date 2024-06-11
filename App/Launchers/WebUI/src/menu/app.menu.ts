import { Component, OnInit } from '@angular/core';
import { UserMenuGrouped, UserMenuTuple } from '../material/Data/Menu.Model';
import { StageComponent } from '../stage/stage.component';
import { UserMenuService } from './user-menu.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.html',
    styleUrls: ['./app.menu.scss'],
})
export class MenuComponent implements OnInit
{
    constructor(private userMenuService: UserMenuService)
    {
    }

    MenuGroups = new XArray<UserMenuGrouped>();
    MenuItems: XArray<UserMenuTuple>;

    Premiere(pElement: HTMLElement)
    {
        let menu = this.MenuItems.FirstOrNull(x => x.SYSxComponenteID.Value == pElement.id);
        StageComponent.Instance.Premiere(menu);
    }

    DoToogle(pElement: HTMLElement)
    {
        pElement.parentElement?.classList.toggle("close");
    }

    DoClick(pElement: HTMLElement)
    {
        let arrowParent = pElement.parentElement;
        arrowParent?.classList.toggle("showMenu");
    }

    ngOnInit()
    {
        this.userMenuService.search().subscribe(data => { this.PrepareData(data.Tuples); });
    }

    PrepareData(pData: XArray<UserMenuTuple>)
    {
        this.MenuItems = pData;
        let group = pData.GroupBy<UserMenuTuple>(t => t.Modulo.Value).OrderBy(m => m.Value.FirstOr<UserMenuTuple>().Ordem.Value);
        for (var i = 0; i < group.length; i++)
        {
            let grp = group[i];
            let menu: UserMenuGrouped = {
                Modulo: grp.Key,
                Icone: this.MenuItems.FirstOrNull(o => o.Modulo.Value == grp.Key)?.Icone.Value,
                SubMenus: new XArray<UserMenuTuple>(grp.Value.OrderBy(i => (<any>i).Titulo.Value))
            }
            this.MenuGroups.Add(menu);
        }
    }
}