// src/components/Notification.tsx
import React from 'react';
import { Alert } from 'react-bootstrap';

interface NotificationProps {
  message: string;
  variant: 'success' | 'danger' | 'info' | 'warning';
  show: boolean;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, variant, show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <Alert variant={variant} onClose={onClose} dismissible>
      {message}
    </Alert>
  );
}

export default Notification;
