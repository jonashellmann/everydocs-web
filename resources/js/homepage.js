"use strict";

var token = readTokenFromCookie();

class State extends React.Component {
	render(props) {
		return (
			<div className="state">
				<span style={{cursor: 'pointer'}} onClick={() => filterElement('state_filter', this.props.id)}>{this.props.name}</span>
        <span className='state-setting pointer' onClick={() => deleteElement(this.props.id, 'states/', 'state')}>🗑️</span>
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
					<State key={state.id} id={state.id} name={state.name} />
				);
			});
			this.setState({states: states});
		});
	}
	
	render() {
		return (
      <div id="states-wrapper">
        <h4 className='flex-heading'>
					<span>States</span>
					<span id="state-settings" className="pointer" onClick={() => showStateSettings()}>⚙️</span>
					<span id="new-state" className='state-setting new-span' onClick={() => document.getElementById('create-state').style.display = 'flex'}>➕ New</span>
				</h4>
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
        <span style={{cursor: 'pointer'}} onClick={() => filterElement('person_filter', this.props.id)}>{this.props.name}</span>
        <span className='person-setting pointer' onClick={() => deleteElement(this.props.id, 'people/', 'person')}>🗑️</span>
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
          <Person key={person.id} id={person.id} name={person.name} />
        );
      });
      this.setState({persons: persons});
    });
  }

  render() {
		return (
      <div id="persons-wrapper">
        <h4 className='flex-heading'>
					<span>Persons</span>
					<span id="person-settings" className="pointer" onClick={() => showPersonSettings()}>⚙️</span>
					<span id="new-person" className='person-setting new-span' onClick={() => document.getElementById('create-person').style.display = 'flex'}>➕ New</span>
				</h4>
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
				<span style={{cursor: 'pointer'}} onClick={() => filterElement('tag_filter', this.props.id)}>{this.props.name}</span>
        <span className='pointer' onClick={() => deleteElement(this.props.id, 'tags/', 'tag')}>🗑️</span>
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
					<Tag key={tag.id} id={tag.id} name={tag.name} />
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
        <div className="folder-item">
          <span style={{cursor: 'pointer'}} onClick={() => filterElement('folder_filter', this.props.id)}>{this.props.name}</span>
          <span className='folder-setting pointer' onClick={() => deleteElement(this.props.id, 'folders/', 'folder')}>🗑️</span>
        </div>
        <div className="subfolders">
          {this.props.subfolders.map(f => <Folder key={f.id} id={f.id} name={f.name} subfolders={f.folders}/>)}
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
        	<Folder key={folder.id} id={folder.id} name={folder.name} subfolders={folder.folders}/>
      	);
    	});
    	this.setState({folders: folders});
  	});
	}

  render() {
		return (
      <div id="folder-wrapper">
        <h4 className='flex-heading'>
          <span>Folders</span>
          <span id="folder-settings" className="pointer" onClick={() => showFolderSettings()}>⚙️</span>
          <span id="new-folder" className='folder-setting new-span' onClick={() => {loadFoldersInSelect(); document.getElementById('create-folder').style.display = 'flex'}}>➕ New</span>
        </h4>
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
					<input type="text" placeholder="Search" name="search"/>
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
				<td className="hide-mobile">{this.state.props.description}</td>
				<td className="hide-mobile">{this.state.props.state}</td>
				<td className="hide-mobile">{this.state.props.folder}</td>
				<td>{this.state.props.date}</td>
				<td className="hide-mobile">{this.state.props.person}</td>
				<td style={{width: '60px'}}>
					<a href={"/document/?id=" + this.state.props.id}>🖊</a>
					<span onClick={() => deleteElement(this.state.props.id, 'documents/', 'document')}>🗑️</span>
					<span onClick={() => downloadElement(this.state.props.id, 'documents/file/', this.state.props.title)}>📁</span>
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
		fetch(getConfigUrl() + 'documents/' + window.location.search, {headers: {'Authorization': token}})
		.then(results => results.json())
		.then(data => {
			let documents = 
        data
        .map((doc) => {
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
						<th className="hide-mobile">Description</th>
						<th className="hide-mobile">State</th>
						<th className="hide-mobile">Folder</th>
						<th>Date</th>
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
        {/* TODO: <Tags /> */}
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
            <button type="button" className="login" onClick={() => createElement('tags/', 'name=' + document.getElementById('tag-name').value + '&color=' + document.getElementById('tag-color').value)}>Create</button>
          </div>        
        </div>
        <div id="create-person" className='create-div hide' onClick={(e) => hideCreateDivs(e)}>
          <div className='auth-form'>
            <h3>New Person</h3>
            <div>
              <label htmlFor="person-name">Name</label>
              <input type="text" id="person-name" />
            </div>
            <button type="button" className="login" onClick={() => createElement('people/', 'name=' + document.getElementById('person-name').value)}>Create</button>
          </div>        
        </div>
        <div id="create-state" className='create-div hide' onClick={(e) => hideCreateDivs(e)}>
          <div className='auth-form'>
            <h3>New State</h3>
            <div>
              <label htmlFor="state-name">Name</label>
              <input type="text" id="state-name" />
            </div>
            <button type="button" className="login" onClick={() => createElement('states/', 'name=' + document.getElementById('state-name').value)}>Create</button>
          </div>
        </div>
			</div>
		);
	}
}

// ========================================

function createElement(url, data) {
   fetch(config.url + url, {
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
  var select = document.getElementById('folder-folder');
  var folder = select.length > 0 ? select.options[select.selectedIndex].value : '';
  createElement('folders/', 'name=' + document.getElementById('folder-name').value + '&folder=' + folder);
}

function hideCreateDivs(e) {
  if (e.target.classList.contains('create-div')) {
    e.target.style.display = 'none';
  }
}

function deleteElement(id, url, elementType) {
  if(confirm('Do you want to delete this ' + elementType + '?')) {
    fetch(config.url + url + id, {
      method: 'DELETE',
      headers: {
        'Authorization': token,
      }
    })
    .then(response => location.reload());
    // TODO: error handling
  }
}

function downloadElement(id, url, title) {
  fetch(config.url + url + id, {
    method: 'GET',
    headers: {
      'Authorization': token,
    }
  })
  .then(response => response.blob())
  .then(blob => {
    var fileUrl = window.URL.createObjectURL(blob);
	var fileLink = document.createElement('a');
	fileLink.href = fileUrl;
	fileLink.download = title;
	fileLink.click();
  });
  // TODO: error handling
}

function filterElement(filterName, id) {
  window.location.href = '/?' + filterName+ '=' + id;
}

function loadFoldersInSelect() {
  var select = document.getElementById('folder-folder');
  
  if (select.length > 0) {
    return;
  }

  var option = document.createElement('option');
  option.value = '';
  option.innerHTML = '-';
  select.appendChild(option);

  fetch(getConfigUrl() + 'folders-all', {headers: {'Authorization': token}})
  .then(results => results.json())
  .then(data => {
    data.forEach((folder) => {
      var option = document.createElement('option');
      option.value = folder.id;
      option.innerHTML = folder.name;
      select.appendChild(option);
    });
  });
}

function showFolderSettings() {
  document.getElementById('folder-settings').style.display = 'none';
  var elements = document.getElementsByClassName('folder-setting');
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = 'inline-block';
  }
}

function showPersonSettings() {
  document.getElementById('person-settings').style.display = 'none';
  var elements = document.getElementsByClassName('person-setting');
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = 'inline-block';
  }
}

function showStateSettings() {
  document.getElementById('state-settings').style.display = 'none';
  var elements = document.getElementsByClassName('state-setting');
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = 'inline-block';
  }
}

// ========================================

ReactDOM.render(<Homepage/>, document.getElementById("root"));
