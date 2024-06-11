/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { StageModule } from "./stage/stage.module"
import '@angular/compiler';

platformBrowserDynamic().bootstrapModule(StageModule)
    .catch(err => console.error(err));