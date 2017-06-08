import { Component, OnInit } from '@angular/core';

import { GithubService } from '../shared/github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title: string;
  avatar: string;

  constructor(private github: GithubService) {
    github.githubUser()
      .subscribe((it) =>  {
      this.title = it.name;
      this.avatar = it.avatar_url;
     } );


  }

  ngOnInit(): void {
  }
}
