// pages/Payment.js
import React, { useState } from "react";
import { Layout } from "../Uicomponents/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.bookingData;
  const [processing, setProcessing] = useState(false);

  if (!bookingData) {
    return (
      <Layout>
        <div className="p-6">
          <p>No booking details found. Please go back and book a ticket.</p>
          <button onClick={() => navigate("/")}>Go Back</button>
        </div>
      </Layout>
    );
  }

  const handlePayment = () => {
    setProcessing(true);
    // Simulate payment processing delay
    setTimeout(() => {
      setProcessing(false);
      toast.success("Payment successful!");
      // Navigate to the Ticket page using the absolute path "/t"
      navigate("/t", { state: { bookingData } });
    }, 2000);
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Payment</h1>
        <p className="mb-4">Please review your booking details and proceed with the payment.</p>
        <div className="bg-card p-4 rounded-lg shadow mb-4">
          <p>
            <strong>Passenger Name:</strong> {bookingData.passenger_name}
          </p>
          <p>
            <strong>Email:</strong> {bookingData.passenger_email}
          </p>
          <p>
            <strong>Train:</strong> {bookingData.train_id}
          </p>
          <p>
            <strong>Compartment:</strong> {bookingData.compartment_id}
          </p>
          <p>
            <strong>Seats:</strong> {bookingData.seat_ids.join(", ")}
          </p>
          <p>
            <strong>Journey Date:</strong> {bookingData.journey_date}
          </p>
          <p>
            <strong>Group Size:</strong> {bookingData.group_size}
          </p>
        </div>
        <button
          onClick={handlePayment}
          disabled={processing}
          className="bg-primary text-white px-4 py-2 rounded-md"
        >
          {processing ? "Processing Payment..." : "Pay Now"}
        </button>
      </div>
    </Layout>
  );
}
