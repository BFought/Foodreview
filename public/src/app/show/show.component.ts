import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
    restaurants =[];
    id = '';
    restaurant: any;
    reviews =[];
  constructor(
      private _httpService: HttpService,
      private _route: ActivatedRoute,
      private _router: Router
  ) { }

  ngOnInit() {
      this._route.params.subscribe((params: Params) => this.id = params['id']);
      this.getRestaurantById(this.id)
      this.restaurant = this.id;
  }
  getRestaurants(){
      console.log('getting restaurants')
      let obs = this._httpService.getRestaurants();
      obs.subscribe(data => {
          console.log("Got our restaurant!", data)
          this.restaurants = data['restaurants'];
      });
  }
  getRestaurantById(id){
      console.log('getting restaurant')
      let obs = this._httpService.getRestaurantById(id);
      obs.subscribe(data => {
          console.log('Got our restaurant!', data)
          this.restaurant = data;
      })
  }

}
