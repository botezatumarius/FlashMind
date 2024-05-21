import React, { useState, useContext, useEffect } from 'react';
import { Button, Container, Form, Header, TextArea } from 'semantic-ui-react';
import { CardContext } from '../../services/CardContext/card';
import { CardActionTypes } from '../../Types';
import Answer from '../Components/index1';
import Buttons from '../Components/rightWrongButton';

const Answering = () => {
    const { cards, current, dispatch } = useContext(CardContext);
    const { question } = cards[current];
    const [showAnswer, setShowAnswer] = useState(false);
    const [input, setInput] = useState('');

    useEffect(() => {
        setShowAnswer(false);
        setInput('');
    }, [current]);

    return (
        <Container data-testid='container' style={{ position: 'absolute', left: 200 }}>
            <Header data-testid='question' content={question} />
            <Button onClick={() => dispatch({ type: CardActionTypes.next })}>Skip</Button>
            <Form>
                <TextArea
                    data-testid='textarea'
                    value={input}
                    onChange={(e, { value }) => typeof value === 'string' && setInput(value)}
                />
            </Form>
            <Buttons answered={showAnswer} submit={() => setShowAnswer(true)} />
            <Answer visible={showAnswer} />
        </Container>
    );
};

export default Answering;
