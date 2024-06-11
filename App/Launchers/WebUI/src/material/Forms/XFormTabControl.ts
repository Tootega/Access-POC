import { Component, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { _ViewRepeater, _VIEW_REPEATER_STRATEGY } from '@angular/cdk/collections';
import { XTabControl } from '../TabControl/XTabControl';

@Component({
    selector: 'XFormTabControl',
    templateUrl: "./XFormTabControl.html",
    styles: []
})
export class XFormTabControl extends XTabControl
{
    constructor(pElmRef: ElementRef)
    {
        super(pElmRef);
    }
}