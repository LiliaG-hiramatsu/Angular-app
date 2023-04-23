import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Card } from 'src/app/interfaces/card.interface';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  cards: Card[] = [];
  offset = 0;

  cardTextFC = new FormControl('');

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.cardTextFC.valueChanges.pipe(
      debounceTime(1000) // emite la info despues de 1 segundo.
    )
    .subscribe( res => { // valueChanges es un observable por eso me puedo subscribir
      //console.log(res);
      this.cards = []; // vacio el array de cards para que no se sumen a la nueva busqueda
      this.searchCards(res);
    });
    this.searchCards();
  }

  onScroll() {
    //console.log("scrolled!!");
    this.offset += 100;
    this.searchCards();
  }

  searchCards(cardName: string | null = null) {
    this.cardService.getCards(cardName, this.offset).subscribe((res) => {
      //console.log(res);
      this.cards = [...this.cards, ...res]; // ... sprit operator: hace un merge entre los que ya tenia la card mas lo que trae la respuesta.
    });
  }
}
