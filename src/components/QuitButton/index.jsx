import { useState, useEffect } from "react";
import { Wrapper } from "./styles";
import { Button, Modal } from "react-bootstrap";

export default function QuitButton({ variant }) {
  const [showQuitButton, setShowQuitButton] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      // Add your code to show a special close button or perform any other actions
      setShowQuitButton(true);
    } else {
      setShowQuitButton(false);
    }
  }, []);

  if (showQuitButton)
    return (
      <Wrapper variant={variant}>
        <Button variant="danger" onClick={() => setShowModal(true)}>
          {variant === "home" ? "X" : "Exit Application"}
        </Button>

        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showModal}
          onHide={() => setShowModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Exit Application
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Are you sure to exit?</h4>
            <p>This will close the application on phone</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => {
                setShowModal(false);
                window.close();
              }}
            >
              Quit
            </Button>
            <Button onClick={() => setShowModal(false)}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </Wrapper>
    );
  else return null;
}
