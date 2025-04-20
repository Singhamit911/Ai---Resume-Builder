import React from "react";

const SkillsPreview = ({ resumeInfo }) => {
  return (
    <div className="my-4">
      <h2 className="text-center font-bold text-sm mb-2">Skills</h2>

      <hr />

      <div className="my-3 space-y-1">
        {resumeInfo?.skills?.map((item, index) => (
          <div key={index}>
            <p className="text-xs">
              <span className="font-semibold">{item.category}:</span>{" "}
              {item.skillName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsPreview;
