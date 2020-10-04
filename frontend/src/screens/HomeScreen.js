import React, { useEffect , useState} from  'react';
import{useSelector , useDispatch} from 'react-redux';
import  {Link}  from 'react-router-dom';
import {listProducts} from '../actions/productActions';
import Fade from 'react-reveal/Fade';
import Modal from "react-modal"
function HomeScreen (props) {
     const productList = useSelector(state =>state.productList);
    const {products , loading, error} = productList;
    const[qty, setQty] = useState(1);
    const[product, setproduct] = useState('');
     const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(listProducts());        
         return () =>{
     };
    },[])
    const handleAddToCart = () =>{
        props.history.push("/cart/" + product._id + "?qty=" + qty)
    }
    const image =product.image;
    const openModal = (product) => {
      setproduct(product);
    };
    const closeModal = () =>{
        setproduct(false);
    }
    
    //console.log(products);
    return  <>
    {/* loading ? <div>Loading...</div>:
    error ?<div>{error}</div>: */}
  <Fade bottom cascade>
    <ul className="products">
    {
        products.map(product =>
                                    <li>
            <div className="product">
            <a href ={'#/' + product._id} onClick={()=>openModal(product)}><img className="product-image" src={product.image} alt="products"/></a>
             <div className="product-name">
            <Link to={'/product/' + product._id}>{product.name}</Link></div>
            <div className="product-brand">{product.brand}</div>
            <div className="product-price">{product.price}</div>
        <div className="product-rating">{product.rating}Stars ({product.numReviews})</div>
            </div>
            <Link to={'/product/' + product._id}><button>View</button></Link>
            </li>
            
            )
        }
      </ul>
      </Fade>
      {
          product && (
              <Modal isOpen={true} onRequestClose={closeModal} >
                  
                  <button onClick = {closeModal}>X</button>
                  <div className="details">
        <div className="details-image">
            <img src={product.image} alt="product"></img>
        </div>
        <div className="details-info">
            <ul> 
                <li>{product.name}</li>
                <li>{product.rating} Stars ({product.numReviews} Reviews)</li>
                 <li>Price:<b>${product.price}</b></li>
                 <li>Description <div>{product.description}</div></li>
            </ul>
        </div>
        <div className="details-action">
            <ul> 
                <li>Price: {product.price}</li>
                <li>Status: {product.countInStock > 0 ?  "In Stock" : "Unavailable" }</li>
                 <li>Qty:<select value={qty} onChange={(e) => {setQty(e.target.value)}}>
                 {[...Array(product.countInStock).keys()].map(x =>
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    )}
                     
                </select></li>
                <li>{product.countInStock > 0 && 
                <button onClick = {handleAddToCart} className="button primary">Add to Cart</button>
                }</li>
                 
            </ul>
        </div>
        </div>
                  </Modal>

          )
      }
</>
}
 export default HomeScreen;