import React, { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RichTextEditor from "@/dashboard/components/RichTextEditor";
import { toast } from "sonner";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { LoaderCircle } from "lucide-react";

const getFormField = () => ({
  positionTitle: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  summary: "",
});

const Experience = ({ enableNext }) => {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [experienceList, setExperienceList] = useState([getFormField()]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    resumeInfo && setExperienceList(resumeInfo?.experience);
  }, []);

  const handleChange = (index, event) => {
    const newEntries = [...experienceList];
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  const AddNewExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        positionTitle: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        summary: "",
      },
    ]);
  };

  const removeExperience = (index) => {
    setExperienceList((experienceList) => experienceList.slice(0, -1));
    toast("Experience removed");
  };

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = [...experienceList];
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);
  };

  useEffect(() => {
    if (resumeInfo) {
      setResumeInfo((prev) => ({ ...prev, experience: experienceList }));
    }
  }, [experienceList]);

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        experience: experienceList.map(({ id, ...item }) => item),
      },
    };
    GlobalApi.UpdateResumeDetail(params.resumeId, data).then(
      (resp) => {
        console.log(resp.data.data);
        enableNext(true);
        setLoading(false);
        toast(" Details Updated");
      },
      (error) => {
        setLoading(false);
        toast("Something went wrong");
        console.error("Save error:", error.response?.data || error);
      }
    );
  };

  return (
    <form onSubmit={onSave}>
      <div>
        <div className="p-5 rounded-lg mt-10">
          <h2 className="font-bold text-lg">Professional Experience</h2>
          <p>Add Your Previous Job Experience</p>
          <div>
            {experienceList.map((item, index) => (
              <div key={index}>
                <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                  <div>
                    <label className="text-xs">Position Title</label>
                    <Input
                      name="positionTitle"
                      value={item.positionTitle}
                      onChange={(event) => handleChange(index, event)}
                    />
                  </div>

                  <div>
                    <label className="text-xs">Company Name</label>
                    <Input
                      name="companyName"
                      value={item.companyName}
                      onChange={(event) => handleChange(index, event)}
                    />
                  </div>

                  <div>
                    <label className="text-xs">City</label>
                    <Input
                      name="city"
                      value={item.city}
                      onChange={(event) => handleChange(index, event)}
                    />
                  </div>

                  <div>
                    <label className="text-xs">State</label>
                    <Input
                      name="state"
                      value={item.state}
                      onChange={(event) => handleChange(index, event)}
                    />
                  </div>

                  <div>
                    <label className="text-xs">Start Date</label>
                    <Input
                      type="date"
                      name="startDate"
                      value={item.startDate}
                      onChange={(event) => handleChange(index, event)}
                    />
                  </div>

                  <div>
                    <label className="text-xs">End Date</label>
                    <Input
                      type="date"
                      name="endDate"
                      value={item.endDate}
                      onChange={(event) => handleChange(index, event)}
                    />
                  </div>

                  <div className="col-span-2">
                    <RichTextEditor
                      index={index}
                      value={item.summary}
                      positionTitle={item.positionTitle}
                      companyName={item.companyName}
                      onRichTextEditorChange={(event) =>
                        handleRichTextEditor(event, "summary", index)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between text-purple-600">
          <div className="flex gap-1">
            <Button type="button" variant="outline" onClick={AddNewExperience}>
              + Add More
            </Button>
            <Button type="button" variant="outline" onClick={removeExperience}>
              Remove Experience
            </Button>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Experience;
