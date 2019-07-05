import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';


const  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'Application/json',
    'x-app-id':'ca9c0940',
    'x-app-key':'24a70fa4ae19225cce4d4143ba0e2205'
  }),
  params:new HttpParams()
};

@Injectable()
export class GYMService {
  anyesUrl = 'https://trackapi.nutritionix.com/v2';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('anyesService');
  }

  /** GET anyes from the server */
  public get (api:any): Observable<any[]> {
    let useAuthKey = "";
if(localStorage.getItem("userData")){
  useAuthKey = JSON.parse(localStorage.getItem("userData"))['x-user-jwt'];
}
    httpOptions.headers =  new HttpHeaders({
      'Content-Type':  'Application/json',
      'x-app-id':'ca9c0940',
      'x-app-key':'24a70fa4ae19225cce4d4143ba0e2205',
      'x-user-jwt':useAuthKey
    });
    return this.http.get<any[]>(this.anyesUrl + "/" + api,httpOptions)
      .pipe(
        catchError(this.handleError('getanyes', []))
      )
  }

  public getSingle (api:any): Observable<any> {
    let useAuthKey = "";
  if(localStorage.getItem("userData")){
    useAuthKey = JSON.parse(localStorage.getItem("userData"))['x-user-jwt'];
  }
  httpOptions.headers =  new HttpHeaders({
    'Content-Type':  'Application/json',
    'x-app-id':'ca9c0940',
    'x-app-key':'24a70fa4ae19225cce4d4143ba0e2205',
    'x-user-jwt':useAuthKey
  });
    return this.http.get<any>(this.anyesUrl + "/" + api,httpOptions)
      .pipe(
        catchError(this.handleError('getanyes', {}))
      )
  }

  /* GET anyes whose name contains search term */
  public search(term: string,api:any): Observable<any[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    //const options = term ?
     //{params: new HttpParams().set('name', term) } : {};
     httpOptions.params.set('name', term);
    return this.http.get<any[]>(this.anyesUrl + "/" + api, httpOptions)
      .pipe(
        catchError(this.handleError<any[]>('searchanyes', []))
      );
  }

  //////// Save methods //////////

  /** POST: add a new any to the database */
  public add (any: any,api:any): Observable<any> {
    return this.http.post<any>(this.anyesUrl + "/" + api, any, httpOptions)
      .pipe(
        catchError(this.handleError('addany', any))
      );
  }

  /** DELETE: delete the any from the server */
  delete (id: number,api:any): Observable<{}> {
    let combineUrl = this.anyesUrl + "/" + api;
    const url = `${combineUrl}/${id}`; // DELETE api/anyes/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteany'))
      );
  }

  /** PUT: update the any on the server. Returns the updated any upon success. */
  public update (any: any,api:any): Observable<any> {
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<any>(this.anyesUrl + "/" + api, any, httpOptions)
      .pipe(
        catchError(this.handleError('updateany', any))
      );
  }
}
