import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { CardComponent } from '../card/card.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, CardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  private http = inject(HttpClient);

  showCard = false;
  pokemonName = "";
  sprite = "";

  searchForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  onSubmit() {
    this.showCard = true; // show the pokemon card when the form is submitted
    const name = this.searchForm.value.name;
    console.log(name);
    this.http
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .subscribe((result: any) => {
        console.log(result);
        this.pokemonName = result.name;
        this.sprite = result.sprites.front_default;
      })
  }

}
