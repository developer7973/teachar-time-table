import React, { useState } from "react";
import { motion } from "framer-motion";

const schedule = [
  {
    period: "1",
    entries: [
      { class: "10A", teacher: "SST 1-4" },
      { class: "10B", teacher: "SHEENU" },
      { class: "10C", teacher: "COM 5-6" },
      { class: "10D", teacher: "RAJINDER" },
      { class: "10E", teacher: "MATH 1-5" },
      { class: "10F", teacher: "MAMTA" },
      { class: "10G", teacher: "6TH ROT ENG" },
      { class: "10H", teacher: "PAYAL" },
    ],
  },
  {
    period: "2",
    entries: [
      { class: "10A", teacher: "KANWALJIT" },
      { class: "10B", teacher: "SCI 1-4,6" },
      { class: "10C", teacher: "KANWALJIT" },
      { class: "10D", teacher: "ENG 1,3,5-6" },
      { class: "10E", teacher: "PAYAL" },
      { class: "10F", teacher: "2ND ROT NSQF" },
      { class: "10G", teacher: "PUSHPA" },
      { class: "10H", teacher: "—" },
    ],
  },
  {
    period: "3",
    entries: [
      { class: "10A", teacher: "SHEENU" },
      { class: "10B", teacher: "PBI 1-6" },
      { class: "10C", teacher: "SUMAN" },
      { class: "10D", teacher: "HIN 1-5" },
      { class: "10E", teacher: "JP" },
      { class: "10F", teacher: "6TH W/L" },
      { class: "10G", teacher: "AASHISH" },
      { class: "10H", teacher: "—" },
    ],
  },
  {
    period: "4",
    entries: [
      { class: "10A", teacher: "MATH 1-5" },
      { class: "10B", teacher: "SCI 2-4" },
      { class: "10C", teacher: "KANWALJIT" },
      { class: "10D", teacher: "ENG 2-5" },
      { class: "10E", teacher: "PAYAL" },
      { class: "10F", teacher: "JP" },
      { class: "10G", teacher: "PUSHPA" },
      { class: "10H", teacher: "—" },
    ],
  },
  {
    period: "5",
    entries: [
      { class: "10A", teacher: "COM 1-2" },
      { class: "10B", teacher: "SHEENU" },
      { class: "10C", teacher: "SUMAN" },
      { class: "10D", teacher: "HIN 1-4" },
      { class: "10E", teacher: "JP" },
      { class: "10F", teacher: "MAMTA" },
      { class: "10G", teacher: "AASHISH" },
      { class: "10H", teacher: "—" },
    ],
  },
  {
    period: "6",
    entries: [
      { class: "10A", teacher: "SST 2-4" },
      { class: "10B", teacher: "KANWALJIT" },
      { class: "10C", teacher: "COM 5-6" },
      { class: "10D", teacher: "RAJINDER" },
      { class: "10E", teacher: "MATH 1-3" },
      { class: "10F", teacher: "MAMTA" },
      { class: "10G", teacher: "6TH ROT ENG" },
      { class: "10H", teacher: "PAYAL" },
    ],
  },
  {
    period: "7",
    entries: [
      { class: "10A", teacher: "KANWALJIT" },
      { class: "10B", teacher: "SCI 2-5" },
      { class: "10C", teacher: "SUMAN" },
      { class: "10D", teacher: "HIN 1-5" },
      { class: "10E", teacher: "JP" },
      { class: "10F", teacher: "6TH W/L" },
      { class: "10G", teacher: "AASHISH" },
      { class: "10H", teacher: "—" },
    ],
  },
  {
    period: "8",
    entries: [
      { class: "10A", teacher: "SHEENU" },
      { class: "10B", teacher: "PBI 1-6" },
      { class: "10C", teacher: "SUMAN" },
      { class: "10D", teacher: "HIN 1-5" },
      { class: "10E", teacher: "JP" },
      { class: "10F", teacher: "MAMTA" },
      { class: "10G", teacher: "AASHISH" },
      { class: "10H", teacher: "—" },
    ],
  },
  {
    period: "9",
    entries: [
      { class: "10A", teacher: "COM 1-6" },
      { class: "10B", teacher: "SHEENU" },
      { class: "10C", teacher: "KANWALJIT" },
      { class: "10D", teacher: "RAJINDER" },
      { class: "10E", teacher: "MATH 1-5" },
      { class: "10F", teacher: "MAMTA" },
      { class: "10G", teacher: "6TH ROT ENG" },
      { class: "10H", teacher: "PAYAL" },
    ],
  },
];

const classHeaders = ["10A","10B","10C","10D","10E","10F","10G","10H"];

const Home: React.FC = () => {
  const initialAttendance: { [cls: string]: { [period: string]: boolean } } = {};
  classHeaders.forEach(cls => {
    initialAttendance[cls] = {};
    schedule.forEach(p => {
      initialAttendance[cls][p.period] = false;
    });
  });

  const [attendance, setAttendance] = useState(initialAttendance);

  const toggleAttendance = (cls: string, period: string) => {
    setAttendance(prev => ({
      ...prev,
      [cls]: { ...prev[cls], [period]: !prev[cls][period] },
    }));
  };

  return (
    <div className="min-h-screen p-6   text-white font-poppins flex flex-col items-center">

      <div className="w-full max-w-7xl  rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-[#12BBB6]/50 scrollbar-track-gray-900">
          <table className="min-w-full table-auto border-collapse border border-gray-700">
            {/* Table Header */}
            <thead className="bg-[#12BBB6] sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 text-left font-semibold uppercase tracking-wide border-r border-[#0c8a91]">
                  Class
                </th>
                {schedule.map((p, idx) => (
                  <th
                    key={idx}
                    className="px-6 py-4 text-center font-semibold uppercase tracking-wide border-r border-[#0c8a91] last:border-0"
                  >
                    Period {p.period}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {classHeaders.map((cls, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-gray-700  transition-colors duration-300 ${
                    idx % 2 === 0 ? "bg-transparent" : "bg-white/10"
                  }`}
                >
                  {/* Class Column */}
                  <td className="px-6 py-4 bg-[#12BBB6] font-medium text-left text-white border-r border-gray-600">
                    {cls}
                  </td>

                  {/* Period Columns */}
                  {schedule.map((p, idx2) => {
                    const entry = p.entries.find(e => e.class === cls);
                    const isPresent = attendance[cls][p.period];
                    return (
                      <td key={idx2} className="px-6 py-4 text-center border-r border-gray-600 last:border-0">
                        {entry ? (
                          <div className="flex flex-col items-center justify-center space-y-1">
                            <span className="text-xs text-gray-200">{entry.teacher}</span>
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={() => toggleAttendance(cls, p.period)}
                              className={`relative w-12 h-6 rounded-full transition-colors duration-300 cursor-pointer ${
                                isPresent ? "bg-white/20" : " bg-white/10"
                              }`}
                              title={isPresent ? "Present" : "Absent"}
                            >
                              {/* Circle indicator */}
                              <motion.span
                                layout
                                className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md"
                                animate={{
                                  x: isPresent ? 24 : 0,
                                  backgroundColor: isPresent ? "#10B981" : "#12BBB6",
                                }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              />
                            </motion.button>
                          </div>
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    
    </div>
  );
};

export default Home;
