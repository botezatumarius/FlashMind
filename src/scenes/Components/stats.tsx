import React, { useContext } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import QuestionCircleIcon from '@mui/icons-material/HelpOutline';
import { CardContext } from '../../services/CardContext/card';
import { StatsContext } from '../../services/StatsContext/stats';

const Stats = () => {
    const { cards, current } = useContext(CardContext);
    const { question } = cards[current];
    const allStats = useContext(StatsContext);
    const stats = allStats[question];
    const icon = <QuestionCircleIcon data-testid='icon' />;

    if (!stats) return (
        <Tooltip 
            title="You haven't seen this question before"
            arrow
        >
            {icon}
        </Tooltip>
    );

    const total = Object.keys(stats)
        .reduce((acc, cur) => {
            const key = cur as keyof typeof stats; 
            acc = acc + stats[key];
            return acc;
        }, 0);

    return (
        <Tooltip
            title={
                <Typography variant="body1" style={{ fontSize: '18px' }}>
                    <div>
                        <div>You have seen this question {total} time{total !== 1 ? 's' : ''}.</div>
                        <div>You got it right {stats.right}</div>
                        <div>Wrong {stats.wrong}</div>
                        <div>You skipped it {stats.skip}</div> 
                    </div>
                </Typography>
            }
            arrow
        >
            {icon}
        </Tooltip>
    );
};

export default Stats;
