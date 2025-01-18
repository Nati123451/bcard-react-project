// src/components/BusinessCard.tsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaTrashAlt, FaPhone, FaStar } from 'react-icons/fa';

interface BusinessCardProps {
  description: string;
  phone: string;
  address: string;
  cardNumber: number;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ description, phone, address, cardNumber }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{description}</Card.Title>
        <Card.Text>
          <strong>Phone:</strong> {phone} <br />
          <strong>Address:</strong> {address} <br />
          <strong>Card Number:</strong> {cardNumber}
        </Card.Text>
        <div className="card-actions">
          <Button variant="outline-danger"><FaTrashAlt /></Button>
          <Button variant="outline-primary"><FaPhone /></Button>
          <Button variant="outline-warning"><FaStar /></Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default BusinessCard;
