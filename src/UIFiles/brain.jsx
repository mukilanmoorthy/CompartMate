/**
 * Generates a compartment layout with upper, middle, and lower berths.
 * This produces seats:
 *   Row 1: UB11, UB12
 *   Row 2: MB21, MB22
 *   Row 3: LB31, LB32
 *
 * @param {string} compartmentId - The unique ID for the compartment.
 * @param {string} name - The name of the compartment (e.g., "First Class").
 * @returns {object} A compartment object with seats.
 */
function generateUpperMiddleLowerLayout(compartmentId, name) {
  const seats = [];
  const rowLabels = ["UB", "MB", "LB"];
  const cols = 2;
  for (let row = 0; row < rowLabels.length; row++) {
    for (let col = 1; col <= cols; col++) {
      const seatLabel = rowLabels[row];
      // Create seat number: e.g., "UB11", "UB12", "MB21", etc.
      const seatNumber = `${seatLabel}${row + 1}${col}`;
      const is_available = Math.random() > 0.1;
      seats.push({
        id: `${compartmentId}-seat-${row + 1}-${col}`,
        number: seatNumber,
        is_available,
        position: { row: row + 1, col },
      });
    }
  }
  return {
    id: compartmentId,
    name,
    seats,
  };
}

/**
 * Generates an Economy Class layout with a custom arrangement.
 * Each row has two sections with fixed labels:
 * Left: "W", "M", "S" and Right: "S", "M", "W"
 *
 * @param {string} compartmentId - The unique ID for the compartment.
 * @param {string} name - The name of the compartment ("Economy Class").
 * @param {number} rows - Number of rows.
 * @returns {object} A compartment object with seats.
 */
function generateEconomyLayout(compartmentId, name, rows) {
  const seats = [];
  // Fixed labels for each seat in a row
  const labels = ["W", "M", "S", "S", "M", "W"];
  const cols = labels.length;
  for (let row = 1; row <= rows; row++) {
    for (let col = 1; col <= cols; col++) {
      const seatLabel = labels[col - 1];
      // Create seat number as label + row (e.g., "W1", "M1", etc.)
      const seatNumber = `${seatLabel}${row}`;
      const is_available = Math.random() > 0.1;
      seats.push({
        id: `${compartmentId}-seat-${row}-${col}`,
        number: seatNumber,
        is_available,
        position: { row, col },
      });
    }
  }
  return {
    id: compartmentId,
    name,
    seats,
  };
}

/**
 * Generates a Sleeper Class layout with custom row labels.
 * Row 1: "UB" for both seats
 * Row 2: "MB" for both seats
 * Row 3: "LB" for both seats
 *
 * @param {string} compartmentId - The unique ID for the compartment.
 * @param {string} name - The name of the compartment ("Sleeper Class").
 * @returns {object} A compartment object with seats.
 */
function generateSleeperLayout(compartmentId, name) {
  const seats = [];
  const rowLabels = ["UB", "MB", "LB"];
  const cols = 2;
  for (let row = 0; row < rowLabels.length; row++) {
    for (let col = 1; col <= cols; col++) {
      const seatLabel = rowLabels[row];
      // Create seat number using the label, row (1-indexed), and column.
      const seatNumber = `${seatLabel}${row + 1}${col}`;
      const is_available = Math.random() > 0.1;
      seats.push({
        id: `${compartmentId}-seat-${row + 1}-${col}`,
        number: seatNumber,
        is_available,
        position: { row: row + 1, col },
      });
    }
  }
  return {
    id: compartmentId,
    name,
    seats,
  };
}

/**
 * Simulate an API call to list trains.
 * Returns a Response-like object with JSON data representing one train with multiple compartments.
 */
async function list_trains() {
  const data = {
    trains: [
      {
        id: "train-real-1",
        name: "Real Express 101",
        compartments: [
          // First Class: using upper, middle, lower layout => UB11, UB12, MB21, MB22, LB31, LB32
          generateUpperMiddleLowerLayout("comp-first", "First Class"),
          // Second Class: using the same layout as First Class
          generateUpperMiddleLowerLayout("comp-second", "Second Class"),
          // Economy Class: Custom layout "W M S   S M W" => 4 rows x 6 columns
          generateEconomyLayout("comp-economy", "Economy Class", 4),
          // Sleeper Class: Custom layout with row labels "UB", "MB", "LB"
          generateSleeperLayout("comp-sleeper", "Sleeper Class"),
        ],
      },
    ],
  };

  return new Response(JSON.stringify(data), { status: 200 });
}

/**
 * Simulate an API call to create a booking.
 * Returns a Response-like object with the newly created booking data.
 */
async function create_booking(bookingData) {
  const data = {
    id: "booking-" + Math.random().toString(36).substring(2, 10),
    train_id: bookingData.train_id,
    train_name: "Real Express 101",
    compartment_id: bookingData.compartment_id,
    // Determine compartment name based on the ID (for simulation)
    compartment_name:
      bookingData.compartment_id === "comp-first"
        ? "First Class"
        : bookingData.compartment_id === "comp-second"
        ? "Second Class"
        : bookingData.compartment_id === "comp-economy"
        ? "Economy Class"
        : "Sleeper Class",
    seat_ids: bookingData.seat_ids,
    seat_numbers: bookingData.seat_ids.map((_, index) => `Seat ${index + 1}`),
    passenger_name: bookingData.passenger_name,
    passenger_email: bookingData.passenger_email,
    journey_date: bookingData.journey_date,
    booking_date: new Date().toISOString(),
    status: "confirmed",
    group_size: bookingData.group_size,
  };

  return new Response(JSON.stringify(data), { status: 200 });
}

/**
 * Simulate an API call to find group seats.
 * For this example, the function returns a set of seat IDs from the first row of the requested compartment.
 */
async function find_group_seats({ train_id, compartment_id, group_size }) {
  const seat_ids = [];
  // For simplicity, pick seats from the first row
  for (let i = 1; i <= group_size; i++) {
    seat_ids.push(`${compartment_id}-seat-1-${i}`);
  }
  const data = { seat_ids };
  return new Response(JSON.stringify(data), { status: 200 });
}

export default {
  list_trains,
  create_booking,
  find_group_seats,
};
