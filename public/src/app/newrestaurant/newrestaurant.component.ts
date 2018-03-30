import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-newrestaurant',
  templateUrl: './newrestaurant.component.html',
  styleUrls: ['./newrestaurant.component.css']
})
export class NewrestaurantComponent implements OnInit {
    restaurants =[];
    id = '';
    errors = [];
    newRestaurant: any;
  constructor(
      private _httpService: HttpService,
      private _route: ActivatedRoute,
      private _router: Router
  ) { }

  ngOnInit() {
      this.getRestaurants();
      this.newRestaurant = {name:'', cuisine:''};
  }
  onKey(event:any){
      this.id = event.target.value;
  }
  goHome() {
      this._router.navigate(['']);
  }
  getRestaurants(){
      let obs = this._httpService.getRestaurants();
      obs.subscribe(data => {
          this.restaurants = data['restaurants'];
      });
  }
  createRestaurant(){
      let obs = this._httpService.createRestaurant(this.newRestaurant);
      obs.subscribe(result => {
          if(result['message'] ==='error'){
              this.errors = result['errors']
              console.log(result['errors']);
          }
          else{
              result['message'] === 'success'
              this.newRestaurant = {name:'', cuisine: ''};
              this.goHome();
              console.log("Created")
          }
      })
      this.getRestaurants();

  }

}
