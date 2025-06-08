import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PassengerForm } from "../Uicomponents/PassengerForm";
import { ContactForm } from "../Uicomponents/ContactForm";
import { PaymentMethodSelector } from "../Uicomponents/PaymentMethodSelector";
import BookingSummary from "../Uicomponents/BookingSummary.jsx";

import { toast } from "sonner";
import brain from "../Pages/brain";

const STEPS = [
  { id: "passengers", label: "Passenger Details" },
  { id: "contact", label: "Contact Details" },
  { id: "payment", label: "Payment Method" },
  { id: "summary", label: "Review & Pay" },
];

export default function BookingWizard() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const trainNumber = searchParams.get("train") || "";
  const date = searchParams.get("date") || "";
  const selectedSeats = JSON.parse(searchParams.get("seats") || "[]");

  const [currentStep, setCurrentStep] = useState("passengers");
  const [isLoading, setIsLoading] = useState(false);
  
  const [passengers, setPassengers] = useState(
    selectedSeats.map((seat) => ({
      name: "",
      age: 0,
      gender: "",
      type: "ADULT",
      ...seat,
    }))
  );

  const [contact, setContact] = useState({
    email: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("CREDIT_CARD");

  const fare = {
    base_fare: 1000 * passengers.length,
    service_charge: 100 * passengers.length,
    gst: 55 * passengers.length,
    total: (1000 + 100 + 55) * passengers.length,
  };

  const handleNext = () => {
    const currentIndex = STEPS.findIndex((step) => step.id === currentStep);
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1].id);
    }
  };

  const handleBack = () => {
    const currentIndex = STEPS.findIndex((step) => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1].id);
    }
  };

  const validateStep = () => {
    switch (currentStep) {
      case "passengers":
        return passengers.every((p) => p.name && p.age > 0 && p.gender && p.type);
      case "contact":
        return contact.email && contact.phone;
      case "payment":
        return paymentMethod;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const response = await brain.create_booking({
        body: {
          train_number: trainNumber,
          date,
          passengers,
          contact,
          payment_method: paymentMethod,
        },
      });

      const booking = await response.json();

      toast.success("Booking created successfully!");
      navigate(`/booking/${booking.booking.booking_id}`);
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Failed to create booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <Card className="p-4">
        <div className="flex justify-between">
          {STEPS.map((step, index) => (
            <div key={step.id} className={`flex items-center ${index > 0 ? "flex-1" : ""}`}>
              {index > 0 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    currentStep === step.id || STEPS.findIndex((s) => s.id === currentStep) > index
                      ? "bg-primary"
                      : "bg-gray-200"
                  }`}
                />
              )}
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  currentStep === step.id
                    ? "bg-primary text-white"
                    : STEPS.findIndex((s) => s.id === currentStep) > index
                    ? "bg-primary/20 text-primary"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {index + 1}
              </div>
              <span className="ml-2 text-sm font-medium text-gray-600">{step.label}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="space-y-6">
        {currentStep === "passengers" && (
          <div className="space-y-4">
            {passengers.map((passenger, index) => (
              <PassengerForm
                key={index}
                passenger={passenger}
                seatInfo={{
                  seat_number: passenger.seat_number,
                  coach_number: passenger.coach_number,
                }}
                onChange={(updated) => {
                  const newPassengers = [...passengers];
                  newPassengers[index] = updated;
                  setPassengers(newPassengers);
                }}
              />
            ))}
          </div>
        )}

        {currentStep === "contact" && <ContactForm contact={contact} onChange={setContact} />}
        {currentStep === "payment" && <PaymentMethodSelector selected={paymentMethod} onChange={setPaymentMethod} />}
        {currentStep === "summary" && (
          <BookingSummary trainNumber={trainNumber} date={date} passengers={passengers} fare={fare} />
        )}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === "passengers"}>
          Back
        </Button>

        {currentStep === "summary" ? (
          <Button onClick={handleSubmit} disabled={!validateStep() || isLoading}>
            {isLoading ? "Processing..." : "Confirm & Pay"}
          </Button>
        ) : (
          <Button onClick={handleNext} disabled={!validateStep()}>
            Continue
          </Button>
        )}
      </div>
    </div>
  );
}
