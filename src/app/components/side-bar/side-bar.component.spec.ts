import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarComponent } from './side-bar.component';
import { AppService } from 'src/app/services/app.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('SideBarComponent', () => {
  let component: SideBarComponent;
  let fixture: ComponentFixture<SideBarComponent>;
  let componentService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SideBarComponent],
      providers: [
        AppService,
        HttpClient
      ],
      imports: [
        HttpClientModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    componentService = fixture.debugElement.injector.get(AppService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.filterForm.setValue({
      "Species": [
        true,
        false,
        null,
        null
      ],
      "Gender": [
        null,
        null,
        null
      ],
      "Origin": [
        null,
        null,
        null,
        null
      ]
    });
    componentService.removeFilter({ type: "search" });
  });
});
