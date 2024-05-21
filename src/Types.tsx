export interface Card {
    answer: string,
    question: string,
    subject: string
}

export interface CardState {
    cards: Card[],
    current: number,
    dispatch: (action: any) => void
};

export enum CardActionTypes {
    next = 'next',
};

export type CardAction =    
    | { type: CardActionTypes.next }


