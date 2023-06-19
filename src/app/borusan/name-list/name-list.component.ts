import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { BorusanService } from '../borusan.service';
import { Move } from '../_models/move';
import { Result } from '../_models/result';
import { listen} from '../Ngrx-Store/location/locations.selector';

import * as XLSX from 'xlsx';
declare var $: any;



@Component({
  selector: 'app-name-list',
  templateUrl: './name-list.component.html',
  styleUrls: ['./name-list.component.scss']
})

export class NameListComponent implements OnInit {

  displayedColumns: string[] = [
    "sicilNo",
    "adSoyad",
    "departman",
    "firma",
    "lokasyon",
    "hareketZamani",
    "terminalAd",
    "telefon",
    "status",
    "kanGrubu",
    "acilDurumKisi",
    "acilDurumKisiTel",
    "koordinat",
    "vip"
  ];

  merkez:Result[]=[];
  halkali:Result[]=[];
  gemlik:Result[]=[];
  bursa:Result[]=[];
  dataList:Result[] = [];


  statikocu:number=0;

  locationSelect$ = this.store.select(listen);

  searchEmp:string = "";

  dataSource!: MatTableDataSource<Result>;


  move : Move = {
     hata:"",
     sonuc:this.dataList,
     tarih:""
  }

  nameList: any[];
  
  // employeeState$ = this.store.select("employeeState");



  private unsubscribe: Subscription[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private borusan:BorusanService, 
    private ref: ChangeDetectorRef, 
    private store : Store<{id : string}>
     // private store : Store<{"employeeState" : boolean}>
    ) {
     
     }

  ngOnInit(): void {
    this.getData3(1,0);
    setInterval(() => {
      this.getData3(this.borusan.selectLocation,this.borusan.selectStatus);
    }, 3000);
     
    this.borusan.locationSubject.subscribe(data =>{
        this.borusan.selectLocation = data;
        this.ref.detectChanges();
    })

    this.borusan.statusSubject.subscribe(data => {
      this.borusan.selectStatus = data;
      this.getData3(this.borusan.selectLocation,this.borusan.selectStatus);

    })
    
  }


  getData3(location:number,status:number){
    this.unsubscribe.push(this.borusan.getData2(location,status)
    .subscribe((result : Move) => {
      this.dataList = result.sonuc;
      this.borusan.duzenlemeTarih = result.tarih;
      this.merkez = this.dataList.filter((x:Result)=> x.status == this.statikocu)
      this.dataSource = new MatTableDataSource(this.dataList)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.ref.detectChanges();
      if(status == 1)
      {
        this.borusan.safePeopleCount = this.dataList.length;
      }else if(status == 2){
        this.borusan.notSafePeopleCount = this.dataList.length;
      }
      console.log("DATA GELİYORRRRRRRRRRRRRRRRRRRRRRR")
    }))

    
   
  }

  // getData(){
  //   this.unsubscribe.push(this.borusan.getData()
  //   .subscribe((result : Move) => {
  //     this.dataList = result.sonuc;
  //     this.borusan.duzenlemeTarih = result.tarih;
  //     this.dataSource = new MatTableDataSource(this.dataList)
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //     console.log("getData",this.dataSource);
  //     this.ref.detectChanges();
  //   }))
  // }

  //  fillDataSource2(location:string){

  //   if(location == "Merkez / İstanbul")
  //   {
  //     this.unsubscribe.push(this.borusan.getData()
  //     .subscribe((result : Move) => {
  //       this.dataList = result?.sonuc;
  //       this.merkez = this.dataList.filter((x:Result)=> x.lokasyon == location && x.status != 5)
  //       this.dataSource = new MatTableDataSource(this.merkez)
      
  //       this.ref.detectChanges();
  //       console.log("Merkez / İstanbul",this.dataSource);
  //     }))
      
  //   }else if(location == "Gemlik / Bursa"){
  //     this.unsubscribe.push(this.borusan.getData()
  //     .subscribe((result : Move) => {
  //       this.dataList = result?.sonuc;
  //       this.gemlik = this.dataList.filter((x:Result)=> x.lokasyon == location && x.status != 5)
  //       this.dataSource = new MatTableDataSource(this.gemlik)
  //       // this.dataSource.paginator = this.paginator;
  //       // this.dataSource.sort = this.sort;
  //       this.ref.detectChanges();
  //       console.log("Gemlik / Bursa",this.dataSource)
  //     }))
  //   }
  //   else if(location == "Halkalı / İstanbul"){
  //     this.unsubscribe.push(this.borusan.getData()
  //     .subscribe((result : Move) => {
  //       this.dataList = result?.sonuc;
  //       this.halkali = this.dataList.filter((x:Result)=> x.lokasyon == location && x.status != 5)
  //       this.dataSource = new MatTableDataSource(this.halkali)
  //       // this.dataSource.paginator = this.paginator;
  //       // this.dataSource.sort = this.sort;
  //       this.ref.detectChanges();
  //       console.log("Halkalı / İstanbul",this.dataSource)
  //     }))
  //   }
  //   else if (location == "Bursa")
  //   {
  //     this.unsubscribe.push(this.borusan.getData()
  //     .subscribe((result : Move) => {
  //       this.dataList = result?.sonuc;
  //       this.bursa = this.dataList.filter((x:Result)=> x.lokasyon == location && x.status != 5)
  //       this.dataSource = new MatTableDataSource(this.bursa)
  //       // this.dataSource.paginator = this.paginator;
  //       // this.dataSource.sort = this.sort;
  //       this.ref.detectChanges();
  //       console.log("Bursa",this.dataSource)
  //     }))
  //   }
  //   // else{
  //   //   this.unsubscribe.push(this.borusan.getData(0)
  //   //   .subscribe((result : Move) => {
  //   //     this.dataList = result?.sonuc;
  //   //     this.dataSource = new MatTableDataSource(this.dataList)
  //   //     this.dataSource.paginator = this.paginator;
  //   //     this.dataSource.sort = this.sort;
  //   //     console.log("ELSEE",this.dataSource)
  //   //     this.ref.detectChanges();
  //   //   }))
  //   // }
  // }

  // fillDataSource(location:string){
  //   if(location == "Merkez / İstanbul")
  //   {
  //     this.merkez = this.dataList.filter((x:Result)=> x.lokasyon == location && x.status != 5)
  //     this.dataSource = new MatTableDataSource(this.merkez);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //     console.log("Merkez / İstanbul",this.dataSource)
  //   }else if(location == "Gemlik / Bursa"){
  //     this.gemlik = this.dataList.filter((x:Result)=> x.lokasyon == location  && x.status != 5)
  //     this.dataSource = new MatTableDataSource(this.gemlik);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //     console.log("Gemlik / Bursa",this.dataSource)
  //   }
  //   else if(location == "Halkalı / İstanbul"){
  //     this.halkali = this.dataList.filter((x:Result)=> x.lokasyon == location  && x.status != 5)
  //     this.dataSource = new MatTableDataSource(this.halkali);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //     console.log("Halkalı / İstanbul",this.dataSource)
  //   }
  //   else if (location == "Bursa")
  //   {
  //     this.bursa = this.dataList.filter((x:Result)=> x.lokasyon == location  && x.status != 5)
  //     this.dataSource = new MatTableDataSource(this.bursa);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //     console.log("Bursa",this.dataSource)
  //   }
  //   else{
  //     this.dataSource = new MatTableDataSource(this.dataList)
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   }
  // }

  searchEmployeeFilter() {
    this.dataSource.filter = this.searchEmp.trim().toLowerCase().toUpperCase();
  }

  getKoordinat(){
    $('#koordinat').modal('show');
  }

  getRow(data:any,row:any){
    console.log("___SATIR İNFO",row);
    console.log("___SATIR data",data);
    if(row.lokasyon == "Merkez / İstanbul"){
      this.exportTable(this.merkez,row.lokasyon);
    }else if(row.lokasyon == "Gemlik / Bursa"){
      this.exportTable(this.gemlik,row.lokasyon);
    }else if(row.lokasyon == "Halkalı / İstanbul"){
      this.exportTable(this.halkali,row.lokasyon);
    }else if(row.lokasyon == "Bursa"){
      this.exportTable(this.bursa,row.lokasyon);
    }else{
      console.log("row.lokasyon",row.lokasyon)
    }
    
  
  }
  
  exportTable(data: any, alanadi: string) {
    const parseData = JSON.parse(data)
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(parseData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // console.log("WS",ws);
    XLSX.utils.book_append_sheet(wb, ws, 'All Data Export');

    XLSX.writeFile(wb, alanadi + '.xlsx');
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
