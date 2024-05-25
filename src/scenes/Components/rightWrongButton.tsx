import { useContext } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { CardActionTypes, StatsActionType } from '../../Types';
import { CardContext } from '../../services/CardContext/card';
import { StatsContext } from '../../services/StatsContext/stats';

const Buttons = ({
    answered,
    submit
}: {
    answered: boolean,
    submit: () => void
}) => {
    const { cards, current, dispatch } = useContext(CardContext);
    const { question } = cards[current];
    const { dispatch: statsDispatch } = useContext(StatsContext);

    return answered ? (
        <ButtonGroup>
            <Button 
                variant="contained" 
                color="success" 
                onClick={() => {
                    statsDispatch({ type: StatsActionType.right, question })
                    dispatch({ type: CardActionTypes.next })
                }}
            >
                Right
            </Button>
            <Button 
                variant="contained" 
                color="error" 
                onClick={() => {
                    statsDispatch({ type: StatsActionType.wrong, question })
                    dispatch({ type: CardActionTypes.next })
                }}
            >
                Wrong
            </Button>
        </ButtonGroup>
    ) : (
        <Button 
            variant="contained" 
            onClick={() => submit()}
        >
            Submit
        </Button>
    );
}; 

export default Buttons;
