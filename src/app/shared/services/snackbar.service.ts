import {Injectable} from '@angular/core';
import {PlayerNotFoundSnackComponent} from "../player-not-found-snack/player-not-found-snack.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) {
  }


  openSnackBarPlayerNotFound() {
    this._snackBar.openFromComponent(PlayerNotFoundSnackComponent, {
      duration: 2000,
      horizontalPosition: "end",
      verticalPosition: "top"
    });
  }
}
