import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import ProductDataService from "../../services/product.services";

const ProductsList = ({ getProductId }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const data = await ProductDataService.getAllProducts();
    //console.log(data.docs);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await ProductDataService.deleteProduct(id);
    getProducts();
  };
  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit" onClick={getProducts}>
          Refresh List
        </Button>
      </div>

      {/* <pre>{JSON.stringify(products, undefined, 2)}</pre>} */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Title</th>
            <th>Product Quantity</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.title}</td>
                <td>{doc.quantity}</td>
                <td>{doc.status}</td>
                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getProductId(doc.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default ProductsList;
