import type { JSX } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface ConfirmationModalProps {
  show: boolean;
  title: string;
  body: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'primary';
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal({
  show,
  title,
  body,
  confirmText = 'Подтвердить',
  cancelText = 'Отмена',
  variant = 'primary',
  onConfirm,
  onCancel,
}: ConfirmationModalProps): JSX.Element {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          {cancelText}
        </Button>
        <Button variant={variant} onClick={onConfirm}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}