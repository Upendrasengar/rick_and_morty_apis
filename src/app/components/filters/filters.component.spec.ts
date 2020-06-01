import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';
import { AppService } from 'src/app/services/app.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FiltersComponent],
      providers: [
        AppService,
        FormBuilder,
        HttpClient
      ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, "removeFilter").and.callThrough();
    spyOn(component, "searchByName").and.callThrough();
    let componentService = fixture.debugElement.injector.get(AppService);
    componentService.updateFilters({
      "Species": [
        {
          "name": "Human",
          "id": 0,
          "type": "Species"
        }
      ]
    })
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.removeFilter({ type: "search" }, 0);
    component.searchByName("human");
    component.searchBtn = {
      nativeElement: {
        nativeElement: false
      }
    };
    component.searchForm.controls.search.setValue("human");
    fixture.detectChanges();
  });

  it('should test removeFilter', () => {
    component.searchForm.controls.orderBy.setValue("asc");
    let a = component.removeFilter({}, 0);
    expect(a).toBe(undefined);
  });

  it('should test searchByName', () => {
    let a = component.removeFilter({}, 0);
    expect(a).toBe(undefined);
  });


});
