import { Component } from '@angular/core';
import { EndpointService } from './services/endpoint.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'geographical-data';
  constructor(public endpointService: EndpointService) {}
}
