import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerComponent } from './container.component';
import { AppService } from 'src/app/services/app.service';
import { HttpClientModule } from '@angular/common/http';
import { ArrayFilterPipe } from 'src/app/pipes/array-filter.pipe';

describe('ContainerComponent', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;
  let componentService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerComponent, ArrayFilterPipe],
      providers: [
        AppService
      ],
      imports: [
        HttpClientModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, "listenFilterChange").and.callThrough();
    componentService = fixture.debugElement.injector.get(AppService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
    componentService.updateSorting("asc");
    componentService.updateActiveFilters([
      {
        "name": "Human",
        "id": 0,
        "type": "Species"
      }
    ]);
    component.ngOnInit();
  });
});
