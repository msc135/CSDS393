import './Home.css';
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import axios from 'axios'
import { addDays } from 'date-fns';
import { Link } from 'react-router-dom';

function FillForm() {
  const [date, setDate] = useState(addDays(new Date(), 2));
  const [direction, setDir] = useState(false);              // true = outgoing, false = incoming
  const [international, setInter] = useState(false);        // true = international, false = domestic


  // entering new flight into the database 
  const saveData = async (e) => {
    e.preventDefault();
    var currUser = window.localStorage.getItem("currUser");

    try {
      const response = await axios.post('http://localhost:4001/flights/create', {
        // Data to be sent to the server
      email: currUser,
      flighttime: date,
      direction: direction,
      international: international
      });
    } catch (error) {
      console.error(error);
    }
  }

  const handleDirChange = (e) => {
    setDir(e.target.value)
  }

  const handleInterChange = (e) => {
    setInter(e.target.value)
  }

  return (
    <div className="auth-form-container">
            <form action="" id="tripform">
                <label htmlFor="date">Date of Flight</label>
                <DatePicker minDate={addDays(new Date(), 2)} selected={date} onChange={(e) => setDate(e)} showTimeSelect timeIntervals={1} dateFormat="MMMM d, yyyy h:mmaa"/>

                <label htmlFor="direction">Outgoing or Incoming?</label>
                <div className="radioButtons1">
                    <div className="radio">
                        <label>
                            <input value="outgoing" checked={direction === "outgoing"} onChange={handleDirChange} name="direction" type="radio" />
                            Outgoing
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input value="incoming" checked={direction === "incoming"} onChange={handleDirChange} name="direction" type="radio" />
                            Incoming
                        </label>
                    </div>
                </div>

                <label htmlFor="interOrDom">International or Domestic?</label>
                <div className="radioButtons2">
                    <div className="radio">
                        <label>
                            <input value="international" checked={international === "international"} onChange={handleInterChange} name="interOrDom" type="radio"/>
                            International
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input value="domestic" checked={international === "domestic"} onChange={handleInterChange} name="interOrDom" type="radio"/>
                            Domestic
                        </label>
                    </div>
                </div>
                 
                  <button>
                      <label type="enter" onClick={saveData}>Submit</label>
                  </button>
                  <Link to="/GroupPage"> 
                     <button> 
                          View grouping
                     </button>
                  </Link>
                
            </form>
        </div>
  )
}

export default FillForm