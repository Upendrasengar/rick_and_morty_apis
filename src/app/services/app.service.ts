import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private globalFilters: BehaviorSubject<any> = new BehaviorSubject<any>({});
  globalFilters$: Observable<any> = this.globalFilters.asObservable();

  private clearFilter: Subject<any> = new Subject<any>();
  clearFilter$: Observable<any> = this.clearFilter.asObservable();

  private activeFilters: Subject<any> = new Subject<any>();
  activeFilters$: Observable<any> = this.activeFilters.asObservable();

  private sortBy: Subject<any> = new Subject<any>();
  sortBy$: Observable<any> = this.sortBy.asObservable();

  constructor(
    private http: HttpClient
  ) { }
  updateFilters(filters) {
    this.globalFilters.next(filters);
  }
  removeFilter(filter) {
    this.clearFilter.next(filter);
  }
  getCharacters() {
    return this.http.get("https://rickandmortyapi.com/api/character/").pipe(map(res => {
      return res;
    }));
  }
  updateActiveFilters(filters) {
    this.activeFilters.next(filters);
  }
  updateSorting(order) {
    this.sortBy.next(order);
  }
}
