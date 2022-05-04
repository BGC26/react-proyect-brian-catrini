import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import ItemList from '../../components/ItemList/ItemList';
import './ItemListContainer.css';
import camJuv from '../../assets/camiseta-clu-1.jpg';
import camEsp10 from '../../assets/camiseta-sel-1.jpg';
import camBra86 from '../../assets/camiseta-sel-2.jpg';
import camArg14 from '../../assets/camiseta-sel-3.jpg';


const ItemListContainer = () => {
    
    function getProducts(category) {
        const promise = new Promise((resolve, reject) => {
            const productsList = [
                {
                    id: 1,
                    title: "Camiseta Nike Titular Juventus 2015",
                    price: "$10.450",
                    stock: "2",
                    category: "club",
                    image: camJuv
                },
                {
                    id: 2,
                    title: "Camiseta Adidas Titular España 2010",
                    price: "$11.300",
                    stock: "2",
                    category: "seleccion",
                    image: camEsp10
                },
                {
                    id: 3,
                    title: "Camiseta Topper Titular Brasil 1986",
                    price: "$14.600",
                    stock: "1",
                    category: "seleccion",
                    image: camBra86
                },
                {
                    id: 4,
                    title: "Camiseta Adidas Titular Argentina 2014",
                    price: "$12.150",
                    stock: "3",
                    category: "seleccion",
                    image: camArg14
                }
            ];
            const productListFiltered = category ? productsList.filter(product => product.category === category) : productsList;
            setTimeout(() => {
                resolve(productListFiltered);
            }, 2000);
        });
        return promise;
    }

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const { categoryId } = useParams();

    useEffect(() => {
        setLoading(true)
        getProducts(categoryId)
        .then(res => {
            setProducts(res);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            setLoading(false)
        })
    }, [categoryId]);

    return (
        <div className='item-list-container'>
            { loading && <Loader/> }
            <ItemList items={ products } />
       </div>
    );
};

export default ItemListContainer;