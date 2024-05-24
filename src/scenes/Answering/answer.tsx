import React, { useState, useContext, useEffect } from 'react';
import {
    Button,
    Container,
    Form,
    Header,
    TextArea
} from 'semantic-ui-react';

import { CardContext } from '../../services/CardContext/card';
import { CardActionTypes, StatsActionType } from '../../Types';
import { StatsContext } from '../../services/StatsContext/stats';

import Answer from '../Components/index1';
import Buttons from '../Components/rightWrongButton';
import Stats from '../Components/stats';

const Answering = () => {
    const { cards, current, dispatch } = useContext(CardContext);
    const { dispatch: statsDispatch } = useContext(StatsContext);
    const { question } = cards[current];
    const [showAnswer, setShowAnswer] = useState(false);
    const [input, setInput] = useState('');

    useEffect(() => {
        setShowAnswer(false);
        setInput('');
    }, [current, setShowAnswer]);
    
    return (
        <Container data-testid='container' style={{
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'flex-start', 
            alignItems: 'center', 
            marginTop: '20px' 
        }}>
            <Header data-testid='question'>
                <Stats/>{question}
            </Header>
            <Button onClick={() => {
                dispatch({type: CardActionTypes.next});
                statsDispatch({type: StatsActionType.skip, question});   
            }}>Skip</Button>
            <Form>
                <TextArea 
                    data-testid='textarea'
                    value={input}
                    onChange={(e: any, {value}) => typeof(value) === 'string' && setInput(value)}
                    style={{ width: '400px', height: '200px' }} 
                />
            </Form>
            <Buttons answered={showAnswer} submit={() => setShowAnswer(true)}/>
            <Answer visible={showAnswer}/>
        </Container>
    );
}; 

export default Answering;
