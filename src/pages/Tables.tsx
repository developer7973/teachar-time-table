import React, { useEffect, useState } from "react";
import supabase from "../config/createClient";
import PeriodEditor from "../components/model/PeriodEditor";
import CircleLoading from "../components/ui/CircleLoading";
const Tables: React.FC = () => {
  const [mainLoading, setMainLoading] = useState(true);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    // ✅ 2 second ke baad loading hat jayegi
    const timer = setTimeout(() => setMainLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  const fetchSubjects = async () => {
    const { data, error } = await supabase.from("Subjects").select("*");
    if (error) {
      console.error("Error fetching subjects:", error);
      return;
    }
    setSubjects(data);
  };

  const fetchTeachers = async () => {
    const { data, error } = await supabase
      .from("Teachers")
      .select("id, name, subject_id, subject:subject_id(name)");
    if (error) {
      console.error("Error fetching teachers:", error);
      return;
    }
    setTeachers(data);
  };
  useEffect(() => {
    fetchSubjects();
    fetchTeachers();
  }, []);
  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("Classes")
        .select("*")
        .order("grade", { ascending: true });

      if (error) {
        console.error("Error fetching classes:", error);
        setError("Failed to fetch classes");
      } else {
        setClasses(data || []);
      }
      setLoading(false);
    };

    fetchClasses();
  }, []);

  return (
    <div className="min-h-screen p-6   text-white font-poppins flex flex-col items-center">
      <div className="w-full max-w-full  rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-[#12BBB6]/50 scrollbar-track-gray-900">
          <table
            id="timetable"
            className="min-w-full table-auto border-collapse border border-gray-700"
          >
            {/* Table Header */}
            <thead className="bg-[#12BBB6] sticky top-0 z-10">
              <tr>
                <th className="px-2 py-3 text-center font-semibold uppercase tracking-wide border-r border-[#0c8a91]">
                  Class
                </th>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
                  return (
                    <th
                      key={item}
                      className=" py-3 text-center font-semibold uppercase tracking-wide border-r border-[#0c8a91]"
                    >
                      Period {item}
                    </th>
                  );
                })}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {classes?.map((cls, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-gray-700  transition-colors duration-300 bg-transparent`}
                >
                  {/* Class Column */}
                  <td className="px-2 py-4  bg-white/10 backdrop-blur-sm font-medium text-left text-white border-r border-gray-600">
                    {cls?.name}
                  </td>
                  {[1, 2, 3, 4, 5, 6, 7, 8]?.map(
                    (period?: any, index?: number) => (
                      <PeriodEditor
                        period={period}
                        clsData={cls}
                        teachers={teachers}
                        subjects={subjects}
                        key={index}
                      />
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {mainLoading && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]">
          <CircleLoading />
        </div>
      )}
    </div>
  );
};

export default Tables;
