import React, { useContext, useState} from 'react';

import {
    Button,
    Container,
    Form,
    Header,
    TextArea
} from 'semantic-ui-react'

import { CardContext } from '../../services/CardContext/card';

import { CardActionTypes } from '../../Types';

import Answer from '../Components/index1';

const Answering = () => {
    const { cards, current, dispatch } = useContext(CardContext);
    const { question } = cards[current];

    const [showAnswer, setShowAnswer] = useState(false);

return (
    <Container data-testid='container' style={{position: 'absolute', left: 200}}>
         <Header data-testid='question' content={question}/>
         <Button onClick={() => dispatch({type: CardActionTypes.next})}>Skip</Button>
         <Form>
            <TextArea data-testid='textarea'/>
        </Form>
        <Button onClick={() => setShowAnswer(true)}>Submit</Button>
        <Answer visible={showAnswer}/>
    </Container>
    )}; 

export default Answering;