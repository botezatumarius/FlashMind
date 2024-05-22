import React, { createContext, useEffect, useReducer } from 'react';
import { Card, CardState } from '../../Types';
import { saveCards } from '../Save/save';
import { getInitialState } from './initialState';

export const reducer = (state: CardState, action: any) => {
    switch(action.type) {
        case 'delete': {
            let { cards, current } = state;
            const { question } = action;
            const newCards = [...cards];
            const index = newCards.findIndex(card => card.question === question);
            newCards.splice(index, 1);
            current = current -1;
            if(current < 0) current = 0;
            return {
                ...state,
                current,
                cards: newCards
            }
        }
        case 'new': {
            return {
                ...state,
                current: -1
            }
        }
        case 'next': {
            const { cards, current } = state;
            const total = cards.length - 1;
            const next = current + 1 <= total ? current + 1 : 0;
            return {
                ...state,
                current: next
            }
        }
        case 'save': {
            const { cards } = state;
            const { answer, question, subject } = action;
            const index = cards.findIndex(card => card.question === question);
            const card = {
                answer,
                question,
                subject
            } as Card;
            const newCards = cards.filter(v => !!v.question);
            if (index > -1) {
                newCards[index] = card;
            } else {
                newCards.push(card);
            }
            return {
                ...state,
                cards: newCards
            }
        }
        default: 
            return state;
    }
};

export const initialState = getInitialState(); 

const CardContext = createContext(initialState);

type CardProviderProps = {
    children: React.ReactNode;
    testState?: CardState;
    testDispatch?: (arg: any) => void;
};

const CardProvider = ({ children, testState, testDispatch }: CardProviderProps) => {
    const [state, dispatch] = useReducer(reducer, testState ? testState : initialState);

    useEffect(() => {
        saveCards(state.cards);
    }, [state.cards]);

    const value = { ...state, dispatch };

    return (
        <CardContext.Provider value={value}>
            {children}
        </CardContext.Provider>
    );
};

export { 
    CardContext, 
    CardProvider 
};
