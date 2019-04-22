import React from 'react';

import { Note } from '../../model/Note';

interface Props {
  note: Note;
}

export const NoteDetail = ({ note }: Props) => (
  <div>
    <h1>#{note.id}: {note.title}</h1>
  </div>
);
