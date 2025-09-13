import { useState, useEffect } from "react";
import TeacherCard from "../components/Card/TeacherCard";
import SubjectCard from "../components/Card/SubjectCard";
import Notification from "../components/Card/Notification";
import AOS from "aos";
import "aos/dist/aos.css";
import supabase from "../config/createClient";
import CreateTeacherModal from "../components/model/CreateTeacherModal";
import CreateSubjectButton from "../components/model/CreateSubjectButton";
import { useEditMod } from "../Context/EditModProvider";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const { editMod } = useEditMod();

  AOS.init({
    duration: 1200,
    once: false,
    offset: 0,
  });

  const [teachers, setTeachers] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [notification, setNotification] = useState<any>(null);
  const [showCreateTeacherModal, setShowCreateTeacherModal] = useState(false);
  // ✅ Fetch Subjects & Teachers from Supabase
  useEffect(() => {
    fetchSubjects();
    fetchTeachers();
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

  // ✅ Create Subject (Supabase)

  // ✅ Actual create function (called from modal)
  const handleCreateTeacher = async (name: string, subjectId: string) => {
    const { data, error } = await supabase
      .from("teacher")
      .insert([{ name, subject_id: subjectId }])
      .select("id, name, subject_id, subject:subject_id(name)")
      .single();

    if (error) {
      toast.error("Failed to create teacher!");
      console.error(error);
    } else {
      setTeachers([...teachers, data]);
    }
  };

  return (
    <div className="mt-[30px] min-h-screen text-white font-sans">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1
            data-aos="fade-right"
            data-aos-delay="200"
            className="text-3xl font-bold text-customTeal mb-2"
          >
            Admin Dashboard
          </h1>
          <p
            data-aos="fade-right"
            data-aos-delay="400"
            className="text-gray-400"
          >
            Manage teachers and subjects
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Teachers Section */}
          <div
            data-aos="fade-right"
            data-aos-delay="600"
            className="space-y-6 overflow-hidden backdrop-blur-sm bg-gray-900/20 p-6 rounded-2xl border border-gray-700/50"
          >
            <div className="flex items-center justify-between">
              <h2
                data-aos="fade-down"
                data-aos-delay="1000"
                className="text-2xl font-semibold text-white"
              >
                Teachers
              </h2>
              {editMod && (
                <button
                  className="bg-customTeal px-6 py-3 rounded-lg font-semibold hover:bg-customTeal transition-all duration-300 shadow-lg shadow-customTeal/30 hover:shadow-customTeal/50 hover:scale-105"
                  onClick={() => setShowCreateTeacherModal(true)}
                >
                  Add Teacher
                </button>
              )}
            </div>

            <div className="space-y-6">
              {teachers.map((teacher, index) => (
                <TeacherCard
                  key={teacher.id}
                  teacher={teacher}
                  index={index}
                  subjects={subjects}
                />
              ))}
            </div>
          </div>

          {/* Subjects Section */}
          <div
            data-aos="fade-left"
            data-aos-delay="800"
            className="space-y-6 overflow-hidden backdrop-blur-sm bg-gray-900/20 p-6 rounded-2xl border border-gray-700/50"
          >
            <div className="flex items-center justify-between">
              <h2
                data-aos="fade-down"
                data-aos-delay="1000"
                className="text-2xl font-semibold text-white"
              >
                Subjects
              </h2>
              <CreateSubjectButton
                onSubjectCreated={(newSubject) =>
                  setSubjects([...subjects, newSubject])
                }
              />
            </div>

            <div className="space-y-6">
              {subjects.map((subject, index) => (
                <SubjectCard key={subject.id} subject={subject} index={index} />
              ))}
            </div>
          </div>
        </div>
        {/* ✅ Modal */}
        {showCreateTeacherModal && (
          <CreateTeacherModal
            subjects={subjects}
            onClose={() => setShowCreateTeacherModal(false)}
            onCreate={handleCreateTeacher}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
