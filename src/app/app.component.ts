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
  shortSection: TextSection[];
  longSections: TextSection[];

  constructor(private github: GithubService, private prismic: PrismicService) {
    github.githubUser()
      .subscribe((it) =>  {
      this.title = it.name;
      this.avatar = it.avatar_url;
     } );
    prismic.getAbout().subscribe(it => {
      this.shortSection = it.filter((textSection, index) => index % 2 === 0);
      this.longSections = it.filter((textSection, index) => index % 2 === 1);
      console.log('QQQ27', this.shortSection);
      console.log('QQQ28', this.longSections);
    });
  }

  ngOnInit(): void {
  }
}
