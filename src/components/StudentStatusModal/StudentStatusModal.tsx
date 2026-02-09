import React, { useEffect, useState } from "react";
import "./StudentStatusModal.css";
import modalCloseButton from "./mwfclosebtn.svg";

export type WaitlistStatus = "pending" | "invited" | "accepted" | "rejected";

export interface WaitlistStudent {
  id: string;
  name: string;
  email: string;
  status: WaitlistStatus;
  notes?: string;
}

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
  const [notes, setNotes] = useState(student.notes ?? "");

  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setName(student.name ?? "");
    setEmail(student.email ?? "");
    setStatus(student.status ?? "pending");
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
    <div className="student-status__modal" role="dialog" aria-modal="true">
      <div className="student-status__modal_container">
        <button type="button" onClick={onClose} className="studen-status__modal__close-btn">
          <img src={modalCloseButton} alt="close" />
        </button>

        <h2 className="student-status__modal_header">Edit Student</h2>
        <p className="student-status__modal_subtitle">Update waitlist student info and save</p>

        <form className="student-status__form" onSubmit={handleSubmit}>
          <div className="student-status__field">
            <label className="student-status__label">Name</label>
            <input
              className="student-status__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Student name"
              autoFocus
            />
          </div>

          <div className="student-status__field">
            <label className="student-status__label">Email</label>
            <input
              className="student-status__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@email.com"
            />
          </div>

          <div className="student-status__field">
            <label className="student-status__label">Status</label>
            <select
              className="student-status__select"
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

          <div className="student-status__field student-status__field--full">
            <label className="student-status__label">Notes</label>
            <textarea
              className="student-status__textarea"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this student..."
            />
          </div>

          <div className="student-status__field student-status__field--full">
            {errorMsg && <div className="student-status__error">{errorMsg}</div>}
            {successMsg && <div className="student-status__success">{successMsg}</div>}
          </div>

          <div className="student-status__actions">
            <button className="student-status__save" type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
