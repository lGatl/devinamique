import * as React from 'react';

/*import { I18n } from 'react-i18nify';
*/
export default class ErrorPage extends React.Component {
  render() {
    return (
      <div className="content-grid container-fluid not-found">
        <div className="row parent-headband">
          <div className="col-sm-12">
            <h3>Error</h3>
          </div>
        </div>
        <div className="row content">
          <div className="col-sm-12">
            <p>Error</p>
          </div>
        </div>
      </div>
    );
  }
}
