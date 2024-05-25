import { Fragment, useContext } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { CardContext } from '../services/CardContext/card.tsx';
import { CardActionTypes } from '../Types.tsx';

const Subject = ({
    subject
  }: {
    subject: string
  }) =>  {
    const { cards, current, dispatch, show } = useContext(CardContext);
  
    const currentCard = cards[current];
    const expanded = show.includes(subject);
    const subjectCards = cards
      .filter(card => card.subject === subject)
      .sort((a, b) => 
        a.question.toLowerCase().localeCompare(b.question.toLowerCase()))

    return (
        <Fragment>
            <Menu.Item 
                as='a'
                style={{ cursor: 'pointer' }} 
                active={!!currentCard && currentCard.subject === subject}
                onClick={() => expanded 
                    ? dispatch({type: CardActionTypes.showRemove, subject})
                    : dispatch({type: CardActionTypes.showAdd, subject})}> 
                <Icon name='list'/>
                {subject}
            </Menu.Item>
            {expanded && (
                <div>
                    {subjectCards.map((card) => (
                        <div key={card.question}>
                            <Menu.Item 
                                as='a'
                                style={{ cursor: 'pointer' }} 
                                active={!!currentCard && card.question === currentCard.question}
                                content={card.question}
                                onClick={() => dispatch({type: CardActionTypes.select, question: card.question})}
                            />
                        </div>
                    ))}
                </div>
            )}
        </Fragment>
    );
};
  
export default Subject;
