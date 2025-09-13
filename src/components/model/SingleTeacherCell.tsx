import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import supabase from "../../config/createClient";
import CustomSelect from "../Card/CustomSelect";
import toast from "react-hot-toast";
import EditIcon from "../Card/EditIcon";
import { useTheme } from "../../Context/ThemeProvider";
import { useEditMod } from "../../Context/EditModProvider";

interface Props {
  day: string;
  period: number;
  classes: any[];
  subjects: any[]; // ✅ NEW - parent se subjects array pass hoga
  teacherId: string;
}

function SingleTeacherCell({
  day,
  period,
  classes,
  subjects,
  teacherId,
}: Props) {
  const { theme } = useTheme();
  const { editMod } = useEditMod();

  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [rowId, setRowId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  // ✅ Fetch Existing Data (class_id + subject_id)
  useEffect(() => {
    async function fetchExisting() {
      setLoading(true);
      const { data, error } = await supabase
        .from("Main_table")
        .select("id, class_id, subject_id")
        .eq("teacher_id", teacherId)
        .eq("day", day)
        .eq("period", period)
        .maybeSingle();

      if (!error && data) {
        setSelectedClass(data.class_id || "");
        setSelectedSubject(data.subject_id || "");
        setRowId(data.id);
      }
      setLoading(false);
    }
    fetchExisting();
  }, [teacherId, day, period]);

  const existingClassName = classes.find((c) => c.id === selectedClass)?.name;
  const existingSubjectName = subjects.find(
    (s) => s.id === selectedSubject
  )?.name;

  // ✅ Save or Update Data
  const handleSave = async () => {
    const payload = {
      day,
      period,
      teacher_id: teacherId,
      class_id: selectedClass,
      subject_id: selectedSubject,
    };

    if (rowId) {
      const { error } = await supabase
        .from("Main_table")
        .update(payload)
        .eq("id", rowId);

      if (error) toast.error("Failed to update!");
      else toast.success("Updated!");
    } else {
      const { data, error } = await supabase
        .from("Main_table")
        .insert([payload])
        .select("id")
        .single();

      if (error) toast.error("Failed to insert!");
      else {
        toast.success("Added!");
        setRowId(data?.id);
      }
    }
    setOpen(false);
  };

  return (
    <>
      {/* Show loading / class name / subject name */}
      {loading ? (
        <span className="text-xs text-gray-400 italic">Loading...</span>
      ) : (
        <div className="flex flex-col items-center">
          <span className="text-sm">
            {existingClassName || (
              <span className="text-gray-400 italic">No Class</span>
            )}
          </span>
          {existingSubjectName && (
            <span className="text-xs ">{existingSubjectName}</span>
          )}
        </div>
      )}

      {/* Edit Button - Only in Edit Mode */}
      {editMod && !loading && (
        <div className="absolute opacity-0 z-0 group-hover:opacity-100 group-hover:z-20 top-0 left-0 w-full h-full flex transition-all gap-2 duration-200 items-center justify-center backdrop-blur-sm">
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 hover:text-cyan-400 hover:scale-110 transition-all duration-200"
          >
            <EditIcon />
          </button>
        </div>
      )}

      {/* Dialog */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 data-[state=open]:animate-fadeIn" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95%] max-w-md bg-gray-900 text-white rounded-2xl shadow-xl p-6 border border-gray-700 data-[state=open]:animate-scaleIn">
            <Dialog.Title className="text-xl font-bold text-center mb-4">
              Edit ({day}, Period {period})
            </Dialog.Title>

            {/* Class Selector */}
            <div className="mb-4">
              <CustomSelect
                value={selectedClass}
                onChange={(val) => setSelectedClass(val)}
                options={classes.map((c) => ({ id: c.id, label: c.name }))}
                placeholder="Select Class"
              />
            </div>

            {/* Subject Selector */}
            <div className="mb-4">
              <CustomSelect
                value={selectedSubject}
                onChange={(val) => setSelectedSubject(val)}
                options={subjects.map((s) => ({ id: s.id, label: s.name }))}
                placeholder="Select Subject"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Dialog.Close asChild>
                <button className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition">
                  Cancel
                </button>
              </Dialog.Close>
              <button
                onClick={handleSave}
                disabled={!selectedClass || !selectedSubject}
                className="px-4 py-2 rounded-lg bg-customTeal hover:bg-customTeal/90 transition disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

export default SingleTeacherCell;
