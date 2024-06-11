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
        return this.http.post<any>(`${environment.apiBaseURI}/STXAppCoreINF/Menu/UserManu/Search`, JSON.parse('{"State": 0,"TakeRows": 0,"SkipRows": 0,"CORxRecursoID": {"Value": "3fa85f64-5717-4562-b3fc-2c963f66afa6","Name": "string","State": 0}}'));
    }
}
export { UserMenuTuple };
