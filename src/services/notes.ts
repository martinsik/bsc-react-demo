import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Note } from '../model/Note';
import { makeXhrApiRequest, XhrResponse } from './xhr';

export interface CreateEditNote {
  title: string
}

export const getAllNotes = () =>
  makeXhrApiRequest<Note[]>({
    url: `notes`,
  });

export const getNote = (id: number) =>
  makeXhrApiRequest<Note>({
    url: `notes/${id}`,
  });

export const createNote = (body: CreateEditNote) =>
  makeXhrApiRequest<Note>({
    url: `notes`,
    method: 'POST',
    body,
  });

export const updateNote = (id: number, body: CreateEditNote) =>
  makeXhrApiRequest<Note>({
    url: `notes/${id}`,
    method: 'PUT',
    body,
  });

export const removeNote = (id: number) =>
  makeXhrApiRequest<Note>({
    url: `notes/${id}`,
    method: 'DELETE',
  });
