import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PlayerComponent } from './pages/player/player.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatTabsModule} from "@angular/material/tabs";
import { MatchHistoryEntryComponent } from './pages/player/player-match-history/match-history-entry/match-history-entry.component';
import {TimeagoModule} from "ngx-timeago";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTableModule} from "@angular/material/table";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { ChartComponent } from './shared/components/charts/chart/chart.component';
import { GameBuildComponent } from './shared/components/charts/game-build/game-build.component';
import { GridComponent } from './shared/components/charts/game-build/grid/grid.component';
import {MatChipsModule} from "@angular/material/chips";
import { LegalDisclosureComponent } from './pages/legal-disclosure/legal-disclosure.component';
import { BarComponent } from './shared/components/charts/bar/bar.component';
import {MatMenuModule} from "@angular/material/menu";
import { PlayerNotFoundSnackComponent } from './shared/player-not-found-snack/player-not-found-snack.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { PlayerOverviewComponent } from './pages/player/player-overview/player-overview.component';
import { PlayerGametypeStatsComponent } from './pages/player/player-gametype-stats/player-gametype-stats.component';
import { PlayerStatisticsComponent } from './pages/player/player-statistics/player-statistics.component';
import { PlayerMatchHistoryComponent } from './pages/player/player-match-history/player-match-history.component';
import { MatchHistorySummaryComponent } from './pages/player/player-match-history/match-history-entry/match-history-summary/match-history-summary.component';
import { MatchDetailsComponent } from './pages/player/player-match-history/match-history-entry/match-details/match-details.component';
import { MatchBuildsComponent } from './pages/player/player-match-history/match-history-entry/match-builds/match-builds.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { StatisticsFilterComponent } from './pages/statistics/statistics-filter/statistics-filter.component';
import { StatisticsUnitsComponent } from './pages/statistics/statistics-units/statistics-units.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { ProgressBarComponent } from './shared/components/charts/progress-bar/progress-bar.component';
import { StatisticsOpeningComponent } from './pages/statistics/statistics-opening/statistics-opening.component';
import { StatisticsLegionsComponent } from './pages/statistics/statistics-legions/statistics-legions.component';
import { StatisticsLegionSpellsComponent } from './pages/statistics/statistics-legion-spells/statistics-legion-spells.component';
import {MatSortModule} from "@angular/material/sort";
import { StatisticsWavesComponent } from './pages/statistics/statistics-waves/statistics-waves.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PlayerComponent,
    MatchHistoryEntryComponent,
    ChartComponent,
    GameBuildComponent,
    GridComponent,
    LegalDisclosureComponent,
    BarComponent,
    PlayerNotFoundSnackComponent,
    PlayerOverviewComponent,
    PlayerGametypeStatsComponent,
    PlayerStatisticsComponent,
    PlayerMatchHistoryComponent,
    MatchHistorySummaryComponent,
    MatchDetailsComponent,
    MatchBuildsComponent,
    StatisticsComponent,
    StatisticsFilterComponent,
    StatisticsUnitsComponent,
    ProgressBarComponent,
    StatisticsOpeningComponent,
    StatisticsLegionsComponent,
    StatisticsLegionSpellsComponent,
    StatisticsWavesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    MatTabsModule,
    MatDividerModule,
    MatButtonModule,
    MatExpansionModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    TimeagoModule.forRoot(),
    InfiniteScrollModule,
    MatMenuModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatSortModule,
  ],
  providers: [TimeagoModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
