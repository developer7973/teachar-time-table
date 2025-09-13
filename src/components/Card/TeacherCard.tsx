import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import AOS from "aos";
import "aos/dist/aos.css";
import toast from "react-hot-toast";
import EditIcon from "./EditIcon";
import DeleteIcon from "./DeleteIcon";
import supabase from "../../config/createClient";
import CustomSelect from "./CustomSelect";

interface TeacherCardProps {
  teacher: any;
  subjects: any[];
  index: number;
}

const TeacherCard = ({ teacher, subjects, index }: TeacherCardProps) => {
  const [teacherData, setTeacherData] = useState(teacher);
  const [editName, setEditName] = useState(teacher.name);
  const [editSubjectId, setEditSubjectId] = useState(teacher.subject_id || "");
  const [loading, setLoading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
      offset: 0,
    });
  }, []);

  const delay = 1400 + index * 200;

  // ✅ Handle Teacher Update
  const handleUpdate = async () => {
    if (!editName.trim()) {
      toast.error("Please enter a valid name");
      return;
    }
    if (!editSubjectId) {
      toast.error("Please select a subject");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from("Teachers")
      .update({ name: editName, subject_id: editSubjectId })
      .eq("id", teacherData.id)
      .select("*")
      .single();

    setLoading(false);

    if (error) {
      toast.error("Failed to update teacher!");
      console.error(error);
      return;
    }

    toast.success("Teacher updated successfully!");
    setTeacherData(data);
    setEditOpen(false);
  };

  // ✅ Handle Teacher Delete
  const handleDelete = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("Teachers")
      .delete()
      .eq("id", teacherData.id);

    setLoading(false);

    if (error) {
      toast.error("Failed to delete teacher!");
      console.error(error);
      return;
    }

    toast.success("Teacher deleted successfully!");
    setTeacherData(null);
    setDeleteOpen(false);
  };

  if (!teacherData) return null;

  return (
    <div>
      {/* Teacher Card */}
      <div
        data-aos="fade-up"
        data-aos-delay={delay}
        className="bg-gray-800 p-6 rounded-xl border border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/10 hover:scale-105"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-white">
              {teacherData.name}
            </h3>
            {teacherData.subject?.name && (
              <p className="text-gray-400 text-sm">
                {teacherData.subject.name}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            {/* Edit Dialog */}
            <Dialog.Root open={editOpen} onOpenChange={setEditOpen}>
              <Dialog.Trigger asChild>
                <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 hover:text-cyan-400 transition-all duration-200">
                  <EditIcon />
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-md z-50" />
                <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-lg">
                  <div className="bg-gray-900 text-white rounded-2xl shadow-lg p-8">
                    <Dialog.Title className="text-2xl font-bold mb-6 text-center">
                      Edit Teacher
                    </Dialog.Title>

                    {/* Teacher Name */}
                    <div className="mb-4">
                      <label className="block text-gray-300 text-sm mb-2">
                        Teacher Name
                      </label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 outline-none focus:ring-2 focus:ring-customTeal"
                      />
                    </div>

                    {/* Subject Selector */}
                    <div className="mb-6">
                      <label className="block text-gray-300 text-sm mb-2">
                        Select Subject
                      </label>

                      <CustomSelect
                        options={subjects.map((subject) => ({
                          id: subject.id,
                          label: subject.name,
                        }))}
                        value={editSubjectId}
                        onChange={(id: any) => setEditSubjectId(id)}
                        placeholder="-- Select Subject --"
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3">
                      <Dialog.Close asChild>
                        <button className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition">
                          Cancel
                        </button>
                      </Dialog.Close>
                      <button
                        onClick={handleUpdate}
                        disabled={loading}
                        className="px-4 py-2 rounded-lg bg-customTeal hover:bg-customTeal/90 transition disabled:opacity-50"
                      >
                        {loading ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>

            {/* Delete Dialog */}
            <Dialog.Root open={deleteOpen} onOpenChange={setDeleteOpen}>
              <Dialog.Trigger asChild>
                <button className="p-2 rounded-lg bg-gray-700 hover:bg-red-900 hover:text-red-400 transition-all duration-200">
                  <DeleteIcon />
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-md z-50" />
                <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-lg">
                  <div className="bg-gray-900 text-white rounded-2xl shadow-lg p-8">
                    <Dialog.Title className="text-xl font-semibold mb-4 text-center">
                      Delete Teacher
                    </Dialog.Title>
                    <p className="text-gray-300 text-center">
                      Are you sure you want to delete{" "}
                      <span className="text-red-400 font-semibold">
                        {teacherData.name}
                      </span>
                      ?
                    </p>

                    <div className="flex justify-center gap-4 mt-6">
                      <Dialog.Close asChild>
                        <button className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition">
                          Cancel
                        </button>
                      </Dialog.Close>
                      <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition disabled:opacity-50"
                      >
                        {loading ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
