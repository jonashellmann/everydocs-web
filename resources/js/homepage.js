"use strict";

var token = readTokenFromCookie();

class State extends React.Component {
	render(props) {
		return (
			<div className="state">
				<span>{this.props.name}</span>
			</div>
		);
	}
}

class States extends React.Component {
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
			let states = data.map((state) => {
				return (
					<State key={state.id} name={state.name} />
				);
			});
			this.setState({states: states});
		});
	}
	
	render() {
		return (
      <div id="states-wrapper">
        <h4>States</h4>
			  <div id="states">
				  {this.state.states}
			  </div>
		  </div>
    );
	}
}

class Person extends React.Component {
	render(props) {
		return (
      <div className="person">
        <span>{this.props.name}</span>
      </div>
    );
	}
}

class Persons extends React.Component {
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
      let persons = data.map((person) => {
        return (
          <Person key={person.id} name={person.name} />
        );
      });
      this.setState({persons: persons});
    });
  }

  render() {
		return (
      <div id="persons-wrapper">
        <h4>Persons</h4>
        <div id="persons">
          {this.state.persons}
        </div>
      </div>
    );
	}
}

class Tag extends React.Component {
	render(props) {
		return (
			<div className="tag">
				<span>{this.props.name}</span>
			</div>
		);
	}
}

class Tags extends React.Component {
	constructor(props) {
		super();
		this.state = {
			tags: []
		}
	}
	
	componentDidMount() {
		fetch(getConfigUrl() + 'tags', {headers: {'Authorization': token}})
		.then(results => results.json())
		.then(data => {
			let tags = data.map((tag) => {
				return (
					<Tag key={tag.id} name={tag.name} />
				);
			});
			this.setState({tags: tags});
		});
	}
	
	render() {
		return (
      <div id="tags-wrapper">
        <h4>Tags</h4>
			  <div id="tags">
				  {this.state.tags}
			  </div>
      </div>
		);
	}
}

class Folder extends React.Component {
	render(props) {
		return (
      <div className="folder">
        <span>► {this.props.name}</span>
        <div className="subfolders">
          {this.props.subfolders.map(f => <Folder key={f.id} name={f.name} subfolders={f.folders}/>)}
        </div>
      </div>
    );
	}
}

class Folders extends React.Component {
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
    	let folders = data.map((folder) => {
      	return (
        	<Folder key={folder.id} name={folder.name} subfolders={folder.folders}/>
      	);
    	});
    	this.setState({folders: folders});
  	});
	}

  render() {
		return (
      <div id="folder-wrapper">
        <h4>Folders</h4>
        <div id="folders">
          {this.state.folders}
        </div>
      </div>
    );
	}
}

class Search extends React.Component {
	render(props) {
    // TODO: AJAX-Suche, evtl. ohne Button, sondern bei Eingabe-Event
		return (
			<div id="search">
				<form>
					<input type="text" placeholder="Search" name="s"/>
					<input type="submit" formMethod="get" value="🔎" />
				</form>
			</div>
		);
	}
}

class Document extends React.Component {
	render(props) {
		// TODO: Untermenü in letzter Spalte
    return (
			<tr>
				<td>{this.props.id}</td>
				<td>{this.props.title}</td>
				<td>{this.props.description}</td>
				<td className="hide-mobile">{this.props.state}</td>
				<td className="hide-mobile">{this.props.folder}</td>
				<td className="hide-mobile">{this.props.date}</td>
				<td className="hide-mobile">{this.props.person}</td>
				<td></td>
			</tr>
		);
	}
}

class DocumentTable extends React.Component {
	constructor(props) {
		super();
		this.state = {
			documents: []
		}
	}
	
	componentWillMount() {
		fetch(getConfigUrl() + 'documents', {headers: {'Authorization': token}})
		.then(results => results.json())
		.then(data => {
			let documents = data.map((doc) => {
				let state = "-"
				if (doc.state_id !== null) {
					state = doc.state.name;
				}
				let folder = "-"
				if (doc.folder_id !== null) {
					folder = doc.folder.name;
				}
				let person = "-"
				if (doc.person_id !== null) {
					person = doc.person.name;
				}
				
				return (
					<Document key={doc.id} id={doc.id} title={doc.title} description={doc.description} state={state} folder={folder} date={doc.document_date} person={person} />
				);
			});
			this.setState({documents: documents});
		});
	}
	
	render() {
		return (
			<table id="document-table">
				<tbody>
					<tr>
						<th>Doc-ID</th>
						<th>Title</th>
						<th>Description</th>
						<th className="hide-mobile">State</th>
						<th className="hide-mobile">Folder</th>
						<th className="hide-mobile">Date</th>
						<th className="hide-mobile">Person</th>
						<th></th>
					</tr>
					{this.state.documents}
				</tbody>
			</table>
		);
	}
}

class Documents extends React.Component {
	render(props) {
		return (
			<div id="documents">
				<h2>Documents</h2>
				<DocumentTable />
			</div>
		);
	}
}

class RightBar extends React.Component {
	render(props) {
		return (
			<div id="right-bar">
				<States />
				<Persons />
				<Tags />
			</div>
		);
	}
}

class LeftBar extends React.Component {
	render(props) {
		return (
			<div id="left-bar">
				<Search />
				<Folders />
			</div>
		);
	}
}

class MainContent extends React.Component {
	render(props) {
		return (
			<div id="main">
				<LeftBar />
				<Documents />
				<RightBar />
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
