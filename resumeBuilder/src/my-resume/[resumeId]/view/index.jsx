import { Button } from "@/components/ui/button";
import Header from "@/components/ui/custom/Header";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/dashboard/resume/components/ResumePreview";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../service/GlobalApi";
import { RWebShare } from "react-web-share";

const ViewResume = () => {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();
  useEffect(() => {
    GetResumeInfo();
  }, []);
  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then((resp) => {
      console.log(resp.data.data);
      setResumeInfo(resp.data.data);
    });
  };
  const HandleDownload = () => {
    window.print();
  };
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />
        <div className="my-10 mx-10 md:mx-20 lg:mx36">
          <h2 className="text-center text-2xl font-medium">
            Your Resume is ready to download!!
          </h2>
          <p className="text-center text-gray-400">
            You can download your resume or share the unique link to your friend
            in just one click
          </p>

          <div className="flex justify-between px-44 my-10">
            <Button onClick={HandleDownload}>Download</Button>
            <RWebShare
              data={{
                text: "Here is a resume",
                url:
                  import.meta.env.VITE_BASE_URL +
                  "/my-resume/" +
                  resumeId +
                  "/view",
                title: resumeInfo?.firstName + "'s" + " resume",
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <Button>Share</Button>
            </RWebShare>
          </div>
        </div>
      </div>
      <div
        id="print-area"
        className="w-[8.27in] bg-white shadow-lg mx-auto my-10 md:my-20 lg:my-32"
      >
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default ViewResume;
