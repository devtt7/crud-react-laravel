import React, { Component } from 'react'
import { Divider, Header } from 'semantic-ui-react'

import PeopleTable from "./Components/PeopleTable";
import GroupTable from "./Components/GroupTable";
import FileUploader from "./Components/FileUploader";

class ResultsList extends Component {
    constructor(props) {
        super(props);
        this.state = { people: [], groups: [] };
    }

    componentDidMount() {
      this.syncData();
    }

    syncData = () => {
      fetch("http://localhost:8000/api/people")
        .then(response => response.json())
        .then(data => this.setState({ people: data.data }));
      fetch("http://localhost:8000/api/groups")
        .then(response => response.json())
        .then(data => this.setState({ groups: data.data }));
    }

    updateData = (tableName, data) => fetch(`http://localhost:8000/api/${tableName}`, {
        method: 'POST',
        headers : new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data)
      })

    csvJSON = (csv) => {
      const lines=csv.split("\n");
      let result = [];
      const headers=lines[0].split(",").map(header => header.trim().replace(/^"(.+(?="$))"$/, '$1'));

      for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentline=lines[i].split(',');
        if (!lines[i] || lines[i] === '') {
          continue;
        }
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j].trim().replace(/^"(.+(?="$))"$/, '$1');
        }
        result.push(obj);
      }
      return result;
    }

    readFiles = files => new Promise( (resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(this.csvJSON(reader.result));
        };
        reader.onerror = function(event) {
            reject('Error!');
        };
        reader.readAsText(files[0]);
    });

    handleFiles = (files, tableName) => {
      this.readFiles(files)
        .then(jsonObj => {
          const updatePromises = jsonObj.map(obj => this.updateData(tableName, obj));
          Promise.all(updatePromises).then(values => {
            console.log(values);
            this.syncData();
          })
        })
    }

    render() {
        const { people, groups } = this.state;

        return (
          <React.Fragment>
            <Header as='h3'>People</Header>
            <FileUploader handleFiles={files => this.handleFiles(files, 'people')} buttonText='Upload' />
            
            <PeopleTable people={people} />

            <Divider hidden />

            <Header as='h3'>Group</Header>
            <FileUploader handleFiles={files => this.handleFiles(files, 'groups')} buttonText='Upload' />
            
            <GroupTable groups={groups} />
          </React.Fragment>
        );
    }
}

export default ResultsList
