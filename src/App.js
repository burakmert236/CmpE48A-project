import React, { useState, useEffect } from "react";
import './App.css';
const AWS = require('aws-sdk');

function App() {

  const [logs, setLogs] = useState([]);

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
    region: "eu-central-1"
  });

  useEffect(() => {
    const docClient = new AWS.DynamoDB.DocumentClient();

    docClient.scan({ TableName: "logs" }, function (err, data) {
      if (err) {
        console.log(err)
      } else {
        console.log(data);
        setLogs(data?.Items);
      }
    });
  }, [])

  const generateLogSentence = (type) => {
    if(type?.includes("cpu")) {
      const server_number = type?.split("_")[1];
      const limit = type?.split("_")[0]?.slice(3);

      return `Server ${server_number} exceeds %${limit} CPU utilization`;
    } else {
      const server_number = type?.split("_")[1];
      const limit = type?.split("_")[0]?.slice(9, 10);

      return `Server ${server_number} received at least ${limit}MB data`;
    }
  }

  const getDate = (text) => {
    const start = text?.indexOf('(');
    const end = text?.indexOf(')]');

    return text?.slice(start+1, end);
  }

  return (
    <div className="App">
      <div>
        <h2>CPU LOGS</h2>
        {
          logs?.filter(log => log?.type?.includes("cpu")).map(log => (
            <p>
              <span style={{fontWeight: "bolder"}}>Date: </span><span>{getDate(log?.reason)}</span>
              &nbsp; 
              &nbsp; 
              &nbsp; 
              <span style={{fontWeight: "bolder"}}>Log:  </span><span>{generateLogSentence(log?.type)}</span>
            </p>
          ))
        }
      </div>
      <div>
        <h2>NETWORK LOGS</h2>
        {
          logs?.filter(log => log?.type?.includes("networkIn")).map(log => (
            <p>
              <span style={{fontWeight: "bolder"}}>Date: </span><span>{getDate(log?.reason)}</span>
              &nbsp; 
              &nbsp; 
              &nbsp; 
              <span style={{fontWeight: "bolder"}}>Log:  </span><span>{generateLogSentence(log?.type)}</span>
            </p>
          ))
        }
      </div>
    </div>
  );
}

export default App;
