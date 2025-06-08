import React, { useState } from "react";

function BookingForm() {
  const [trainId, setTrainId] = useState("");
  const [compartmentId, setCompartmentId] = useState("");
  const [seatIds, setSeatIds] = useState([]);
  const [passengerName, setPassengerName] = useState("");
  const [passengerEmail, setPassengerEmail] = useState("");
  const [journeyDate, setJourneyDate] = useState("");
  const [groupSize, setGroupSize] = useState(1);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      train_id: trainId,
      compartment_id: compartmentId,
      seat_ids: seatIds,
      passenger_name: passengerName,
      passenger_email: passengerEmail,
      journey_date: journeyDate,
      group_size: groupSize,
    };

    try {
      const res = await fetch("/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.detail || "Failed to create booking");
        return;
      }

      const data = await res.json();
      setResponse(data);
      setError(null);
    } catch (err) {
      setError("Error creating booking");
    }
  };

  return (
    <div>
      <h2>Create Booking</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {response && (
        <p style={{ color: "green" }}>Booking created with id: {response.id}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Train ID:</label>
          <input
            type="text"
            value={trainId}
            onChange={(e) => setTrainId(e.target.value)}
          />
        </div>
        <div>
          <label>Compartment ID:</label>
          <input
            type="text"
            value={compartmentId}
            onChange={(e) => setCompartmentId(e.target.value)}
          />
        </div>
        <div>
          <label>Seat IDs (comma separated):</label>
          <input
            type="text"
            value={seatIds.join(",")}
            onChange={(e) =>
              setSeatIds(
                e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter((s) => s)
              )
            }
          />
        </div>
        <div>
          <label>Passenger Name:</label>
          <input
            type="text"
            value={passengerName}
            onChange={(e) => setPassengerName(e.target.value)}
          />
        </div>
        <div>
          <label>Passenger Email:</label>
          <input
            type="email"
            value={passengerEmail}
            onChange={(e) => setPassengerEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Journey Date:</label>
          <input
            type="datetime-local"
            value={journeyDate}
            onChange={(e) => setJourneyDate(e.target.value)}
          />
        </div>
        <div>
          <label>Group Size:</label>
          <input
            type="number"
            min="1"
            max="8"
            value={groupSize}
            onChange={(e) => setGroupSize(Number(e.target.value))}
          />
        </div>
        <button type="submit">Create Booking</button>
      </form>
    </div>
  );
}

function GroupSeatsFinder() {
  const [trainId, setTrainId] = useState("");
  const [compartmentId, setCompartmentId] = useState("");
  const [groupSize, setGroupSize] = useState(1);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFindSeats = async () => {
    const requestData = {
      train_id: trainId,
      compartment_id: compartmentId,
      group_size: groupSize,
    };

    try {
      const res = await fetch("/find-group-seats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.detail || "Failed to find seats");
        return;
      }

      const data = await res.json();
      setResult(data);
      setError(null);
    } catch (err) {
      setError("Error finding seats");
    }
  };

  return (
    <div>
      <h2>Find Group Seats</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && (
        <div>
          <p>Seat IDs: {result.seat_ids.join(", ")}</p>
          <p>Seat Numbers: {result.seat_numbers.join(", ")}</p>
        </div>
      )}
      <div>
        <label>Train ID:</label>
        <input
          type="text"
          value={trainId}
          onChange={(e) => setTrainId(e.target.value)}
        />
      </div>
      <div>
        <label>Compartment ID:</label>
        <input
          type="text"
          value={compartmentId}
          onChange={(e) => setCompartmentId(e.target.value)}
        />
      </div>
      <div>
        <label>Group Size:</label>
        <input
          type="number"
          min="1"
          max="8"
          value={groupSize}
          onChange={(e) => setGroupSize(Number(e.target.value))}
        />
      </div>
      <button onClick={handleFindSeats}>Find Seats</button>
    </div>
  );
}

export default function BookingApp() {
  return (
    <div>
      <BookingForm />
      <hr />
      <GroupSeatsFinder />
    </div>
  );
}
