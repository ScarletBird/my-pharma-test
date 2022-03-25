import React, {useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';

export default function ProductCategory() {
    const [productCategories, setProductCategories] = useState([]);
    const [loading, setLoading] = useState(false);

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
    
    return (
        <div className="main-frame-category">
            <h1 className="category-title">Categoria dos Produtos</h1>
            <section className="product-category-item-space">
                <div className="product-category-item product-category-item-new">
                    <h3>Criar</h3>
                    <p>Nova categoria</p>
                </div>
                {productCategories.map((productCategory) => (
                    <div key={productCategory._id} className="product-category-item">
                        <h3>{productCategory.name}</h3>
                        <p>{productCategory.description}</p>
                    </div>
                ))}
            </section>
        </div>
    )
}