import React, { 
    useCallback, 
    useContext, 
    useEffect, 
    useState,
} from 'react';

import { 
    Button,
    Container,
    Form,
    Header,
    Input,
    TextArea
} from 'semantic-ui-react';
import { CardContext } from '../../services/CardContext/card';
import { CardActionTypes } from '../../Types';

const Writing = () => {
    const { cards, current, dispatch } = useContext(CardContext);
    const card = cards[current];
    const [question, setQuestion ] = useState(card ? card.question : '');
    const [answer, setAnswer ] = useState(card ? card.answer : '');
    const [subject, setSubject ] = useState(card ? card.subject : '');

    const clearAll = useCallback(
        () => {
            setQuestion('');
            setAnswer('');
            setSubject('');
    }, [
        setQuestion,
        setAnswer,
        setSubject
    ]);

    useEffect(() => {
        if (!!card) {
            const { question, answer, subject } = card;
            setQuestion(question);
            setAnswer(answer);
            setSubject(subject);
        } else {
            clearAll();
        };
    }, [
        card,
        clearAll 
    ]);

    return (
        <Container style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '20px',
            width: '50%' 
        }}>
            <Button style={{marginBottom:'10px'}} content='New Card' onClick={() => dispatch({type: CardActionTypes.new})}/>
            <Button style={{marginBottom:'10px'}} content='Delete this Card' onClick={() => dispatch({type: CardActionTypes.delete, question})}/>
            <Form 
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    const card = new FormData(e.target as HTMLFormElement);
                    const answer = card.get('answer') as string;
                    const question = card.get('question') as string;
                    const subject = card.get('subject') as string;

                    dispatch({
                        type: CardActionTypes.save,
                        answer,
                        question,
                        subject
                    });
                }}>
                <Header as='h3'>Subject</Header> 
                <Input data-testid='subject' name='subject'
                    onChange={(e, { value }) => setSubject(value)}
                    value={subject}/>
                <Header as='h3' content='Question'/> 
                <TextArea data-testid='question' name='question'
                    onChange={(e, { value }) => setQuestion(value!.toString())}
                    value={question}
                    style={{ width: '100%', height: '150px' }} 
                />
                <Header as='h3' content='Answer'/> 
                <TextArea data-testid='answer' name='answer'
                    onChange={(e, { value }) => setAnswer(value!.toString())}
                    value={answer}
                    style={{ width: '100%', height: '150px' }} 
                />
                <Button content='Save'/>
            </Form>
        </Container>
    );
};

export default Writing;
