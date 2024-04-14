import React from 'react';
import moment from 'moment';
import AppText from './AppText';

const TimeElapsedComponent = ({ timestamp }) => {
    const timeElapsed = moment(timestamp).fromNow();
    return <AppText>{timeElapsed}</AppText>;
};

export default TimeElapsedComponent;
