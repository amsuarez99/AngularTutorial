import { Component, OnInit, Inject } from '@angular/core';
import { DishService } from '../../services/dish.service';
import { PromotionService } from '../../services/promotion.service';
import { LeaderService } from '../../services/leader.service';
import { Leader } from '../../shared/leader';
import { Promotion } from '../../shared/promotion';
import { Dish } from '../../shared/dish';
import { flyInOut, expand } from '../../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand(),
  ]
})
export class HomeComponent implements OnInit {

  public dish!: Dish;
  public promotion!: Promotion;
  public leader!: Leader;
  public dishErrMess!: string;
  public leaderErrMess!: string;
  public promotionErrMess!: string;

  constructor(
    private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('baseURL') public baseURL: string,
  ) { }

  ngOnInit(): void {
    this.dishService.getFeaturedDish()
    .subscribe( 
               result => this.dish = result,
               errMess => this.dishErrMess = <any>errMess,
    );
    this.promotionService.getFeaturedPromotion()
    .subscribe( 
               result => this.promotion = result,
               errMess => this.promotionErrMess = <any>errMess,
    );
    this.leaderService.getFeaturedLeader()
    .subscribe( 
              result => this.leader = result,
              errMess => this.leaderErrMess = <any>errMess,
    );
  }

}
