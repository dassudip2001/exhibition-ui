import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-content-wrapper',
  imports: [RouterOutlet],
  templateUrl: './content-wrapper.component.html',
  styleUrl: './content-wrapper.component.css',
})
export class ContentWrapperComponent {}
