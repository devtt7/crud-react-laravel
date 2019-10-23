import React from 'react'
import { Table } from 'semantic-ui-react'

export default ({ groups }) => (
    <Table sortable celled padded fixed>
        <Table.Header>
        <Table.Row>
            <Table.HeaderCell singleLine>Group ID</Table.HeaderCell>
            <Table.HeaderCell>Group Name</Table.HeaderCell>
        </Table.Row>
        </Table.Header>

        <Table.Body>

        {
            groups.map((group, index) => {
                return (
                    <Table.Row key={index}>
                        <Table.Cell singleLine>{ group.id }</Table.Cell>
                        <Table.Cell singleLine>{ group.group_name }</Table.Cell>
                    </Table.Row>
                );
            })
        }

        </Table.Body>
    </Table>
);
