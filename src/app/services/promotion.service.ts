import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }
  
  public getPromotions(): Promise<Promotion[]> {
    return Promise.resolve(PROMOTIONS);
  }

  public getPromotion(id: String): Promise<Promotion> {
    return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.id === id)[0]);
  }
  
  public getFeaturedPromotion(): Promise<Promotion> {
    return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
  }

}
