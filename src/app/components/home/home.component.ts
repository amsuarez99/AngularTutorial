import { Component, OnInit, Inject } from '@angular/core';
import { DishService } from '../../services/dish.service';
import { PromotionService } from '../../services/promotion.service';
import { LeaderService } from '../../services/leader.service';
import { Leader } from '../../shared/leader';
import { Promotion } from '../../shared/promotion';
import { Dish } from '../../shared/dish';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public dish!: Dish;
  public promotion!: Promotion;
  public leader!: Leader;

  constructor(
    private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('baseURL') public baseURL: string,
  ) { }

  ngOnInit(): void {
    this.dishService.getFeaturedDish()
      .subscribe( (result) => {
        this.dish = result;
      } );
    this.promotionService.getFeaturedPromotion()
      .subscribe( (result) => {
        this.promotion = result;
      } );
    this.leaderService.getFeaturedLeader()
      .subscribe( (result) => {
        this.leader = result;
      } );
  }

}
