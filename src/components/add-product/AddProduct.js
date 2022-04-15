import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import ProductDataService from "../../services/product.services.jsx";

const AddProduct = ({ id, setProductId }) => {
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("Available");
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (title === "" || quantity === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newProduct = {
      title,
      quantity,
      status,
    };
    console.log(newProduct);

    try {
      if (id !== undefined && id !== "") {
        await ProductDataService.updateProduct(id, newProduct);
        setProductId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await ProductDataService.addProducts(newProduct);
        setMessage({ error: false, msg: "New Product added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setTitle("");
    setQuantity("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await ProductDataService.getProduct(id);
      console.log("the record is :", docSnap.data());
      setTitle(docSnap.data().title);
      setQuantity(docSnap.data().quantity);
      setStatus(docSnap.data().status);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <>
      <div className="p-4 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formProductTitle">
            <InputGroup>
              <InputGroup.Text id="formProductTitle">B</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Product Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProductQuantity">
            <InputGroup>
              <InputGroup.Text id="formProductQuantity">A</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Product Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <ButtonGroup aria-label="Basic example" className="mb-3">
            <Button
              disabled={flag}
              variant="success"
              onClick={(e) => {
                setStatus("Available");
                setFlag(true);
              }}
            >
              Available
            </Button>
            <Button
              variant="danger"
              disabled={!flag}
              onClick={(e) => {
                setStatus("Not Available");
                setFlag(false);
              }}
            >
              Not Available
            </Button>
          </ButtonGroup>
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Add/ Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddProduct;
