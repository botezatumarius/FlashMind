import React from 'react';

import {
    Button,
    Container,
    Form,
    Header,
    TextArea
} from 'semantic-ui-react'

const Answering = () => {
    return (
        <Container  style={{position: 'absolute', left: 200}}>
             <Header/>
             <Button>Skip</Button>
             <Form>
                <TextArea data-testid='textarea'/>
            </Form>
            <Button>Submit</Button>
        </Container>
        )}; 

export default Answering;