
import { useState } from 'react';
import TeacherCard from '../components/Card/TeacherCard';
import SubjectCard from '../components/Card/SubjectCard';
import Notification from '../components/Card/Notification';
import AOS from "aos";
import "aos/dist/aos.css";
const AdminDashboard = () => {
  AOS.init({
    duration: 1200,
    once: false,
    offset: 0,
  });

  const [teachers, setTeachers] = useState([
    { id: 1, name: "Dr. Sarah Johnson", department: "Mathematics Department" },
    { id: 2, name: "Prof. Michael Chen", department: "Computer Science Department" },
    { id: 3, name: "Dr. Emily Rodriguez", department: "Physics Department" }
  ]);

  const [subjects, setSubjects] = useState([
    { id: 1, name: "Advanced Mathematics", credits: 4, duration: 16 },
    { id: 2, name: "Data Structures & Algorithms", credits: 3, duration: 12 },
    { id: 3, name: "Quantum Physics", credits: 4, duration: 16 },
    { id: 4, name: "Organic Chemistry", credits: 3, duration: 14 }
  ]);
  const [notification, setNotification] = useState<any>(null);
  const showNotification = (message: any, type = 'info') => {
    setNotification({ message, type });
  };

  const closeNotification = () => {
    setNotification(null);
  };

  const createTeacher = () => {
    const name = prompt("Enter teacher name:");
    const department = prompt("Enter department:");
    if (name && department) {
      const newTeacher = {
        id: teachers.length + 1,
        name,
        department
      };
      setTeachers([...teachers, newTeacher]);
      showNotification(`Teacher "${name}" created successfully!`, 'success');
    }
  };

  const createSubject = () => {
    const name = prompt("Enter subject name:");
    const credits = prompt("Enter credits:");
    const duration = prompt("Enter duration (weeks):");
    if (name && credits && duration) {
      const newSubject = {
        id: subjects.length + 1,
        name,
        credits: parseInt(credits),
        duration: parseInt(duration)
      };
      setSubjects([...subjects, newSubject]);
      showNotification(`Subject "${name}" created successfully!`, 'success');
    }
  };

  const editTeacher = (name: any) => {
    showNotification(`Editing ${name}...`, 'info');
  };

  const deleteTeacher = (name: any) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      setTeachers(teachers.filter(teacher => teacher.name !== name));
      showNotification(`${name} deleted successfully!`, 'success');
    }
  };

  const editSubject = (name: any) => {
    showNotification(`Editing ${name}...`, 'info');
  };

  const deleteSubject = (name: any) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      setSubjects(subjects.filter(subject => subject.name !== name));
      showNotification(`${name} deleted successfully!`, 'success');
    }
  };

  return (
    <div className=" mt-[30px] min-h-screen text-white font-sans">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 data-aos="fade-right" data-aos-delay="200" className="text-3xl font-bold text-customTeal mb-2">Admin Dashboard</h1>
          <p data-aos="fade-right" data-aos-delay="400" className="text-gray-400">Manage teachers and subjects</p>
        </div>
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Teachers Section */}
          <div data-aos="fade-right" data-aos-delay="600" className="space-y-6 overflow-hidden backdrop-blur-sm bg-gray-900/20 p-6 rounded-2xl border border-gray-700/50">
            <div className="flex items-center justify-between">
              <h2 data-aos="fade-down" data-aos-delay="1000" className="text-2xl font-semibold text-white">Teachers</h2>
              <button data-aos="fade-down" data-aos-delay="1000"
                className="bg-customTeal  px-6 py-3 rounded-lg font-semibold hover:bg-customTeal transition-all duration-300 shadow-lg shadow-customTeal/30 hover:shadow-customTeal/50 hover:scale-105"
                onClick={createTeacher}
              >
                Create Teacher
              </button>
            </div>
            <div className="space-y-6">
              {teachers.map((teacher, index) => (
                <TeacherCard
                  key={teacher.id}
                  teacher={teacher}
                  onEdit={editTeacher}
                  onDelete={deleteTeacher}
                  index={index}
                />
              ))}
            </div>

          </div>
          {/* Subjects Section */}
          <div data-aos="fade-left" data-aos-delay="800" className="space-y-6 overflow-hidden  backdrop-blur-sm bg-x-900/20 p-6 rounded-2xl border border-gray-700/50">
            <div className="flex items-center justify-between">
              <h2 data-aos="fade-down" data-aos-delay="1000" className="text-2xl font-semibold text-white">Subjects</h2>
              <button data-aos="fade-down" data-aos-delay="1000"
                className="bg-customTeal  px-6 py-3 rounded-lg font-semibold hover:bg-customTeal transition-all duration-300 shadow-lg shadow-customTeal/30 hover:shadow-customTeal/50 hover:scale-105"
                onClick={createSubject}
              >
                Create Subject
              </button>
            </div>

            <div className="space-y-6">
              {subjects.map((subject,index) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  onEdit={editSubject}
                  onDelete={deleteSubject}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Notification */}
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={closeNotification}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
