import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import { OverlayTrigger } from 'react-bootstrap';

import { NotesList } from './NotesList';
import { MockApp } from '../../spec/MockApp';

describe('NotesList', () => {
  let originalOverlayTriggerRender = OverlayTrigger.prototype.render;

  beforeAll(() => {
    originalOverlayTriggerRender = OverlayTrigger.prototype.render;
    OverlayTrigger.prototype.render = () => null;
  });

  afterAll(() => {
    OverlayTrigger.prototype.render = originalOverlayTriggerRender;
  });

  it('should renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render((
      <MockApp>
        <NotesList notes={[]} onRemoveNote={() => void 0} />
      </MockApp>
    ), div);

    ReactDOM.unmountComponentAtNode(div);
  });

  it('should render table line for every array item', () => {
    const mockData = [
      { id: 1, title: 'Title 1' },
      { id: 2, title: 'Title 2' },
      { id: 3, title: 'Title 3' },
    ];

    const component = TestRenderer.create((
      <MockApp>
        <NotesList notes={mockData} onRemoveNote={() => void 0} />
      </MockApp>
    ));
    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
