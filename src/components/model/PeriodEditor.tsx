import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import CustomSelect from "../Card/CustomSelect";
import toast from "react-hot-toast";
import supabase from "../../config/createClient";
import CircleLoading from "../ui/CircleLoading";
import EditIcon from "../Card/EditIcon";
import { Check } from "lucide-react";
import Notification from "../Card/Notification";
import { useTheme } from "../../Context/ThemeProvider";
import Cookies from "js-cookie";
import { useEditMod } from "../../Context/EditModProvider";

interface PeriodEditorProps {
  period: number;
  clsData: any;
  teachers: any[];
  subjects: any[];
  periodDataID?: number;
}

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function PeriodEditor({
  period,
  clsData,
  teachers,
  subjects,
  periodDataID,
}: PeriodEditorProps) {
  const { theme } = useTheme();
  const { editMod } = useEditMod();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [MainData, setMainData] = useState<any>([]);
  const [reloadData, setReloadData] = useState(false);

  // store user selection for each day
  const [schedule, setSchedule] = useState<any>(
    days.map((day) => ({
      day,
      teacher_id: "",
      subject_id: "",
      period,
      class_id: clsData?.id,
    }))
  );

  const handleTeacherChange = (dayIndex: number, teacherId: string) => {
    const updated = [...schedule];
    updated[dayIndex] = { ...updated[dayIndex], teacher_id: teacherId };
    setSchedule(updated);
  };

  const handleSubjectChange = (dayIndex: number, subjectId: string) => {
    const updated = [...schedule];
    updated[dayIndex] = { ...updated[dayIndex], subject_id: subjectId };
    setSchedule(updated);
  };

  const fetchPeriodData = async () => {
    const { data, error } = await supabase
      .from("Main_table")
      .select(
        `
      id,
      day,
      period,
      class_id,
      teacher:teacher_id (
        id,
        name
      ),
      subject:subject_id (
        id,
        name
      )
      `
      )
      .eq("class_id", clsData?.id)
      .eq("period", period);

    if (error) {
      console.error("Error fetching period data:", error);
      return;
    }

    setMainData(data);

    // Merge fetched data with default schedule (avoid blank days)
    setSchedule(
      days.map((day) => {
        const existing: any = data?.find((d: any) => d.day === day);
        return existing
          ? {
              id: existing.id,
              day,
              teacher_id: existing?.teacher?.id || "", // ✅ fix here
              subject_id: existing?.subject?.id || "", // ✅ fix here
              period: existing.period,
              class_id: existing.class_id,
            }
          : {
              day,
              teacher_id: "",
              subject_id: "",
              period,
              class_id: clsData?.id,
            };
      })
    );
  };

  useEffect(() => {
    if (clsData?.id) fetchPeriodData();
  }, [clsData?.id, period, open, reloadData]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const filteredData = schedule.filter(
        (row: any) => row.teacher_id && row.subject_id
      );

      for (const row of filteredData) {
        if (row?.id) {
          // ✅ Update existing row
          const { error } = await supabase
            .from("Main_table")
            .update({
              teacher_id: row.teacher_id,
              subject_id: row.subject_id,
            })
            .eq("id", row.id);

          if (error) console.error("Update error:", error);
        } else {
          // ✅ Insert new row
          const { error } = await supabase.from("Main_table").insert([row]);

          if (error) console.error("Insert error:", error);
        }
      }
      setReloadData(!reloadData);
      setOpen(!open);
      toast.success("Schedule saved!");
      fetchPeriodData(); // Refresh after save
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error while saving.");
    } finally {
      setLoading(false);
    }
  };
  // 🔑 Grouping MainData by Subject + Teacher
  const groupedData = MainData.reduce((acc: any, item: any) => {
    const subjectName = item.subject?.name || "Unknown";
    const teacherName = item.teacher?.name || "Unknown";
    const key = `${subjectName}-${teacherName}`;

    if (!acc[key]) {
      acc[key] = new Set(); // Use Set to avoid duplicates
    }

    // ✅ Find index of day (Monday -> 1, Tuesday -> 2, ...)
    const dayIndex = days.indexOf(item.day) + 1;
    acc[key].add(dayIndex);

    return acc;
  }, {});

  // 🔑 Convert to array for rendering
  const displayRows = Object.entries(groupedData).map(([key, values]: any) => ({
    key,
    days: Array.from(values)
      .sort((a: any, b: any) => a - b)
      .join(", "),
  }));
  return (
    <td className="px-1 py-3 group relative font-medium text-left text-white border-r border-gray-600">
      {displayRows.length > 0 ? (
        <div className="flex flex-col gap-1">
          {displayRows.map((row) => (
            <div
              key={row.key}
              className={`flex justify-between items-center text-xs sm:text-sm ${
                theme ? "bg-white/40 text-black" : "bg-gray-800/50 text-white"
              }  rounded-lg px-2 py-1 whitespace-nowrap overflow-hidden text-ellipsis `}
            >
              {/* Left Side: Subject - Teacher */}
              <div className="font-semibold truncate flex flex-col gap-1 items-start">
                {row?.key?.split("-")?.map((i?: any) => (
                  <span>{i}</span>
                ))}
              </div>

              {/* Right Side: Days */}
              <span
                className={`${
                  theme ? " text-gray-600" : "text-gray-400"
                } truncate`}
              >
                {row.days}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-xs text-center">No Data</div>
      )}
      {editMod && (
        <div className="absolute opacity-0 z-0 group-hover:opacity-100 group-hover:z-20 top-0 left-0 w-full h-full flex  transition-all gap-2 duration-200 items-center justify-center backdrop-blur-sm">
          <button
            onClick={() => {
              setOpen(true);
            }}
            className="p-2    rounded-lg bg-gray-700 hover:bg-gray-600 hover:text-cyan-400 hover:scale-110 transition-all duration-200"
          >
            <EditIcon />
          </button>
          {MainData?.length == 6 && (
            <div className="absolute bottom-2 right-2 text-green-500">
              <Check size={24} />
            </div>
          )}
        </div>
      )}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 data-[state=open]:animate-fadeIn" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95%] max-w-3xl bg-gray-900 text-white rounded-2xl shadow-xl border border-gray-700 p-6 data-[state=open]:animate-scaleIn">
            <Dialog.Title className="text-2xl font-bold text-center">
              Edit Schedule - {clsData?.name} ({period})
            </Dialog.Title>

            <div className="space-y-4 mt-6 max-h-[65vh] overflow-auto scrollbar-thin scrollbar-hide">
              {days.map((day, index) => (
                <div
                  key={day}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gray-800 p-3 rounded-xl border border-gray-700"
                >
                  <span className="w-24 font-semibold">{day}</span>

                  <div className="flex-1">
                    <CustomSelect
                      value={schedule[index]?.teacher_id || ""}
                      onChange={(val) => handleTeacherChange(index, val)}
                      options={teachers.map((t) => ({
                        id: t.id,
                        label: t.name,
                      }))}
                      placeholder="Select Teacher"
                      position={
                        index > 3
                          ? "top"
                          : index > 2
                          ? "right"
                          : index > 1
                          ? "right"
                          : "bottom"
                      }
                    />
                  </div>

                  <div className="flex-1">
                    <CustomSelect
                      value={schedule[index]?.subject_id || ""}
                      onChange={(val) => handleSubjectChange(index, val)}
                      options={subjects.map((s) => ({
                        id: s.id,
                        label: s.name,
                      }))}
                      placeholder="Select Subject"
                      position={
                        index > 3
                          ? "top"
                          : index > 2
                          ? "left"
                          : index > 1
                          ? "left"
                          : "bottom"
                      }
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Dialog.Close asChild>
                <button className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition">
                  Cancel
                </button>
              </Dialog.Close>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-customTeal hover:bg-customTeal/90 transition"
              >
                {loading ? <CircleLoading /> : "Save"}
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </td>
  );
}

export default PeriodEditor;
