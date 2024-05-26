import { loadCards } from '../Save/save.tsx';
import { Card, CardState } from '../../Types.tsx';

const card1: Card = {
    id:1,
    question: 'What is a linked list?',
    subject: 'Linked List',
    answer: `A linked list is a sequential list of nodes. 
    The nodes hold data. 
    The nodes hold pointers that point to other nodes containing data.`
};

const card2: Card = {
    id:2,
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
        for(let i: number = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i)
            const temp = array[i]
            array[i] = array[j]
            array[j] = temp
      }
    };
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
}:{
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
    };
};

