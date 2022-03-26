import React, {useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';

import './styles.css';
import DeleteIcon from '@mui/icons-material/Delete';

import Popper from '@mui/base/PopperUnstyled';
import { Box } from '@mui/system';
import { Button, IconButton, TextField } from '@mui/material';

import api from '../../services/api';

export default function ProductCategory() {
    const [productCategories, setProductCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const[popperId, setPopperId] = useState();
    const[openPopper, setOpenPopper] = useState(false);
    const[anchorEl, setAnchorEl] = useState();

    const[popperValueName, setPopperValueName] = useState('');
    const[popperValueDescription, setPopperValueDescription] = useState('');


    useEffect(()=>{
        setProductCategories([]);

        async function loadProductCategories() {
            
            if(loading){
                return;
            }
    
            setLoading(true);
    
            const response = await api.get('product-category');
    
            setProductCategories([...productCategories, ...response.data]);
            setLoading(false);
        }

        loadProductCategories();
    }, []);

    useEffect(() => {
        if (popperId !== 0) {
            async function getPopperValues() {
                
                api.get('product-category', {params: {_id: popperId}}).then((response) => {
                    const data = response.data;

                    setPopperValueName(data[0].name);
                    setPopperValueDescription(data[0].description);

                }).catch((error) => {
                    console.log("Error while fetching data.")
                });
            }

            getPopperValues();
        }
    }, [openPopper]);

    const handleClick = (id) => (e) => {
        setAnchorEl(e.currentTarget);
        setOpenPopper((prev) => !prev);
        setPopperId(id);
    }

    function handleClickCreate(e) {
        setAnchorEl(e.currentTarget);
        setOpenPopper((prev) => !prev);
        setPopperId(0);
    }

    function handleChangeName(e) {
        setPopperValueName(e.target.value);
    }

    function handleChangeDescription(e) {
        setPopperValueDescription(e.target.value);
    }

    function handleSubmitCreate(e) {
        e.preventDefault();

        api.post('product-category', {data: {name: popperValueName, description: popperValueDescription}})
        .then((response) => {
            alert("Criado com sucesso.")
        }).catch((error) => {
            alert("Erro ao criar.")
        })
    }

    function handleSubmitUpdate(e) {
        e.preventDefault();

        api.put(`product-category/${popperId}`, {data: {name: popperValueName, description: popperValueDescription}})
        .then((response) => {
            alert("Atualizado com sucesso.")
        }).catch((error) => {
            alert("Erro ao atualizar.")
        })
    }

    function UpdateOrDelete() {
        return (
            <form className="popup-form" onSubmit={handleSubmitUpdate}>
                <TextField fullWidth margin='normal' label="Nome" value={popperValueName} onChange={handleChangeName} />
                <TextField fullWidth margin='normal' label="Descrição" value={popperValueDescription} onChange={handleChangeDescription} />
                <Button style={{marginTop: 10}} variant="outlined" type="submit">
                    Update
                </Button>
                <IconButton style={{float: "right", marginTop: 10}} color="error">
                    <DeleteIcon />
                </IconButton>
            </form>
        )
    }

    function Create() {
        return (
            <form className="popup-form" onSubmit={handleSubmitCreate}>
                <TextField fullWidth margin='normal' label="Nome"/>
                <TextField fullWidth margin='normal' label="Descrição" multiline />
                <Button style={{marginTop: 10}} variant="outlined" color="success" type='submit'>
                    Criar
                </Button>
            </form>
        )
    }
    
    return (
        <>
        <Popper id={popperId} open={openPopper} anchorEl={anchorEl}>
            <Box sx={{border: 1, p: 1, height: 200, bgcolor: "darkgray", display: "grid", padding: 3}}>
                {popperId === 0 ? <Create /> : <UpdateOrDelete />}
            </Box >
        </Popper>
        <div className="main-frame-category">
            <h1 className="category-title">Categoria dos Produtos</h1>
            <section className="product-category-item-space">
                <div className="product-category-item product-category-item-new" onClick={handleClickCreate}>
                    <h3>Criar</h3>
                    <p>Nova categoria</p>
                </div>
                {productCategories.map((productCategory) => (
                    <div key={productCategory._id} className="product-category-item" onClick={handleClick(productCategory._id)}>
                        <h3>{productCategory.name}</h3>
                        <p>{productCategory.description}</p>
                    </div>
                ))}
            </section>
        </div>
        </>
    )
}