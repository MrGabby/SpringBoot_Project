import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, isEmpty } from 'rxjs';
import { invoice } from 'src/app/models/invoice.model';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent {

  Invoic:invoice[]=[{
    invoiceid: 1111,
    userid:'12',
    farmerid: 10,
    dealerid: 12,
    quantity:'1',
    price:'10000',
    payment_Mode:'Online',
    status:'Success',
    crop_detailid: 7,
    date_created:'01/01/2023',
    crop_Detail:{
      crop_detailid: 1,
      crop_name: 'Mango',
      cropDetail_description: 'Mango1',
    crop_type: 'Mango2',
      quantity: 10,
      price: 1000,
      location: 'Pune'
    }
  }
]

 Invoice:invoice[] = [
  // {
  //   Invoiceid: 0 ,
  //   Userid:'',
  //   Farmerid:0  ,
  //   Dealerid: 0,
  //   Quantity:'',
  //   Price:'',
  //   Payment_Mode:'',
  //   Status:'',
  //   Crop_detailid: 0,
  //   Date_created:'',
  //   Crop_Detail:{
  //     crop_detailid: 0,
  //     crop_name: '',
  //     cropDetail_description: '',
  //   crop_type: '',
  //     Quantity: 0,
  //     Price: 0,
  //     location: ''
  //   }
  // }

 ];


  constructor(private invoic:InvoiceService,private router:Router) {}

  ngOnInit(): void {

    this.invoic.getinvoice().subscribe({ next :(invoicelist)=> {
      // console.log(this.Invoice);
       this.Invoice = invoicelist;
       //console.log(invoicelist);
       console.log(this.Invoice);
    },
    error:(response)=> {
      console.log(response);}
  })

  }



}
