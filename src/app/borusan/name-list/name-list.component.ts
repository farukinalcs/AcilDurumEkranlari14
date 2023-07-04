import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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

  dataList:Result[] = [];


  statikocu:string="41.02926";

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

  @ViewChild('TABLE',{ read: ElementRef }) table: ElementRef;

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
      // this.dataSource.table = this.table;
      this.ref.detectChanges();
      if(status == 1)
      {
        this.borusan.safePeopleCount = this.dataList.length;
      }
      else if(status == 2)
      {
        this.borusan.inLocationPeopleCount = this.dataList.length;
      }
      else if(status == 3)
      {
        this.borusan.outLocationPeopleCount = this.dataList.length;
      }
      else if(status == 4)
      {
        this.borusan.notSafePeopleCount = this.dataList.length;
      }
    }))
    
  }

  searchEmployeeFilter() {
    this.dataSource.filter = this.searchEmp.trim().toLowerCase().toUpperCase();
  }

  getKoordinat(row:Result)
  {
    console.log("ROW",row)
    $('#koordinat').modal('show');
    const x = row.koordinat.split(",",0)
    const y = row.koordinat.split(",",1)

    const url:string= "https://www.meyerangel.com/testmap.html?x="+`${x}`+"&amp;y="+`${y}`
    const url2:string="https://www.meyerangel.com/testmap.html?x=41.029263&amp;y=28.987094"
    document.getElementById("mapx")?.setAttribute("data", url)
  }

  exportExcel():void{
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataList)
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'All Data Export');
    XLSX.writeFile(wb, "BORUSAN ACİL DURUM TOPLANMA ALANLARI"+'.xlsx');
  }
  
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
