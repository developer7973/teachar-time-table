import React, { useEffect, useState } from "react";
import supabase from "../config/createClient";
import CustomSelect from "../components/Card/CustomSelect";
import SingleTeacherCell from "../components/model/SingleTeacherCell";
import { useTheme } from "../Context/ThemeProvider";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const periods = [1, 2, 3, 4, 5, 6, 7, 8];

function SingleEdit() {
  const { theme } = useTheme();

  const [teachers, setTeachers] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<string>("");

  // ✅ Fetch Teachers & Classes
  useEffect(() => {
    async function fetchData() {
      const [classRes, subjectRes, teacherRes] = await Promise.all([
        supabase.from("Classes").select("*"),
        supabase.from("Subjects").select("*"),
        supabase.from("Teachers").select("*"),
      ]);

      if (classRes.data) setClasses(classRes.data);
      if (subjectRes.data) setSubjects(subjectRes.data);
      if (teacherRes.data) setTeachers(teacherRes.data);
    }
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className={`text-2xl font-bold text-center mb-4  ${!theme ? "text-white" : "text-black"}`}>
        Edit Single Teacher Schedule
      </h1>

      {/* Teacher Selector */}
      <div className="max-w-xs mx-auto mb-6">
        <CustomSelect
          value={selectedTeacher}
          onChange={setSelectedTeacher}
          options={teachers.map((t) => ({ id: t.id, label: t.name }))}
          placeholder="Select Teacher"
        />
      </div>

      {/* Show timetable only if teacher is selected */}
      {selectedTeacher && (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700 text-gray-900 dark:text-gray-100">
            <thead>
              <tr className="bg-customTeal text-white">
                <th className="border border-gray-700 px-4 py-2 text-left">
                  Day
                </th>
                {periods.map((p) => (
                  <th
                    key={p}
                    className="border border-gray-700 px-4 py-2 text-center"
                  >
                    {p}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day) => (
                <tr key={day}>
                  <td className="border bg-customTeal text-white border-gray-700 px-4 py-2 font-semibold">
                    {day}
                  </td>
                  {periods.map((p) => {
                    // find existing entry for this day & period

                    return (
                      <td
                        key={p}
                        className={`border relative group py-3 px-2 border-gray-700  ${
                          theme ? "" : "text-white"
                        }`}
                      >
                        <SingleTeacherCell
                          day={day}
                          period={p}
                          classes={classes}
                          teacherId={selectedTeacher}
                          subjects={subjects}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SingleEdit;
