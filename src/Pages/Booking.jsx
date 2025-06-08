// pages/Booking.js
import React, { useState, useEffect } from "react";
import { Layout } from "../Uicomponents/Layout";
import { CompartmentVisualizer } from "../Uicomponents/CompartmentVisualizer";
import { TrainSelector } from "../Uicomponents/TrainSelector";
import { CompartmentSelector } from "../Uicomponents/CompartmentSelector";
import { useStore } from "../UIFiles/store";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Booking() {
  const navigate = useNavigate();
  const { trains, fetchTrains, isLoading, createBooking, findGroupSeats } = useStore();
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [selectedCompartment, setSelectedCompartment] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerName, setPassengerName] = useState("");
  const [passengerEmail, setPassengerEmail] = useState("");
  const [journeyDate, setJourneyDate] = useState("");
  const [groupSize, setGroupSize] = useState(1);
  const [findingSeats, setFindingSeats] = useState(false);

  // Fetch trains when component mounts
  useEffect(() => {
    fetchTrains();
  }, [fetchTrains]);

  // Handle train selection
  const handleTrainSelect = (train) => {
    setSelectedTrain(train);
    setSelectedCompartment(train.compartments[0] || null);
    setSelectedSeats([]);
  };

  // Handle compartment selection
  const handleCompartmentSelect = (compartment) => {
    setSelectedCompartment(compartment);
    setSelectedSeats([]);
  };

  // Handle seat selection/deselection
  const handleSeatClick = (seatId) => {
    if (!selectedCompartment) return;
    const seat = selectedCompartment.seats.find((s) => s.id === seatId);
    if (!seat || !seat.isAvailable) return;
    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) {
        return prev.filter((id) => id !== seatId);
      } else {
        if (prev.length >= groupSize) {
          toast.warning(`You can only select ${groupSize} seats for this booking`);
          return prev;
        }
        return [...prev, seatId];
      }
    });
  };

  // Find seats for the group automatically
  const handleFindGroupSeats = async () => {
    if (!selectedTrain || !selectedCompartment) {
      toast.error("Please select a train and compartment first");
      return;
    }
    setFindingSeats(true);
    try {
      const seatIds = await findGroupSeats(selectedTrain.id, selectedCompartment.id, groupSize);
      if (seatIds.length > 0) {
        setSelectedSeats(seatIds);
        toast.success(
          <div>
            <strong>Success!</strong>
            <div>Found {seatIds.length} seats for your group</div>
          </div>
        );
      } else {
        toast.error(
          <div>
            <strong>Unable to find seats</strong>
            <div>Please try selecting seats manually or choose a different compartment</div>
          </div>
        );
      }
    } catch (error) {
      console.error("Error finding group seats:", error);
      toast.error("Failed to find group seats automatically");
    } finally {
      setFindingSeats(false);
    }
  };

  // Reset selected seats when group size changes
  useEffect(() => {
    setSelectedSeats([]);
  }, [groupSize]);

  // Submit booking form
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTrain || !selectedCompartment) {
      toast.error("Please select a train and compartment");
      return;
    }
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat");
      return;
    }
    if (selectedSeats.length !== groupSize) {
      toast.error(`Please select exactly ${groupSize} seats for your group`);
      return;
    }
    if (!passengerName.trim()) {
      toast.error("Please enter passenger name");
      return;
    }
    if (!passengerEmail.trim()) {
      toast.error("Please enter passenger email");
      return;
    }
    if (!journeyDate) {
      toast.error("Please select journey date");
      return;
    }

    // Prepare booking data
    const bookingData = {
      train_id: selectedTrain.id,
      compartment_id: selectedCompartment.id,
      seat_ids: selectedSeats,
      passenger_name: passengerName,
      passenger_email: passengerEmail,
      journey_date: journeyDate,
      group_size: groupSize,
    };

    const success = await createBooking(bookingData);
    if (success) {
      toast.success("Booking successful!");
      setTimeout(() => {
        // Navigate to Payment page, passing booking data in state
        navigate("/payment", { state: { bookingData } });
      }, 2000);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Book Train Seats</h1>
          <p className="text-muted-foreground mt-2">
            Book seats for your group to ensure everyone sits together in the same compartment.
          </p>
        </div>
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse text-muted-foreground">Loading trains...</div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <TrainSelector
                trains={trains}
                selectedTrain={selectedTrain}
                onSelectTrain={handleTrainSelect}
              />
              {selectedTrain && (
                <div className="bg-card rounded-lg shadow p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Booking Details</h2>
                  <div className="space-y-3 sm:space-y-4">
                    <form onSubmit={handleBookingSubmit} className="space-y-4 sm:space-y-5">
                      <div className="space-y-1 sm:space-y-2">
                        <label htmlFor="passengerName" className="text-sm font-medium">
                          Passenger Name
                        </label>
                        <input
                          id="passengerName"
                          type="text"
                          className="w-full p-2 rounded-md border"
                          placeholder="Enter passenger name"
                          value={passengerName}
                          onChange={(e) => setPassengerName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-1 sm:space-y-2">
                        <label htmlFor="passengerEmail" className="text-sm font-medium">
                          Email
                        </label>
                        <input
                          id="passengerEmail"
                          type="email"
                          className="w-full p-2 rounded-md border"
                          placeholder="Enter email address"
                          value={passengerEmail}
                          onChange={(e) => setPassengerEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-1 sm:space-y-2">
                        <label htmlFor="journeyDate" className="text-sm font-medium">
                          Date of Journey
                        </label>
                        <input
                          id="journeyDate"
                          type="date"
                          className="w-full p-2 rounded-md border"
                          value={journeyDate}
                          onChange={(e) => setJourneyDate(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-1 sm:space-y-2">
                        <label htmlFor="groupSize" className="text-sm font-medium">
                          Group Size
                        </label>
                        <select
                          id="groupSize"
                          className="w-full p-2 rounded-md border"
                          value={groupSize}
                          onChange={(e) => setGroupSize(Number(e.target.value))}
                        >
                          {[1, 2, 3, 4, 5, 6].map((num) => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? "person" : "people"}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <button
                          type="button"
                          className="flex-1 bg-secondary text-secondary-foreground py-2 rounded-md font-medium transition-colors hover:bg-secondary/80 focus:ring-2 focus:ring-secondary/50 focus:outline-none flex justify-center items-center gap-2"
                          onClick={handleFindGroupSeats}
                          disabled={findingSeats || !selectedCompartment}
                        >
                          {findingSeats ? (
                            <>
                              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
                              <span>Finding seats...</span>
                            </>
                          ) : (
                            `Find ${groupSize} seats together`
                          )}
                        </button>
                        <button
                          type="submit"
                          className="flex-1 bg-primary text-primary-foreground py-2 rounded-md font-medium transition-colors hover:bg-primary/90 focus:ring-2 focus:ring-primary/50 focus:outline-none flex justify-center items-center gap-2"
                          disabled={
                            selectedSeats.length === 0 ||
                            selectedSeats.length !== groupSize ||
                            isLoading
                          }
                        >
                          {isLoading ? (
                            <>
                              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
                              <span>Processing...</span>
                            </>
                          ) : (
                            selectedSeats.length > 0
                              ? `Book ${selectedSeats.length} Seats`
                              : "Select seats to book"
                          )}
                        </button>
                      </div>
                    </form>
                    {selectedSeats.length > 0 && (
                      <div className="mt-4 bg-primary/10 p-3 rounded-md border border-primary/30">
                        <h3 className="text-sm font-semibold mb-2">
                          Selected Seats ({selectedSeats.length}/{groupSize})
                        </h3>
                        <div className="flex flex-wrap gap-1">
                          {selectedSeats.map((seatId) => {
                            const seat = selectedCompartment?.seats.find((s) => s.id === seatId);
                            return (
                              seat && (
                                <span
                                  key={seatId}
                                  className="text-xs bg-primary/20 text-primary-foreground px-2 py-1 rounded-md"
                                >
                                  {seat.number}
                                </span>
                              )
                            );
                          })}
                        </div>
                        {selectedSeats.length !== groupSize && (
                          <p className="text-xs text-amber-600 mt-2">
                            {selectedSeats.length < groupSize
                              ? `Please select ${groupSize - selectedSeats.length} more seats`
                              : `You've selected ${selectedSeats.length - groupSize} too many seats`}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-6">
              {selectedTrain && (
                <CompartmentSelector
                  compartments={selectedTrain.compartments}
                  selectedCompartment={selectedCompartment}
                  onSelectCompartment={handleCompartmentSelect}
                />
              )}
              {selectedCompartment && (
                <div className="space-y-2">
                  <CompartmentVisualizer
                    compartment={selectedCompartment}
                    selectedSeats={selectedSeats}
                    onSeatClick={handleSeatClick}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
