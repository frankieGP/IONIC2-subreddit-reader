import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RedditService } from '../../app/services/reddit.service';
import {DetailsPage} from '../details/details';
/*
  Generated class for the Reddit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'reddit',
  templateUrl: 'reddit.html'
})
export class RedditPage {
  items: any;
  category: any;
  limit: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private redditService:RedditService) {
    this.getDefaults();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RedditPage');
  }
  ngOnInit(){
    this.getPosts(this.category, this.limit);
  }

  getDefaults(){
    if(localStorage.getItem('category') != null){
      this.category = localStorage.getItem('category');
    } else {
      this.category ="sports";
    }

    if(localStorage.getItem('limit') != null){
      this.limit = localStorage.getItem('limit');
    } else {
      this.limit = 10;
    }

  }

  getPosts(category, limit){
    this.redditService.getPosts(category, limit).subscribe(response => {
      this.items = response.data.children;
    });
  }

  viewItem(item){
    this.navCtrl.push(DetailsPage, {
      item:item
    });
  }
  changeCategory(){
    this.getPosts(this.category, this.limit);
  }
}
