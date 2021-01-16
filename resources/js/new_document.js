"use strict";

class Document extends React.Component {
  render(props) {
    return (
      <div id="document">
        <h2>{this.props.pageTitle}</h2>
        <form id="document-fields">
          <div id="fields-left">
            <Field id="document-title" label="Title" type="text" name="title" />
            <Field id="document-description" label="Description" type="area" name="description" />
            <Field id="document-date" label="Document Date" type="date" name="document_date" />
            <div className="document-field">
              <label htmlFor="document-upload">Document</label>
              <input id="document-upload" type="file" accept=".pdf,application/pdf" name="document" />
            </div>
          </div>
          <div id="fields-right">
            <FolderField />
            <StateField />
            <PersonField />
          </div>
          <div id="fields-bottom">  
            <button type="button" id="save-button" onClick={save}>Save</button>
            <div id="messages" />
          </div>
        </form>
      </div>
    );
  }
}

class MainContent extends React.Component {
  render(props) {
		return (
      <div id="main">
        <Document pageTitle="New Document" />
        <div className="lds-dual-ring"></div>
      </div>
    );
  }
}

// ========================================

function save() {
  var data = new FormData(document.getElementById('document-fields'));

  var loader = document.getElementsByClassName('lds-dual-ring')[0];
  loader.style.display = 'inline-block';

  fetch(config.url + 'documents/', {
    method: 'POST',
    body: data,
    headers: {
      'Authorization': token,
    }
  })
  .then(response => response.json())
  .then(response => {
    loader.style.display = 'none';
    if (response.hasOwnProperty('message')) {
      showError(response['message']);
    } else {
      showSuccess('Document has been created!');
    }
  })
  .catch((error) => {
    loader.style.display = 'none';
    showError('Server error when creating document!');
  });
}

// ========================================

ReactDOM.render(<Homepage/>, document.getElementById("root"));
