import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, combineLatest, map, of } from 'rxjs';
import { PieChart } from 'src/app/core/models/PieChart';

@Component({
  selector: 'app-pie-charts',
  templateUrl: './pie-charts.component.html',
  styleUrls: ['./pie-charts.component.scss']
})
export class PieChartsComponent implements OnInit {
  
  @Input() pieChartData!: PieChart[] | null


  showLabels: boolean = true;
  chartView: [number, number] = [600, 400]; // Dimensions par défaut
  medal: string = "../../../assets/svg/medal.svg";

  constructor(private router: Router) { }

  ngOnInit(): void {
    let olympicData = this.pieChartData
    Object.assign(this, { olympicData })
    console.log( Object.assign(this, { olympicData }))
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.adjustChartSize();
  }

  adjustChartSize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Ajustez les dimensions en fonction de la taille de l'écran
    if (width <= 768) {
      this.chartView = [width * 0.9, 300];
    } else {
      this.chartView = [600, 400];
    }
  }



  onSelect(event: { name: string; }) {
    let nameOfEvent = event.name
    nameOfEvent.search(" ") === -1 ? null : nameOfEvent = nameOfEvent.replace(" ", "-")
    this.router.navigate([`country/${nameOfEvent}`])
  }
}
