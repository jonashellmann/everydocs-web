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
        <h4 className='flex-heading'><span>States</span> <span id="new-state" className='new-span' onClick={() => document.getElementById('create-state').style.display = 'flex'}>➕ New</span></h4>
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
        <h4 className='flex-heading'><span>Persons</span> <span id="new-person" className='new-span' onClick={() => document.getElementById('create-person').style.display = 'flex'}>➕ New</span></h4>
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
        <h4 className='flex-heading'><span>Tags</span> <span id="new-tag" className='new-span' onClick={() => document.getElementById('create-tag').style.display = 'flex'}>➕ New</span></h4>
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
        <h4 className='flex-heading'><span>Folders</span> <span id="new-folder" className='new-span' onClick={() => document.getElementById('create-folder').style.display = 'flex'}>➕ New</span></h4>
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
	constructor(props) {
    super();
    this.state = {
      props: props
    }
  }
  
  render() {
		// TODO: Untermenü in letzter Spalte
    return (
			<tr>
				<td>{this.state.props.title}</td>
				<td>{this.state.props.description}</td>
				<td className="hide-mobile">{this.state.props.state}</td>
				<td className="hide-mobile">{this.state.props.folder}</td>
				<td className="hide-mobile">{this.state.props.date}</td>
				<td className="hide-mobile">{this.state.props.person}</td>
        <td style={{width: '60px'}}>
          <a href={"/document/?id=" + this.state.props.id}>🖊</a>
          <span onClick={() => deleteDocument(this.state.props.id)}>❌</span>
          <a href={config.url + "documents/file/" + this.state.props.id} target="_blank">📁</a>        
        </td>
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
        let state = doc.state_id !== null ? doc.state.name : "";
				let folder = doc.folder_id !== null ? doc.folder.name : "";
        let person = doc.person_id !== null ? doc.person.name : "";
				
				return (
					<Document key={doc.id} id={doc.id} title={doc.title} description={doc.description} state={state} folder={folder} date={doc.document_date} person={person} url={doc.document_url}/>
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
        <div id="create-folder" className='create-div hide' onClick={(e) => hideCreateDivs(e)}>
          <div className='auth-form'>
            <h3>New Folder</h3>
            <div>
              <label htmlFor="folder-name">Name</label>
              <input type="text" id="folder-name" />
            </div>
            <div>
              <label htmlFor="folder-folder">Parent Folder</label>
              <select id="folder-folder">

							</select>
            </div>
            <button type="button" className="login" onClick={() => createFolder()}>Create</button>
          </div>        
        </div>
        <div id="create-tag" className='create-div hide' onClick={(e) => hideCreateDivs(e)}>
          <div className='auth-form'>
            <h3>New Tag</h3>
            <div>
              <label htmlFor="tag-name">Name</label>
              <input type="text" id="tag-name" />
            </div>
            <div>
              <label htmlFor="tag-color">Color</label>
              <input type="color" id="tag-color" />
            </div>
            <button type="button" className="login" onClick={() => createTag()}>Create</button>
          </div>        
        </div>
        <div id="create-person" className='create-div hide' onClick={(e) => hideCreateDivs(e)}>
          <div className='auth-form'>
            <h3>New Person</h3>
            <div>
              <label htmlFor="person-name">Name</label>
              <input type="text" id="person-name" />
            </div>
            <button type="button" className="login" onClick={() => createPerson()}>Create</button>
          </div>        
        </div>
        <div id="create-state" className='create-div hide' onClick={(e) => hideCreateDivs(e)}>
          <div className='auth-form'>
            <h3>New State</h3>
            <div>
              <label htmlFor="state-name">Name</label>
              <input type="text" id="state-name" />
            </div>
            <button type="button" className="login" onClick={() => createState()}>Create</button>
          </div>
        </div>
			</div>
		);
	}
}

// ========================================

function deleteDocument(id) {
  var x = confirm('Do you really want to delete this document?');
  if(x === true) {
    fetch(config.url + 'documents/' + id + '/', {
      headers: {
        'Authorization': token,
      },
      method: 'DELETE'
    })
    .then(response => location.reload());
  }
}

function createPerson() {
  var data = 'name=' + document.getElementById('person-name').value;
  
  fetch(config.url + 'people/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token,
    },
    body: data
  })
  .then(response => response.json())
  .then(json => {
    if(json.hasOwnProperty('message')) {
      console.log(json['message']);
      // TODO: Fehlerbehandlung
    }
    else {
      location.reload();
    }
  });
}

function createTag() {
  var data = 'name=' + document.getElementById('tag-name').value + '&color=' + document.getElementById('tag-color').value;
	console.log(data);	

  fetch(config.url + 'tags/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token,
    },
    body: data
  })
  .then(response => response.json())
  .then(json => {
    if(json.hasOwnProperty('message')) {
      console.log(json['message']);
      // TODO: Fehlerbehandlung
    }
    else {
      location.reload();
    }
  });
}

function createState() {
  var data = 'name=' + document.getElementById('state-name').value;
  console.log(data);

  fetch(config.url + 'states/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token,
    },
    body: data
  })
  .then(response => response.json())
  .then(json => {
    if(json.hasOwnProperty('message')) {
      console.log(json['message']);
      // TODO: Fehlerbehandlung
    }
    else {
      location.reload();
    }
  });
}

function createFolder() {
  // TODO: Implement
}

function hideCreateDivs(e) {
  if (e.target.classList.contains('create-div')) {
    e.target.style.display = 'none';
    console.log("x");
  }
}

// ========================================

ReactDOM.render(<Homepage/>, document.getElementById("root"));
