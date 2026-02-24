//StudentStatusModal.tsx
//Modal to display current student info/status

import React, {useState} from "react";

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
        <div className="flex bg-white-50 h-full w-full inset-0 fixed justify-center items-center">
            <div className="flex flex-col bg-white w-[600px] h-[650px] p-5 rounded-[10px]" >
                <button onClick={onClose} className="h-[15px] w-[15px] relative top-0 left-[550px]">
                    <img src={modalCloseButton} alt="close button" />
                </button>
                <h2 className="text-black pb-[5px] font-semibold text-larger">{student.id}</h2>
                <p className="text-[#808080] pb-[20px] pr-[100px]">View and edit student information</p>
                <form onSubmit={handleSubmit}><div className="flex ">
                    <div className="m-0 flex flex-col">
                    <label className="text-black pb-[5px] font-medium"> Email</label>
                    <p className="text-[#808080] pb-[20px] pr-[100px]">{student.email}</p>

                    <label className="text-black pb-[5px] font-medium">Program</label>
                    <p className="text-black rounded-[8px] bg-white border-[#808080] border-solid w-fit mb-5"> {student.program}
                        {/* <option value="SE" className="text-[#808080] pb-5 pb-[100px]">SE</option>
                        <option value="AI automation" className="text-[#808080] pb-5 pb-[100px]">AI automation</option>
                        <option value="AI/ML" className="text-[#808080] pb-5 pb-[100px]">AI/ML</option>
                        <option value="BI analytics" className="text-[#808080] pb-5 pb-[100px]">BI analytics</option>
                        <option value="CS" className="text-[#808080] pb-5 pb-[100px]">CS</option>
                        <option value="QA" className="text-[#808080] pb-5 pb-[100px]">QA</option>
                        <option value="UX/UI" className="text-[#808080] pb-5 pb-[100px]">UX/UI</option> */}
                    </p>
                    <label className="text-black pb-[5px] font-medium">Completion Date</label>
                    <p className="text-[#808080] pb-[20px] pr-[100px]">{student.completionDate}</p>
                    <label className="text-black pb-[5px] font-medium">Last Contact</label>
                    <p className="text-[#808080] pb-[20px] pr-[100px]">{student.lastContactDate}</p>
                    <label className="text-black pb-[5px] font-medium"> Hub Profile</label>
                    <button onClick={handleProfileLinkClick} className="text-[#808080] w-fit pb-5"> View Profile </button>
                    </div>
                    <div className="m-0 flex flex-col">
                    <label className="text-black pb-[5px] font-medium">Status</label>
                    <p className="text-white rounded-[8px] bg-black w-fit py-[5px] px-[8px] mb-5">{student.status}</p>
                    <label className="text-black pb-[5px] font-medium">Sent Invites</label>
                    <p className="text-[#808080] pb-[20px] pr-[100px]">{student.invitesSent}</p>
                    <label className="text-black pb-[5px] font-medium">Date Added</label>
                    <p className="text-[#808080] pb-[20px] pr-[100px]">{student.dateAdded}</p>
                    <label className="text-black pb-[5px] font-medium">Voucher Issued</label>
                    <p className="text-[#808080] pb-[20px] pr-[100px]"> -- </p>
                    </div>
                    </div>
                    <label className="text-black pb-[5px] font-medium">Notes</label>
                    <input 
                        type="text" 
                        value={notes} 
                        onChange={(e) => setNotes(e.target.value)} 
                        placeholder="Add notes about this student..." 
                        max="100" className="text-[#808080] border-solid rounded-[8px] h-[95px] w-full leading-[12px]"
                    />
                    <button type="submit" className="text-white !bg-black rounded-[10px] h-[40px] w-[65px] mt-[5px] ml-[490px]" disabled={isSaving}>{isSaving ? "Saving..." : "Save" }</button>
                </form>

            </div>
        </div>
    )
}

export default StudentStatusModal;