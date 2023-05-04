
import { TextField, Button } from '@mui/material';

function AddTimer(props) {
    const { addTimers, value, setValue } = props;


    return (
        <div className="AddTimer">
            <TextField className="new-timer" type="number" label="New Timer" variant="outlined" onChange={(e) => setValue(e.target.value)} />
            <Button className="add-btn" variant="contained" onClick={addTimers}>Add</Button>
        </div>
    );
}

export default AddTimer;