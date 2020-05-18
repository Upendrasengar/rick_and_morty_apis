import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.sass']
})
export class FiltersComponent implements OnInit {

  activeFilters = [];
  isSearchActive = null;
  searchForm: FormGroup;
  @ViewChild("searchBtn", { read: ElementRef }) searchBtn: ElementRef;
  constructor(
    private appService: AppService,
    private fm: FormBuilder
  ) {
    this.searchForm = fm.group(
      {
        search: new FormControl(''),
        orderBy: new FormControl('desc')
      }
    )
  }

  ngOnInit(): void {
    this.appService.globalFilters$.subscribe(filterList => {
      const keys = Object.keys(filterList);
      this.activeFilters = [];
      if (keys.length) {
        keys.forEach(key => this.activeFilters.push.apply(this.activeFilters, filterList[key].map(e => {
          e.type = key;
          return e;
        })));
        console.log(this.activeFilters);
      }
      this.searchByName();
    });

    this.searchForm.controls.search.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(value => {
      if (!this.searchBtn.nativeElement.offsetParent) {
        if (!value) {
          const index: any = this.activeFilters.findIndex(e =>
            e.type === "search");
          if (~index) {
            this.activeFilters.splice(index, 1);
          }
        } else {
          this.searchByName(value);
        }
      }
    });

    this.searchForm.controls.orderBy.valueChanges.subscribe(e => {
      this.appService.updateSorting(e);
    });

  }
  removeFilter(filterInfo, index) {
    if (filterInfo.type == "search") {
      this.activeFilters.splice(index, 1);
      this.isSearchActive = null;
      this.appService.updateActiveFilters(this.activeFilters);
      this.searchForm.controls.search.setValue('');
    } else {
      this.appService.removeFilter(filterInfo);
    }
  }

  searchByName(value?) {
    this.isSearchActive = value || this.isSearchActive;
    if (this.isSearchActive && this.isSearchActive.trim().length) {
      const filterExistIndex: any = this.activeFilters.findIndex(e =>
        e.type === "search");
      if (~filterExistIndex) {
        this.activeFilters[filterExistIndex].name = this.isSearchActive;
      } else {
        this.activeFilters.push({
          type: "search",
          name: this.isSearchActive
        });
      }
    }
    if (this.searchBtn && this.searchBtn.nativeElement.offsetParent) {
      this.searchForm.controls.search.setValue('');
    }
    this.appService.updateActiveFilters(this.activeFilters);
  }

}
