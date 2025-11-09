import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../api";
import { authHeaders, getToken } from "../utils/auth";
import { useToast } from "../components/Toast"; // Hook is correctly imported

export default function Forum() {
  const [qs, setQs] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [answerText, setAnswerText] = useState({}); // map qid->text

  // 1. CALL THE HOOK HERE
  const { show } = useToast();

  useEffect(() => {
    API.get("/forum").then((r) => setQs(r.data));
  }, []);

  const submitQ = async (e) => {
    e.preventDefault();
    // 2. REPLACE alert("Please login") with show(...)
    if (!getToken()) return show("Please login to post a question", "warning");

    try {
      await axios.post(
        "http://localhost:5000/api/forum",
        { title, body },
        { headers: authHeaders() }
      );
      show("Question posted successfully!"); // Success toast
      window.location.reload();
    } catch (err) {
      console.error(err);
      show("Error posting question", "error"); // Error toast
    }
  };

  const submitA = async (qid) => {
    // 3. REPLACE alert("Please login") with show(...)
    if (!getToken()) return show("Please login to submit an answer", "warning");

    try {
      await axios.post(
        `http://localhost:5000/api/forum/${qid}/answers`,
        { text: answerText[qid] },
        { headers: authHeaders() }
      );
      show("Answer submitted!"); // Success toast
      window.location.reload();
    } catch (err) {
      console.error(err);
      show("Error submitting answer", "error"); // Error toast
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Community Forum</h1>

      <form onSubmit={submitQ} className="mb-6">
        <input
          placeholder="Question title"
          className="w-full border p-2 mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Tell us more..."
          className="w-full border p-2 mb-2"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button className="bg-black text-white px-4 py-2 rounded">
          Post Question
        </button>
      </form>

      <div className="space-y-4">
        {qs.map((q) => (
          <div key={q._id} className="border p-4 rounded">
            <h3 className="font-semibold">{q.title}</h3>
            <p className="mt-2">{q.body}</p>
            <div className="mt-3">
              <h4 className="font-medium">Answers</h4>
              {q.answers.map((a) => (
                <p key={a._id} className="text-sm mt-1">
                  - {a.text}
                </p>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <input
                placeholder="Write an answer"
                className="flex-1 border p-2"
                value={answerText[q._id] || ""}
                onChange={(e) =>
                  setAnswerText({ ...answerText, [q._id]: e.target.value })
                }
              />
              <button
                onClick={() => submitA(q._id)}
                className="bg-pink-600 text-white px-3 py-1 rounded"
              >
                Answer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
