import React, { useState, useEffect } from 'react';
import './App.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddTimer from './Components/AddTimer';
import { Card, CardHeader } from '@mui/material';

function App() {
  const [timers, setTimers] = useState([]);
  const [value, setValue] = useState();
  const [isclicked, setIsClicked] = useState(false);
  const addTimers = () => {
    let time = new Date();
    let newtimers = JSON.parse(localStorage.getItem('timers')) || timers;
    newtimers.push({
      'startTime': `${time.toLocaleDateString()} ${time.toLocaleTimeString('en-US', { hour12: false })}`,
      'msleft': parseInt(value) * 100
    })
    setTimers(newtimers);
    localStorage.setItem('timers', JSON.stringify(newtimers));
    setIsClicked(!isclicked);
  }
  const deleteAction = (id) => {
    let newtimers = JSON.parse(localStorage.getItem('timers')) || timers
    delete newtimers[id];
    setTimers(newtimers);
    localStorage.setItem('timers', JSON.stringify(newtimers));
    setIsClicked(!isclicked);
  }
  const TimersList = () => {
    let gettimers = JSON.parse(localStorage.getItem('timers')) || timers;

    return gettimers.map((value, index) => {
      if (value && value.msleft) {
        let msvalue = value.msleft.toString()
        let len = msvalue.length;
        let finalstr = msvalue.substring(0, len - 2) + "," + msvalue.substring(len - 2);
        return (
          <Card variant="outlined" className="timer-card" >
            <CardHeader
              title={finalstr}
              action={<IconButton aria-label="delete" onClick={() => deleteAction(index)}>
                <DeleteIcon />
              </IconButton>}
            />
            {value.startTime}
          </Card>)
      }
      else {
        return null;
      }
    }
    )
  }
  const countdownTimer = () => {
    let gettimers = JSON.parse(localStorage.getItem('timers')) || timers;
    let newtimers = gettimers.filter((value) => {
      if (value && value.msleft > 0) {
        return true;
      }
      return false;
    }).map((value, index) => {
      return { ...value, 'msleft': value.msleft - 1 }

    })
    setTimers(newtimers);
    localStorage.setItem('timers', JSON.stringify(newtimers));
  }

  useEffect(() => {
    setTimeout(countdownTimer, 10);
  });

  return (
    <div className="App">
      <div className="DisplayTimer">
        {
          TimersList()
        }
      </div>
      <AddTimer
        timers={timers}
        addTimers={addTimers}
        value={value}
        setValue={setValue}
      />
    </div>
  );
}

export default App;
