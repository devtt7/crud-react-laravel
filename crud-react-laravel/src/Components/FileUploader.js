import React from 'react'
import ReactFileReader from 'react-file-reader';
import { Button } from 'semantic-ui-react'

export default ({ handleFiles, buttonText }) => (
    <ReactFileReader handleFiles={handleFiles} fileTypes={'.csv'}>
        <Button className='btn'>{ buttonText || 'upload' }</Button>
    </ReactFileReader>
);
