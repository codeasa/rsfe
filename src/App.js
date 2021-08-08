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
        content: {
          productName: "Set for Health",
          premium: 103000,
          paymentPeriod: 10
        }
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
            name: "ID card"
          },
          { name: "Driving License" }
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
      {request.steps[step].type === "summary" && (
        <Summary summary={request.steps[step].content}></Summary>
      )}
      {request.steps[step].type === "upload" && (
        <Upload upload={request.steps[step].content}></Upload>
      )}
      <button onClick={() => setStep(step + 1)}>Next</button>
    </div>
  );
}
const Upload = ({ upload }) => {
  console.log(upload);
  const value = upload.map((o) => {
    return (
      <div>
        {o.name} <input type="file" />
      </div>
    );
  });
  return <div>{value}</div>;
};

const Summary = ({ summary }) => {
  console.log({ summary });
  const value = Object.keys(summary).map((k, v) => (
    <div key={k}>
      {k} : {summary[k]}
    </div>
  ));
  return <div>{value}</div>;
};

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
