"use client"
import React, { useState } from 'react';
import AppBadge from './AppBadge';

const ExpandableText = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      onClick={toggleExpansion}
      className={`cursor-pointer  rounded-md overflow-hidden transition-all duration-300`}

    >
      <p className={`line-clamp-1 transition-all duration-300`}>
        {children}
      </p>
      <AppBadge  classname={`${isExpanded ? "absolute" : "hidden"} p-4 rounded-xl`}>
      {children}
      </AppBadge>
    </div>
  );
};

export default ExpandableText;