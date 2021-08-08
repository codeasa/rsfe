import "./styles.css";
import React, { useState, useEffect } from "react";

export default function App() {
  const [step, setStep] = useState(0);

  const request = {
    steps: [
      {
        type: "auth",
        content: {
          id: "1234",
          birthday: "0607"
        }
      },
      {
        type: "summary",
        content: [{}]
      },
      {
        type: "review",
        content: [
          {
            name: ""
          }
        ]
      },
      {
        type: "upload",
        content: [
          {
            name: ""
          },
          { name: "" }
        ]
      },
      {
        type: "sign",
        content: [
          {
            role: "",
            name: ""
          }
        ]
      }
    ]
  };

  return (
    <div className="App">
      <h1>{request.steps[step].type}</h1>
      {request.steps[step].type === "auth" && (
        <Auth auth={request.steps[step].content}></Auth>
      )}

      <button onClick={() => setStep(step + 1)}>Next</button>
    </div>
  );
}

const Auth = ({ auth }) => {
  const [state, setState] = useState({});
  useEffect(() => {
    console.log({
      state
    });
  }, [state]);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    var newState = {};

    Object.assign(newState, state, {
      [name]: value
    });
    setState(newState);
  };

  const input = Object.keys(auth).map((key) => {
    return (
      <div key={key}>
        {key}:
        <input key={key} name={key} onChange={handleInputChange} />
      </div>
    );
  });

  return (
    <div>
      {input}
      <button
        onClick={() => {
          console.log({
            state,
            auth
          });
        }}
      >
        Check
      </button>
    </div>
  );
};
