import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Note } from '../../model/Note';

interface Props {
  note: Note;
  show: boolean;
  onClose: () => void;
  onRemove: () => Observable<any>;
}

export const RemoveNoteModal = (props: Props) => {
  const { note, show, onClose, onRemove } = props;
  const [ removing, setRemoving ] = useState(false);

  if (!note) {
    return (<></>);
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title><FormattedMessage id="modal.remove_note.title" /></Modal.Title>
      </Modal.Header>
      <Modal.Body><FormattedMessage id="modal.remove_note.body" values={{ id: note.id }} /></Modal.Body>
      <Modal.Footer>
        <Button disabled={removing} variant="secondary" onClick={onClose}>
          <FormattedMessage id="modal.remove_note.close" />
        </Button>
        <Button disabled={removing} variant="primary" onClick={() => {
          setRemoving(true);
          onRemove()
            .pipe(
              finalize(() => setRemoving(false)),
            )
            .subscribe();
        }}>
          <FormattedMessage id="modal.remove_note.remove" />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
