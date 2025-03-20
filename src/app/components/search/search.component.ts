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
  hp = 0;
  type = "";
  abilities: string[] = [];
  moves: string[] = [];
  errorMessage = "";

  searchForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  onSubmit() {
    const name = this.searchForm.value.name?.toLowerCase();

    if (name) {
      this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`).subscribe({
        next: (result: any) => {
          this.showCard = true;
          this.errorMessage = "";

          this.pokemonName = result.name;
          this.sprite = result.sprites.front_default;
          this.hp = result.stats[0].base_stat;
          this.type = result.types[0].type.name;

          this.abilities = result.abilities.map(
            (ability: any) => ability.ability.name
          );

          this.moves = result.moves
            .slice(0, 5)
            .map((move: any) => move.move.name);
        },
        error: (err) => {
          this.showCard = false;
          this.errorMessage = "Pokemon não foi encontrado!";
          console.log("Error fetching Pokémon: ", err)
        }
      });
    }
  }

}


