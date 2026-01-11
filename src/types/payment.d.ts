interface CreatePaymentRequest {
  amount: number;
  description: string;
  tourId: number;
  startDateId: number;
  redirectUrl: string;
}

interface PaymentResponse {
  paymentId: string;
  status: string;
  amount: number;
  checkoutUrl: string;
  createdAt: string;
  description: string;
}

interface PaymentStatusResponse {
  paymentId: string;
  status: string;
  amount: number;
  isPaid: boolean;
  isCanceled: boolean;
  isExpired: boolean;
  paidAt: string | null;
  canceledAt: string | null;
  expiredAt: string | null;
}
