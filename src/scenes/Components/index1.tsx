import React, { useContext } from 'react';
import { CardContext } from '../../services/CardContext/card';
import { Typography, Slide } from '@mui/material';

const Answer = ({
    visible
}:{
    visible: boolean
}) => {
    const { cards, current } = useContext(CardContext);
    const { answer } = cards[current];

    const content = answer
        .split(/\n/g)
        .map((string, index) => <Typography key={index} variant="body1">{string}</Typography>);

    return (
        <Slide direction="up" in={visible} mountOnEnter unmountOnExit>
            <div data-testid='answer'>
                <Typography variant="h6">Answer</Typography>
                {content}
            </div>
        </Slide>
    );
};

export default Answer;
