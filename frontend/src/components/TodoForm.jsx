
import React, { useState } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { useNow } from "@mui/x-date-pickers/internals";

export const TodoForm = ({addTodo}) => {
    const [value, setValue]             = useState('');
    const [modalOpen, setModalOpen]     = useState(false);
    const [modalClose, setModalClose]   = useState(false);
    const [title, setTitle]             = useState('');
    const [description, setDescription] = useState('');
    const [term, setTerm]               = useState(dayjs());
    const [type, setType]               = useState(null);
    const [priority, setPriority]       = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        const task = {
            title
            ,description
            ,type: type
            ,priority
            ,term: term.toISOString().split('T')[0]
            ,taskCompleted: 0
        };
        await addTodo(task);
        setModalOpen(false);
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
      };

    return (
        <div>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="todo-input" placeholder="Qual sua nova tarefa?"/>
            <button  onClick={() => setModalOpen(true)}className="todo-btn" style={{marginBottom: '1rem'}}>Adicionar Tarefa</button>
            <Modal open={modalOpen} onClose={modalClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
                <Box sx={{ ...style, width: 700}} >
                    <h2 id="parent-modal-title">Adicionar Tarefa</h2>
                    <FormControl fullWidth={true}>
                        <TextField id="outlined-basic" label="Título" style={{marginTop: '1rem'}} value={title} onChange={(e) => setTitle(e.target.value)} variant="outlined" />
                    </FormControl>
                    <FormControl fullWidth={true}>
                        <TextField id="outlined-basic" label="Descrição" style={{marginTop: '1rem'}} value={description} onChange={(e) => setDescription(e.target.value)} variant="outlined" />
                    </FormControl>
                    <div>
                        <FormControl style={{marginTop: '1rem'}}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker label={"Prazo Final"} value={term} />
                            </LocalizationProvider>
                        </FormControl>

                        <FormControl style={{marginTop: '1rem'}} sx={{ m: 1, minWidth: 200 }}>
                            <InputLabel id="demo-simple-select-helper-label">Tipo de Tarefa</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={type}
                                label="Tipo de Tarefa"
                                onChange={(e)=> setType(e.target.value)}
                            >
                                <MenuItem value={1}>Trabalho</MenuItem>
                                <MenuItem value={2}>Faculdade</MenuItem>
                                <MenuItem value={3}>Outros</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl style={{marginTop: '1rem'}} sx={{ minWidth: 170 }}>
                            <InputLabel id="demo-simple-select-helper-label">Prioridade</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={priority}
                                label="Tipo de Tarefa"
                                onChange={(e)=> setPriority(e.target.value)}
                            >
                                <MenuItem value={1}>Urgente</MenuItem>
                                <MenuItem value={2}>Média</MenuItem>
                                <MenuItem value={3}>Leve</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <Button variant="contained" onClick={handleSubmit} style={{marginTop:'2rem'}}>Adicionar Tarefa</Button>
                </Box>
            </Modal>
        </div>
    )
}