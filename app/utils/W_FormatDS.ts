export class W_FormatDS {

    public convert(tkb: string) {
        // Thứ 2,tiết 11->13,Ph C.E302,GV Huỳnh Ngọc Trang,15/06/26 đến 20/07/26
        const schedule: Record<number, { start: number; end: number; }> = {};
        const positions: string[] = [];
        const teachers: string[] = [];

        const parts = tkb.trim().split("<hr>");
        parts.forEach(part => {
            const paths = part.trim().split(",");
            if (!paths || paths.length !== 5) {
                return;
            }

            const p1 = paths[0];
            const p2 = paths[1];
            const p3 = paths[2];
            const p4 = paths[3];

            const dayOfWeek = p1.replaceAll("Thứ", "").trim();
            if (!Number(dayOfWeek)) {
                return;
            }

            const period = p2.replace("tiết", "").trim().split("->");
            const periodStart = Number(period[0]);
            const periodEnd = Number(period[1]);

            if (!periodStart || !periodEnd) {
                return;
            }

            schedule[Number(dayOfWeek)] = {
                start: periodStart,
                end: periodEnd
            }

            const position = p3.replace("Ph", "").trim();
            if (!positions.includes(position)) {
                positions.push(position);
            }

            const teacher = p4.replace("GV", "").trim();
            if (!teachers.includes(teacher)) {
                teachers.push(teacher);
            }
        });

        return {
            schedule: schedule,
            teachers: teachers,
            positions: positions
        }
    }
}