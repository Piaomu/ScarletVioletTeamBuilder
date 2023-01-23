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

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonDetailComponent,
    TeamBuilderComponent,
    PokeballComponent,
    PokemonDetailPlaceholderComponent,
    MobileTableComponent,
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
      { path: '', redirectTo: 'pokemon', pathMatch: 'full' },
    ]),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
