import { useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Button from "../Components/Button";
import { useQuery } from "@tanstack/react-query";
import { GetPayment } from "@/Api/apiPayment";
import ErrorMessage from "@/UI/ErrorMessage";
import { useEffect, useRef } from "react";

function Payment() {
  const navigate = useNavigate();
  const paymentId = useRef(sessionStorage.getItem("pendingPaymentId")).current;

  useEffect(() => {
    if (!paymentId) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    data: paymentStatus,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["payment-status", paymentId],
    queryFn: () => GetPayment(paymentId!),
    enabled: !!paymentId,
    retry: 3,
    retryDelay: 1000,
  });

  // Clear sessionStorage after payment status is fetched
  useEffect(() => {
    if (paymentStatus) {
      sessionStorage.removeItem("pendingPaymentId");
    }
  }, [paymentStatus]);

  if (isLoading || !paymentId) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="text-tertiary-blue mx-auto h-16 w-16 animate-spin" />
          <p className="mt-4 text-xl text-white">Verifying payment...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-md text-center">
          <ErrorMessage
            message={error?.message || "Failed to verify payment"}
          />
          <div className="mt-8">
            <Button style="primary" onClick={() => navigate("/my-journey")}>
              Go to My Journey
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStatus?.isPaid) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-md text-center">
          <CheckCircle2 className="mx-auto h-24 w-24 text-green-500" />
          <h1 className="mt-6 text-3xl font-bold text-white">
            Payment Successful!
          </h1>
          <p className="mt-4 text-gray-300">
            Thank you for your purchase. Your payment has been processed
            successfully.
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Payment ID: {paymentStatus.paymentId}
          </p>
          <p className="mt-1 text-sm text-gray-400">
            Amount: € {paymentStatus.amount.toFixed(2)}
          </p>
          {paymentStatus.paidAt && (
            <p className="mt-1 text-xs text-gray-500">
              Paid at: {new Date(paymentStatus.paidAt).toLocaleString()}
            </p>
          )}
          <div className="mt-8 flex flex-col gap-4">
            <Button style="primary" onClick={() => navigate("/my-journey")}>
              View My Journey
            </Button>
            <Button
              style="secondary"
              onClick={() => navigate("/browse-destination")}
            >
              Browse More Tours
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Payment failed, cancelled, or expired
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <XCircle className="mx-auto h-24 w-24 text-red-500" />
        <h1 className="mt-6 text-3xl font-bold text-white">
          {paymentStatus?.isCanceled
            ? "Payment Cancelled"
            : paymentStatus?.isExpired
              ? "Payment Expired"
              : "Payment Failed"}
        </h1>
        <p className="mt-4 text-gray-300">
          {paymentStatus?.isCanceled
            ? "You cancelled the payment. No charges were made."
            : paymentStatus?.isExpired
              ? "The payment session expired. Please try again."
              : "Unfortunately, your payment could not be processed."}
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Status: {paymentStatus?.status}
        </p>
        <div className="mt-8 flex flex-col gap-4">
          <Button
            style="primary"
            onClick={() => navigate("/browse-destination")}
          >
            Browse Tours
          </Button>
          <Button style="secondary" onClick={() => navigate("/my-journey")}>
            View My Journey
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
