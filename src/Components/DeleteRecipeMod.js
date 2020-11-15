import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class DeleteRecipeMod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
            itemId: ''
        };
    }


    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });
    setItemId = () => {
       
        this.setState({ itemId: id })
    }

    render() {
        return (
            <>
                <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ height: "100vh" }}
                >
                    <Button variant="primary" onClick={this.openModal}>
                        Launch demo modal
          </Button>
                </div>
                <Modal show={this.state.isOpen} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Close
            </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default DeleteRecipeMod;