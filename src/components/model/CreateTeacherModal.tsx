import { useState } from "react";
import CustomSelect from "../Card/CustomSelect";

interface CreateTeacherModalProps {
  subjects: any[];
  onClose: () => void;
  onCreate: (name: string, subjectId: string) => void;
}

const CreateTeacherModal = ({
  subjects,
  onClose,
  onCreate,
}: CreateTeacherModalProps) => {
  const [name, setName] = useState("");
  const [subjectId, setSubjectId] = useState("");

  const handleCreate = () => {
    if (!name || !subjectId) {
      alert("Please enter name and select subject.");
      return;
    }
    onCreate(name, subjectId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="bg-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-md border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Create Teacher</h2>

        {/* Teacher Name Input */}
        <input
          type="text"
          placeholder="Enter teacher name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-800 text-white rounded-lg outline-none focus:ring-2 focus:ring-customTeal"
        />

        {/* Subject Selector */}
        <CustomSelect
          options={subjects.map((subject) => ({
            id: subject.id,
            label: subject.name,
          }))}
          value={subjectId}
          onChange={(id: any) => setSubjectId(id)}
          placeholder="Select subject"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-customTeal text-black font-semibold hover:scale-105 transition"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTeacherModal;
