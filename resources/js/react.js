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
        console.log(p);
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
        return <option key={f.id} value={f.id} selected={f.id === this.state.props.value}>{f.name}</option>
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
