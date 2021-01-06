import { Component, OnInit } from '@angular/core';
import { LeaderService } from 'src/app/services/leader.service';
import { Leader } from '../../shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public leaders!: Leader[];

  constructor(
    private leaderService: LeaderService,
  ) { }

  ngOnInit(): void {
    this.leaderService.getLeaders()
      .subscribe( (result) => {
        this.leaders = result;
      });
  }

}
