/**

// Dữ liệu
const tkb1 = "
Thứ 2,tiết 6->8,Ph C.E603,GV Nguyễn Sum,15/09/25 đến 10/11/25
Thứ 5,tiết 4->5,Ph C.E603,GV Nguyễn Sum,18/09/25 đến 13/11/25

const tkbOthers = [
  "Thứ 4,tiết 6->8,Ph 2.C006,GV Chế Thị Kim Phụng,17/09/25 đến 12/11/25<hr>Thứ 5,tiết 9->10,Ph 2.A104,GV Chế Thị Kim Phụng,18/09/25 đến 13/11/25",
  "Thứ 5,tiết 6->7,Ph C.E603,GV Nguyễn Sum,18/09/25 đến 13/11/25<hr>Thứ 6,tiết 6->8,Ph C.E603,GV Nguyễn Sum,19/09/25 đến 14/11/25"
];
 */

export function parseSchedule(tkb) {
  const parts = tkb.split('<hr>').map(item => item.trim());
  return parts.map(row => {
    const [day, period, room , teacher, periodOfTime] = row.split(',');
    const [start, end] = periodOfTime.split(' đến ').map(s => s.trim());
    const [startPeriod, endPeriod] = period.split('->').map(s => s.trim().replace('tiết ', ''));
    
    const [startDay, startMonth, startYear] = start.split('/').map(Number);
    const [endDay, endMonth, endYear] = end.split('/').map(Number);
    const startDate = `20${startYear.toString()}/${startMonth.toString()}/${startDay.toString()}`;
    const endDate = `20${endYear.toString()}/${endMonth.toString()}/${endDay.toString()}`;

    return { 
      day, 
      startDate: new Date(startDate), 
      endDate: new Date(endDate), 
      startPeriod: parseInt(startPeriod), 
      endPeriod: parseInt(endPeriod) 
    };
  });
}

function isConflict(a, b) {
  if (a.day !== b.day) return false;
  if (a.endPeriod < b.startPeriod || b.endPeriod < a.startPeriod) return false;
  if (a.endDate < b.startDate || b.endDate < a.startDate) return false;
  return true;
}

export function checkConflict(tkb1, tkbOthers) {
  const listA = parseSchedule(tkb1);

  for (const tkb of tkbOthers) {
    const listB = parseSchedule(tkb);
    for (const a of listA) {
      for (const b of listB) {
        if (isConflict(a, b)) {
          console.log("Trùng lịch:", a, b);
          return true;
        }
      }
    }
  }
  return false;
}
