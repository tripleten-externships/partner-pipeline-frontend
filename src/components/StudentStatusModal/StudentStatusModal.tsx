import React, { useEffect, useState } from "react";

import modalCloseButton from "./mwfclosebtn.svg";

export type WaitlistStatus = "pending" | "invited" | "accepted" | "rejected";

export interface WaitlistStudent {
  id: string;
  name: string;
  email: string;
  status: WaitlistStatus;
  notes?: string;
  program: Program;
}

export type Program =
  | "SE"
  | "AI/ML"
  | "AI Automation"
  | "BI Analytics"
  | "CS"
  | "QA"
  | "AI SE"
  | "UX/UI";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  student: WaitlistStudent;

  onSaved?: () => void;
}

const STATUS_OPTIONS: { label: string; value: WaitlistStatus }[] = [
  { label: "pending", value: "pending" },
  { label: "invited", value: "invited" },
  { label: "accepted", value: "accepted" },
  { label: "rejected", value: "rejected" },
];

export default function StudentStatusModal({ isOpen, onClose, student, onSaved }: Props) {
  const [name, setName] = useState(student.name ?? "");
  const [email, setEmail] = useState(student.email ?? "");
  const [status, setStatus] = useState<WaitlistStatus>(student.status ?? "pending");
  const [program, setProgram] = useState<Program>(student.program ?? "SE");
  const [notes, setNotes] = useState(student.notes ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setName(student.name ?? "");
    setEmail(student.email ?? "");
    setStatus(student.status ?? "pending");
    setProgram(student.program ?? "SE");
    setNotes(student.notes ?? "");
    setErrorMsg(null);
    setSuccessMsg(null);
  }, [isOpen, student]);

  function validate() {
    if (!name.trim()) return "Name is required.";
    if (!email.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Email must look like an email.";
    if (!STATUS_OPTIONS.some((o) => o.value === status)) return "Status is invalid.";
    if (notes.length > 1000) return "Notes too long (max 1000).";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const err = validate();
    if (err) {
      setErrorMsg(err);
      return;
    }

    try {
      setIsSaving(true);

      const res = await fetch(`/api/waitlist/${student.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          status,
          program,
          notes: notes.trim(),
        }),
      });

      if (!res.ok) {
        let msg = `Save failed (${res.status})`;
        try {
          const data = await res.json();
          msg = data?.error?.message || data?.message || msg;
        } catch {
          // response body is not JSON; fall back to generic error message
        }
        throw new Error(msg);
      }

      setSuccessMsg("Saved!");
      onSaved?.();

      setTimeout(() => onClose(), 600);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Could not save. Try again.");
      }
    } finally {
      setIsSaving(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/55 flex justify-center items-center p-[24px] z-[9999]" role="dialog" aria-modal="true">
      <div className="relative w-full max-w-[820px] bg-white rounded-[12px] p-[28px] box-border max-h-[90vh] overflow-auto">
        <button type="button" onClick={onClose} className="absolute top-[16px] right-[16px] border-none bg-transparent cursor-pointer">
          <img src={modalCloseButton} alt="close" />
        </button>

        <h2 className="mt-0 mx-0 mb-[6px] text-[22px] font-bold text-[#111]">Edit Student</h2>
        <p className="mt-0 mx-0 mb-[18px] text-[#777]">Update waitlist student info and save</p>

        <form className="grid grid-cols-3 gap-[18px] items-start md:grid-cols-1" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-[6px]">
            <label className="text-[13px] font-semibold text-[#111]">Name</label>
            <input
              className=" w-full box-border border-[1px] border-solid border-[#d9d9d9] rounded-[10px] py-[10px] px-[12px] text-[14px] text-[#111] bg-[#fff] outline-none focus:border-[#111]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Student name"
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-[6px]">
            <label className="text-[13px] font-semibold text-[#111]">Email</label>
            <input
              className=" w-full box-border border-[1px] border-solid border-[#d9d9d9] rounded-[10px] py-[10px] px-[12px] text-[14px] text-[#111] bg-[#fff] outline-none focus:border-[#111]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@email.com"
            />
          </div>

          <div className="flex flex-col gap-[6px]">
            <label className="text-[13px] font-semibold text-[#111]">Program</label>
            <select
              className=" w-full box-border border-[1px] border-solid border-[#d9d9d9] rounded-[10px] py-[10px] px-[12px] text-[14px] text-[#111] bg-[#fff] outline-none focus:border-[#111]"
              value={program}
              onChange={(e) => setProgram(e.target.value as Program)}
            >
              <option value="SE">SE</option>
              <option value="AI SE">AI SE</option>
              <option value="AI Automation">AI Automation</option>
              <option value="AI/ML">AI/ML</option>
              <option value="BI Analytics">BI Analytics</option>
              <option value="CS">CS</option>
              <option value="QA">QA</option>
              <option value="UX/UI">UX/UI</option>
            </select>
          </div>

          <div className="flex flex-col gap-[6px]">
            <label className="text-[13px] font-semibold text-[#111]">Status</label>
            <select
              className=" w-full box-border border-[1px] border-solid border-[#d9d9d9] rounded-[10px] py-[10px] px-[12px] text-[14px] text-[#111] bg-[#fff] outline-none focus:border-[#111]"
              value={status}
              onChange={(e) => setStatus(e.target.value as WaitlistStatus)}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-[6px] col-span-full">
            <label className="text-[13px] font-semibold text-[#111]">Notes</label>
            <textarea
              className="min-h-[120px] resize-y w-full box-border border-[1px] border-solid border-[#d9d9d9] rounded-[10px] py-[10px] px-[12px] text-[14px] text-[#111] bg-[#fff] outline-none focus:border-[#111]"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this student..."
            />
          </div>

          <div className="flex flex-col gap-[6px] col-span-full">
            {errorMsg && <div className="text-[#b00020] text-[13px]">{errorMsg}</div>}
            {successMsg && <div className="text-[#0a7a2f] text-[13px]">{successMsg}</div>}
          </div>

          <div className="grid-col-[1/-1] flex justify-end mt-[4px]">
            <button className="border-none rounded-[10px] !bg-black text-white h-[40px] py-0 px-[16px] font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed" type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
