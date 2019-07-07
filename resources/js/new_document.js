"use strict";

var token = readTokenFromCookie();

class PersonField extends React.Component {
  constructor(props) {
    super();
    this.state = {
      persons: []
    }  
	}

  componentDidMount() {
    fetch(getConfigUrl() + 'people', {headers: {'Authorization': token}})
    .then(results => results.json())
    .then(data => {
      let persons = data.map((p) => {
      	return <option key={p.id} value={p.id}>{p.name}</option>
			});
      this.setState({persons: persons});
    });
  }

  render() {
    return (
      <div className="document-field">
				<label htmlFor="document-person">Person</label>
				<select id="document-person" name="person">
					{this.state.persons}
				</select> 
			</div>
    );
  }
}

class StateField extends React.Component {
  constructor(props) {
    super();
    this.state = {
      states: []
    }
  }

  componentDidMount() {
    fetch(getConfigUrl() + 'states', {headers: {'Authorization': token}})
    .then(results => results.json())
    .then(data => {
      let states = data.map((s) => {
        return <option key={s.id} value={s.id}>{s.name}</option>
      });
      this.setState({states: states});
    });
  }

  render() {
    return (
      <div className="document-field">
        <label htmlFor="document-state">State</label>
        <select id="document-state" name="state">
          {this.state.states}
        </select>
      </div>
    );
  }
}

class FolderField extends React.Component {
  constructor(props) {
    super();
    this.state = {
      folders: []
    }
  }

  componentDidMount() {
    fetch(getConfigUrl() + 'folders', {headers: {'Authorization': token}})
    .then(results => results.json())
    .then(data => {
      let folders = data.map((f) => {
        return <option key={f.id} value={f.id}>{f.name}</option>
      });
      this.setState({folders: folders});
    });
  }

  render() {
    return (
      <div className="document-field">
        <label htmlFor="document-folder">Folder</label>
        <select id="document-folder" name="folder">
          {this.state.folders}
        </select>
      </div>
    );
  }
}

class Field extends React.Component {
  render(props) {
    return (
      <div className="document-field">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input id={this.props.id} type={this.props.type} name={this.props.name} />
      </div>
    ); 
  }
}

class Document extends React.Component {
  render(props) {
    return (
      <div id="document">
        <h2>{this.props.title}</h2>
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
    // TODO: Create the main content
		return (
      <div id="main">
        <Document title="New Document" />    
      </div>
    );
  }
}

class Header extends React.Component {
  render(props) {
    return (
      <div id="header">
        <h1>EveryDocs</h1>
        <ul>
          <li><a href="/">Home</a></li>
          <li className="fill-header"><a href="/new/document/">New Document</a></li>
          <li onClick={logout} style={{cursor: 'pointer'}}><span>Logout</span></li>
        </ul>
      </div>
    );
  }
}

class Homepage extends React.Component {
  render(props) {
    return (
      <div id="homepage">
        <Header />
        <MainContent />
      </div>
    );
  }
}

// ========================================

function save() {
  const data = new URLSearchParams();
  for(const pair of new FormData(document.getElementById('document-fields'))) {
    if(pair[0] !== 'document') {
      data.append(pair[0], pair[1]);
    }
  }
  data.append('document', el('document-upload').files[0]);

  fetch(config.url + 'documents/', {
    method: 'POST',
    body: data,
    headers: {
      'Authorization': token,
      // 'Content-Type': 'multipart/form-data',
    }
  })
  .then(response => response.json())
  .then(response => {
    if (response.hasOwnProperty('message')) {
      showError(response['message']);
    } else {
      showSuccess('Document has been created!');
    }
  });
}

// ========================================

ReactDOM.render(<Homepage/>, document.getElementById("root"));
