import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SearchComponent } from '../../components/search/search.component';
import { ListComponent } from '../../components/list/list.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, SearchComponent, ListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
