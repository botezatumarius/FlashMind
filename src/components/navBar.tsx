import React, { useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import { SceneTypes } from '../Types';

const NavBar = ({
    setShowScene,
    showScene
}:{
    setShowScene: (scene: SceneTypes) => void,
    showScene: SceneTypes
}) => {
    return(
        <Menu data-testid='menu'>
        <Menu.Item header content='FlashMind'/>
        <Menu.Item content='Answer Flashcards' 
            active={showScene === SceneTypes.answering}
            onClick={() => setShowScene(SceneTypes.answering)}
        />
        <Menu.Item content='Edit Flashcards'
            active={showScene === SceneTypes.writing}
            onClick={() => setShowScene(SceneTypes.writing)}
        />
    </Menu>
)};

export default NavBar;