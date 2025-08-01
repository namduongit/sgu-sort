import "./Calender.css";

const TIME_SLOT_COUNT = 10;
const DAYS = ["Thứ hai", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
const DAY_MAP = {
  "Thứ 2": 0,
  "Thứ 3": 1,
  "Thứ 4": 2,
  "Thứ 5": 3,
  "Thứ 6": 4,
  "Thứ 7": 5,
  "Chủ nhật": 6
};

const colorMap = {};
const generateColor = () => {
  const colors = [
    "#2563eb", "#16a34a", "#db2777", "#f97316", "#7c3aed",
    "#ca8a04", "#0ea5e9", "#f59e0b", "#ec4899", "#8b5cf6",
    "#f43f5e", "#22c55e", "#eab308", "#facc15", "#4f46e5", "#e879f9"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Calendar = ({ calendar }) => {
  const calendarTable = Array.from({ length: TIME_SLOT_COUNT }, () =>
    Array(7).fill(null).map(() => [])
  );

  calendar.forEach(({ tkb, tenMH, nhom_to }) => {
    const sessions = tkb.split("<hr>").map(item => item.trim());

    sessions.forEach(session => {
      const [day, periodStr, room, teacher, timeRange] = session.split(",");
      const [startPeriod, endPeriod] = periodStr.replace("tiết ", "").split("->").map(Number);
      const column = DAY_MAP[day.trim()];

      for (let p = startPeriod; p <= endPeriod; p++) {
        calendarTable[p - 1][column].push({
          subject: tenMH,
          group: nhom_to,
          teacher: teacher.trim(),
          room: room.trim()
        });
      }
    });
  });

  return (
    <table className="calendar-table">
      <thead>
        <tr>
          <td>Tiết</td>
          {DAYS.map((d, i) => <td key={i}>{d}</td>)}
        </tr>
      </thead>
      <tbody>
        {calendarTable.map((row, rowIndex) => (
          <tr key={rowIndex} style={{ position: "relative", zIndex: 1 }}>
            <td>Tiết {rowIndex + 1}</td>
            {row.map((cellData, colIndex) => {
              const prevRows = calendarTable.slice(0, rowIndex);
              const isFirst = !prevRows.some(r =>
                JSON.stringify(r[colIndex]) === JSON.stringify(cellData)
              );
              const spanCount = calendarTable.slice(rowIndex).filter(r =>
                JSON.stringify(r[colIndex]) === JSON.stringify(cellData)
              ).length;

              if (cellData.length > 0 && isFirst) {
                const key = cellData.map(c => `${c.subject}-${c.group}`).join("|");
                const mainColor = colorMap[key] || (colorMap[key] = generateColor());
                const backgroundColor = `${mainColor}20`;
                const textColor = mainColor;

                return (
                  <td
                    key={colIndex}
                    rowSpan={spanCount}
                    style={{
                      backgroundColor,
                      color: textColor,
                      fontWeight: "bold",
                      borderRadius: "6px",
                      padding: "8px",
                      border: `1.5px solid ${mainColor}`,
                      transition: "all 0.3s ease",
                      position: "relative",
                      zIndex: 100
                    }}
                  >
                    {cellData.map((entry, i) => (
                      <div key={i} style={{ marginBottom: "6px" }}>
                        <div>{entry.subject} ({entry.group})</div>
                        <div style={{ fontSize: "0.8rem", fontWeight: "normal" }}>
                          GV: {entry.teacher}<br />
                          Phòng: {entry.room}
                        </div>
                      </div>
                    ))}
                  </td>
                );
              } else if (cellData.length > 0) {
                return null;
              } else {
                return <td key={colIndex}></td>;
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Calendar;
