import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import EditIcon from './EditIcon';
import DeleteIcon from './DeleteIcon';

const TeacherCard = ({ teacher, onEdit, onDelete, index }: any) => {

    useEffect(() => {
        AOS.init({
            duration: 1200,
            once: false,
            offset: 0,
        });
    }, []);

    const delay =1400+ index * 200; 
    return (
        <div data-aos="fade-up" data-aos-delay={delay} className="bg-gray-800 p-6 rounded-xl border border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/10 hover:scale-105">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium text-white">{teacher.name}</h3>
                    <p className="text-gray-400 text-sm">{teacher.department}</p>
                </div>
                <div className="flex space-x-3">
                    <button 
                        className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 hover:text-cyan-400 transition-all duration-200"
                        onClick={() => onEdit(teacher.name)}
                    >
                        <EditIcon />
                    </button>
                    <button 
                        className="p-2 rounded-lg bg-gray-700 hover:bg-red-900 hover:text-red-400 transition-all duration-200"
                        onClick={() => onDelete(teacher.name)}
                    >
                        <DeleteIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TeacherCard;
