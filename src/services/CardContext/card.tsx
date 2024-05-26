import React, { createContext, useEffect, useReducer } from 'react';
import { Card, CardState, CardAction, CardActionTypes } from '../../Types.tsx';
import { loadCards, saveCards } from '../Save/save.tsx';

const card1: Card = {
    id: 1,
    question: 'What is a linked list?',
    subject: 'Linked List',
    answer: `A linked list is a sequential list of nodes. 
    The nodes hold data. 
    The nodes hold pointers that point to other nodes containing data.`
};

const card2: Card = {
    id: 2,
    question: 'What is a stack?',
    subject: 'Stack',
    answer: `A stack is a one ended linear data structure.
    The stack models real world situations by having two primary operations: Push and pop.
    Push adds an element to the stack.
    Pop pulls the top element off of the stack.`
};

export const cards = [card1, card2];

let loadedCards = loadCards();

const shuffle = (array: any[]) => {
    if (array.length > 0) {
        for (let i: number = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
    return array;
};

export const getInitialState = () => ({
    cards: loadedCards ? shuffle(loadedCards) : cards,
    current: 0,
    dispatch: () => undefined,
    show: []
} as CardState);

export const getNext = ({
    cards,
    current,
    show
}: {
    cards: Card[],
    current: number,
    show: string[]
}) => {
    if (show.length === 0) {
        const total = cards.length - 1;
        const next = current + 1 <= total ? current + 1 : 0;
        return next;
    } else {
        const showCards = cards.filter(card => show.includes(card.subject));
        if (showCards.length === 0) {
            return current;
        }
        const showCurrent = showCards.findIndex(card => card.question === cards[current].question);
        const showTotal = showCards.length - 1;
        const showNext = showCurrent + 1 <= showTotal ? showCurrent + 1 : 0;
        const next = cards.findIndex(card => card.question === showCards[showNext]?.question);
        return next !== -1 ? next : current;
    }
};

const reducer = (state: CardState, action: CardAction): CardState => {
    switch (action.type) {
        case CardActionTypes.delete: {
            let { cards, current } = state;
            const { question } = action;
            const newCards = [...cards];
            const index = newCards.findIndex(card => card.question === question);
            if (index !== -1) {
                newCards.splice(index, 1);
                current = current - 1;
                if (current < 0) current = 0;
            }
            return {
                ...state,
                current,
                cards: newCards
            };
        }
        case CardActionTypes.new: {
            return {
                ...state,
                current: -1
            };
        }
        case CardActionTypes.next: {
            const { cards, current, show } = state;
            const next = getNext({ cards, current, show });
            return {
                ...state,
                current: next
            };
        }
        case CardActionTypes.save: {
            const { cards } = state;
            const { answer, question, subject } = action;
            const index = cards.findIndex(card => card.question === question);
            const card = { answer, question, subject } as Card;
            const newCards = cards.filter(v => !!v.question);
            if (index > -1) {
                newCards[index] = card;
            } else {
                newCards.push(card);
            }
            return {
                ...state,
                cards: newCards
            };
        }
        case CardActionTypes.select: {
            const { cards } = state;
            const { question } = action;
            if (!question) return state;
            const current = cards.findIndex(card => card.question === question);
            if (current < 0) return state;
            return {
                ...state,
                current
            };
        }
        case CardActionTypes.showAdd: {
            const { subject } = action;
            const show = [...state.show];
            if (!show.includes(subject)) {
                show.push(subject);
            }
            return {
                ...state,
                show
            };
        }
        case CardActionTypes.showAll: {
            return {
                ...state,
                show: []
            };
        }
        case CardActionTypes.showRemove: {
            const { subject } = action;
            const show = state.show.filter(subj => subj !== subject);
            return {
                ...state,
                show
            };
        }
        case CardActionTypes.setCards: {
            return {
                ...state,
                cards: action.cards,
                current: state.current >= action.cards.length ? 0 : state.current
            };
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

const CardProvider = ({ children, testState }: CardProviderProps) => {
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
