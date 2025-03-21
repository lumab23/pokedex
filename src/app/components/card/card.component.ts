import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() id = 0;
  @Input() name = "";
  @Input() sprite = "";
  @Input() hp = 0;
  @Input() type = '';
  @Input() abilities: string[] = [];
  @Input() moves: string[] = [];

}
