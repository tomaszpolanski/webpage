import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'RxJS/Rx';
import 'rxjs/add/operator/map';

export interface User {
  name: string;
  avatar_url: string;
}

@Injectable()
export class GithubService {

  constructor(private http: Http) { }

  public githubUser() {
    return this.http
            .get(`https://api.github.com/users/tomaszpolanski`)
            .map(response => <User>response.json());
  }
}
