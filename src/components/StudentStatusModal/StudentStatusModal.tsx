//StudentStatusModal.tsx
//Modal to display current student info/status

import React, {useState} from "react";
import "./StudentStatusModal.css";
import modalCloseButton from "./mwfclosebtn.svg"

type Program = "SE" | "AI Automation" | "AI/ML" | "BI analytics" | "CS" | "QA" | "UX/UI";

type StudentStatus = "active" | "inactive" | "urgent" | "paused" | "graduated";

export interface Student{
    id: string;
    email: string;
    status: StudentStatus;
    program: Program;
    invitesSent: number;
    completionDate?: string;
    lastContactDate?: string;
    dateAdded: string;
    voucherIssued?: string;
    profileUrl: string;
    notes?: string; 
}

interface StudentStatusModalProps{
    isOpen: boolean;
    onClose: () => void;
    student: Student;
}

const StudentStatusModal: React.FC<StudentStatusModalProps> = ({isOpen, onClose, student}) => {
    const [notes, setNotes] = useState<string>(student.notes ?? "");
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        console.log("Submit button has been pressed", notes);
        e.preventDefault();

        setIsSaving(true);
        onClose();
    }

    //Function to go to students profile page when clicked
    const handleProfileLinkClick =  ()  =>  {
        function goToLink(url: string) {
            window.location.href = url;
        }

        const destinationUrl: string = `${student.profileUrl}`;
        if (window.confirm("Are you sure you want to leave this page?")){
            goToLink(destinationUrl);
        }
        
    }

    if (!isOpen) return null;

    return(
        <div className="student-status__modal">
            <div className="student-status__modal_container" >
                <button onClick={onClose} className="studen-status__modal__close-btn">
                    <img src={modalCloseButton} alt="close button" />
                </button>
                <h2 className="student-status__modal_header">{student.id}</h2>
                <p className="student-status__modal_text">View and edit student information</p>
                <form onSubmit={handleSubmit}><div className="student-status__info">
                    <div className="student-status__column">
                    <label className="student-status__modal_label"> Email</label>
                    <p className="student-status__modal_text">{student.email}</p>

                    <label className="student-status__modal_label">Program</label>
                    <p className="student-status__modal_program-text"> {student.program}
                        {/* <option value="SE" className="student-status__modal_text">SE</option>
                        <option value="AI automation" className="student-status__modal_text">AI automation</option>
                        <option value="AI/ML" className="student-status__modal_text">AI/ML</option>
                        <option value="BI analytics" className="student-status__modal_text">BI analytics</option>
                        <option value="CS" className="student-status__modal_text">CS</option>
                        <option value="QA" className="student-status__modal_text">QA</option>
                        <option value="UX/UI" className="student-status__modal_text">UX/UI</option> */}
                    </p>
                    <label className="student-status__modal_label">Completion Date</label>
                    <p className="student-status__modal_text">{student.completionDate}</p>
                    <label className="student-status__modal_label">Last Contact</label>
                    <p className="student-status__modal_text">{student.lastContactDate}</p>
                    <label className="student-status__modal_label"> Hub Profile</label>
                    <button onClick={handleProfileLinkClick} className="student-status__profile-link"> View Profile </button>
                    </div>
                    <div className="student-status__column">
                    <label className="student-status__modal_label__status">Status</label>
                    <p className="student-status__modal_status-text">{student.status}</p>
                    <label className="student-status__modal_label">Sent Invites</label>
                    <p className="student-status__modal_text">{student.invitesSent}</p>
                    <label className="student-status__modal_label">Date Added</label>
                    <p className="student-status__modal_text">{student.dateAdded}</p>
                    <label className="student-status__modal_label">Voucher Issued</label>
                    <p className="student-status__modal_text"> -- </p>
                    </div>
                    </div>
                    <label className="student-status__modal_label">Notes</label>
                    <input 
                        type="text" 
                        value={notes} 
                        onChange={(e) => setNotes(e.target.value)} 
                        placeholder="Add notes about this student..." 
                        max="100" className="student-status__modal_notes"
                    />
                    <button type="submit" className="student-status__modal_save-button">Save</button>
                </form>

            </div>
        </div>
    )
}

export default StudentStatusModal;