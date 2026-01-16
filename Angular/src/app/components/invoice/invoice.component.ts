import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, isEmpty } from 'rxjs';
import { invoice } from 'src/app/models/invoice.model';
import { InvoiceService } from 'src/app/services/invoice.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent {

  Invoice: invoice[] = [];

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices() {
    this.invoiceService.getinvoice().subscribe({
      next: (invoicelist) => {
        this.Invoice = invoicelist.sort((a, b) =>
          new Date(b.date_created).getTime() - new Date(a.date_created).getTime()
        );
      },
      error: (response) => {
        console.error('Failed to load invoices', response);
        this.notification.error('Could not load your invoice history.');
      }
    });
  }

  viewDetails(inv: invoice) {
    let itemsHtml = `
      <div class="table-responsive">
        <table class="table table-sm table-borderless align-middle mt-2">
          <thead class="border-bottom">
            <tr class="text-muted small">
              <th>CROP</th>
              <th>TYPE</th>
              <th>PRICE</th>
              <th class="text-center">QTY</th>
              <th class="text-end">SUBTOTAL</th>
            </tr>
          </thead>
          <tbody>
    `;

    inv.items.forEach(item => {
      itemsHtml += `
        <tr>
          <td><div class="fw-bold">${item.crop_Detail?.crop_name || 'N/A'}</div></td>
          <td><span class="badge bg-light text-dark font-weight-normal">${item.crop_Detail?.crop_type || 'N/A'}</span></td>
          <td>₹${item.price}</td>
          <td class="text-center">${item.quantity}</td>
          <td class="text-end fw-bold text-success">₹${item.price * item.quantity}</td>
        </tr>
      `;
    });

    itemsHtml += `
          </tbody>
        </table>
        <div class="d-flex justify-content-between border-top pt-3 mt-2">
          <span class="fw-bold text-dark">Order Total</span>
          <span class="h5 fw-bold text-success mb-0">₹${inv.total_amount}</span>
        </div>
      </div>
    `;

    this.notification.showHtml(`Invoice #${inv.invoiceid}`, itemsHtml);
  }

  formatDate(date: any): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
