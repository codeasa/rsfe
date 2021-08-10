import styles from "./styles.css";
import React, { useState, useEffect } from "react";
import SignaturePad from "react-signature-canvas";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function App() {
  const [step, setStep] = useState(0);

  const requests = [
    {
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
          content: ["/plan.pdf", "/sample.pdf"]
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
    }
  ];

  var request = requests[0];

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
            <Review review={request.steps[step].content}></Review>
          )}
          {request.steps[step].type === "sign" && (
            <Sign upload={request.steps[step].content}></Sign>
          )}
          {request.steps[step].type !== "done" && (
            <div className="pure-controls">
              <button onClick={() => setStep(step + 1)}>Next Step</button>
            </div>
          )}
        </fieldset>
      </div>
    </div>
  );
}

const Review = ({ review }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [docNumber, setDocNumber] = useState(0);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const showBar = () => {
    return new Array(review.length).fill(0).map((v, k) => (
      <div
        onClick={() => {
          setDocNumber(k);
        }}
      >
        {k + 1}
      </div>
    ));
  };

  return (
    <div>
      <div>{showBar()}</div>
      <Document file={review[docNumber]} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
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
