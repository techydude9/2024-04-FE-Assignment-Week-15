import '../App.css';
import {useState} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

function UpdateTheProduct ({productObject}) {
/* updateProduct function */
  //define useState variable and function for updating products
  const [updatedProductCode, setUpdatedProductCode] = useState('')
  const [updatedProductDescription, setUpdatedProductDescription] = useState('')
  const [updatedProductPrice, setUpdatedProductPrice] = useState('')


  function updateProduct(e){
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
  // } from copied code

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
            <button className="btn btn-primary btn-sm mb-3" onClick={(e) => updateProduct(e, product)}>Update</button>
        </td>
    </tr>
    )
  }
}
  export default UpdateTheProduct;
