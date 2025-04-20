import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import GlobalApi from "./../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import AIChatSession from "./../../../../../service/AIModel";

const prompt = `
You are an API backend. Return only a valid JSON object with this format, and nothing else:

{
  "jobTitle": "{jobTitle}",
  "summaries": {
    "Fresher": {
      "experienceLevel": "Fresher",
      "summary": "..."
    },
    "Mid-Level": {
      "experienceLevel": "Mid-Level",
      "summary": "..."
    },
    "Experienced": {
      "experienceLevel": "Experienced",
      "summary": "..."
    }
  }
}
`.trim();

const Summary = ({ enableNext }) => {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState();
  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState();

  useEffect(() => {
    if (summary) {
      setResumeInfo({
        ...resumeInfo,
        summary: summary,
      });
    }
  }, [summary]);

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        summary: summary,
      },
    };

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        setLoading(false);
        toast("Details Updated");
        //enableNext(true);
      },
      (error) => {
        setLoading(false);
        toast("Something went wrong");
      }
    );
  };

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo.jobTitle);

    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      const cleanResult = result.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleanResult);

      const summariesArray = Object.values(parsed.summaries);
      setAiGeneratedSummaryList(summariesArray);
    } catch (error) {
      toast("⚠️ AI failed to return valid JSON");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-5 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add Summary for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-purple-600 text-purple-600"
              onClick={GenerateSummaryFromAI}
            >
              <Brain className="h-4 w-4 mr-2" /> Generate from AI
            </Button>
          </div>
          <Textarea
            className="mt-5"
            required
            defaultValue={resumeInfo?.summary}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />

          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummaryList && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-lg">Suggestions</h2>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-red-600 hover:bg-red-50"
              onClick={() => setAiGeneratedSummaryList(null)}
            >
              Cancel
            </Button>
          </div>

          {aiGeneratedSummaryList.map((item) => (
            <div
              key={item.experienceLevel}
              className="cursor-pointer p-3 border rounded-lg mb-3 hover:bg-purple-50 transition"
              onClick={() => setSummary(item.summary)}
            >
              <h2 className="font-semibold">Level: {item.experienceLevel}</h2>
              <p>{item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Summary;
