import React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

interface Props extends InjectedIntlProps {
  onLocaleChange: (locale: string) => void
}

const Component = (props: Props) => {
  const { onLocaleChange, intl } = props;

  return (
    <div className="mb-3">
      <FormattedMessage id="language.switch" />:{' '}
      <ToggleButtonGroup
        type="radio"
        name="options"
        defaultValue={process.env.REACT_APP_DEFAULT_LOCALE}
        value={intl.locale}
        onChange={onLocaleChange}
      >
        <ToggleButton type="radio" name="language" variant="secondary" value="cs">
          <FormattedMessage id="language.czech" />
        </ToggleButton>
        <ToggleButton type="radio" name="language" variant="secondary" value="en">
          <FormattedMessage id="language.english" />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export const LanguageSwitch = injectIntl(Component);
