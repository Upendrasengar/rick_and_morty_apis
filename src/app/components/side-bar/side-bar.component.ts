import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.sass']
})
export class SideBarComponent implements OnInit {

  filterForm: FormGroup;
  public filterList = [
    {
      type: 'Species',
      list: [
        {
          name: 'Human',
          id: 0
        },
        {
          name: 'Mythology',
          id: 1
        },
        {
          name: 'Alien',
          id: 2
        },
        {
          name: 'Other Species',
          id: 3
        }
      ]
    },
    {
      type: 'Gender',
      list: [
        {
          name: 'Male',
          id: 0
        },
        {
          name: 'Female',
          id: 1
        },
        {
          name: 'unknown',
          id: 2
        }
      ]
    },
    {
      type: 'Origin',
      list: [
        {
          name: 'Earth (C-137)',
          id: 0
        },
        {
          name: 'Earth (Replacement Dimension)',
          id: 1
        },
        {
          name: 'unknown',
          id: 2
        },
        {
          name: 'Abadango',
          id: 3
        }
      ]
    }];
  constructor(
    private appService: AppService
  ) { }

  ngOnInit(): void {
    let grp: any = {};
    this.filterList.forEach(e => {
      grp[e.type] = new FormArray(e.list.map(el => new FormControl()));
    });
    this.filterForm = new FormGroup(
      grp
    );

    this.filterForm.valueChanges.subscribe((e) => {
      var keys = Object.keys(e);
      let selected = {};
      keys.map(key => {
        e[key].forEach((val, index) => {
          if (val) {
            let data = this.filterList.find(e => {
              return e.type == key;
            });
            !selected[key] ? selected[key] = [] : '';
            selected[key].push(data.list[index]);
          }
        });
      });
      console.log(selected);
      this.appService.updateFilters(selected);
    });

    this.appService.clearFilter$.subscribe(filterInfo => {
      const formArray: any = this.filterForm.controls[filterInfo.type];
      formArray.controls[filterInfo.id].setValue(false);
    });

  }
}
