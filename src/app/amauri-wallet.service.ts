import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface BitCoinRate{
  time: {updated: string};
  bpi: {
    USD: {
      rate_float: number;
    }
    BRL: {
      rate_float: number;
    }
    EUR:{
      rate_float: number;
    }
  }

}

@Injectable()
export class AmauriWalletService {
  bitCoinRates: Array<BitCoinRate> = [];
  bitCoinRates2: Array<BitCoinRate> = [];
  private timer: any;
  private counter = 0; 
  private saveUSD: number;
  private saveBRL: number;
  private saveEUR: number;
  private saldo = 0;
  constructor(private http: HttpClient) { }

  updateBitCoinRates(){
    this.http.get<BitCoinRate>("https://api.coindesk.com/v1/bpi/currentprice/BRL.json").subscribe(data => {
      this.bitCoinRates.push(data);
      this.saveUSD = data.bpi.USD.rate_float;
      this.saveBRL = data.bpi.BRL.rate_float;
    });
    this.http.get<BitCoinRate>("https://api.coindesk.com/v1/bpi/currentprice.json").subscribe(data => {
      this.bitCoinRates2.push(data);
      this.saveEUR = data.bpi.EUR.rate_float;
    });
  }

  comeco(){
    if(!this.timer){
      this.counter = 0;
      this.timer = setInterval(()=>{
        this.counter++;
        if(this.counter == 60){
          this.updateBitCoinRates();
          this.parar();
          this.comeco();
        }
      }, 1000)
      }
    }
  parar(){
    if(this.timer){
      clearInterval(this.timer);
      this.timer=null;
    }
  }
  getCount(){
    return this.counter;
  }

  getSaldo(){
    if (this.saveBRL != null){
      return this.saldo / this.saveBRL;
    }
    else {
      return 0;
    }
    
  }

  getSaldoBRL(){
    if (this.saveBRL != null){
      return this.saldo;
    }
    else {
      return 0;
    }
    
  }
  getSaldoUSD(){
    if (this.saveBRL != null){
      return this.saldo / (this.saveBRL / this.saveUSD);
    }
    
    else {
      return 0;
    }
  }
  getSaldoEUR(){
    if (this.saveBRL != null){
      return this.saldo / (this.saveBRL / this.saveEUR);
    }
    
    else {
      return 0;
    }
  }

  adicionarSaldo(valor){
    if (this.saveBRL != null){
      this.saldo = this.saldo + parseFloat(valor);
    }
  }
  removerSaldo(valor){
    if (this.saveBRL != null){
      this.saldo = this.saldo - parseFloat(valor);
    }
  }


}