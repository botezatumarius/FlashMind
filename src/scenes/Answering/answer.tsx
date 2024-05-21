import React, { useContext} from 'react';

import {
    Button,
    Container,
    Form,
    Header,
    TextArea
} from 'semantic-ui-react'

import { CardContext } from '../../services/CardContext/card';
import { CardActionTypes } from '../../Types';

const Answering = () => {
    const { cards, current, dispatch } = useContext(CardContext);
    const { question } = cards[current];

return (
    <Container data-testid='container' style={{position: 'absolute', left: 200}}>
         <Header data-testid='question' content={question}/>
         <Button onClick={() => dispatch({type: CardActionTypes.next})}>Skip</Button>
         <Form>
            <TextArea data-testid='textarea'/>
        </Form>
        <Button>Submit</Button>
    </Container>
    )}; 

export default Answering;