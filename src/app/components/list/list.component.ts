import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  private http = inject(HttpClient);

  pokemons: any[] = [];
  currentPage = 1;
  perPage = 20;
  totalPokemons = 0;
  searchQuery = "";
  isSearching = false;

  ngOnInit() {
    this.fetchPokemons();
  }

  fetchPokemons() {

    if (this.isSearching) return;

    const offset = (this.currentPage - 1) * this.perPage;
    this.http.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${this.perPage}`)
      .subscribe((response: any) => {
        this.pokemons = response.results.map((pokemon: any) => ({
          name: pokemon.name,
          url: pokemon.url,
          sprite: "",
          hp: 0,
          type: "",
          abilities: [],
          moves: []
        }));

        console.log("lista de pokemons: ", this.pokemons);

        this.totalPokemons = response.count;

        this.pokemons.forEach((pokemon, index) => {
          this.http.get(pokemon.url).subscribe((details: any) => {
            this.pokemons[index].id = details.id;
            this.pokemons[index].sprite = details.sprites.front_default;
            this.pokemons[index].hp = details.stats[0].base_stat;
            this.pokemons[index].type = details.types.map((t: any) => t.type.name);
            this.pokemons[index].abilities = details.abilities.map(
              (ability: any) => ability.ability.name
            );
            this.pokemons[index].moves = details.moves
              .slice(0, 5)  
              .map((move: any) => move.move.name);
          });
        });
      });
  }

  

  nextPage() {
    if (this.currentPage * this.perPage < this.totalPokemons) {
      this.currentPage++;
      this.fetchPokemons();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchPokemons();
    }
  }


}
