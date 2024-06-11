import { Component, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { _ViewRepeater, _VIEW_REPEATER_STRATEGY } from '@angular/cdk/collections';
import { XTabControl } from './XTabControl';
import { XStageComponent } from '../Component/XStageComponent';

@Component({
    selector: 'div[XMainTabControl]',
    templateUrl: "./XMainTabControl.html",
    styles: []
})
export class XMainTabControl extends XTabControl
{
    constructor(pElmRef: ElementRef)
    {
        super(pElmRef);
    }

    override ngAfterViewInit()
    {
        super.ngAfterViewInit();
        let stage = this.OwnerAs<XStageComponent>(XStageComponent);
        stage.TabControl = this;
    }
}