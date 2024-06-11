import { Component, ElementRef } from '@angular/core';

import { _ViewRepeater, _VIEW_REPEATER_STRATEGY } from '@angular/cdk/collections';
import { XGridEvent, XTable } from './XTable';
import { XSearchComponent } from "../Component/XSearchComponent";

@Component({ selector: 'XSearchGrid', template: "<ng-content></ng-content>", styles: [] })
export class XSearchGrid extends XTable
{
    constructor(_ElmRef: ElementRef)
    {
        super(_ElmRef);
    }

    override ngAfterViewInit()
    {
        super.ngAfterViewInit();
        let search = this.OwnerAs<any>(XSearchComponent);
        search.SearchGrid = this;
    }
}