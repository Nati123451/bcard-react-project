// src/components/CardEditor.tsx
import React from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

interface CardEditorProps {
  show: boolean;
  onHide: () => void;
  card: { description: string, phone: string, address: string, cardNumber: number };
  onSave: (card: { description: string, phone: string, address: string, cardNumber: number }) => void;
}

const CardEditor: React.FC<CardEditorProps> = ({ show, onHide, card, onSave }) => {
  const [editedCard, setEditedCard] = React.useState(card);

  React.useEffect(() => {
    setEditedCard(card);
  }, [card]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedCard({ ...editedCard, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(editedCard);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Card</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={editedCard.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPhone" className="mt-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={editedCard.phone}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formAddress" className="mt-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={editedCard.address}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formCardNumber" className="mt-3">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type="number"
              name="cardNumber"
              value={editedCard.cardNumber}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" className="mt-3" onClick={handleSave}>
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CardEditor;
