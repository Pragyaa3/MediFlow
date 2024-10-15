import React, { useState } from 'react';
import { ethers } from 'ethers';  // Correct import for ethers
import PatientDashboard from './components/PatientDashboard'; // Ensure this path is correct
import DoctorDashboard from './components/DoctorDashboard'; // Ensure this path is correct

function App() {
  const [account, setAccount] = useState(null);
  const [userType, setUserType] = useState(null);  // 'patient' or 'doctor'

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum); // Create provider
      await provider.send("eth_requestAccounts", []); // Request account access
      const signer = await provider.getSigner(); // Corrected: await for signer
      const address = await signer.getAddress(); // Retrieve address
      setAccount(address);
    } else {
      alert("MetaMask is required to connect to the blockchain");
    }
  };

  const handleUserTypeSelection = (type) => {
    setUserType(type);
  };

  return (
    <div className="App">
      {!account ? (
        <div>
          <h2>MediFlow - Web3 Healthcare</h2>
          <button onClick={connectWallet}>Connect MetaMask</button>
        </div>
      ) : (
        <div>
          {!userType ? (
            <div>
              <h3>Welcome, {account}</h3>
              <p>Select user type:</p>
              <button onClick={() => handleUserTypeSelection('patient')}>Patient</button>
              <button onClick={() => handleUserTypeSelection('doctor')}>Doctor</button>
            </div>
          ) : userType === 'patient' ? (
            <PatientDashboard account={account} />
          ) : (
            <DoctorDashboard account={account} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
