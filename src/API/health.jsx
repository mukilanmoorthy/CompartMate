import React, { useEffect, useState } from "react";

function HealthCheck() {
  const [health, setHealth] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/health")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setHealth(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!health) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>API Health Check</h1>
      <p>Status: {health.status}</p>
      <p>Version: {health.version}</p>
    </div>
  );
}

export default HealthCheck;
