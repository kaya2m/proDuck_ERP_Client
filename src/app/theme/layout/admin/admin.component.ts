import { BreadcrumbsComponent } from './../../shared/components/breadcrumbs/breadcrumbs.component';
// angular import
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { DattaConfig } from '../../../app.config';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavigationComponent } from './navigation/navigation.component';

// project import

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [RouterModule,NavBarComponent,NavigationComponent,CommonModule,BreadcrumbsComponent,],
})
export class AdminComponent {
  navCollapsed: any;
  navCollapsedMob: boolean;
  windowWidth: number;

  constructor(private location: Location) {
    let current_url = this.location.path();
    if (this.location['_baseHref']) {
      current_url = this.location['_baseHref'] + this.location.path();
    }

    this.windowWidth = window.innerWidth;
    this.navCollapsed = this.windowWidth >= 992 ? DattaConfig.isCollapseMenu : false;
    this.navCollapsedMob = false;
  }

  navMobClick() {
    if (this.navCollapsedMob && !document.querySelector('app-navigation.pcoded-navbar').classList.contains('mob-open')) {
      this.navCollapsedMob = !this.navCollapsedMob;
      setTimeout(() => {
        this.navCollapsedMob = !this.navCollapsedMob;
      }, 100);
    } else {
      this.navCollapsedMob = !this.navCollapsedMob;
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeMenu();
    }
  }

  closeMenu() {
    if (document.querySelector('app-navigation.pcoded-navbar').classList.contains('mob-open')) {
      document.querySelector('app-navigation.pcoded-navbar')?.classList.remove('mob-open');
    }
  }
}
