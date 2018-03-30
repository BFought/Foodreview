import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-newreview',
  templateUrl: './newreview.component.html',
  styleUrls: ['./newreview.component.css']
})
export class NewreviewComponent implements OnInit {
    id = '';
    errors = [];
    newReview: any;
    restaurants =[];
    restaurant: any;
  constructor(
      private _httpService: HttpService,
      private _route: ActivatedRoute,
      private _router: Router
  ) { }

  ngOnInit() {
      this.newReview = { name:'', star: Number, review: ''};
      this._route.params.subscribe((params: Params) => this.id = params['id']);
      this.getRestaurantById(this.id);
      this.restaurant = this.id;
  }
  onKey(event:any){
      this.id = event.target.value;
  }
  goHome() {
      this._router.navigate(['../reviews', this.id]);
  }
  getRestaurantById(id){
      let obs = this._httpService.getRestaurantById(id);
      obs.subscribe(data => {
          this.restaurant = data;
      })
  }
  createReview(_id){
      let obs = this._httpService.createReview(_id, this.newReview);
      obs.subscribe(result => {
          console.log(result);
          if(result['message'] ==='error'){
              this.errors = result['errors']
              console.log(this.errors);
          }
          else{
              result['message'] === 'success'
              this.newReview = {name:'', star: Number, review: ''};
              this.goHome();
          }
      })
  }

}
