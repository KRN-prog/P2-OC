import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { PieChart } from 'src/app/core/models/PieChart';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public olympicsTotalCountryData$: Observable<number> =
    this.olympicService.getTotalsCountry();
  public olympicsTotalParticipationData$: Observable<number> =
    this.olympicService.getOlympicsTotalParticipation();
  public olympicsPieData$: Observable<PieChart[]> =
    this.olympicService.getOlympicsPieData();

  constructor(public olympicService: OlympicService) {}
}
