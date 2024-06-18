import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserMenuTuple } from '../material/Data/Menu.Model';

@Injectable({
    providedIn: 'root'
})
export class UserMenuService
{
    constructor(private http: HttpClient) { }

    search(): Observable<any>
    {
        return this.http.post<any>(`${environment.apiBaseURI}/STXAppCoreINF/Menu/UserManu/Search`, JSON.parse('{"State": 0,"TakeRows": 0,"SkipRows": 0,"CORxRecursoID": {"Value": "00000000-0000-0000-0000-000000000000","Name": "String","State": 0}}'));
    }
}
export { UserMenuTuple };
