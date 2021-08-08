import styles from "./styles.css";
import React, { useState, useEffect } from "react";
import SignaturePad from "react-signature-canvas";
import Pdf from "@mikecousins/react-pdf";

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
      },
      {
        type: "done"
      }
    ]
  };

  return (
    <div>
      <h1>{request.steps[step].type}</h1>

      <div className="pure-form pure-form-aligned">
        <fieldset>
          {request.steps[step].type === "auth" && (
            <Auth auth={request.steps[step].content}></Auth>
          )}
          {request.steps[step].type === "summary" && (
            <Summary summary={request.steps[step].content}></Summary>
          )}
          {request.steps[step].type === "upload" && (
            <Upload upload={request.steps[step].content}></Upload>
          )}
          {request.steps[step].type === "review" && (
            <Review upload={request.steps[step].content}></Review>
          )}
          {request.steps[step].type === "sign" && (
            <Sign upload={request.steps[step].content}></Sign>
          )}
          {request.steps[step].type !== "done" && (
            <div className="pure-controls">
              <button onClick={() => setStep(step + 1)}>Next</button>
            </div>
          )}
        </fieldset>
      </div>
    </div>
  );
}

const Review = ({ review }) => {
  const [page, setPage] = useState(1);

  return (
    <Pdf file="./sample.pdf" page={page}>
      {({ pdfDocument, pdfPage, canvas }) => (
        <>
          {!pdfDocument && <span>Loading...</span>}
          {canvas}
          {Boolean(pdfDocument && pdfDocument.numPages) && (
            <nav>
              <ul className="pager">
                <li className="previous">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </button>
                </li>
                <li className="next">
                  <button
                    disabled={page === pdfDocument.numPages}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </Pdf>
  );
};

const Upload = ({ upload }) => {
  const value = upload.map((o) => {
    return (
      <div key={o.name} className="pure-control-group">
        <label>{o.name}</label>
        <input name={o.name} type="file" />
      </div>
    );
  });
  return <div>{value}</div>;
};

const Sign = ({ sign }) => {
  var sigPad = {};
  return (
    <div id="sign">
      <SignaturePad
        canvasProps={{ className: "signPad" }}
        ref={(ref) => {
          sigPad = ref;
        }}
      />
    </div>
  );
};
const Summary = ({ summary }) => {
  const value = Object.keys(summary).map((k, v) => (
    <div key={k} className="pure-g">
      <div className="pure-u-1-3">{k}</div>
      <div className="pure-u-1-3">{summary[k]}</div>
    </div>
  ));
  return <div>{value}</div>;
};

const Auth = ({ auth }) => {
  const [state, setState] = useState({});
  useEffect(() => {}, [state]);

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
      <div key={key} className="pure-control-group">
        <label>{key}</label>

        <input key={key} name={key} onChange={handleInputChange} />
      </div>
    );
  });

  return <div>{input}</div>;
};
