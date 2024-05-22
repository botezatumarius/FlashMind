import React, { useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import { SceneTypes } from '../Types';
import { CardContext }  from '../services/CardContext/card';
import { CardActionTypes } from '../Types';

const NavBar = ({
    setShowScene,
    showScene
}:{
    setShowScene: (scene: SceneTypes) => void,
    showScene: SceneTypes
}) => {
    const { current, dispatch } = useContext(CardContext);
    return(
        <Menu data-testid='menu'>
        <Menu.Item header content='FlashMind'/>
        <Menu.Item content='Answer Flashcards' 
            active={showScene === SceneTypes.answering}
            onClick={() => {
                current === -1 && dispatch({type: CardActionTypes.next});
                setShowScene(SceneTypes.answering)
            }}
        />
        <Menu.Item content='Edit Flashcards'
            active={showScene === SceneTypes.writing}
            onClick={() => setShowScene(SceneTypes.writing)}
        />
    </Menu>
)};

export default NavBar;