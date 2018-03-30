import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) {}

    getRestaurants(){
        return this._http.get('/restaurants');
    }
    getRestaurantById(id){
        return this._http.get(`/restaurants/${id}`);
    }
    createRestaurant(newRestaurant){
        return this._http.post('/restaurants', newRestaurant);
    }
    editRestaurant(id, restaurant){
        console.log(arguments)
        return this._http.put(`/restaurants/${id}`, restaurant);
    }
    deleteRestaurant(id) {
        return this._http.delete(`/restaurants/${id}`);
    }
    createReview(id,newReview){
        console.log(id + 'in service');
        return this._http.post(`/restaurants/comments/${id}`, newReview)
    }

}
