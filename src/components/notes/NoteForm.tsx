import React, { useState, useEffect } from 'react';
import { ButtonToolbar, Form } from 'react-bootstrap';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import { CreateEditNote } from '../../services/notes';
import { BackButton, PrimaryButton } from '..';

interface Props extends InjectedIntlProps {
  onSubmit: (form: CreateEditNote) => Promise<any>;
  submitButtonTitle: string;
  defaultValues?: CreateEditNote;
}

export const Component = (props: Props) => {
  const { intl, onSubmit, defaultValues, submitButtonTitle } = props;
  const [ form, setForm ] = useState<CreateEditNote>({ title: '' });
  const [ sending, setSending ] = useState(false);

  useEffect(() => {
    if (defaultValues) {
      setForm(defaultValues);
    }
  }, []);

  return (
    <Form>
      <Form.Group>
        <Form.Label><FormattedMessage id="notes.form.title" /></Form.Label>
        <Form.Control
          type="text"
          placeholder={intl.formatMessage({ id: 'notes.form.title_placeholder' })}
          value={form.title}
          onChange={(e: any) => setForm({ ...form, title: e.target.value })}
        />
      </Form.Group>
      <ButtonToolbar>
        <PrimaryButton
          disabled={sending}
          onClick={async () => {
            setSending(true);
            try {
              await onSubmit(form)
            } catch (e) {
              setSending(false)
            }
          }}
        >
          {submitButtonTitle}
        </PrimaryButton>
        <BackButton />
      </ButtonToolbar>
    </Form>
  );
};

export const NoteForm = injectIntl(Component);
