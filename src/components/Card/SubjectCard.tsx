import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import AOS from "aos";
import "aos/dist/aos.css";
import supabase from "../../config/createClient";
import toast from "react-hot-toast";
import EditIcon from "./EditIcon";
import DeleteIcon from "./DeleteIcon";

const SubjectCard = ({ subject, index }: any) => {
  const [subjectData, setSubjectData] = useState(subject);
  const [editName, setEditName] = useState(subject.name);
  const [loading, setLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const delay = 1400 + index * 200;

  // ✅ Update Subject
  const handleUpdate = async () => {
    if (!editName.trim()) {
      toast.error("Please enter a valid subject name");
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("Subjects")
      .update({ name: editName })
      .eq("id", subjectData.id)
      .select("*")
      .single();

    setLoading(false);

    if (error) {
      toast.error("Failed to update subject!");
      console.error(error);
      return;
    }

    toast.success("Subject updated successfully!");
    setSubjectData(data);
    setEditOpen(false);
  };

  // ✅ Delete Subject
  const handleDelete = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("Subjects")
      .delete()
      .eq("id", subjectData.id);

    setLoading(false);

    if (error) {
      toast.error("Failed to delete subject!");
      console.error(error);
      return;
    }

    toast.success("Subject deleted successfully!");
    setSubjectData(null); // hide card after delete
    setDeleteOpen(false);
  };

  if (!subjectData) return null;

  return (
    <>
      {/* Subject Card */}
      <div
        data-aos="fade-up"
        data-aos-delay={delay}
        className="bg-gray-800 p-6 rounded-xl border border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/10"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-white">
              {subjectData.name}
            </h3>
          </div>
          <div className="flex space-x-3">
            {/* Edit Dialog Trigger */}
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
                      Edit Subject
                    </Dialog.Title>

                    {/* Subject Name Input */}
                    <div className="mb-4">
                      <label className="block text-gray-300 text-sm mb-2">
                        Subject Name
                      </label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 outline-none focus:ring-2 focus:ring-customTeal"
                      />
                    </div>

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

            {/* Delete Dialog Trigger */}
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
                      Delete Subject
                    </Dialog.Title>
                    <p className="text-gray-300 text-center">
                      Are you sure you want to delete{" "}
                      <span className="text-red-400 font-semibold">
                        {subjectData.name}
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
    </>
  );
};

export default SubjectCard;
