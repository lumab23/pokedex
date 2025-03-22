import { Component, EventEmitter, inject, Output } from '@angular/core';
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

  @Output() cardShown = new EventEmitter<boolean>();
  @Output() searchCleared = new EventEmitter<void>();

  private http = inject(HttpClient);

  showCard = false;
  id = 0;
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

  ngOnInit() {
    this.searchForm.get('name')?.valueChanges.subscribe((value) => {
      if (!value) {
        this.onClear();
      }
    })
  }

  onSubmit() {
    const name = this.searchForm.value.name?.toLowerCase();

    if (name) {
      this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`).subscribe({

        next: (result: any) => {
          this.errorMessage = "";
          
          this.id = result.id;
          this.pokemonName = result.name;
          this.sprite = result.sprites.front_default;
          this.hp = result.stats[0].base_stat;
          this.type = result.types.map((t: any) => t.type.name);
          
          this.abilities = result.abilities.map(
            (ability: any) => ability.ability.name
          );
          
          this.moves = result.moves
          .slice(0, 5)
          .map((move: any) => move.move.name);

          this.showCard = true;
          this.cardShown.emit(true);
        },
        error: (err) => {
          this.showCard = false;
          this.cardShown.emit(false);
          this.errorMessage = "Pokemon não foi encontrado!";
          console.log("Error fetching Pokémon: ", err)
        }
      });
    }
  }

  onClear() {
    this.searchForm.reset();
    this.showCard = false;
    this.cardShown.emit(false);
    this.searchCleared.emit();
  }

}



