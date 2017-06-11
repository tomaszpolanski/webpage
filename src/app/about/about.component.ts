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
    animations: [
    trigger('heroState', [
      state('inactive', style({
        transform: 'rotate(180deg)'
      })),
      state('active',   style({
        transform: 'rotate(0deg)'
      })),
      transition('inactive => active', [
        style({transform: 'rotate(180deg)'}),
        animate('800ms ease-in')
      ]),
      transition('active => inactive', animate('800ms ease-out'))
    ])
  ]
})
export class AboutComponent implements OnInit {

  shortSection: TextSection[];
  longSections: TextSection[];
  fullSections: TextSection[];
  state: string;

  constructor(private prismic: PrismicService) {
    prismic.getAbout().subscribe(it => {
      this.fullSections = it;
      this.shortSection = it.filter((textSection, index) => index % 2 === 0);
      this.longSections = it.filter((textSection, index) => index % 2 === 1);
    });
  }

  toggleState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }

  ngOnInit() {
  }

}
