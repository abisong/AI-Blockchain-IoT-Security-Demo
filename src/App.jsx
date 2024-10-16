import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Mock AI prediction
const predictAI = (input) => {
  const predictions = ['High demand', 'Low demand', 'Moderate demand'];
  return predictions[Math.floor(Math.random() * predictions.length)];
};

// Mock blockchain transaction
const addTransaction = (ledger, from, to, amount) => {
  return [...ledger, { from, to, amount, timestamp: new Date().toISOString() }];
};

// Mock IoT sensor data
const generateSensorData = () => {
  return Math.random() * 100;
};

// Basic encryption
const encrypt = (data, key) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
};

const decrypt = (ciphertext, key) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, key);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

function App() {
  const [prediction, setPrediction] = useState('');
  const [ledger, setLedger] = useState([]);
  const [sensorData, setSensorData] = useState([]);
  const [encryptedData, setEncryptedData] = useState('');
  const [decryptedData, setDecryptedData] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prevData => {
        const newData = [...prevData, generateSensorData()];
        return newData.slice(-10);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handlePredict = () => {
    setPrediction(predictAI('Some input data'));
  };

  const handleAddTransaction = () => {
    setLedger(prevLedger => addTransaction(prevLedger, 'Alice', 'Bob', 10));
  };

  const handleEncrypt = () => {
    const data = { secret: 'This is a secret message' };
    setEncryptedData(encrypt(data, 'mySecretKey'));
  };

  const handleDecrypt = () => {
    if (encryptedData) {
      setDecryptedData(JSON.stringify(decrypt(encryptedData, 'mySecretKey')));
    }
  };

  const chartData = {
    labels: sensorData.map((_, index) => index),
    datasets: [
      {
        label: 'Sensor Data',
        data: sensorData,
        fill: false,
        borderColor: 'rgb(46, 204, 113)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="App">
      <h1>AI-Blockchain-IoT-Security Demo</h1>
      
      <div className="section">
        <h2>AI Prediction</h2>
        <button onClick={handlePredict}>Predict</button>
        <div className="data-display">Prediction: {prediction || 'Click "Predict" to generate'}</div>
      </div>

      <div className="section">
        <h2>Blockchain Ledger</h2>
        <button onClick={handleAddTransaction}>Add Transaction</button>
        <ul>
          {ledger.map((transaction, index) => (
            <li key={index}>
              {transaction.from} sent {transaction.amount} to {transaction.to} at {transaction.timestamp}
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2>IoT Sensor Data</h2>
        <Line data={chartData} />
      </div>

      <div className="section">
        <h2>Security (Encryption/Decryption)</h2>
        <button onClick={handleEncrypt}>Encrypt</button>
        <button onClick={handleDecrypt} style={{ marginLeft: '10px' }}>Decrypt</button>
        <div className="data-display">Encrypted: {encryptedData || 'Click "Encrypt" to generate'}</div>
        <div className="data-display">Decrypted: {decryptedData || 'Click "Decrypt" to reveal'}</div>
      </div>
    </div>
  );
}

export default App;