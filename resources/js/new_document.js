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
				<select id="document-person">
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
        <select id="document-state">
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
        <select id="document-folder">
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
        <input id={this.props.id} type={this.props.type} />
      </div>
    ); 
  }
}

class Document extends React.Component {
  render(props) {
    return (
      <div id="document">
        <h2>{this.props.title}</h2>
        <div id="document-fields">
          <div id="fields-left">
            <Field id="document-title" label="Title" type="text" />
            <Field id="document-description" label="Description" type="area" />
            <Field id="document-date" label="Document Date" type="date" />
            <Field id="document-upload" label="Document" type="file" />
          </div>
          <div id="fields-right">
            <FolderField />
            <StateField />
            <PersonField />
          </div>
        </div>
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

ReactDOM.render(<Homepage/>, document.getElementById("root"));
