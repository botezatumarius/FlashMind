import { useState, useContext, useEffect } from 'react';
import {
    Button,
    Container,
    TextField,
    Typography,
} from '@mui/material';

import { CardContext } from '../../services/CardContext/card';
import { CardActionTypes, StatsActionType } from '../../Types';
import { StatsContext } from '../../services/StatsContext/stats';

import Answer from '../Components/index1';
import Buttons from '../Components/rightWrongButton';
import Stats from '../Components/stats';

const Answering = () => {
    const { cards, current, dispatch } = useContext(CardContext);
    const { dispatch: statsDispatch } = useContext(StatsContext);
    const card = cards[current];
    const [showAnswer, setShowAnswer] = useState(false);
    const [input, setInput] = useState('');

    useEffect(() => {
        setShowAnswer(false);
        setInput('');
    }, [current, setShowAnswer]);

    if (!card) {
        return null; 
    }

    const { question } = card;
    
    return (
        <Container style={{ marginTop: '20px' }}>
            <Typography variant="h5" gutterBottom>
                {question}
                    <span style={{ verticalAlign: 'middle', marginLeft: '8px' }}> 
                        <Stats />
                    </span>

            </Typography>
            <Button onClick={() => {
                dispatch({type: CardActionTypes.next});
                statsDispatch({type: StatsActionType.skip, question});   
            }}>Skip</Button>
            <TextField
                label="Your Answer"
                variant="outlined"
                multiline
                rows={4}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ width: '100%', marginTop: '20px' }}
            />
            <Buttons answered={showAnswer} submit={() => setShowAnswer(true)}/>
            <Answer visible={showAnswer}/>
        </Container>
    );
}; 

export default Answering;
