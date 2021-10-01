import { Component, OnInit } from '@angular/core';
import { AmauriWalletService} from '../amauri-wallet.service'

@Component({
  selector: 'app-amauri-wallet',
  templateUrl: './amauri-wallet.component.html',
  styleUrls: ['./amauri-wallet.component.css']
})
export class AmauriWalletComponent implements OnInit {

  constructor(public bit:AmauriWalletService) { }

  ngOnInit() {
  }

}