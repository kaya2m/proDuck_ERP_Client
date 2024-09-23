import { Declaration } from './../../../../../../../node_modules/@types/estree/index.d';
// angular import
import { Component } from '@angular/core';
import { NavSearchComponent } from './nav-search/nav-search.component';

@Component({
  selector: 'app-nav-left',
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.scss'],
  standalone: true,
  imports: [NavSearchComponent]
})
export class NavLeftComponent {}
