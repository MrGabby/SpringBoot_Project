import { InvoiceItem } from './invoice-item.model';

export interface invoice {
  invoiceid: number;
  userid: any;
  farmerid?: number;
  dealerid: number;
  total_amount: number;
  total_items: number;
  payment_mode?: string;
  status: string;
  date_created: any;
  items: InvoiceItem[];
}
