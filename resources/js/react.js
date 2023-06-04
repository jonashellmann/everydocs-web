"use strict";

var token = readTokenFromCookie(); 

class PersonField extends React.Component {
  constructor(props) {
    super();
    this.state = {
      persons: [],
      props: props,
    }
  }

  componentDidMount() {
    fetch(getConfigUrl() + 'people', {headers: {'Authorization': token}})
    .then(results => results.json())
    .then(data => {
      let persons = data.map((p) => {
        return <option key={p.id} value={p.id} selected={p.id === this.state.props.value}>{p.name}</option>
      });
      this.setState({persons: persons});
    });
  }

  render() {
    return (
      <div className="document-field">
        <label htmlFor="document-person">Person</label>
        <select id="document-person" name="person">
          <option value="">-</option>
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
      states: [],
      props: props,
    }
  }

  componentDidMount() {
    fetch(getConfigUrl() + 'states', {headers: {'Authorization': token}})
    .then(results => results.json())
    .then(data => {
      let states = data.map((s) => {
        return <option key={s.id} value={s.id} selected={s.id === this.state.props.value}>{s.name}</option>
      });
      this.setState({states: states});
    });
  }

  render() {
    return (
      <div className="document-field">
        <label htmlFor="document-state">State</label>
        <select id="document-state" name="state">
          <option value="">-</option>
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
      folders: [],
      props: props,
    }
  }

  componentDidMount() {
    fetch(getConfigUrl() + 'folders', {headers: {'Authorization': token}})
    .then(results => results.json())
    .then(data => {
      let folders = data.map((f) => {
        return processJsonFolder(f, this.state.props.value, 0);
      });
      this.setState({folders: folders});
    });
  }

  render() {
    return (
      <div className="document-field">
        <label htmlFor="document-folder">Folder</label>
        <select id="document-folder" name="folder">
          <option value="">-</option>
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
        <input id={this.props.id} type={this.props.type} name={this.props.name} defaultValue={this.props.value} />
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
        <Footer />
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

class Footer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      versionFrontend: '',
      versionBackend: ''
    };
  }

  componentDidMount() {
    fetch(getConfigUrl() + 'version')
      .then(results => results.json())
      .then(data => {
        let versionFrontend = getVersion();
        let versionBackend = data.version;
        this.setState({versionFrontend: versionFrontend, versionBackend: versionBackend});
      });
  }

  render(props) {
    return (
      <div id="footer">
        <span>Version: {this.state.versionFrontend} (Frontend), {this.state.versionBackend} (Backend)</span>
      </div>
    );
  }
}

// ---------------------------------------------------------------

function processJsonFolder(folder, currentValue, level) {
  var html = [];
  var name = folder.name;
  for (var i = 0; i < level; i++) {
    name = "\xA0\xA0\xA0\xA0" + name;
  }
  html.push(<option key={folder.id} value={folder.id} selected={folder.id === currentValue}>{name}</option>);
  for (var i = 0; i < folder.folders.length; i++) {
    var array = processJsonFolder(folder.folders[i], currentValue, level + 1);
    html.push(array);
  }
  return html;
}
