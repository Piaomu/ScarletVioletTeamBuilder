import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pokeball',
  templateUrl: './pokeball.component.html',
  styleUrls: ['./pokeball.component.css'],
})
export class PokeballComponent implements OnInit {
  constructor() {}
  @Input() imageUrl!: string | undefined;

  ngOnInit(): void {}
}
