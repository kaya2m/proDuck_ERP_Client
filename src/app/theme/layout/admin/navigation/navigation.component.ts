// angular import
import { Component, EventEmitter, Output } from '@angular/core';
import { DattaConfig } from '../../../../app.config';
import { CommonModule } from '@angular/common';
import { NavLogoComponent } from './nav-logo/nav-logo.component';
import { NavContentComponent } from "./nav-content/nav-content.component";

// project import


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  imports: [CommonModule, NavLogoComponent, NavContentComponent],
})
export class NavigationComponent {
  // public props
  @Output() NavCollapse = new EventEmitter();
  @Output() NavCollapsedMob = new EventEmitter();
  navCollapsed: any;
  navCollapsedMob = false;
  windowWidth = window.innerWidth;

  // constructor
  constructor() {
    this.navCollapsed = this.windowWidth >= 992 ? DattaConfig.isCollapseMenu : false;
  }

  // public method
  navCollapse() {
    if (this.windowWidth >= 992) {
      this.navCollapsed = !this.navCollapsed;
      this.NavCollapse.emit();
    }
  }

  navCollapseMob() {
    if (this.windowWidth < 992) {
      this.NavCollapsedMob.emit();
    }
  }
}
