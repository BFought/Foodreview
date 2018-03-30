import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    restaurants =[];
    id = '';
  constructor(
      private _httpService: HttpService,
      private _route: ActivatedRoute,
      private _router: Router
  ) { }

  ngOnInit() {
      this.getRestaurants();
  }
  goHome() {
      this._router.navigate(['']);
  }
  getRestaurants(){
      console.log('getting restaurants')
      let obs = this._httpService.getRestaurants();
      obs.subscribe(data => {
          console.log("Got our restaurants!", data)
          this.restaurants = data['restaurants'];
      });
  }
  deleteRestaurant(id) {
      console.log('deleting restaurant')
      let obs = this._httpService.deleteRestaurant(id);
      obs.subscribe(data => {
          console.log('Restaurant deleted', data)
          this.getRestaurants();
          this.goHome();
      })
  }

}
