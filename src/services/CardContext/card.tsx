import React, { createContext, useReducer } from 'react';
import { Card, CardState } from '../../Types';

const card1: Card = {
    question: 'What is a linked list?',
    subject: 'Linked List',
    answer: `A linked list is a sequential list of nodes. 
    The nodes hold data. 
    The nodes hold pointers that point to other nodes containing data.`
};

const card2: Card = {
    question: 'What is a stack?',
    subject: 'Stack',
    answer: `A stack is a one ended linear data structure.
    The stack models real world situations by having two primary operations: Push and pop.
    Push adds an element to the stack.
    Pop pulls the top element off of the stack.`
};

const cards = [card1, card2];

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
        case 'save' :{
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
            return state
    };
};

export const initialState: CardState = {
    cards,
    current: 0,
    dispatch: ({type}:{type:string}) => undefined,
}; 

const CardContext = createContext(initialState);

type CardProviderProps = {
    children: React.ReactNode;
    testState?: CardState
};

const CardProvider = ({ children, testState }: CardProviderProps ) => {
    const [state, dispatch] = useReducer(reducer, testState ? testState : initialState);
    const value = {...state, dispatch};

    return (
        <CardContext.Provider value={value}>
            {children}
        </CardContext.Provider>
    )
};

export { 
    CardContext, 
    CardProvider 
};
