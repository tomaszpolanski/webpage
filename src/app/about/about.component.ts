import { Component, OnInit } from '@angular/core';

import { PrismicService, TextSection } from '../../shared/prismic.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  shortSection: TextSection[];
  longSections: TextSection[];

  constructor(private prismic: PrismicService) {
    prismic.getAbout().subscribe(it => {
      this.shortSection = it.filter((textSection, index) => index % 2 === 0);
      this.longSections = it.filter((textSection, index) => index % 2 === 1);
    });
  }

  ngOnInit() {
  }

}
