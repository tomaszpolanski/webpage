import { Component, OnInit } from '@angular/core';

import { GithubService } from '../shared/github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  avatar: String = '';

  constructor(private github: GithubService) {
    github.githubUser().subscribe((it) => this.avatar = it.avatar_url );
  }

  ngOnInit(): void {
  }
  title = 'app works!';
}
