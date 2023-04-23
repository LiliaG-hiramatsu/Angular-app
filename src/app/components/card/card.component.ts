import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/interfaces/card.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() card!: Card; // el signo ! le asegura que va a llegar el dato
  
  constructor(private router: Router) {}
  
  ngOnInit(): void {
  }

  goToCard() {
    this.router.navigate([`./card/${this.card.id}`]);
  }
}
