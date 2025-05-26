   import React from 'react';
    import Button from 'react-bootstrap/Button';
    import Modal from 'react-bootstrap/Modal';


    const ShowTicket = ({ show, onHide, movie, numbers }) => {
        return (
            <Modal show={show} onHide={onHide} centered className="bg-gradient-primary">
                <h2 className="text-center px-3.5">My Movie ticket hub</h2>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Tickets for {movie?.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        numbers?.length > 0 ? (
                            <>
                                {
                                    numbers.sort((a, b) => a - b).join(",")}
                            </>
                        ) : (

                            "No Tickets Selected"
                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    };

    export default ShowTicket;