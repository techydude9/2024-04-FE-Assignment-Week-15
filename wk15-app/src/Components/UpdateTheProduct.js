import '../App.css';
import {useState} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

function UpdateTheProduct ({productObject}, PRODUCTS_API_URL) {
/* updateProduct function */
  //define useState variable and function for updating products
  const [updatedProductCode, setUpdatedProductCode] = useState('')
  const [updatedProductDescription, setUpdatedProductDescription] = useState('')
  const [updatedProductPrice, setUpdatedProductPrice] = useState('')

  console.log(PRODUCTS_API_URL);

   function updateProduct(e, productObject){
    e.preventDefault()
    
    let product = {
      ...productObject,
      code: updatedProductCode,
      description: updatedProductDescription,
      price: updatedProductPrice,
    }

    // console.log(product);

    fetch(`${PRODUCTS_API_URL}/${productObject.id}`, {
      method: 'PUT',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(product)
    })
    // .then (setNewProductCode(''))
    // .then (setNewProductDescription(''))
    // .then (setnewProductPrice('')) 
    // .then(() => getProducts())
  } 

  return (
        <tr>
            <td>
            <input placeholder='Update Product Code' onChange={(e) => setUpdatedProductCode(e.target.value)}></input>
        </td>
        <td>
            <input placeholder='Update Description' onChange={(e) =>setUpdatedProductDescription(e.target.value)}></input>
        </td>
        <td>  
            <input placeholder='Update Price' onChange={(e) => setUpdatedProductPrice(e.target.value)}></input>
        </td>
        <td>
            <button className="btn btn-primary btn-sm mb-3" onClick={(e) => updateProduct(e, productObject)}>Update</button>
        </td>
    </tr>
    )
}
  export default UpdateTheProduct;
