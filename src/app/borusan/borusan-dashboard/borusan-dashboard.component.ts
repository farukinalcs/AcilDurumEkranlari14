import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/modules/auth';
import { BorusanService } from '../borusan.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { changeLocation } from '../Ngrx-Store/location/locations.action';
declare var $: any;

@Component({
  selector: 'app-borusan-dashboard',
  templateUrl: './borusan-dashboard.component.html',
  styleUrls: ['./borusan-dashboard.component.scss']
})


export class BorusanDashboardComponent implements OnInit {

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
  isSafe:number = 5;
  duzenlemeTarih:string;

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 
  private unsubscribe: Subscription[] = [];

  constructor(
    private auth:AuthService,
    public borusan:BorusanService,
    private ref: ChangeDetectorRef,
    private store: Store) { }

  ngOnInit(): void {
    this.getTerminal();
    // setInterval(() => {
    //   this.getTerminal();
    //   }, 3000);
  }


  changeLokasyon(id:string){
    if(id == "Hepsi")
    {this.borusan.locationSubject.next(1)
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
  }

 
  getTerminal(){
    this.unsubscribe.push(this.borusan.getTerminal()
    .subscribe((result : any) => {
      this.deviceList = result.sonuc;
      this.duzenlemeTarih = result.tarih;
      console.log("RESULT DEVİCES",result)
      this.ref.detectChanges();
    }))
  }

   // getData(){
  //   this.unsubscribe.push(this.borusan.getData()
  //   .subscribe((result : Move) => {
  //     this.dataList = result.sonuc;
  //     this.duzenlemeTarih = result.tarih;
  //     console.log("RESULT Move",result)
  //     this.ref.detectChanges();
  //   }))
  // }
  // getData(){
  //   this.unsubscribe.push(this.borusan.getData()
  //   .subscribe((result : Move) => {
  //     this.dataList = result.sonuc;
  //     this.duzenlemeTarih = result.tarih;
  //     console.log("RESULT Move",result)
  //     this.ref.detectChanges();
  //   }))
  // }
  
  logout() {
    this.auth.logout();
    document.location.reload();
  }

  IsSafe(state:string){
    if(state == "not")
    {  
      this.isSafe = 1;
      console.log("this.isSafe",this.isSafe)
      this.ref.detectChanges();

    }else if(state == "safe"){
      this.isSafe = 2;
      console.log("this.isSafe",this.isSafe)
      this.ref.detectChanges();
    }
  
  }

  showDevices(){
    $('#ShowDevices').modal('show');
    console.log("SHOW")
  }
  notLocation(){
    this.borusan.statusSubject.next(3)
  }


 

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
