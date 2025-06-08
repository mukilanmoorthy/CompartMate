import React, { useEffect, useState } from "react";

function TrainList() {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/trains")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch trains");
        }
        return response.json();
      })
      .then((data) => {
        setTrains(data.trains);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading trains...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Available Trains</h1>
      {trains.map((train) => (
        <div
          key={train.id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "1rem",
            padding: "1rem",
          }}
        >
          <h2>{train.name}</h2>
          {train.compartments.map((compartment) => (
            <div key={compartment.id} style={{ marginLeft: "1rem", marginTop: "1rem" }}>
              <h3>{compartment.name}</h3>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {compartment.seats.map((seat) => (
                  <div
                    key={seat.id}
                    style={{
                      border: "1px solid #aaa",
                      margin: "0.5rem",
                      padding: "0.5rem",
                      backgroundColor: seat.is_available ? "#dff0d8" : "#f2dede",
                    }}
                  >
                    <p>{seat.number}</p>
                    <small>
                      Row {seat.position.row}, Col {seat.position.col}
                    </small>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TrainList;
