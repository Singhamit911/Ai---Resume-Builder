import React from "react";

const SummaryPreview = ({ resumeInfo }) => {
  return <div className="text-xs">{resumeInfo?.summary}</div>;
};

export default SummaryPreview;
