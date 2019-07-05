import { Component, OnInit,Inject } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {Router} from '@angular/router';

import {map, startWith} from 'rxjs/operators';
import {neutraints} from '../models/GymModel';
import {GYMService} from '../services/heroes.service';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
export interface State {
  flag: string;
  name: string;
  population: string;
}

@Component({
  selector: 'dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  stateCtrl = new FormControl();
  title = 'Dashboard';
  commonfoods:any[];
  userData:any;
  userFoodData:any[];
  userStats:any;
  mealTypeStat:any;
  brandedfoods:any[];
  isLoading = false;
  errorMsg: string;
  meal:any[];
  allReport:any;
  allStat:any[];
  selectedDateIndex=0;
  selectedCurrentDate="Today";
  selectedDate:[{"Day":"Today","Selected":true},{"Day":"Yesterday","Selected":false},{"Day":"2 Days ago","Selected":false}]
  query:any;
  constructor(private router:Router,private gymservice:GYMService,public dialog: MatDialog) {
    let model = {
      "query": "1 cup chicken noodle soup"
    }
    this.userData = JSON.parse(localStorage.getItem("userData")).user;
    let meals = [{ label: null, type: null }, { label: 'breakfast', type: 1 }, { label: 'AM Snack', type: 2}, { label: 'lunch', type: 3 }, { label: 'PM Snack', type: 4 }, { label: 'dinner', type: 5 }, { label: 'Late Snack', type: 6 }];
    this.mealTypeStat = {};
    let logQuery = "?begin=" + moment().subtract(2, "days").format('YYYY-MM-DD') +"+00:00:00&end=" + moment().format('YYYY-MM-DD') +"+23:59:59&timezone=" + this.userData.timezone;
    this.query = logQuery;
    this.meal = meals;
    for(let m=0;m<meals.length;m++){
      let keyProd = meals[m]['label'];
      if(keyProd && keyProd.indexOf("Snack") != -1){
        keyProd = "Snack";
      }
      if(!this.mealTypeStat[keyProd]){
        this.mealTypeStat[keyProd] = 0;
      }
    }
    this.gymservice.get("log" + logQuery).subscribe((res: any) => {
      if(res){
        this.userFoodData = [];
        this.allStat = res.foods;
        for(let i=0;i<this.allStat.length;i++){
             if(this.allStat[i]['consumed_at'].indexOf(moment().format('YYYY-MM-DD')) != -1){
              this.userFoodData.push(this.allStat[i]);
             }
        }
        for(let i=0;i<this.userFoodData.length;i++){
          for(let j=0;j<meals.length;j++){
            if(this.userFoodData[i]['meal_type'] == meals[j]['type']){
              let keyProd = meals[j]['label'];
              if(keyProd && keyProd.indexOf("Snack") != -1){
                keyProd = "Snack";
              }
              if(!this.mealTypeStat[keyProd]){
                this.mealTypeStat[keyProd] = 0;
              }
              this.mealTypeStat[keyProd] += this.userFoodData[i]['nf_calories'];
              this.userFoodData[i]['mealLabel'] = meals[j]['label'];
            }
          }
        }
        
      }
      this.errorMsg = "";
    });
    this.userStats={};
    this.gymservice.get("reports/totals" + logQuery).subscribe((res: any) => {
      if(res){
        
        if(res.dates[0]){
          this.allReport = res.dates;
          this.userStats = res.dates[0];
        }
        if(!this.userStats){
          this.userStats={};
        }
      }
      this.errorMsg = "";
    });
    
  
     this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        tap(() => {
          this.errorMsg = "";
          this.commonfoods = [];
          this.brandedfoods = [];
          this.isLoading = true;
        }),
        switchMap(value => this._filterNeutrients(value)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((res: any) => {
        if(res){
          if(res.common){
            this.commonfoods = res.common;
          }
         
          if(res.branded){
            this.brandedfoods = res.branded;
          }
          
        }
        this.errorMsg = "";
      }
      );
  }
  private _filterNeutrients(value: string):Observable<any> {
    if(!value){
      value = "";
    }
    const filterValue = value.toLowerCase();
    return this.gymservice.getSingle("search/instant?query=" + filterValue);
  }

  goLeft(left):void{
    if(left){
      if(this.selectedDateIndex != -2){
        --this.selectedDateIndex;
      }
    }else{
      if(this.selectedDateIndex != 0){
        ++this.selectedDateIndex;
      }
    }
    let subtractValue = 0;
    if(this.selectedDateIndex == 0){
      this.selectedCurrentDate="Today";
    }else if(this.selectedDateIndex == -2){
      subtractValue = 2;
      this.selectedCurrentDate="2 days ago";
    }else{
      subtractValue = 1;
      this.selectedCurrentDate="Yesterday";
    }
    let sub:moment.unitOfTime.DurationConstructor = "days";
    var dateString = moment().subtract(sub,subtractValue).format('YYYY-MM-DD');
    this.userFoodData = [];
    for(let m=0;m<this.meal.length;m++){
      let keyProd = this.meal[m]['label'];
      if(keyProd && keyProd.indexOf("Snack") != -1){
        keyProd = "Snack";
      }
      this.mealTypeStat[keyProd] = 0;
    }
    for(let i=0;i<this.allStat.length;i++){
      if(this.allStat[i]['consumed_at'].indexOf(dateString) != -1){
       this.userFoodData.push(this.allStat[i]);
      }
 }
    for(let i=0;i<this.userFoodData.length;i++){
      for(let j=0;j<this.meal.length;j++){
        if(this.userFoodData[i]['meal_type'] == this.meal[j]['type']){
          let keyProd = this.meal[j]['label'];
          if(keyProd && keyProd.indexOf("Snack") != -1){
            keyProd = "Snack";
          }
          if(!this.mealTypeStat[keyProd]){
            this.mealTypeStat[keyProd] = 0;
          }
          this.mealTypeStat[keyProd] += this.userFoodData[i]['nf_calories'];
          this.userFoodData[i]['mealLabel'] = this.meal[j]['label'];
        }
      }
    }
    this.userStats = this.allReport[subtractValue];
    if(!this.userStats){
      this.userStats = {};
    }
  }

  logout():void{
    this.router.navigate(['/auth']);
  }

  openDialog(state:any): void {
    let postObj = {
      "query": state.food_name
    }
    this.gymservice.add(postObj,"natural/nutrients").subscribe((res: any) => {
      if(res){
        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
          width: '250px',
          data: res
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          console.log(result);
          this.gymservice.add(result,"log").subscribe((res: any) => {
            if(res){
              this.gymservice.get("log" + this.query).subscribe((res: any) => {
                if(res){
                  this.userFoodData = [];
                  this.allStat = res.foods;
                  for(let m=0;m<this.meal.length;m++){
                    let keyProd = this.meal[m]['label'];
                    if(keyProd && keyProd.indexOf("Snack") != -1){
                      keyProd = "Snack";
                    }
                    this.mealTypeStat[keyProd] = 0;
                  }
                  for(let i=0;i<this.allStat.length;i++){
                      if(this.allStat[i]['consumed_at'].indexOf(moment().format('YYYY-MM-DD')) != -1){
                        this.userFoodData.push(this.allStat[i]);
                      }
                  }
                  for(let i=0;i<this.userFoodData.length;i++){
                    for(let j=0;j<this.meal.length;j++){
                      let keyProd = this.meal[j]['label'];
                      if(keyProd && keyProd.indexOf("Snack") != -1){
                        keyProd = "Snack";
                      }
                      if(!this.mealTypeStat[keyProd]){
                        this.mealTypeStat[keyProd] = 0;
                      }
                      this.mealTypeStat[keyProd] += this.userFoodData[i]['nf_calories'];
                      this.userFoodData[i]['mealLabel'] = this.meal[j]['label'];
                    }
                  }
                }
              });
          
              this.gymservice.get("reports/totals" + this.query).subscribe((res: any) => {
                if(res){
                  if(res.dates[0]){
                    this.allReport = res.dates;
                    this.userStats = res.dates[res.dates.length -1];
                  }
                  if(!this.userStats){
                    this.userStats={};
                  }
                }
                this.errorMsg = "";
              });
            }
            
        });
      });
    };
    
    
  })
}
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  meals = [{ label: null, type: null }, { label: 'breakfast', type: 1 }, { label: 'AM Snack', type: 2}, { label: 'lunch', type: 3 }, { label: 'PM Snack', type: 4 }, { label: 'dinner', type: 5 }, { label: 'Late Snack', type: 6 }];
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
