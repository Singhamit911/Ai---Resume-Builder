import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import GlobalApi from "./../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { toast } from "sonner";

const Skills = ({ enableNext }) => {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const [skillList, setSkillList] = useState([
    {
      category: "",
      skillName: "",
    },
  ]);

  useEffect(() => {
    resumeInfo && setSkillList(resumeInfo?.skills);
  }, []);

  const addSkill = () => {
    setSkillList([
      ...skillList,
      {
        category: "",
        skillName: "",
      },
    ]);
    toast("Skill form Added");
  };
  const removeSkill = () => {
    setSkillList((skillList) => skillList.slice(0, -1));
    toast("Skill form removed");
  };
  const handleChange = (event, index) => {
    const newEntries = skillList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setSkillList(newEntries);
  };
  const onSave = (e) => {
    enableNext(false);
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        skills: skillList.map(({ id, ...item }) => item),
      },
    };
    GlobalApi.UpdateResumeDetail(params.resumeId, data).then(
      (resp) => {
        console.log(resp.data.data);
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
    enableNext(true);
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillList,
    });
  }, [skillList]);
  return (
    <div>
      <form onSubmit={onSave}>
        <div className="p-5 mt-10">
          <h2 className="font-bold text-lg">Skills</h2>
          <p>Add your SKills</p>

          <div>
            {skillList.map((item, index) => (
              <div key={index}>
                <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                  <div>
                    <label htmlFor="category" className="text-xs">
                      Skill Category
                    </label>
                    <Input
                      name="category"
                      value={item.category}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>

                  <div>
                    <label className="text-xs" htmlFor="skillName">
                      Enter Skills
                    </label>
                    <Input
                      name="skillName"
                      value={item.skillName}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between text-purple-600">
          <div className="flex gap-1">
            <Button type="button" variant="outline" onClick={addSkill}>
              + Add More
            </Button>
            <Button type="button" variant="outline" onClick={removeSkill}>
              - Remove
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

export default Skills;
