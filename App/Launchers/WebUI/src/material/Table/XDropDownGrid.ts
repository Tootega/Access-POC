import { Component, ElementRef } from '@angular/core';

import { _ViewRepeater, _VIEW_REPEATER_STRATEGY } from '@angular/cdk/collections';
import { XTable } from './XTable';

@Component({ selector: 'div[XDropDownGrid]', templateUrl: "XDropDownGrid.html", styles: [] })
export class XDropDownGrid extends XTable
{
    constructor(_ElmRef: ElementRef)
    {
        super(_ElmRef);
    }

    override ngAfterViewInit()
    {
        super.ngAfterViewInit();
    }
}