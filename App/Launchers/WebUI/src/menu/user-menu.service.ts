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
        return this.http.post<any>(`${environment.apiBaseURI}/TootegaCoreSYS/System/UserMenu/Search`, JSON.parse("{}"));
    }
}
export { UserMenuTuple };
