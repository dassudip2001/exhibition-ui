import { AfterViewInit, Component, inject } from '@angular/core';
import { ExhibitionService } from '../exhibition/services/exhibition.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {
  readonly #exhibitionService=inject(ExhibitionService);
  ngAfterViewInit(): void {
    this.#getExhibitions();
  }

  #getExhibitions(): void {
    this.#exhibitionService.get().subscribe((res) => {
      console.log(res);
    });
  }

}
