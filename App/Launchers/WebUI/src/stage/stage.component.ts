import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Modal } from 'bootstrap';
import { XStageComponent } from '../material/Component/XStageComponent';
import { XFactory } from '../material/Factory/XFactory';
import { UserMenuTuple } from '../menu/user-menu.service';

@Component({
    selector: 'div[stage-root]',
    templateUrl: './stage.component.html',
    styleUrls: ['./stage.component.css'],
})
export class StageComponent extends XStageComponent implements OnInit, AfterViewInit
{
    static Instance: StageComponent;

    @ViewChild('XMainTabControl', { read: ViewContainerRef })
    override ElementContainer!: ViewContainerRef;

    index: number = 0;
    activeTab: any;

    constructor(pElmRef: ElementRef)
    {
        super(pElmRef);
        StageComponent.Instance = this;
    }
    SelectedValue: any;
    SearchValue: any;
    public Items = ["Zilma Maria dos Reis",
        "Rosilda Ribeiro Souza",
        "Isabela  Barros de Araújo",
        "Daniela Filha da Heloisa",
        "Ana Caroline Rodrigues",
        "Lucia da Costa Oliveira",
        "Natalia Damasceno",
        "Valéria Alve",
        "Victor Ivan Porto Ferreira Rocha",
        "Diego Gregório",
        "Leia Alves",
        "karleia Neres de Souz",
        "Valdivino Filgueir",
        "Maisa Moura de Castro",
        "Rita De Cassia Lacerda",
        "Hildiane Pereira Espindula ",
        "Maura Pereira Da Silva andrade",
        "Mariza Amaral",
        "Débora Cristin"];

    SelectValue(pValue: any)
    {
    }

    DDClick(pEvent: Event)
    {
        let dropdownDiv = <any>document.getElementById('dropdownId');
        if (dropdownDiv.style.display == "block")
        {
            dropdownDiv.style.display = "none";
        } else
        {
            dropdownDiv.style.display = "block";
        }
    }
    override ngAfterViewInit(): void
    {
        super.ngAfterViewInit();
        let dropdown = <any>document.querySelectorAll('.dropdown-link');
        dropdown.onclick = (e) =>
        {
        };
    }

    override PrepareOwner()
    { }

    override CloseView(pElement: any)
    {
        StageComponent.Instance.ElementContainer.remove(StageComponent.Instance.ElementContainer.indexOf(pElement.View.hostView));
    }

    override CreateView(pID: string): any
    {
        return XFactory.CreateApp(StageComponent.Instance, StageComponent.Instance, StageComponent.Instance.ElementContainer, pID);
    }

    override ShowError(pElement: HTMLElement)
    {
        const myModal = new Modal(pElement, { backdrop: "static", keyboard: false });
        myModal.show();
    }

    override DoLoad(pContainer: HTMLElement, pItem: UserMenuTuple)
    {
        try
        {
            let view = XFactory.CreateApp(StageComponent.Instance, StageComponent.Instance, StageComponent.Instance.ElementContainer, pItem.SYSxComponenteID.Value);
            let nelm = <HTMLElement>view.location.nativeElement;
            (<any>nelm).View = view;
            nelm.parentElement?.removeChild(nelm);
            pContainer.appendChild(nelm);
        }
        catch (Err)
        {
            StageComponent.Instance.CloseByID(pItem.SYSxComponenteID.Value);
            StageComponent.Instance.PrepareError(Err, "Erro ao Criar Aplicativo [" + pItem.Titulo + "]", pContainer);
        }
    }

    ngOnInit(): void
    {
    }
}