import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
    
      ],
      imports:[
        HttpClientModule
      ]
    });
    service = TestBed.inject(AppService);
    spyOn(service,"updateFilters").and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('updateFilters', () => {
    service.updateFilters({});
  });

  it('removeFilter', () => {
    service.removeFilter({});
  });

  it('getCharacters', () => {
    service.getCharacters();
  });

  it('updateActiveFilters', () => {
    service.updateActiveFilters({});
  });

  it('updateSorting', () => {
    service.updateSorting({});
  });

});
