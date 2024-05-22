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
    delete = 'delete',
    new = 'new',
    next = 'next',
    save = 'save'
};

export type CardAction =    
    | { type: CardActionTypes.delete, question: string }
    | { type: CardActionTypes.new }    
    | { type: CardActionTypes.next }
    | { type: CardActionTypes.save, answer: string, question: string, subject: string }

export interface Stats {
    right: number,
    wrong: number,
    skip: number
};

export interface StatsType {
    [key: string]: Stats
};

export enum StatsActionType {
    right = 'right',
    skip = 'skip',
    wrong = 'wrong'
};

export type StatsAction = { 
    type: StatsActionType, 
    question: string 
};

interface StatsDispatch {
    dispatch: (action: StatsAction) => void
};

export type StatsState = StatsType & StatsDispatch

export enum SceneTypes {
    answering = "answering",
    writing = "writing"
};
