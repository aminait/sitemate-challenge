import { useEffect, useState } from 'react';
import { Card, CardContent, Button, Stack, Tooltip, Typography, Alert } from '@mui/material';
import { getTicketById, deleteTicketById, updateTicketById, createNewTicket } from './api/tickets';
import './App.css';
import FormDialog from './components/FormDialog';

function App() {
  const [createdTicket, setCreatedTicket] = useState(null);
  const [readTicket, setReadTicket] = useState(null);

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const fetchTicketById = async (id) => {
    const response = await getTicketById(id);
    console.log('fetchTicketById -> response:', response);
    const { data } = response;
    console.log('fetchTicketById -> data:', data);
    setReadTicket(data);
  };

  const deleteTicket = async (id) => {
    const response = await deleteTicketById(id);
    setReadTicket(null);
    setCreatedTicket(null);
  };

  const createTicket = async (newTicket) => {
    const response = await createNewTicket(newTicket);
    const { data } = response;
    setCreatedTicket(data);
  };

  const updateTicket = async (id, updates) => {
    const response = await updateTicketById(id, updates);
    const { data } = response;
    setCreatedTicket(data);
    setReadTicket(data);
  };

  useEffect(() => {
    // fetchTicketById();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={'/logo/sitemate.webp'} className="App-logo" alt="logo" />

        <FormDialog
          issue={createdTicket}
          open={openCreate}
          setOpen={setOpenCreate}
          handleSubmit={createTicket}
        />

        <FormDialog
          issue={createdTicket}
          open={openEdit}
          setOpen={setOpenEdit}
          handleSubmit={updateTicket}
        />

        <Stack
          sx={{ mt: 4 }}
          display="flex"
          flexDirection="column"
          spacing={4}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Button variant="contained" sx={{ mt: 4 }} onClick={() => setOpenCreate(true)}>
            1. Create Issue
          </Button>
          {createdTicket ? (
            <>
              <Card>
                <CardContent>
                  <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    Created Issue ID:
                  </Typography>
                  <Typography gutterBottom sx={{ color: 'text', fontSize: 14 }}>
                    {createdTicket.id}
                  </Typography>
                </CardContent>
              </Card>
            </>
          ) : (
            <></>
          )}

          <Tooltip title="Start by creating issue and get ID from it to read">
            <div>
              <Button
                variant="contained"
                disabled={!createdTicket}
                fullWidth
                onClick={() => fetchTicketById(createdTicket.id)}
              >
                2. Read Issue
              </Button>
            </div>
          </Tooltip>

          {readTicket ? (
            <>
              <>
                <Card>
                  <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                      Read Issue:
                    </Typography>
                    <Typography gutterBottom sx={{ color: 'text', fontSize: 14 }}>
                      ID: {readTicket.id}
                    </Typography>
                    <Typography gutterBottom sx={{ color: 'text', fontSize: 14 }}>
                      Title: {readTicket.title}
                    </Typography>
                    <Typography gutterBottom sx={{ color: 'text', fontSize: 14 }}>
                      Description: {readTicket.description}
                    </Typography>
                  </CardContent>
                </Card>
              </>
            </>
          ) : (
            <></>
          )}

          <Button
            variant="contained"
            sx={{ mt: 4 }}
            disabled={!createdTicket}
            onClick={() => setOpenEdit(true)}
          >
            3. Update Issue
          </Button>

          <Button
            variant="contained"
            sx={{ mt: 4 }}
            disabled={!createdTicket}
            onClick={() => deleteTicket(createdTicket.id)}
          >
            4. Delete Issue
          </Button>
        </Stack>
      </header>
    </div>
  );
}

export default App;
