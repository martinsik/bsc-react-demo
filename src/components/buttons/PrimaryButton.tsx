import React from 'react';
import { Button } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router';
import { History } from 'history';

interface Props extends RouteComponentProps {
  link?: string;
  history: History;
  children?: any;
  onClick?: () => void;
  [key: string]: any;
}

const Component = (props: Props) => {
  const { history, children, link, onClick, ...rest } = props;
  delete rest.location;
  delete rest.staticContext;
  delete rest.match;

  return (
    <Button
      variant="primary"
      onClick={() => {
        if (link) {
          history.push(link);
        } else if (onClick) {
          onClick();
        }
      }}
      {...rest}
    >
      {children}
    </Button>
  )
};

export const PrimaryButton = withRouter(Component);
