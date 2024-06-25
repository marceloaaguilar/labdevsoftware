import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faPenToSquare, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import httpTask from '../lib/httpTask';
import Swal from 'sweetalert2';
import Typography from '@mui/material/Typography';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import { FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';

export const TodoList = ({task}) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [modalEdit, setModalOpenEdit] = useState(false)
    const [title, setTitle]             = useState('');
    const [description, setDescription] = useState('');
    const [term, setTerm]               = useState(dayjs());
    const [type, setType]               = useState(null);
    const [priority, setPriority]       = useState('');


    const handleDelete = async () => {
        await httpTask.deleteTask(task.id);
    }

    const handleFind = async () => {
        await setModalOpen(true);
    }

    const handleEdit = async () => {
        setModalOpenEdit(true);
    }

    const handleSubmitEdit = async (task) => {
        await httpTask.editTask(task.id, task);
        setModalOpenEdit(false);
        Swal.fire({title: "Tarefa Atualizada com sucesso!", icon: "success"});
    }

    return(
        <div className="Todo">
            <p className={`${task.completed ? "completed" : "incompleted"}`}>
                {task.title}
            </p>
            <div>
                <FontAwesomeIcon className="find-icon"  onClick={handleFind} icon={faMagnifyingGlass} />
                <FontAwesomeIcon className="edit-icon"  onClick={handleEdit} icon={faPenToSquare} />
                <FontAwesomeIcon className='delete-icon' onClick={handleDelete} icon={faTrash}/>
            </div>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Sheet
                variant="plain"
                    size="lg"
                sx={{
                    maxWidth: 750,
                    borderRadius: 'md',
                    p: 5,
                    boxShadow: 'lg',
                }}
                >
                <ModalClose variant="plain" sx={{ m: 1 }} />
                <Typography
                    component="h2"
                    id="modal-title"
                    level="h1"
                    textColor="inherit"
                    fontWeight="lg"
                    fontSize={45}
                >
                    {task.title}
                </Typography>
                <Typography fontSize={15} id="modal-desc" textColor="text.tertiary">
                    {task.description}
                </Typography>
                <Typography style={{marginTop: '0.3rem'}} id="modal-desc" textColor="text.tertiary">
                    <b>Prioridade:</b> {task.priority === 1? 'Urgente' : 'Média'}
                </Typography>
                <Typography style={{marginTop: '0.3rem'}} id="modal-desc" textColor="text.tertiary">
                    <b>Prazo:</b> {new Date(task.term).toLocaleDateString()}
                </Typography>
                <Typography style={{marginTop: '0.3rem'}} id="modal-desc" textColor="text.tertiary">
                    <b>Tipo:</b> {task.type === 1? 'Trabalho' : 'Faculdade'}
                </Typography>
                </Sheet>
            </Modal>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={modalEdit}
                onClose={() => setModalOpenEdit(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Sheet
                variant="plain"
                    size="lg"
                sx={{
                    maxWidth: 750,
                    borderRadius: 'md',
                    p: 5,
                    boxShadow: 'lg',
                }}
                >
                <ModalClose variant="plain" sx={{ m: 1 }} />
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
                                <DatePicker label={"Prazo Final"} value={dayjs(term)} />
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
                    <Button variant="contained" onClick={()=> handleSubmitEdit(task)} style={{marginTop:'2rem'}}>Atualizar Tarefa</Button>
                </Sheet>
            </Modal>
            
        </div>
    )
}