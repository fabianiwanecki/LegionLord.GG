import {Component} from '@angular/core';
import {PlayerService} from "../../shared/services/player.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {SnackbarService} from "../../shared/services/snackbar.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  loadingPlayer: boolean = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private snackbarService: SnackbarService,
              private playerService: PlayerService) {
  }


  formSearchPlayer = this.fb.group({
    playerName: [],
  })

  submit() {
    if (this.formSearchPlayer.controls['playerName'].value) {
      this.loadingPlayer = true;
      this.playerService.searchPlayerByName(this.formSearchPlayer.controls['playerName'].value).subscribe({
        next: (player: any) => {
          this.router.navigate(['/player', this.formSearchPlayer.controls['playerName'].value]);
        },
        error: () => {
          this.loadingPlayer = false
          this.snackbarService.openSnackBarPlayerNotFound();
        },
      });
    }
  }

  onKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.submit();
    }
  }
}
