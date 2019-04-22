import React, { useState } from 'react';
import { Observable } from 'rxjs';
import { Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
// @ts-ignore
import FaTrash from 'react-icons/lib/fa/trash';
// @ts-ignore
import FaEdit from 'react-icons/lib/fa/edit';

import { Note } from '../../model/Note';
import { RemoveNoteModal } from './RemoveNoteModal';
import { createNoteDetailRoute, createNoteEditRoute } from '../../routes';

import styles from './NotesList.module.scss'

interface NotesListProps {
  notes: Note[];
  onRemoveNote: (note: Note) => Observable<any>;
}

interface NoteRowProps {
  note: Note;
  onRemove: () => void;
}

const NoteRow = (props: NoteRowProps) => {
  const { note, onRemove } = props;

  return (
    <tr>
      <td>{note.id}</td>
      <td>
        <Link to={createNoteDetailRoute(note.id)}>{note.title}</Link>
      </td>
      <td>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={`note-tooltip-edit-${note.id}`}><FormattedMessage id="notes.list.edit" /></Tooltip>}
        >
          <Link to={createNoteEditRoute(note.id)}>
            <FaEdit />
          </Link>
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={`note-tooltip-remove-${note.id}`}><FormattedMessage id="notes.list.remove" /></Tooltip>}
        >
          <a href="/" onClick={e => {
            e.preventDefault();
            onRemove();
          }}>
            <FaTrash />
          </a>
        </OverlayTrigger>
      </td>
    </tr>
  );
};

export const NotesList = (props: NotesListProps) => {
  const { notes, onRemoveNote } = props;
  const [ removeNote, setRemoveNote ] = useState<Note>(null);
  const [ showModal, setShowModal ] = useState(false);

  return (
    <>
      <Table className={styles.table} striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th><FormattedMessage id="notes.list_table.columns.title" /></th>
            <th />
          </tr>
        </thead>
        <tbody>
          {notes.map((note, index) => (
            <NoteRow
              key={index}
              note={note}
              onRemove={() => {
                setShowModal(true);
                setRemoveNote(note);
              }}
            />
          ))}
        </tbody>
      </Table>
      <RemoveNoteModal
        show={showModal}
        note={removeNote}
        onClose={() => setShowModal(false)}
        onRemove={() => onRemoveNote(removeNote)}
      />
    </>
  );
};
