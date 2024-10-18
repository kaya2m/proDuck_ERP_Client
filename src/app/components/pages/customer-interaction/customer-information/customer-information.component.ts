import { Component } from '@angular/core';
import { CardComponent } from '../../../../theme/shared/components/card/card.component';

@Component({
  selector: 'app-customer-information',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './customer-information.component.html',
  styleUrl: './customer-information.component.css'
})
export class CustomerInformationComponent {

}
