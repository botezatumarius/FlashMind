export interface Card {
    id: number; 
    answer: string;
    question: string;
    subject: string;
}


export enum CardActionTypes {
    delete = 'delete',
    new = 'new',
    next = 'next',
    save = 'save',
    select = 'select',
    showAdd = 'showAdd',
    showAll = 'showAll',
    showRemove = 'showRemove',
    setCards = 'setCards' // Add this new action type
}

export type CardAction =
    | { type: CardActionTypes.delete, question: string }
    | { type: CardActionTypes.new }
    | { type: CardActionTypes.next }
    | { type: CardActionTypes.save, answer: string, question: string, subject: string }
    | { type: CardActionTypes.select, question: string }
    | { type: CardActionTypes.showAdd, subject: string }
    | { type: CardActionTypes.showAll }
    | { type: CardActionTypes.showRemove, subject: string }
    | { type: CardActionTypes.setCards, cards: Card[] }; // Add this new action

export interface CardState {
    cards: Card[];
    current: number;
    dispatch: (action: CardAction) => void;
    show: string[];
}

export interface Stats {
    right: number;
    wrong: number;
    skip: number;
}

export interface StatsType {
    [key: string]: Stats;
}

export enum StatsActionType {
    right = 'right',
    skip = 'skip',
    wrong = 'wrong'
}

export type StatsAction = {
    type: StatsActionType;
    question: string;
}

interface StatsDispatch {
    dispatch: (action: StatsAction) => void;
}

export type StatsState = StatsType & StatsDispatch;

export enum SceneTypes {
    answering = "answering",
    writing = "writing"
}
