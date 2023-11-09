import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ActivatedRoute } from '@angular/router';
import { OlympicResultsById } from 'src/app/core/models/OlympicResultsByCountry';
import { Router } from '@angular/router';
import { LineChart } from 'src/app/core/models/LineChart';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss'],
})
export class CountryDetailsComponent implements OnInit {
  public olympicsLineChartById$!: Observable<LineChart[]>;
  public olympicsById$!: Observable<OlympicResultsById[]>;

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const country =
      this.route.snapshot.params['id'].search('-') === -1
        ? this.route.snapshot.params['id']
        : this.route.snapshot.params['id'].replace('-', ' ');
    this.olympicsById$ = this.olympicService.getTotalsInfosByCountry(country);
    this.olympicsLineChartById$ =
      this.olympicService.getOlympicLineData(country);
  }

  onNavigate() {
    this.router.navigate(['/']);
  }
}
