"use strict";

class MainContent extends React.Component {
  constructor(props) {
    super();
    this.state = {
      doc: null
    }
  }

  componentDidMount() {
    fetch(config.url + 'documents/' + findGetParameter('id') + '/', {
      method: 'GET',
      headers: {
        'Authorization': token,
      }
    })
    .then(response => response.json())
    .then(response => {
      let doc = <Document pageTitle="Update Document" title={response['title']} description={response['description']} date={response['document_date']} folder={response['folder_id']} state={response['state_id']} person={response['person_id']} />
      this.setState({
        doc: doc
      }); 
    });
  }

  render() {
    return (
      <div id="main">
        {this.state.doc}
      </div>
    );
  }
}

class Document extends React.Component {
  render(props) {
    return (
      <div id="document">
        <h2>{this.props.pageTitle}</h2>
        <form id="document-fields" onSubmit={save}>
          <div id="fields-left">
            <Field id="document-title" label="Title" type="text" name="title" value={this.props.title} />
            <Field id="document-description" label="Description" type="area" name="description" value={this.props.description} />
            <Field id="document-date" label="Document Date" type="date" name="document_date" value={this.props.date} />
          </div>
          <div id="fields-right">
            <FolderField value={this.props.folder} />
            <StateField value={this.props.state} />
            <PersonField value={this.props.person} />
          </div>
          <div id="fields-bottom">
            <input type="submit" id="save-button" value="Save" />
            <div id="messages" />
          </div>
        </form>
      </div>
    );
  }
}

// ========================================

function save(event) {
  event.preventDefault();
  var data = new FormData(document.getElementById('document-fields'));

  fetch(config.url + 'documents/' + findGetParameter('id') + '/', {
    method: 'PUT',
    body: data,
    headers: {
      'Authorization': token,
    }
  })
  .then(response => response.json())
  .then(response => {
    if (response.hasOwnProperty('message')) {
      showError(response['message']);
    } 
  })
  .catch(err => showSuccess('Document has been updated!'));
}

function findGetParameter(parameterName) {
  var result = null, tmp = [];
  var items = location.search.substr(1).split("&");
  for (var index = 0; index < items.length; index++) {
    tmp = items[index].split("=");
    if (tmp[0] === parameterName) 
      result = decodeURIComponent(tmp[1]);
  }
  return result;
}

// ========================================

ReactDOM.render(<Homepage/>, document.getElementById("root"));
