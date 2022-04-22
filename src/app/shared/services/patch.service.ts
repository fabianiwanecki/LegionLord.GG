import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PatchService {

  patchesUrl = environment.backendUrl + 'patches';


  constructor(private http: HttpClient) {
  }

  listPatches() {
    return this.http.get(this.patchesUrl);
  }
}
