import { useContext } from 'react';
import { AppBar, Tab, Tabs, useTheme } from '@mui/material';
import { SceneTypes } from '../Types.tsx';
import { CardContext } from '../services/CardContext/card.tsx';
import { CardActionTypes } from '../Types.tsx';

const NavBar = ({
    setShowScene,
    showScene
}: {
    setShowScene: (scene: SceneTypes) => void,
    showScene: SceneTypes
}) => {
    const { current, dispatch } = useContext(CardContext);
    const theme = useTheme(); 
    const backgroundColor = theme.palette.mode === 'dark' ? '#424242' : '#99baf0'; 

    return (
        <AppBar position="static" style={{ backgroundColor }} data-testid='menu'>
            <Tabs value={showScene} onChange={(_, newValue) => setShowScene(newValue)} aria-label="NavBar tabs"> 
                <Tab label="FlashMind" disabled />
                <Tab 
                    label="Answer Flashcards"
                    value={SceneTypes.answering} 
                    onClick={() => {
                        current === -1 && dispatch({ type: CardActionTypes.next });
                    }}
                />
                <Tab label="Edit Flashcards" value={SceneTypes.writing} />
            </Tabs>
        </AppBar>
    );
};

export default NavBar;

