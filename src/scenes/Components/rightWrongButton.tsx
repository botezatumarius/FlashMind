import React, { useContext } from 'react';
import { Button } from 'semantic-ui-react';
import { CardActionTypes, StatsActionType } from '../../Types';
import { CardContext } from '../../services/CardContext/card';
import { StatsContext } from '../../services/StatsContext/stats';

const Buttons = ({
    answered,
    submit
}:{
    answered: boolean,
    submit: () => void
}) => {
    const { cards, current, dispatch } = useContext(CardContext);
    const { question } = cards[current];
    const { dispatch: statsDispatch } = useContext(StatsContext);

    return answered
    ?   <Button.Group>
            <Button content='Right' positive 
                onClick={() => {
                    statsDispatch({ type: StatsActionType.right, question })
                    dispatch({ type: CardActionTypes.next })
                }}/>
            <Button.Or/>
            <Button content='Wrong' negative 
                onClick={() => dispatch({ type: CardActionTypes.next })}
            />    
        </Button.Group>
    :   <Button content='Submit' onClick={() => submit()}/>
}; 

export default Buttons;