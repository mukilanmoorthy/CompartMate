import React, { useState } from "react";
import { Layout } from "../Uicomponents/Layout";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [journeyDate, setJourneyDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [trains, setTrains] = useState([]);
  const [error, setError] = useState(null);

  // Replace with your actual API endpoint
  const API_URL = "https://api.example.com/search-trains"; 

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_URL}?from=${fromStation}&to=${toStation}&date=${journeyDate}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch trains. Please try again.");
      }
      const data = await response.json();
      setTrains(data.trains);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-6">Find Your Train 🚆</h1>
        
        {/* Train Search Form */}
        <form
          onSubmit={handleSearch}
          className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6"
        >
          <div>
            <label
              htmlFor="fromStation"
              className="block text-sm font-medium text-gray-700"
            >
              From Station
            </label>
            <input
              id="fromStation"
              type="text"
              value={fromStation}
              onChange={(e) => setFromStation(e.target.value)}
              placeholder="Enter departure station"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="toStation"
              className="block text-sm font-medium text-gray-700"
            >
              To Station
            </label>
            <input
              id="toStation"
              type="text"
              value={toStation}
              onChange={(e) => setToStation(e.target.value)}
              placeholder="Enter destination station"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="journeyDate"
              className="block text-sm font-medium text-gray-700"
            >
              Journey Date
            </label>
            <input
              id="journeyDate"
              type="date"
              value={journeyDate}
              onChange={(e) => setJourneyDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition-colors"
          >
            {loading ? "Searching..." : "Search Trains"}
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        {/* Train Results */}
        {trains.length > 0 && (
          <div className="mt-10 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Available Trains</h2>
            <ul className="space-y-4">
              {trains.map((train) => (
                <li
                  key={train.id}
                  className="p-4 border rounded-lg hover:shadow transition-shadow cursor-pointer"
                  onClick={() => navigate(`/train/${train.id}`)}
                >
                  <h3 className="text-xl font-semibold">{train.name}</h3>
                  <p className="text-gray-600">
                    {train.fromStation} → {train.toStation} | {train.departureTime}
                  </p>
                  <p className="text-sm text-gray-500">Duration: {train.duration}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
}
