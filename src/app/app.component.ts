import { Component, OnInit } from '@angular/core';

import { GithubService } from '../shared/github.service';
import { PrismicService, TextSection } from '../shared/prismic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title: string;
  avatar: string;
  htmlSections: TextSection[];

  constructor(private github: GithubService, private prismic: PrismicService) {
    github.githubUser()
      .subscribe((it) =>  {
      this.title = it.name;
      this.avatar = it.avatar_url;
     } );
    prismic.getAbout().subscribe(it => this.htmlSections = it);
  }

  ngOnInit(): void {
  }
}
