import React from "react";
import { Layout } from "components/Layout";

export default function MyBookings() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
          <p className="text-muted-foreground mt-2">
            View and manage your train seat bookings.
          </p>
        </div>

        <div className="bg-card rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Trips</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              List of upcoming bookings will be displayed here, including trip details and ticket information.
            </p>
          </div>
        </div>

        <div className="bg-card rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Past Trips</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              History of past bookings will be displayed here.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
