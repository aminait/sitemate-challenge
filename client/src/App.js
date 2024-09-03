import { useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import TicketList from './components/TicketList';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    const data = [
      {
        id: 1,
        title: 'hi',
        description: 'sample description',
      },
    ];
    setTickets(data);
  };

  useEffect(() => {
    fetchTickets();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={'/logo/sitemate.webp'} className="App-logo" alt="logo" />
        <Stack sx={{ mt: 4 }} display="flex" flexDirection="column" spacing={4}>
          {tickets.length ? <TicketList tickets={tickets} /> : <p>No Tickets created</p>}
          <Button variant="contained" sx={{ mt: 4 }}>
            Create Issue
          </Button>
        </Stack>
      </header>
    </div>
  );
}

export default App;
