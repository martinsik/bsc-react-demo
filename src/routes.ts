export const routes = {
  homepage: '/',
  createNote: '/note/create',
  edit: '/note/edit/:id',
  detail: '/note/:id',
};

export const createNoteDetailRoute = (id: number) => routes.detail.replace(/:id/, id.toString());
export const createNoteEditRoute = (id: number) => routes.edit.replace(/:id/, id.toString());
