import {Component, OnInit} from '@angular/core';
import {PlayerService} from "../../shared/services/player.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loading: boolean = false;
  notFound: boolean = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private playerService: PlayerService) {
  }


  formSearchPlayer = this.fb.group({
    playerName: [],
  })

  ngOnInit(): void {
  }

  submit() {
    if (this.formSearchPlayer.controls['playerName'].value) {
      this.loading = true;
      this.playerService.searchPlayerByName(this.formSearchPlayer.controls['playerName'].value).subscribe({
        next: (player: any) => {
          this.router.navigate(['/player', player['_id']]);
        },
        error: () => {
          this.loading = false
          this.notFound = true;
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
