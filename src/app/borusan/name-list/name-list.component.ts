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


  statikocu:string="40.76841734815389";

  locationSelect$ = this.store.select(listen);

  searchEmp:string = "";

  dataSource!: MatTableDataSource<Result>;


  move : Move = {
     hata:"",
     sonuc:this.dataList,
     tarih:""
  }

  nameList: any;
  
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
    this.getMove(1,0);
    setInterval(() => {
      this.getMove(this.borusan.selectLocation,this.borusan.selectStatus);
    }, 3000);
     
    this.borusan.locationSubject.subscribe(data => {
        this.borusan.selectLocation = data;
        this.borusan.selectStatus = 0;
        this.ref.detectChanges();
    })

    this.borusan.statusSubject.subscribe(data => {
      this.borusan.selectStatus = data;
      this.getMove(this.borusan.selectLocation,this.borusan.selectStatus);

    })
    
  }


  getMove(location:number,status:number){
    this.unsubscribe.push(this.borusan.getMove(location,status)
    .subscribe((result : Move) => {
      this.dataList = result.sonuc;
      this.borusan.duzenlemeTarih = result.tarih;
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
    }))
    
  }

  searchEmployeeFilter() {
    this.dataSource.filter = this.searchEmp.trim().toLowerCase().toUpperCase();
  }

  getKoordinat(row:Result)
  {  console.log("element",row)
    $('#koordinat').modal('show');
  }

  exportExcel():void{
    let element = document.getElementById('excel-table')
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'All Data Export');
    XLSX.writeFile(wb, "BORUSAN ACİL DURUM TOPLANMA ALANLARI"+'.xlsx');
  }
  
  // exportTable(data: any, alanadi: string) {
  //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   console.log("WS",ws);
  //   XLSX.utils.book_append_sheet(wb, ws, 'All Data Export');

  //   XLSX.writeFile(wb, alanadi + '.xlsx');
  // }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
