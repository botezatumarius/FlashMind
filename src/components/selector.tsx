import React, { useContext } from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { CardContext } from '../services/CardContext/card.tsx';
import { CardActionTypes, Card } from '../Types.tsx';
import Subject from './subject.tsx';

const Selector: React.FC = () => {
    const { cards, dispatch } = useContext(CardContext);

    const groupedCards: { [key: string]: Card[] } = {};
    cards.forEach((card: Card) => {
        if (!groupedCards[card.subject]) {
            groupedCards[card.subject] = [];
        }
        groupedCards[card.subject].push(card);
    });

    const sortedSubjects = Object.keys(groupedCards).sort();

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            style={{ top: 50, width: '300px' }}
            open={false}
            PaperProps={{ style: { width: '170px' } }}
        >
            <List>
                <ListItem onClick={() => dispatch({ type: CardActionTypes.showAll })}>
                    <ListItemText primary={`Subjects`} />
                </ListItem>
                {sortedSubjects.map((subject: string) => (
                    <div key={subject}>
                        <Subject subject={subject} />
                    </div>
                ))}
            </List>
        </Drawer>
    );
};

export default Selector;
