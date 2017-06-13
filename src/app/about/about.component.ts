import { Component, OnInit } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { PrismicService, TextSection } from '../../shared/prismic.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {

  fullSections: TextSection[];
  state: string;
  label = 'Kotlin';
  value = 80;
  badges = [ {
      label: 'Java',
      value: 100,
    }, {
      label: 'C#',
      value: 80,
    }, {
      label: 'F#',
      value: 80,
    }, {
      label: 'Kotlin',
      value: 70,
    }, {
      label: 'JS',
      value: 70,
    }, {
      label: 'C++',
      value: 50,
    },
  ];

  constructor(private prismic: PrismicService) {
    prismic.getAbout().subscribe(it => {
      this.fullSections = it;
    });
  }

  toggleState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }

  ngOnInit() {
  }

}
