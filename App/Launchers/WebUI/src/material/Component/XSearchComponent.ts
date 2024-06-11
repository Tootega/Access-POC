import { Component, ElementRef } from "@angular/core";
import { XSearchGrid } from "../Table/XSearchGrid";
import { XComponent, XISplashable } from "./XComponent";
import { XEditorComponent } from "./XEditorComponent";
import { XSplash } from "./XSplash";
import { XStageState } from "./XStageComponent";

@Component({ template: "" })
export class XSearchComponent<T extends XDataTuple, D extends XDataSet<T>> extends XComponent implements XISplashable
{
    constructor(pElmRef: ElementRef)
    {
        super(pElmRef);
    }

    Filter: any;
    EditArea: HTMLElement;
    FormArea: HTMLElement;
    SearchArea: HTMLElement;
    SelectedTuple: T;
    EditorID: string;
    CloseBtn: HTMLElement;
    SearchBtn: HTMLElement;
    PreviewBtn: HTMLElement;
    EditBtn: HTMLElement;
    SaveBtn: HTMLElement;
    DeleteBtn: HTMLElement;
    RecycleBtn: HTMLElement;
    CurrentView: HTMLElement;
    CurrentEdior: XEditorComponent;
    _State: XStageState;
    Rights: XDefaultRights[] = [];
    SearchGrid: XSearchGrid;
    DataSet: D;
    Splash: XSplash;

    get State(): XStageState
    {
        return this._State;
    }

    Preview(pArg: Event)
    {
    }

    Close(pArg: any)
    {
        if (this.CurrentView != null)
        {
            this.Stage.CloseView(this.CurrentView);
            this.SearchArea?.Show();
            this.CurrentView.parentElement.removeChild(this.CurrentView);
            this.CurrentView = null;
            this.State = XStageState.Searching;
            this.RefreshButtons();
        }

        else
        {
            this.Stage.CloseView(this.Element);
            this.Stage.CloseByID(this.ID);
        }
    }

    _CheckedAll(pArg: Event, pBodyArg: any)
    {
        var elm = <HTMLInputElement>pArg.target;
        this.DataSet.Tuples.ForEach(t => t.IsChecked = elm.checked);
        pArg.stopPropagation();
    }

    SetDataSet(pDataSet: D)
    {
        this.SearchGrid.SetDataSet(pDataSet);
    }

    Save(pArg: Event)
    {
        if (this.CurrentEdior != null)
            this.DoSave(<D>this.CurrentEdior.DataSet, (t) => this.EndSave(t));
    }

    DoSave(pDataSet: D, pCallBack: XMethod<boolean>)
    {
    }

    EndSave(pResult: boolean)
    {
        this.Close(null);
    }

    RefreshButtons()
    {
        this.PreviewBtn.ToggleStyle("navbar-toggler", true);
        this.EditBtn.ToggleStyle("navbar-toggler", true);
        this.SaveBtn.ToggleStyle("navbar-toggler", true);

        if (this.SelectedTuple?.IsReadOnly && this.Rights.Contains(XDefaultRights.Visualizar))
            this.PreviewBtn.ToggleStyle("navbar-toggler", this.SelectedTuple == null || X.In(this.State, XStageState.Editing, XStageState.Viewing));

        else
        {
            this.EditBtn.ToggleStyle("navbar-toggler", this.SelectedTuple == null || X.In(this.State, XStageState.Editing, XStageState.Viewing) || !this.Rights.Contains(XDefaultRights.Alterar));
            this.DeleteBtn.ToggleStyle("navbar-toggler", this.SelectedTuple == null || X.In(this.State, XStageState.Editing, XStageState.Viewing) || !this.Rights.Contains(XDefaultRights.Inativar));
        }

        this.SearchBtn.ToggleStyle("navbar-toggler", X.In(this.State, XStageState.Editing, XStageState.Viewing));
        this.SaveBtn.ToggleStyle("navbar-toggler", !X.In(this.State, XStageState.Editing));
    }

    SelectionChanged(pTuple: T)
    {
        this.State = XStageState.Searching;
        this.SelectedTuple = pTuple;
        this.RefreshButtons();
    }

    BeginWait()
    {
    }

    EndWait()
    {
    }

    ShowError(pError: any)
    {
    }

    override ngAfterViewInit(): void
    {
        super.ngAfterViewInit();
        this.SearchGrid.OnSelectionChange = () => this.SelectionChanged(<T>this.SearchGrid?.SelectedTuple);
        this.SearchGrid.OnRowDBLClick = () => this.Edit(null);

        this.CloseBtn = this.GetHTMLElement(this.CloseBtnID);
        this.PreviewBtn = this.GetHTMLElement(this.PreviewBtnID);
        this.SearchBtn = this.GetHTMLElement(this.SearchBtnID);
        this.EditBtn = this.GetHTMLElement(this.EditBtnID);
        this.SaveBtn = this.GetHTMLElement(this.SaveBtnID);
        this.DeleteBtn = this.GetHTMLElement(this.DeleteBtnID);
        this.RecycleBtn = this.GetHTMLElement(this.RecycleBtnID);

        this.PreviewBtn?.ToggleStyle("navbar-toggler", true);
        this.EditBtn?.ToggleStyle("navbar-toggler", true);
        this.FormArea = this.GetHTMLElement(this.FormAreaID);
        this.SearchArea = this.GetHTMLElement(this.SearchAreaID);
        this.RefreshButtons();
    }

    set State(pValue: XStageState)
    {
        this._State = pValue;
        this.RefreshButtons();
    }

    Edit(pArg: Event)
    {
        if (!this.Rights.Contains(XDefaultRights.Visualizar))
            return;
        if (this.SelectedTuple != null)
            this.DoLoadByPK(this.SelectedTuple.GetPKValue(), (t) => this.DoEdit(t));
    }

    DoLoadByPK(pPKValue: any, pCallBack: XMethod<D>)
    {
    }

    DoEdit(pDataSet: D)
    {
        if (!this.Rights.Contains(XDefaultRights.Visualizar))
            return;
        let view = this.Stage.CreateView(this.EditorID);
        this.CurrentEdior = view.instance;
        this.CurrentEdior.DataSet = pDataSet;
        let nelm = <HTMLElement>view.location.nativeElement;
        (<any>nelm).View = view;
        nelm.parentElement?.removeChild(nelm);
        this.FormArea.appendChild(nelm);
        this.SearchArea.Hide();
        this.State = XStageState.Editing;
        this.CurrentView = nelm;
        this.CurrentEdior.DataSet = pDataSet;
    }
}
