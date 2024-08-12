import './App.css';
import {useState, useEffect} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import UpdateTheProduct from './Components/UpdateTheProduct.js';


//  MAIN APP Function
function App() {

  // set const to URL of mockAPI db resource
  const PRODUCTS_API_URL = 'https://66b3d01e7fba54a5b7ee41d6.mockapi.io/api/wk15Lab/products'

  // define default product
  const [products, setProducts] = useState([{
    code: 'Lava Lamp',  // rename productName to ProductCode
    description: 'Multi color flowing Lava Lamp based on oringinal 70s design',
    price: '24.99'
  }]);

  //define useState variable and functions for adding and updating products
  const [newProductCode, setNewProductCode] = useState('')
  const [newProductDescription, setNewProductDescription] = useState('')
  const [newProductPrice, setnewProductPrice] = useState('')

  // const [updatedProductCode, setUpdatedProductCode] = useState('')
  // const [updatedProductDescription, setUpdatedProductDescription] = useState('')
  // const [updatedProductPrice, setUpdatedProductPrice] = useState('')


  // function which will get products from API to display
  function getProducts() {

    fetch(PRODUCTS_API_URL)
      .then(data => data.json())
      .then(data => setProducts(data))
    
      console.log(products);
    }
    
  // useEffect state function
    useEffect(() => {
        getProducts()
        }, []) 
    
  /* deleteUser function  Part 2 steps 1-3*/
  function deleteProduct(id){
    fetch(`${PRODUCTS_API_URL}/${id}`, {
      method: 'DELETE'})
      .then(() => getProducts())
  }

  /* postNewProducts function */
  function postNewProduct(e){
    e.preventDefault()

  // console.log(newProductCode, newProductDescription, newProductPrice)

    fetch(PRODUCTS_API_URL, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
          code: newProductCode,
          description: newProductDescription,
          price: newProductPrice,
        })
    })
      .then(() => getProducts())
  }

  /* updateProduct function MOVED TO COMPONENT
  function updateProduct(e, productObject){
    e.preventDefault()

    let updatedProductObject = {
      ...productObject, 
      code: updatedProductCode,
      description: updatedProductDescription,
      price: updatedProductPrice,
    }

    fetch(`${PRODUCTS_API_URL}/${productObject.id}`, {
      method: 'PUT',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(updatedProductObject)
    })
    .then (setNewProductCode(''))
    .then (setNewProductDescription(''))
    .then (setnewProductPrice('')) 
    .then(() => getProducts())
  }
    */

// Displays the Products project
return (
  <div className="App">
   <h1>Bob's Week 15 Coding Assignment</h1>

  {/* HTML for adding new Products */}
  <div className="container">
    <div className="card">
      <h3>Enter New Product Info</h3>
      <form className="card-body bg-secondary">
        <div className="form-group">
          <label htmlFor="inNewCode">Product Code:</label>
          <input className="form-control" type="text" placeholder='Product Code' 
            onChange={(e) => setNewProductCode(e.target.value)}></input>
          <label htmlFor="inNewDescription">Description:</label>
          <input className="form-control" type="text" placeholder='Description'
            onChange={(e) => setNewProductDescription(e.target.value)}></input>
          <label htmlFor="inNewPrice">Price:</label>
          <input className="form-control" type="text" placeholder='Price'
            onChange={(e) => setnewProductPrice(e.target.value)}></input>
        </div>
        <div>
          <button className="btn btn-info mt-2" onClick={(e) => postNewProduct(e)}>Add Product</button>
        </div> 
      </form>
    </div>
  </div>

    {/* HTML for display all the products */}
    <div id="mapdiv" className="container-fluid mt-3 table-responsive">
      <table className="table table-bordered table-hover">
        <thead>
          <tr className="col">
            <th>Product Code</th>
            <th>Description</th>
            <th>Price</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className='border-success'>
          {products.map((product, index)=> {
              return ( 
              <>
              <tr key={index} className="mb-0">
                <td>{product.code}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>
                 <button className="btn btn-warning" onClick={() => deleteProduct(product.id)}>
                 🗑
                 </button>
                </td>
              </tr>
                <UpdateTheProduct getProducts={getProducts} productObject={product} PRODUCTS_API_URL={PRODUCTS_API_URL} />
              <br></br>
             </>
               )
            })} 
        </tbody>
      </table>
    </div>
  </div>
);
 
}  // end of APP function

export default App;
