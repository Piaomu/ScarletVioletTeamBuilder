import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailPlaceholderComponent } from './pokemon-detail-placeholder.component';

describe('PokemonDetailPlaceholderComponent', () => {
  let component: PokemonDetailPlaceholderComponent;
  let fixture: ComponentFixture<PokemonDetailPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonDetailPlaceholderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonDetailPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
