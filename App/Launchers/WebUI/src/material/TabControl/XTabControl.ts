import { Component, ElementRef, EmbeddedViewRef, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { _ViewRepeater, _VIEW_REPEATER_STRATEGY } from '@angular/cdk/collections';
import { XHost } from '../Component/XComponent';

export class XTabData
{
    ID: string;
    Title: string;
    Header: EmbeddedViewRef<any>;
    Tab: EmbeddedViewRef<any>;
    TabElement: HTMLElement;
    HeaderElement: HTMLElement;
    Button: HTMLElement;
}

@Component({
    selector: 'XTabControl',
    templateUrl: "./XTabControl.html",
    styles: []
})
export class XTabControl extends XHost
{
    @ViewChild('TabHeaderContent', { read: ViewContainerRef })
    protected TabHeaderContent!: ViewContainerRef;

    @ViewChild('TabHeaderTemplate', { read: TemplateRef })
    private TabHeaderTemplate: TemplateRef<any>;

    @ViewChild('TabContent', { read: ViewContainerRef })
    protected TabContent!: ViewContainerRef;

    @ViewChild('TabTemplate', { read: TemplateRef })
    private TabTemplate: TemplateRef<any>;

    constructor(pElmRef: ElementRef)
    {
        super(pElmRef);
    }

    public Tabs = new XArray<XTabData>();

    Show(pID: string)
    {
        for (var i = 0; i < this.Tabs.length; i++)
            if (pID != this.Tabs[i].ID)
                this.HideTab(this.Tabs[i]);
            else
                this.ShowTab(this.Tabs[i]);
    }

    Close(pID: string)
    {
        let tab = this.Tabs.Get(pID);
        if (tab != null)
        {
            let idx = this.Tabs.IndexOf(t => t.ID == pID);
            this.TabContent.remove(this.TabContent.indexOf(tab.Tab));
            this.TabHeaderContent.remove(this.TabHeaderContent.indexOf(tab.Header));
            this.Tabs.Remove(tab);
            idx = this.GetNextTab(idx);
            if (idx != -1)
                this.ShowTab(this.Tabs[idx]);
        }
    }

    GetNextTab(pIndex: number): number
    {
        if (X.IsEmpty(this.Tabs))
            return -1;
        if (pIndex >= this.Tabs.length)
            return this.Tabs.length - 1;
        if (pIndex <= 0)
            return 0;
        return pIndex + 1;
    }

    ShowTab(pTab: XTabData)
    {
        pTab.TabElement.classList.Add("active");
        pTab.Button.classList.Add("active");
        pTab.Button.setAttribute("selected", "true");
    }

    HideTab(pTab: XTabData)
    {
        pTab.TabElement.classList.Remove("active");
        pTab.Button.classList.Remove("active");
        pTab.Button.removeAttribute("selected");
    }

    AddTab(pTabData: XTabData)
    {
        let tb = this.TabContent.createEmbeddedView(this.TabTemplate, { data: pTabData });
        pTabData.TabElement = tb.rootNodes.First<HTMLElement>(HTMLElement);
        pTabData.Tab = tb;
        let he = this.TabHeaderContent.createEmbeddedView(this.TabHeaderTemplate, { data: pTabData });
        pTabData.Header = he;
        pTabData.HeaderElement = he.rootNodes.First<HTMLElement>(HTMLElement);
        pTabData.Button = <HTMLElement>pTabData.HeaderElement.firstElementChild;
        this.Tabs.Add(pTabData);
        XEventManager.SetTimeOut(this, () => this.Show(pTabData.ID));
    }
}