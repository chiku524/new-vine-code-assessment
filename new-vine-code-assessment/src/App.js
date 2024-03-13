import React, {useState} from "react";
import Modal from "./components/Modal";
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onModalClose = () => {
    setIsModalOpen(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h4>Hi there! This is the base page.</h4><h5>No content was provided for this section, but do make sure to open the Modal and interact with the page.</h5>
        <div className="modal-open-btn" onClick={() => setIsModalOpen(true)}>
          <h2>Click here to open the Modal!</h2>
        </div>
      </header>
      {isModalOpen ? <Modal isOpen={isModalOpen} onModalClose={onModalClose} /> : null}
    </div>
  );
}

export default App;
