import React, { createContext, useEffect, useReducer } from 'react';
import { Card, CardState, CardAction, CardActionTypes } from '../../Types.tsx';
import { saveCards } from '../Save/save.tsx';
import { getInitialState, getNext } from './initialState.tsx';

const reducer = (state: CardState, action: CardAction): CardState => {
    switch(action.type) {
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
