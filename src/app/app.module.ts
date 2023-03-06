import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './pokemon/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon/pokemon-detail.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TeamBuilderComponent } from './pokemon/team-builder.component';
import { PokeballComponent } from './shared/pokeball.component';
import { MainClient } from 'pokenode-ts';
import { PokemonDetailPlaceholderComponent } from './placeholders/pokemon-detail-placeholder.component';
import { MobileTableComponent } from './shared/mobile-table.component';
import { MoveDetailComponent } from './moves/move-detail.component';
import { CollectionComponent } from './tcg/collection.component';
import { IsItExpandedLegalComponent } from './tcg/is-it-expanded-legal.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonDetailComponent,
    TeamBuilderComponent,
    PokeballComponent,
    PokemonDetailPlaceholderComponent,
    MobileTableComponent,
    MoveDetailComponent,
    CollectionComponent,
    IsItExpandedLegalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'pokemon', component: PokemonListComponent },
      { path: 'pokemon/:name', component: PokemonDetailComponent },
      { path: 'team-builder', component: TeamBuilderComponent },
      { path: 'tcg', component: CollectionComponent },
      { path: 'expanded-legal', component: IsItExpandedLegalComponent },
      { path: 'moves/:name', component: MoveDetailComponent },
      { path: '', redirectTo: 'pokemon', pathMatch: 'full' },
    ]),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
