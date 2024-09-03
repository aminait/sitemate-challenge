import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({ issue, open, setOpen, handleSubmit }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            console.log('FormDialog -> formJson:', formJson);
            if (issue) {
              const updated = {
                title: formJson.title,
                description: formJson.description,
              };
              handleSubmit(issue.id, updated);
            } else {
              handleSubmit(formJson);
            }
            handleClose();
          },
        }}
      >
        <DialogTitle>{issue ? 'Edit Ticket' : 'Create Ticket'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={issue?.title || ''}
          />

          <TextField
            required
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={issue?.description || ''}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">{issue ? 'Update' : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
