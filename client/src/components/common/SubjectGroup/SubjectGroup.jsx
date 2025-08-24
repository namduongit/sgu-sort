import './SubjectGroup.css';

const SubjectGroup = ({ group, choose }) => {
  const tkbString = group.tkb;
  const hrPath = tkbString.split('<hr>').map(item => item.trim());
  const subjectItems = hrPath.map(item => {
    const [day, period, room, teacher, periodOfTime] = item.split(',');
    return { day, period, room, teacher, periodOfTime };
  });

  const uniqueSubjects = Array.from(new Set(subjectItems.map(item => JSON.stringify(item))))
    .map(item => JSON.parse(item));

  const teacherList = [...new Set(uniqueSubjects.map(item => item.teacher))].join(', ');
  const roomList = [...new Set(uniqueSubjects.map(item => item.room))].join(', ');
  const time = [...new Set(uniqueSubjects.map(item => item.day +", "+ item.period))].join(', ');

  return (
    <div className="subject-group-card cursor-pointer" style={{
      backgroundColor: `${choose ? "#28a745": "white"}`,
      color: `${choose ? "white" : "black"}`
    }}>
      <div className="subject-group-header d-flex justify-content-between align-items-center">
        <h6 className="mb-0 fw-bold" style={{
          color: `${choose ? "white" : "black"}`
        }}>Nhóm tổ: {group.nhom_to}</h6>
        <span className="badge bg-dark text-white">Số buổi học: {uniqueSubjects.length}</span>
      </div>

      <div className="subject-group-body mt-2">
        <div><strong>Giảng viên:</strong> {teacherList}</div>
        <div><strong>Phòng học:</strong> {roomList}</div>
        <div><strong>Tiết học:</strong> {time}</div>
      </div>
    </div>
  );
};

export default SubjectGroup;
