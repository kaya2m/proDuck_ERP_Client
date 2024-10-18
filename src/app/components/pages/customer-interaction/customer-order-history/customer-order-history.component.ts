import { Component } from '@angular/core';
import { CardComponent } from '../../../../theme/shared/components/card/card.component';

@Component({
  selector: 'app-customer-order-history',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './customer-order-history.component.html',
  styleUrl: './customer-order-history.component.css'
})
export class CustomerOrderHistoryComponent {

}
