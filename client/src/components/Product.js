import React, {Component} from 'react';

export default class Product extends Component {

    constructor(props) {

        super(props);

        this.state = {
            products: [],
            productObj: {}
        }

        this.product = {}
        this.productToUpdate = {}
    }

    componentDidMount() {
        fetch("http://localhost:8000/products")
        .then(response => response.json())
        .then(products => this.setState({products: products}));
    }


    readValue(property, value, action="create") {
        if(action === "create")
            this.product[property] = value;

        else if(action === "update") {
            this.productToUpdate[property] = value;
        }
    }


    deleteProduct(id, index) {
        fetch("http://localhost:8000/products/" + id, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            let tempData = this.state.products;
            tempData.splice(index, 1);
            this.setState({ products: tempData });
        })
    }


    createProduct() {
        fetch("http://localhost:8000/products", {
            method: "POST",
            body: JSON.stringify(this.product),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data.message);
            let tempData = this.state.products;
            tempData.push(data.product);
            this.setState({ products: tempData, isCreateModalVisible: false });
        })
    }

    getProductToUpdate(index) {
        let productToUpdate = this.state.products[index];
        this.setState({ productObj : productToUpdate });
        this.productToUpdate = productToUpdate;
        this.setState({ isUpdateModalVisible : true })
    }

    updateProduct(){
        let id = this.state.productObj._id;

        fetch("http://localhost:8000/products/" + id, {
            method: "PUT",
            body: JSON.stringify(this.productToUpdate),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            this.setState({ productObj : this.productToUpdate, isUpdateModalVisible : false });
        })
    }

    openCreateModal(open) {
        this.setState({isCreateModalVisible : open});
    }

    openUpdateModal(open) {
        this.setState({isUpdateModalVisible : open});
    }

    render() {
        return (
            <div className="container">
                
                {
                    this.state.isCreateModalVisible === true ?  
                    (
                        <div className="modal-parent position-fixed d-flex vh-100 vw-100">
                            <div className="w-100 modal-dialog m-auto">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Create Product</h5>
                                        <button type="button" className="btn-close" onClick={() => this.openCreateModal(false)}></button>
                                    </div>
                                    <div className="modal-body">
                                        <form id="product_form">
                                            <input type="text" placeholder="Name" className="my-2 form-control" onChange={(event) => this.readValue("name", event.target.value.trim())} />
                                            <input type="text" placeholder="Category" className="my-2 form-control" onChange={(event) => this.readValue("category", event.target.value.trim()) } />
                                            <textarea placeholder="Description" className="my-2 form-control" rows="2" onChange={(event) => this.readValue("description", event.target.value.trim()) }></textarea>
                                            <input type="text" placeholder="Color" className="my-2 form-control" onChange={(event) => this.readValue("color", event.target.value.trim()) } />
                                            <input type="text" placeholder="Rating" className="my-2 form-control" onChange={(event) => this.readValue("rating", event.target.value.trim()) } />
                                            <input type="number" placeholder="Quantity" className="my-2 form-control" onChange={(event) => this.readValue("quantity", event.target.value.trim()) } />
                                            <input type="number" placeholder="Price" className="my-2 form-control" onChange={(event) => this.readValue("price", event.target.value.trim()) } />
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-danger" onClick={() => this.openCreateModal(false)}>Close</button>
                                        <button type="button" className="btn btn-success" onClick={() => {this.createProduct()}}>Create product</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null
                }

                {
                    this.state.isUpdateModalVisible === true ?  
                    (
                        <div className="modal-parent position-fixed d-flex vh-100 vw-100">
                            <div className="w-100 modal-dialog m-auto">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Update Product</h5>
                                        <button type="button" className="btn-close" onClick={() => this.openUpdateModal(false)}></button>
                                    </div>
                                    <div className="modal-body">
                                        <form id="product_form">
                                            <input type="text" placeholder="Name" defaultValue={this.state.productObj.name} className="my-2 form-control" onChange={(event) => this.readValue("name", event.target.value.trim(), "update") } />
                                            <input type="text" placeholder="Category" defaultValue={this.state.productObj.category} className="my-2 form-control" onChange={(event) => this.readValue("category", event.target.value.trim(), "update") } />
                                            <textarea placeholder="Description" defaultValue={this.state.productObj.description} className="my-2 form-control" rows="2" onChange={(event) => this.readValue("description", event.target.value.trim(), "update") }></textarea>
                                            <input type="text" placeholder="Color" defaultValue={this.state.productObj.color} className="my-2 form-control" onChange={(event) => this.readValue("color", event.target.value.trim(), "update") } />
                                            <input type="text" placeholder="Rating" defaultValue={this.state.productObj.rating} className="my-2 form-control" onChange={(event) => this.readValue("rating", event.target.value.trim(), "update") } />
                                            <input type="number" placeholder="Quantity" defaultValue={this.state.productObj.quantity} className="my-2 form-control" onChange={(event) => this.readValue("quantity", event.target.value.trim(), "update") } />
                                            <input type="number" placeholder="Price" defaultValue={this.state.productObj.price} className="my-2 form-control" onChange={(event) => this.readValue("price", event.target.value.trim(), "update") } />
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-danger" onClick={() => this.openUpdateModal(false)}>Close</button>
                                        <button type="button" className="btn btn-success" onClick={() => {this.updateProduct()}}>Update product</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null
                }

                <h1>All Products</h1>
                <br/>
                <div className="overflow-auto">
                    <table className="table table-hover table-bordered table-secondary mb-0">
                        <thead>
                            <tr>
                                <th className="col-xl-2 text-capitalize">Name</th>
                                <th className="col-xl-2 text-capitalize">Description</th>
                                <th className="col-xl-2 text-capitalize">Category</th>
                                <th className="col-xl-1 text-capitalize">Color</th>
                                <th className="col-xl-1 text-capitalize">Rating</th>
                                <th className="col-xl-1 text-capitalize">Quantity</th>
                                <th className="col-xl-1 text-capitalize">Price</th>
                                <th className="col-xl-2 text-capitalize text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.products.map((product, index) => (
                                    <tr key={index}>
                                        <td className="text-capitalize align-middle">{product.name}</td>
                                        <td className="text-capitalize align-middle">{product.description}</td>
                                        <td className="text-capitalize align-middle">{product.category}</td>
                                        <td className="text-capitalize align-middle">{product.color}</td>
                                        <td className="text-capitalize align-middle">{product.rating}</td>
                                        <td className="text-capitalize align-middle">{product.quantity}</td>
                                        <td className="text-capitalize align-middle">{product.price}</td>
                                        <td className="text-capitalize align-middle">
                                            <div className="d-flex justify-content-evenly">
                                                <button className="btn btn-sm btn-primary me-2" onClick={() => this.getProductToUpdate(index)}>Update</button>
                                                <button className="btn btn-sm btn-danger ms-2" onClick={() => {this.deleteProduct(product._id, index)}}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <button className="btn btn-lg btn-dark mt-5" onClick={() => this.openCreateModal(true)}>Create Product</button>
            </div>
        )
    }
}