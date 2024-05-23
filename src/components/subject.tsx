import React, { Fragment, useContext } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { CardContext } from '../services/CardContext/card';
import { CardActionTypes } from '../Types';

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

    const cardsChild = subjectCards
    .map(card => {
      const { question } = card;
      return <Menu.Item 
              active={!!currentCard && question === currentCard.question}
              as='a'
              content={question}
              key={question}
              onClick={() => dispatch({type: CardActionTypes.select, question})}
              />
        });

    return (
        <Fragment>
            <Menu.Item as='a'
                active={!!currentCard && currentCard.subject === subject}
                onClick={() => expanded 
                    ? dispatch({type: CardActionTypes.showRemove, subject})
                    : dispatch({type: CardActionTypes.showAdd, subject})}> 
                <Icon name='list'/>
                {subject}
            </Menu.Item>
            {expanded && cardsChild}
        </Fragment>
    )};
  
export default Subject;