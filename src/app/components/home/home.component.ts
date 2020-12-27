import { Component, OnInit } from '@angular/core';
import { DishService } from '../../services/dish.service';
import { PromotionService } from '../../services/promotion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public dish: any;
  public promotion: any;

  constructor(
    private dishService: DishService,
    private promotionService: PromotionService
  ) { }

  ngOnInit(): void {
    this.dish = this.dishService.getFeaturedDish();
    this.promotion = this.promotionService.getFeaturedPromotion();
  }

}
