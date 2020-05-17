import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.sass']
})
export class ContainerComponent implements OnInit {

  character = [];
  filters = [];
  constructor(
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.appService.getCharacters().subscribe((e: any) => {
      this.character = e.results;
    });
    this.listenFilterChange();
  }
  listenFilterChange() {
    this.appService.activeFilters$.subscribe(filter => {
      this.filters = filter;
    });

    this.appService.sortBy$.subscribe(e => {
      this.character = this.character.sort((a, b) => {
        return e === "asc" ? b.id - a.id : a.id - b.id;
      });
    });
  }
}
