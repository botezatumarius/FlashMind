import { loadCards } from '../Save/save';
import { Card, CardAction, CardState } from '../../Types';

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
    answer: `A stack is a one-ended linear data structure.
    The stack models real-world situations by having two primary operations: Push and pop.
    Push adds an element to the stack.
    Pop pulls the top element off the stack.`
};

export const cards = [card1, card2];

const loadedCards = loadCards();

export const getInitialState = () => ({
    cards: loadedCards ? loadedCards : cards,
    current: 0,
    dispatch: (action: CardAction) => undefined,
    show: []
} as CardState);
