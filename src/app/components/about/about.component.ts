import { Component, OnInit } from '@angular/core';
import { LeaderService } from 'src/app/services/leader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public leaders: any;

  constructor(
    private leaderService: LeaderService,
  ) { }

  ngOnInit(): void {
    this.leaderService.getLeaders()
      .then( (result) => {
        this.leaders = result;
      });
  }

}
