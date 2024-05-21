import React, { useContext } from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import { CardContext } from '../../services/CardContext/card';
import { StatsContext } from '../../services/StatsContext/stats';

const Stats = () => {
    const { cards, current } = useContext(CardContext);
    const { question } = cards[current];
    const allStats = useContext(StatsContext);
    const stats = allStats[question];   
    const icon = <Icon data-testid='icon' name='question circle'/>
    
    if (!stats) return (
    <Popup 
    content="You haven't seen this question before" 
    trigger={icon}
    />);

    const total = Object.keys(stats)
    .reduce((acc, cur) => {
        const key = cur as keyof typeof stats; 
        acc = acc + stats[key];
        return acc;
    }, 0);

    return <Popup
            data-testid='popup'
            content={
                <div>
                    <div>You have seen this question {total} time{total !== 1 && 's'}.</div>
                    <div>You got it right {stats.right}</div>
                    <div>Wrong {stats.wrong}</div>
                    <div>You skipped it {stats.skip}</div> 
                </div>}
            trigger={icon}
            />
};

export default Stats;