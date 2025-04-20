import React from "react";

const ExperiencePreview = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      <h2 className="text-center font-bold text-sm mb-2">
        Professional Experience
      </h2>

      <hr />

      {resumeInfo?.experience?.map((experience, index) => (
        <div key={index} className="my-4">
          <h2 className="text-sm font-bold">{experience?.positionTitle}</h2>
          <h2 className="text-xs flex justify-between">
            {experience?.companyName} {experience?.city} {experience?.state}
            <span>
              {experience?.startDate}
              {" - "}
              {experience?.currentlyWorking ? "Present" : experience.endDate}
            </span>
          </h2>
          {/* <p className="text-xs my-2">{experience.workSummary}</p> */}
          <div
            className="text-xs my-2 list-disc"
            dangerouslySetInnerHTML={{ __html: experience?.summary }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default ExperiencePreview;
