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


export interface Stats {
    right: number,
    wrong: number,
    skip: number
};

export interface StatsType {
    [key: string]: Stats
};

interface StatsDispatch {
    dispatch: ({type, question}:{type: string, question: string}) => void
};

export type StatsState = StatsType & StatsDispatch

export enum StatsActionType {
    right = 'right',
    skip = 'skip',
    wrong = 'wrong'
};

export type StatsAction = { 
    type: StatsActionType, 
    question: string 
};

export enum SceneTypes {
    answering = "answering",
    writing = "writing"
};
