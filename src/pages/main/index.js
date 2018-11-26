import React, {Component} from 'react';
import api from '../../services/api';

export default class Main extends Component {
    //Onde a gente irá armazenar os valores resgatados
    //desse modo o meu método render sempre irá escutar a variavel de "estado" e alterar sempre que for necessário
    state = {
        products: []
    }

    //funções reservadas do react n são arrow functions
    componentDidMount(){
        this.loadProducts();
    }
    //funções criadas por nós são arrow functions, para poder enxergar o escopo da variável this
    loadProducts = async() => {
        const response = await api.get('/products');
        console.log(response.data.docs);
        this.setState({ products: response.data.docs});
    }

    render(){
        return (
            <div className="product-list">
                {this.state.products.map(product => (
                    <h2 key={product._id}>{product.title}</h2>
                ))}
            </div>
        );
    }
}