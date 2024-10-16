import { Component, Input } from '@angular/core';
import { NavigationItem } from '../../navigation';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [NavigationItem]
})
export class NavItemComponent {
  @Input() item: NavigationItem;

  closeOtherMenu(event: MouseEvent): void {
    const ele = event.target as HTMLElement;
    if (ele) {
      const parent = ele.parentElement;
      const up_parent = parent?.parentElement?.parentElement;
      const last_parent = up_parent?.parentElement;
      const sections = document.querySelectorAll('.pcoded-hasmenu');

      sections.forEach(section => {
        section.classList.remove('active', 'pcoded-trigger');
      });

      this.addActiveClass(parent, up_parent, last_parent);
    }

    const navbar = document.querySelector('app-navigation.pcoded-navbar');
    if (navbar?.classList.contains('mob-open')) {
      navbar.classList.remove('mob-open');
    }
  }

  private addActiveClass(parent: HTMLElement | null, up_parent: HTMLElement | null, last_parent: HTMLElement | null): void {
    if (parent?.classList.contains('pcoded-hasmenu')) {
      parent.classList.add('pcoded-trigger', 'active');
    } else if (up_parent?.classList.contains('pcoded-hasmenu')) {
      up_parent.classList.add('pcoded-trigger', 'active');
    } else if (last_parent?.classList.contains('pcoded-hasmenu')) {
      last_parent.classList.add('pcoded-trigger', 'active');
    }
  }
}
