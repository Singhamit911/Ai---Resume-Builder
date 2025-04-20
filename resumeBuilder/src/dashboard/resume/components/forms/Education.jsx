import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import GlobalApi from "./../../../../../service/GlobalApi";
import { LoaderCircle } from "lucide-react";

const Education = ({ enableNext }) => {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const [educationalList, setEducationalList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
    },
  ]);

  useEffect(() => {
    resumeInfo && setEducationalList(resumeInfo?.education);
  }, []);
  const addEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
      },
    ]);
    toast("Education Added");
  };
  const removeEducation = (index) => {
    setEducationalList((educationalList) => educationalList.slice(0, -1));
    toast("Education removed");
  };
  const handleChange = (event, index) => {
    const newEntries = educationalList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  };
  const onSave = (e) => {
    enableNext(false);
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        education: educationalList.map(({ id, ...item }) => item),
      },
    };
    GlobalApi.UpdateResumeDetail(params.resumeId, data).then(
      (resp) => {
        console.log(resp.data.data);
        enableNext(true);
        setLoading(false);
        toast(" Details Updated");
        enableNext(true);
      },
      (error) => {
        setLoading(false);
        toast("Something went wrong");
        console.error("Save error:", error.response?.data || error);
        enableNext(true);
      }
    );
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationalList,
    });
  }, [educationalList]);

  return (
    <div>
      <form onSubmit={onSave}>
        <div className="p-5 mt-10">
          <h2 className="font-bold text-lg">Education</h2>
          <p>Add your educational details</p>

          <div>
            {educationalList.map((item, index) => (
              <div key={index}>
                <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                  <div>
                    <label htmlFor="universityName" className="text-xs">
                      Institution/University/College Name
                    </label>
                    <Input
                      name="universityName"
                      onChange={(e) => handleChange(e, index)}
                      defaultValue={item.universityName}
                    />
                  </div>

                  <div>
                    <label className="text-xs" htmlFor="degree">
                      Degree Name
                    </label>
                    <Input
                      name="degree"
                      onChange={(e) => handleChange(e, index)}
                      defaultValue={item.degree}
                    />
                  </div>

                  <div>
                    <label className="text-xs" htmlFor="major">
                      Major
                    </label>
                    <Input
                      name="major"
                      onChange={(e) => handleChange(e, index)}
                      defaultValue={item.major}
                    />
                  </div>

                  <div>
                    <label className="text-xs" htmlFor="startDate">
                      Start Date
                    </label>
                    <Input
                      name="startDate"
                      onChange={(e) => handleChange(e, index)}
                      placeholder="MM/YYYY to MM/YYYY"
                      defaultValue={item.startDate}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between text-purple-600">
          <div className="flex gap-1">
            <Button type="button" variant="outline" onClick={addEducation}>
              + Add More
            </Button>
            <Button type="button" variant="outline" onClick={removeEducation}>
              Remove Education
            </Button>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Education;
