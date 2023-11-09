import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { OlympicResultsById } from '../models/OlympicResultsByCountry';
import { LineChart } from '../models/LineChart';
import { Router } from '@angular/router';
import { PieChart } from '../models/PieChart';
import { Participation } from '../models/Participation';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * This function is an observable of type Olympic[] that return the data contained in the json file "olympic.json"
   * @returns An array of objects if the request succeeds or an error if it fails
   *
   * @public
   */
  loadInitialData(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        console.error(error);
        this.olympics$.next([]);
        this.olympics$.error(error);
        this.olympics$.complete();
        return caught;
      })
    );
  }

  /**
   * This function is an observable of type Olympic[] that return an observable of the data of olympics$
   * @returns An observable sequence containing the initial request data (loadInitialData)
   *
   * @public
   */
  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

  /**
   * This function is an observable of type PieChart[] that return the data the data of the pieChart
   * @returns An array of objects that containing the data to display the pieChart, "name" for the name of the country and "value" for the number of medals from each country present in our initial data
   *
   * @public
   */
  getOlympicsPieData(): Observable<PieChart[]> {
    return this.olympics$.asObservable().pipe(
      map((olympics: Olympic[]) =>
        olympics.map((olympic) => ({
          name: olympic.country,
          value: olympic.participations.reduce(
            (acc, { medalsCount }) => (acc += medalsCount),
            0
          ),
        }))
      )
    );
  }

  /**
   * This function is an observable of type number that return the total number of participation for each country
   * @returns A number that corresponds to the total number of participations for each country present in our object table
   *
   * @public
   */
  getOlympicsTotalParticipation(): Observable<number> {
    return this.olympics$.asObservable().pipe(
      map((olympics: Olympic[]) =>
        olympics.map((olympic) =>
          olympic.participations.reduce((acc, _) => acc + 1, 0)
        )
      ),
      map((numArr: number[]) =>
        numArr.reduce(
          (accumulateur, valeurCourante) => accumulateur + valeurCourante,
          0
        )
      )
    );
  }

  /**
   * This function is an observable of type number that return the total number of countries
   * @returns A number that corresponds to the total number of countries present in our initial data
   *
   * @public
   */
  getTotalsCountry(): Observable<number> {
    return this.olympics$
      .asObservable()
      .pipe(
        map((olympics: Olympic[]) => olympics.reduce((acc, _) => acc + 1, 0))
      );
  }

  /**
   * This function is an observable of type OlympicResultsById[] which returns the total number of athletes, participation and medals by country
   * @param countryId - The country id which is its name (ex: France)
   * @returns An array of bjects of type OlympicResultsById[] which contains "country" for the country, "totalEntries" for the number of participations and "totalMedals" for the total number of medals for the country sorted by id present in initial data
   *
   * @public
   */
  getTotalsInfosByCountry(countryId: string): Observable<OlympicResultsById[]> {
    return this.olympics$.asObservable().pipe(
      map((olympics: Olympic[]) =>
        olympics.filter(
          (filteredOlympic: Olympic) => filteredOlympic.country === countryId
        )
      ),
      map((olympic: Olympic[]) =>
        olympic.map((getParticipations) => ({
          country: getParticipations.country,
          totalEntries: getParticipations.participations.reduce(
            (acc, _) => (acc += 1),
            0
          ),
          totalAthlete: getParticipations.participations.reduce(
            (acc, { athleteCount }) => (acc += athleteCount),
            0
          ),
          totalMedals: getParticipations.participations.reduce(
            (acc, { medalsCount }) => (acc += medalsCount),
            0
          ),
        }))
      ),
      map((resultById: OlympicResultsById[]) => resultById)
    );
  }

  /**
   * This function is an observable of type LineChart[] that return the data relating to the proper functioning of the LineChart, and ensures that the country is contained in the data called
   * @param countryId - The country id which is its name (ex: Germany)
   * @returns An array of objects of type LineChart[] that contain "name" for the name of the country, "series" which is also an array of objects containing, "name" for the year of participations and "value" for the number of medals, for the country sorted by id present in our table of objects
   *
   * @public
   */
  getOlympicLineData(countryId: string): Observable<LineChart[]> {
    return this.olympics$.asObservable().pipe(
      map((olympics: Olympic[]) =>
        olympics.filter(
          (filteredOlympic: Olympic) => filteredOlympic.country === countryId
        )
      ),
      map((olympic: Olympic[]) =>
        olympic.map((olympic) => ({
          name: olympic.country,
          series: olympic.participations.map((seriesData: Participation) => ({
            name: seriesData.year.toString(),
            value: seriesData.medalsCount,
          })),
        }))
      ),
      map((resultById: LineChart[]) => resultById),
      tap((result: LineChart[]) =>
        result.length === 1 ? null : this.router.navigate(['/'])
      )
    );
  }
}
