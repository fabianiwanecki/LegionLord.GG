import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {PlayerService} from "../services/player.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PlayerNotFoundSnackComponent} from "../player-not-found-snack/player-not-found-snack.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  formSearchPlayer = this.fb.group({
    playerName: [],
  })
  loading: boolean = false;
  notFound: boolean = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private _snackBar: MatSnackBar,
              private playerService: PlayerService) {
  }

  ngOnInit(): void {
  }


  submit() {
    if (this.formSearchPlayer.controls['playerName'].value) {
      this.loading = true;
      this.playerService.searchPlayerByName(this.formSearchPlayer.controls['playerName'].value).subscribe({
        next: (player: any) => {
          this.router.navigate(['/player', player['_id']]);
          this.loading = false;
          this.notFound = false;
        },
        error: () => {
          this.loading = false
          this.notFound = true;
          this.openSnackBar();
        },
      });
    }
  }

  onKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.submit();
    }
  }

  openSnackBar() {
    this._snackBar.openFromComponent(PlayerNotFoundSnackComponent, {
      duration: 2000,
      horizontalPosition: "end",
      verticalPosition: "top"
    });
  }
}
