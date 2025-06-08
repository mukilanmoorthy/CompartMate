// pages/Ticket.jsx
import React, { useRef } from "react";
import { Layout } from "../Uicomponents/Layout"; // Adjust if Layout is a named or default export
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf"; // For jsPDF version 2.x. For version 1.x, use: import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Ticket() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.bookingData;
  const ticketRef = useRef();

  if (!bookingData) {
    return (
      <Layout>
        <div style={{ padding: "16px" }}>
          <p>No booking details found. Please go back and book a ticket.</p>
          <button onClick={() => navigate("/")}>Go Back</button>
        </div>
      </Layout>
    );
  }

  const handleDownload = () => {
    if (ticketRef.current) {
      html2canvas(ticketRef.current, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const margin = 10; // margin in mm
        const imgWidth = pdfWidth - margin * 2;
        // Calculate image height based on the canvas dimensions
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);
        pdf.save("ticket.pdf");
      });
    }
  };

  return (
    <Layout>
      <div style={{ padding: "16px" }}>
        {/* Ticket Card */}
        <div
          ref={ticketRef}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
            maxWidth: "400px",
            margin: "auto",
            backgroundColor: "#fff",
          }}
        >
          <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px", textAlign: "center" }}>
            Train Ticket
          </h1>
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

        {/* Action Buttons */}
        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <button onClick={handleDownload} style={{ marginRight: "8px", padding: "8px 16px" }}>
            Download Ticket
          </button>
          <button onClick={() => window.print()} style={{ padding: "8px 16px" }}>
            Print Ticket
          </button>
        </div>
      </div>
    </Layout>
  );
}
