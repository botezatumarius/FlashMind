import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, TextField, Typography } from '@mui/material';
import { CardContext } from '../../services/CardContext/card';
import { CardActionTypes, Card, CardAction, StatsActionType } from '../../Types';
import { StatsContext } from '../../services/StatsContext/stats';
import { saveCards } from '../../services/Save/save.tsx';

import Answer from '../Components/index1';
import Buttons from '../Components/rightWrongButton';
import Stats from '../Components/stats';

const Answering: React.FC = () => {
    const { cards, current, dispatch } = useContext(CardContext);
    const { dispatch: statsDispatch } = useContext(StatsContext);
    const card = cards[current];
    const [showAnswer, setShowAnswer] = useState(false);
    const [input, setInput] = useState('');

    useEffect(() => {
        setShowAnswer(false);
        setInput('');
    }, [current]);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get<{ cards: Card[] }>('http://localhost:5000/flashmind', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const fetchedCards = response.data.cards;
                dispatch({ type: CardActionTypes.setCards, cards: fetchedCards });
                saveCards(fetchedCards);

            } catch (error) {
                console.error('Error fetching cards:', error);
            }
        };

        fetchCards();
    }, [dispatch]);

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
                dispatch({ type: CardActionTypes.next });
                statsDispatch({ type: StatsActionType.skip, question });
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
            <Buttons answered={showAnswer} submit={() => setShowAnswer(true)} />
            <Answer visible={showAnswer} />
        </Container>
    );
};

export default Answering;
