import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { toast } from "sonner";
import Summary from "./Summary";
import Experience from "./Experience";

const PersonalDetail = ({ enableNext }) => {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };

  const onSave = (e) => {
    enableNext(false);
    e.preventDefault();
    setLoading(true);
    const data = {
      data: formData,
    };

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        //console.log(resp);
        setLoading(false);
        toast(" Details Updated");
        enableNext(true);
      },
      (error) => {
        setLoading(false);
        console.log(error);
        toast("Something went wrong");
        enableNext(true);
      }
    );
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-purple-700 border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get Started with the basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input
              name="firstName"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo?.firstName}
            ></Input>
          </div>

          <div>
            <label className="text-sm">Last Name</label>
            <Input
              name="lastName"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo?.lastName}
            ></Input>
          </div>

          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input
              name="jobTitle"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo?.jobTitle}
            ></Input>
          </div>

          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input
              name="address"
              required
              defaultValue={resumeInfo?.address}
              onChange={handleInputChange}
            ></Input>
          </div>

          <div>
            <label className="text-sm">Phone Number</label>
            <Input
              name="phone"
              required
              defaultValue={resumeInfo?.phone}
              onChange={handleInputChange}
            ></Input>
          </div>

          <div>
            <label className="text-sm">Email</label>
            <Input
              name="email"
              required
              defaultValue={resumeInfo?.email}
              onChange={handleInputChange}
            ></Input>
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Save upto here"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetail;
