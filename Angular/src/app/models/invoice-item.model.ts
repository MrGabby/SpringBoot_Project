export interface InvoiceItem {
    id: number;
    invoiceId: number;
    crop_detailid: number;
    quantity: number;
    price: number;
    farmerid: number;
    crop_Detail: {
        crop_detailid: number;
        crop_name: string;
        cropDetail_description: string;
        crop_type: string;
        quantity: number;
        price: number;
        location: string;
        imageUrl?: string;
    };
}
