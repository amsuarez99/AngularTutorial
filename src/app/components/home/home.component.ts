import { Component, OnInit } from '@angular/core';
import { DishService } from '../../services/dish.service';
import { PromotionService } from '../../services/promotion.service';
import { LeaderService } from '../../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public dish: any;
  public promotion: any;
  public leader: any;

  constructor(
    private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
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
