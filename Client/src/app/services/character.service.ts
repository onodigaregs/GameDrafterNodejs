import { Character } from '../models/character.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CharacterService {
  apiUrl = "http://localhost:3000/api/";
  constructor(private http: HttpClient) { }


  getCharacters(gameName: string) : Observable<Character[]> {
    return this.http.get<Character[]>(this.apiUrl + `characters/${gameName}`);
    //  .map(res => {
    //    return res["data"].docs as Character[];
    //  });
  }

  //Default Error handling method.
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
