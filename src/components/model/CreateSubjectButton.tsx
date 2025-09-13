import { useState } from "react";
import toast from "react-hot-toast";
import supabase from "../../config/createClient";
import * as Dialog from "@radix-ui/react-dialog";
interface CreateSubjectButtonProps {
  onSubjectCreated: (newSubject: any) => void;
}

const CreateSubjectButton = ({
  onSubjectCreated,
}: CreateSubjectButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateSubject = async () => {
    if (!name.trim()) {
      toast.error("Please enter a subject name");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from("Subjects")
      .insert([{ name }])
      .select("*")
      .single();

    setLoading(false);

    if (error) {
      toast.error("Failed to create subject!");
      console.error(error);
      return;
    }

    toast.success(`Subject "${name}" created successfully!`);
    onSubjectCreated(data);
    setName("");
    setIsOpen(false);
  };

  return (
    <>

      {/* Popup Modal */}
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        {/* Trigger Button */}
        <Dialog.Trigger asChild>
          <button className="bg-customTeal px-6 py-3 rounded-lg font-semibold hover:bg-customTeal transition-all duration-300 shadow-lg shadow-customTeal/30 hover:shadow-customTeal/50 hover:scale-105">
            Create Subject
          </button>
        </Dialog.Trigger>

        {/* Portal & Overlay */}
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
          <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md">
            <div className="bg-gray-900 text-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Create Subject</h2>

              <input
                type="text"
                placeholder="Enter subject name"
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 outline-none focus:ring-2 focus:ring-customTeal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <div className="flex justify-end gap-3 mt-5">
                <Dialog.Close asChild>
                  <button className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition">
                    Cancel
                  </button>
                </Dialog.Close>

                <button
                  onClick={handleCreateSubject}
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-customTeal hover:bg-customTeal/90 transition disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create"}
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default CreateSubjectButton;
