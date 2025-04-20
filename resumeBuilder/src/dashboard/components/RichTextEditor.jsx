import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import AIChatSession from "./../../../service/AIModel";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";

const RichTextEditor = ({
  value,
  onRichTextEditorChange,
  index,
  positionTitle,
  companyName,
}) => {
  const [editorValue, setEditorValue] = useState(value || "");
  const [loading, setLoading] = useState(false);
  const [instruction, setInstruction] = useState("");

  const promptTemplate = `
You are a backend API that returns job experience summaries in JSON format only. Do not include explanations or any non-JSON text.

Input:
- Position Title: {positionTitle}
- Company Name: {companyName}
- Instruction: {instruction}

Respond only in this JSON format:
{
  "positionTitle": "{positionTitle}",
  "companyName": "{companyName}",
  "instruction": "{instruction}",
  "summary": "<well-written job summary>"
}
  `.trim();

  const generateSummary = async () => {
    if (!positionTitle || !companyName) {
      toast(
        "Please provide position title, company name, and instruction (optional)."
      );
      return;
    }

    setLoading(true);
    const prompt = promptTemplate
      .replace("{positionTitle}", positionTitle)
      .replace("{companyName}", companyName)
      .replace("{instruction}", instruction);

    try {
      const result = await AIChatSession.sendMessage(prompt);
      const cleanResult = result.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleanResult);

      if (parsed.summary) {
        setEditorValue(parsed.summary);
        onRichTextEditorChange({ target: { value: parsed.summary } });
        toast("✅ AI Summary Applied");
      } else {
        toast("⚠️ Could not find summary in the response");
      }
    } catch (error) {
      console.error(error);
      toast("⚠️ Failed to generate summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-end mb-2">
        <label>Add Summary</label>
      </div>
      <div className="flex gap-2 items-center mb-3">
        <input
          type="text"
          className="border rounded-md px-2 py-1 w-full text-sm"
          placeholder="Enter instruction for AI..."
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-purple-600 text-purple-600"
          onClick={generateSummary}
          disabled={loading}
        >
          <Brain className="h-4 w-4 mr-2" />
          {loading ? "Generating..." : "Generate"}
        </Button>
      </div>

      <EditorProvider>
        <Editor
          value={editorValue}
          onChange={(e) => {
            setEditorValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <BtnLink />
            <BtnStyles />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
