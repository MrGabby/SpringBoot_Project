import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  success(message: string, title: string = 'Success') {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonColor: '#28a745',
      timer: 3000,
      timerProgressBar: true
    });
  }

  error(message: string, title: string = 'Oops...') {
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      confirmButtonColor: '#dc3545'
    });
  }

  confirm(message: string, title: string = 'Are you sure?'): Promise<any> {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Yes, proceed!'
    });
  }

  showHtml(title: string, htmlContent: string) {
    Swal.fire({
      title: title,
      html: htmlContent,
      width: '800px',
      confirmButtonColor: '#28a745',
      confirmButtonText: 'Close'
    });
  }
}
