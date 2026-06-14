import { Component,inject } from '@angular/core';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-base',
  imports: [],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss',
})
export abstract class BaseComponent {
  protected config=inject(ConfigService);
  get serverUrl(){return this.config.serverUrl};
  get apiUrl(){return this.config.apiUrl};
}
