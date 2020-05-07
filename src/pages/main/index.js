import React, { Component } from 'react';
import api from '../../services/api.js';
import './styles.css';
import { Link } from 'react-router-dom';


export default class Main extends Component {

    state = {
        products: [],
        productInfo: {},
        page: 1,
    };

    prevPage = () => {
        const { page, productInfo } = this.state;

        if (page === 1) return;

        const pageNumber = page - 1;
        this.loadProducts(pageNumber);
    }

    nextPage = () => {
        const { page, productInfo } = this.state;

        if (page === productInfo.pages) return;

        const pageNumber = page + 1;
        this.loadProducts(pageNumber);

    }

    componentDidMount(){
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        const { docs, ...productInfo } = response.data;
        
        this.setState({ products: docs, productInfo, page})
    };
    
    render() {
        //return <h1> Contagem de produtos: {this.state.products.length} </h1>
        const {products, page, productInfo } = this.state

        return (
            <div className='product-list'>
                {products.map(product => (
                    //<h2 key={product._id}>{product.title}</h2>
                    <article key={product._id}>
                        <p>{product.title}</p>
                        <p>{product.description}</p>

                        <Link to={`/products/${product._id}`}>Acessar</Link>
                    </article>
                ))}

                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === productInfo.page} onClick={this.nextPage}>Próximo</button>
                </div>

            </div>
        )

    }
}