import React, {Component} from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';

import './style.css';

export default class Main extends Component {
    //Onde a gente irá armazenar os valores resgatados
    //desse modo o meu método render sempre irá escutar a variavel de "estado" e alterar sempre que for necessário
    state = {
        products: [], 
        productInfo: {},
        page: 1,
    }

    //funções reservadas do react n são arrow functions
    componentDidMount(){
        this.loadProducts();
    }
    //funções criadas por nós são arrow functions, para poder enxergar o escopo da variável this
    loadProducts = async(page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        const {docs, ...productInfo} = response.data;

        this.setState({ products: docs, productInfo, page});
    }
    prevPage =() => {
        const {page, productInfo} = this.state;
        //verifico se minha página atual é igual a primeira página
        if(page === 1) return;

        const pageNumber = page - 1;
        this.loadProducts(pageNumber);
    }

    nextPage =() => {
        const {page, productInfo} = this.state;
        //verifico se minha página atual é igual a ultima página
        if(page === productInfo.pages) return;

        const pageNumber = page + 1;
        this.loadProducts(pageNumber);
    }

    render(){
        //desestruturação
        const {products, page, productInfo} = this.state;
        return (
            <div className="product-list">
                {products.map(product => (
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>

                        <Link to={`/products/${product._id}`}>Acessar</Link>
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próxima</button>
                </div>
            </div>
        );
    }
}