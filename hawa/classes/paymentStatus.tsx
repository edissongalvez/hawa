import { PaymentDetail } from "./paymentDetail";

export interface PaymentStatus {
    id: number,
    name: string,
    desc: string,
    createdAt: Date,
    modifiedAt: Date,
    paymentDetails: PaymentDetail[]
}