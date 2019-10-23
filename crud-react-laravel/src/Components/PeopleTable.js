import React from 'react'
import { Table } from 'semantic-ui-react'

export default ({ people }) => (
    <Table celled padded>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell singleLine>First Name</Table.HeaderCell>
                <Table.HeaderCell>Last Name</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
        {
            people.map((person, index) => {
                return (
                    <Table.Row key={index}>
                        <Table.Cell singleLine>{ person.first_name }</Table.Cell>
                        <Table.Cell singleLine>{ person.last_name }</Table.Cell>
                        <Table.Cell singleLine>{ person.email_address }</Table.Cell>
                        <Table.Cell singleLine>{ person.status }</Table.Cell>
                    </Table.Row>
                );
            })
        }
        </Table.Body>
    </Table>
);
