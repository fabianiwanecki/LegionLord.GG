import {Component} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {PlayerService} from "../services/player.service";
import {SnackbarService} from "../services/snackbar.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


  formSearchPlayer = this.fb.group({
    playerName: [],
  })
  loading: boolean = false;
  notFound: boolean = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private snackbarService: SnackbarService,
              private playerService: PlayerService) {
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
