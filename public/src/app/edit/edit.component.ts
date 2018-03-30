import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
    restaurants =[];
    id = '';
    errors= [];
    changingRestaurant: any;

  constructor(
      private _httpService: HttpService,
      private _route: ActivatedRoute,
      private _router: Router
  ) { }

  ngOnInit() {
      this.changingRestaurant = {name: '', cuisine: ''};
      this._route.params.subscribe((params: Params) => this.id = params['id']);
      this.getRestaurantById(this.id);
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
  getRestaurantById(id){
      let obs = this._httpService.getRestaurantById(id);
      obs.subscribe(data => {
          console.log(data);
          this.changingRestaurant = data;
      })
  }
  editRestaurant(id){
      let obs =this._httpService.editRestaurant(id, this.changingRestaurant);
      obs.subscribe(result => {
          if(result['message'] ==='error'){
              this.errors = result['errors']
              console.log(result['errors']);
          }
          else{
              result['message'] === 'success'
              this.changingRestaurant = {name: '', cuisine: ''};
              this.goHome();
              console.log("Updated")
          }
      })

      this.getRestaurants();
  }

}
