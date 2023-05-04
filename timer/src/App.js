import React, { useState, useEffect } from 'react';
import './App.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddTimer from './Components/AddTimer';
import { Card, CardHeader } from '@mui/material';

function App() {
  const [timers, setTimers] = useState([
    { startTime: '4/5/2023 18:23:27', msleft: 43 },
    { startTime: '4/5/2023 18:23:27', msleft: 52 }
  ]);
  const [value, setValue] = useState();
  const [isclicked, setIsClicked] = useState(false);
  const addTimers = () => {
    let time = new Date();
    let newtimers = timers;
    newtimers.push({
      'startTime': `${time.toLocaleDateString()} ${time.toLocaleTimeString('en-US', { hour12: false })}`,
      'msleft': parseInt(value)
    })
    setTimers(newtimers);
    setIsClicked(!isclicked);
  }
  const deleteAction = (id) => {
    let newtimers = timers
    delete newtimers[id];
    setTimers(newtimers);
    setIsClicked(!isclicked);
  }
  const TimersList = () =>
    timers.map((value, index) => {
      if (value && value.msleft) {
        return (
          <Card variant="outlined" className="timer-card" >
            <CardHeader
              title={value.msleft}
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
  const countdownTimer = () => {

    let newtimers = timers.filter((value) => {
        if (value.msleft > 0) {
          return true;
        }
      return false;
    }).map((value, index) => {
          return { ...value, 'msleft': value.msleft - 1 }
 
    })
    setTimers(newtimers);
    setIsClicked(!isclicked);
  }

  useEffect(() => {
    setTimeout(countdownTimer, 1000);
  });

  useEffect(() => {
    TimersList();
  }, [isclicked])
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
