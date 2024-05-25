import { useCallback, useContext, useEffect, useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import { CardContext } from '../../services/CardContext/card.tsx';
import { CardActionTypes } from '../../Types.tsx';

const Writing = () => {
    const { cards, current, dispatch } = useContext(CardContext);
    const card = cards[current];
    const [question, setQuestion] = useState(card ? card.question : '');
    const [answer, setAnswer] = useState(card ? card.answer : '');
    const [subject, setSubject] = useState(card ? card.subject : '');

    const clearAll = useCallback(() => {
        setQuestion('');
        setAnswer('');
        setSubject('');
    }, []);

    useEffect(() => {
        if (card) {
            const { question, answer, subject } = card;
            setQuestion(question);
            setAnswer(answer);
            setSubject(subject);
        } else {
            clearAll();
        }
    }, [card, clearAll]);

    return (
        <Container style={{ marginTop: '20px', width: '50%' }}>
            <Button style={{ marginBottom: '10px', marginRight:'20px' }} variant="contained" onClick={() => dispatch({ type: CardActionTypes.new })}>New Card</Button>
            <Button style={{ marginBottom: '10px' }} variant="contained" onClick={() => dispatch({ type: CardActionTypes.delete, question })}>Delete this Card</Button>
            <form onSubmit={(e) => {
                e.preventDefault();
                dispatch({
                    type: CardActionTypes.save,
                    answer,
                    question,
                    subject
                });
            }}>
                <Typography variant="h6" gutterBottom>Subject</Typography>
                <TextField
                    id="subject"
                    data-testid='subject'
                    name='subject'
                    placeholder="Enter subject"
                    onChange={(e) => setSubject(e.target.value)}
                    value={subject}
                    variant="outlined"
                    fullWidth
                />
                <Typography variant="h6" gutterBottom>Question</Typography>
                <TextField
                    id="question"
                    data-testid='question'
                    name='question'
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
                    data-testid='answer'
                    name='answer'
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
        </Container>
    );
};

export default Writing;
