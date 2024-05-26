import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button, Container, Snackbar, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { CardContext } from '../../services/CardContext/card';
import { CardActionTypes, Card } from '../../Types';
import { saveCards, loadCards } from '../../services/Save/save.tsx';

const Writing: React.FC = () => {
    const { cards, dispatch } = useContext(CardContext);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [subject, setSubject] = useState('');
    const [actionStatus, setActionStatus] = useState('');

    const clearAll = useCallback(() => {
        setQuestion('');
        setAnswer('');
        setSubject('');
    }, []);

    useEffect(() => {
        clearAll();
    }, [clearAll]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        const storedCards = loadCards() || [];
        const existingCardIndex = storedCards.findIndex((storedCard: Card) => storedCard.question === question);

        if (existingCardIndex !== -1) {
            const existingCard = storedCards[existingCardIndex];
            try {
                const response = await axios.put(`http://localhost:5000/flashmind/${existingCard.id}`, {
                    answer,
                    question,
                    subject
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    const updatedCards = [...storedCards];
                    updatedCards[existingCardIndex] = { ...existingCard, answer, subject };
                    saveCards(updatedCards);
                    dispatch({ type: CardActionTypes.setCards, cards: updatedCards });
                    setActionStatus('updated');
                    clearAll();
                }
            } catch (error) {
                console.error('Error updating card:', error);
            }
        } else {
            try {
                const highestId = storedCards.reduce((maxId, card) => Math.max(card.id, maxId), 0);
                const newCard = { id: highestId + 1, answer, question, subject };
                const updatedCards = [...storedCards, newCard];
                saveCards(updatedCards);
                dispatch({ type: CardActionTypes.setCards, cards: updatedCards });
                setActionStatus('added');
                clearAll();

                const response = await axios.post('http://localhost:5000/flashmind', {
                    answer,
                    question,
                    subject
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 201) {
                    const serverId = response.data.id;
                    const updatedCardsWithServerId = updatedCards.map(card =>
                        card.id === newCard.id ? { ...card, id: serverId } : card
                    );
                    saveCards(updatedCardsWithServerId);
                    dispatch({ type: CardActionTypes.setCards, cards: updatedCardsWithServerId });
                }
            } catch (error) {
                console.error('Error saving card:', error);
            }
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }
    
        const storedCards = loadCards() || [];
        const cardIndex = storedCards.findIndex((storedCard: Card) =>
            storedCard.question === question && storedCard.answer === answer && storedCard.subject === subject
        );
    
        if (cardIndex !== -1) {
            const cardToDelete = storedCards[cardIndex];
            let cardId = cardToDelete.id;
            if (!cardId) {
                const highestId = storedCards.reduce((maxId, card) => Math.max(card.id || 0, maxId), 0);
                cardId = highestId + 1;
            }
            try {
                const response = await axios.delete(`http://localhost:5000/flashmind/${cardId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                if (response.status === 200) {
                    const updatedCards = storedCards.filter(card => card.id !== cardToDelete.id);
                    saveCards(updatedCards);
                    dispatch({ type: CardActionTypes.setCards, cards: updatedCards });
                    setActionStatus('deleted');
                    clearAll();
                }
            } catch (error) {
                console.error('Error deleting card:', error);
            }
        } else {
            setActionStatus('not found');
        }
    };    

    const handleCloseSnackbar = () => {
        setActionStatus('');
    };

    return (
        <Container style={{ marginTop: '20px', width: '50%' }}>
            <Button style={{ marginBottom: '10px', marginRight: '20px' }} variant="contained" onClick={() => dispatch({ type: CardActionTypes.new })}>New Card</Button>
            <Button style={{ marginBottom: '10px' }} variant="contained" onClick={handleDelete}>Delete this Card</Button>
            <form onSubmit={handleSave}>
                <Typography variant="h6" gutterBottom>Subject</Typography>
                <TextField
                    id="subject"
                    data-testid="subject"
                    name="subject"
                    placeholder="Enter subject"
                    onChange={(e) => setSubject(e.target.value)}
                    value={subject}
                    variant="outlined"
                    fullWidth
                />
                <Typography variant="h6" gutterBottom>Question</Typography>
                <TextField
                    id="question"
                    data-testid="question"
                    name="question"
                    multiline
                    rows={4}
                    placeholder="Enter question"
                    onChange={(e) => setQuestion(e.target.value)}
                    value={question}
                    variant="outlined"
                    fullWidth
                />
                <Typography variant="h6" gutterBottom>Answer</Typography>
                <TextField
                    id="answer"
                    data-testid="answer"
                    name="answer"
                    multiline
                    rows={4}
                    placeholder="Enter answer"
                    onChange={(e) => setAnswer(e.target.value)}
                    value={answer}
                    variant="outlined"
                    fullWidth
                />
                <Button type="submit" variant="contained" style={{ marginTop: '10px' }}>Save</Button>
            </form>
            <Snackbar
                open={!!actionStatus}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message={
                    actionStatus === 'not found'
                        ? 'Card not found in local storage'
                        : `Question card has been ${actionStatus}`
                }
            />
        </Container>
    );
};

export default Writing;
