import { Component, OnInit, Inject } from '@angular/core';
import { LeaderService } from 'src/app/services/leader.service';
import { Leader } from '../../shared/leader';
import { flyInOut, expand } from '../../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand(),
  ]
})
export class AboutComponent implements OnInit {

  public leaders!: Leader[];

  constructor(
    private leaderService: LeaderService,
    @Inject('baseURL') public baseURL: string,
  ) { }

  ngOnInit(): void {
    this.leaderService.getLeaders()
      .subscribe( (result) => {
        this.leaders = result;
      });
  }

}
