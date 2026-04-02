import { useState } from 'react';
import {
  Box,
  Button,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material';

/**
 * HardwareSet — displays one hardware set inside a project.
 * Props:
 *   hwSet       : { id, name, capacity, available }
 *   isMember    : boolean — only members can check in/out
 *   onCheckIn   : (hwSetId, qty) => void
 *   onCheckOut  : (hwSetId, qty) => void
 */
export default function HardwareSet({ hwSet, isMember, onCheckIn, onCheckOut }) {
  const [qty, setQty] = useState(1);

  const usedPercent = ((hwSet.capacity - hwSet.available) / hwSet.capacity) * 100;

  const handleQtyChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1) setQty(val);
  };

  return (
    <Box
      sx={{
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        p: 2,
        mb: 1,
        backgroundColor: '#fafafa',
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold">
        {hwSet.name}
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={0.5}>
        Available: {hwSet.available} / {hwSet.capacity}
      </Typography>

      <LinearProgress
        variant="determinate"
        value={usedPercent}
        color={usedPercent > 80 ? 'error' : 'primary'}
        sx={{ mb: 1.5, height: 8, borderRadius: 4 }}
      />

      {isMember && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <TextField
            label="Qty"
            type="number"
            size="small"
            value={qty}
            onChange={handleQtyChange}
            inputProps={{ min: 1 }}
            sx={{ width: 80 }}
          />
          <Button
            variant="outlined"
            size="small"
            onClick={() => onCheckOut(hwSet.id, qty)}
            disabled={qty > hwSet.available}
          >
            Check Out
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="success"
            onClick={() => onCheckIn(hwSet.id, qty)}
            disabled={hwSet.available >= hwSet.capacity}
          >
            Check In
          </Button>
        </Box>
      )}

      {!isMember && (
        <Typography variant="caption" color="text.disabled">
          Join this project to check in/out hardware.
        </Typography>
      )}
    </Box>
  );
}
