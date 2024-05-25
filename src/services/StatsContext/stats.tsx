import React, { createContext, useEffect, useReducer } from 'react';
import { Stats, StatsAction, StatsState } from '../../Types.tsx';
import { loadStats, saveStats } from '../Save/save.tsx';

export const blankStats = {
    right: 0,
    wrong: 0,
    skip: 0
} as Stats;

export const reducer = (state: StatsState, action: StatsAction) => {
    switch(action.type) {
        case 'right': {
            const { question } = action;
            const prevStats = state[question] ? state[question] : blankStats;
            const newStats = {
                ...prevStats,
                right: prevStats.right + 1
            };
            const newState = {
                ...state,
                [question]: newStats
            };
            return newState;
        }
        case 'skip': {
            const { question } = action;
            const prevStats = state[question] ? state[question] : blankStats;
            const newStats = {
                ...prevStats,
                skip: prevStats.skip + 1
            };
            const newState = {
                ...state,
                [question]: newStats
            };
            return newState;
        }
        case 'wrong': {
            const { question } = action;
            const prevStats = state[question] ? state[question] : blankStats;
            const newStats = {
                ...prevStats,
                wrong: prevStats.wrong + 1
            };
            const newState = {
                ...state,
                [question]: newStats
            };
            return newState;
        }
        default:  
            return state;
    }
};

export const getInitialState = () => ({
    ...loadStats(),
    dispatch: () => undefined
} as unknown) as StatsState;


export const initialState = getInitialState();

const StatsContext = createContext(initialState);

type StatsProviderProps = {
    children: React.ReactNode;
    testState?: StatsState;
};

const StatsProvider = ({ children, testState }: StatsProviderProps) => {
    const [state, dispatch] = useReducer(reducer, testState ? testState : initialState);
    
    useEffect(() => {
        saveStats(state);
    }, [state]);
    
    const value = {...state, dispatch} as StatsState;
    
    return (
        <StatsContext.Provider value={value}>
            {children}
        </StatsContext.Provider>
    );
};

export { 
    StatsContext, 
    StatsProvider 
};
