import { Component } from '@angular/core';
import { CustomerInformationComponent } from './customer-information/customer-information.component';
import { CustomerInterplayComponent } from './customer-interplay/customer-interplay.component';
import { CustomerOrderHistoryComponent } from './customer-order-history/customer-order-history.component';
import { CustomerTasksNotesComponent } from './customer-tasks-notes/customer-tasks-notes.component';

@Component({
  selector: 'app-customer-interaction',
  standalone: true,
  imports: [CustomerInformationComponent,CustomerInterplayComponent,CustomerOrderHistoryComponent,CustomerTasksNotesComponent],
  templateUrl: './customer-interaction.component.html',
  styleUrl: './customer-interaction.component.css'
})
export class CustomerInteractionComponent {

}
