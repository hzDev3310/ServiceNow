import React from 'react';
import moment from 'moment';
import AppText from './AppText';

const TimeElapsedComponent = ({ timestamp }) => {
    const timeElapsed = moment(timestamp).fromNow();
    return <AppText className="text-xs" >{timeElapsed}</AppText>;
};

export default TimeElapsedComponent;
