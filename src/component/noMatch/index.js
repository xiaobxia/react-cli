/**
 * Created by xiaobxia on 2017/10/22.
 */
import React from 'react'
import {injectIntl} from 'react-intl';
const NoMatch = (props) => {
  return (
    <div>{props.intl.formatMessage({id: 'App.noMatch'})}</div>
  );
};
export default injectIntl(NoMatch, {
  withRef: true
});
