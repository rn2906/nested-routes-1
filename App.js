import React from "react";
import axios from "axios";

function App() {
  const handleStartSequence = () => {
    axios
      .get("http://localhost:3001/start-sequence")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handleCancelSequence = () => {
    axios
      .get("http://localhost:3001/cancel-sequence")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handleNavigateToRoute5 = () => {
    axios
      .get("http://localhost:3001/route5")
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div className="App">
      <h1>Navigate to Routes</h1>
      <button onClick={handleStartSequence}>
        Start Sequence (Routes 1 to 4)
      </button>
      <button onClick={handleCancelSequence}>Cancel Sequence</button>
      <button onClick={handleNavigateToRoute5}>Go to Route 5</button>
    </div>
  );
}

export default App;
