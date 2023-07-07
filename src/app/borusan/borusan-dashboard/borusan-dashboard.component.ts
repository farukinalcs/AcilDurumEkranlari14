import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/modules/auth';
import { BorusanService } from '../borusan.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { changeLocation } from '../Ngrx-Store/location/locations.action';
declare var $: any;

@Component({
  selector: 'app-borusan-dashboard',
  templateUrl: './borusan-dashboard.component.html',
  styleUrls: ['./borusan-dashboard.component.scss']
})


export class BorusanDashboardComponent implements OnInit {

  onDevices:number;
  offDevices:number;
  _location:string = "";

  locations : string[]= [
    "Hepsi",
    "Gemlik / Bursa",
    "Bursa",
    "Halkalı / İstanbul",
    "Merkez / İstanbul",
    "Yok"
  ]

  deviceList:any[] = [];

  duzenlemeTarih:string;
 
  private unsubscribe: Subscription[] = [];

  constructor(
    private auth:AuthService,
    public borusan:BorusanService,
    private ref: ChangeDetectorRef,
    ) { }

  ngOnInit(): void {
    this.getTerminal();
    setInterval(() => {
      this.getTerminal();
      }, 15000);
  }


  changeLokasyon(id:string){
    if(id == "Hepsi"){
      this.borusan.locationSubject.next(1)
      this.ref.detectChanges();
    }else if(id == "Gemlik / Bursa")
    {this.borusan.locationSubject.next(2)
      this.ref.detectChanges();
    }else if(id == "Bursa")
    {this.borusan.locationSubject.next(3)
      this.ref.detectChanges();
    }else if(id == "Halkalı / İstanbul")
    {this.borusan.locationSubject.next(4)
      this.ref.detectChanges();
    }else if(id == "Merkez / İstanbul")
    {this.borusan.locationSubject.next(5)
      this.ref.detectChanges();
    }else this.borusan.locationSubject.next(6)
    this.borusan.inLocationPeopleCount = 0;
    this.borusan.outLocationPeopleCount = 0;
    this.borusan.safePeopleCount = 0;
    this.borusan.notSafePeopleCount = 0;
  }

 
  getTerminal(){
    this.unsubscribe.push(this.borusan.getTerminal()
    .subscribe((result : any) => {
      this.deviceList = result.sonuc;
      this.duzenlemeTarih = result.tarih;
      this.onDevices = this.deviceList.filter((x:any)=>x.state == 1).length;
      this.offDevices = this.deviceList.filter((x:any)=>x.state == 0).length;
      this.ref.detectChanges();
    }))
  }
  
  logout() {
    this.auth.logout();
    document.location.reload();
  }



  showDevices(){
    $('#ShowDevices').modal('show');
  }

  safe(){
    this.borusan.statusSubject.next(1)
  }
  inLocation(){
    this.borusan.statusSubject.next(2)
  }
  outLocation(){
    this.borusan.statusSubject.next(3)
  }
  notSafe(){
    this.borusan.statusSubject.next(4)
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
