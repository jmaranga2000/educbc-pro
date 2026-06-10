import type { TimetableDay } from "@/lib/types";

export function TimetableGrid({ timetable }: { timetable: TimetableDay[] }) {
  const periods = ["8:00", "9:00", "10:30", "11:30", "2:00"];

  return (
    <div className="overflow-auto rounded border border-border">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="bg-muted text-muted-foreground">
          <tr>
            <th className="px-4 py-3">Day</th>
            {periods.map((period) => (
              <th key={period} className="px-4 py-3">
                {period}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timetable.map((day) => (
            <tr key={day.day} className="border-t border-border">
              <td className="px-4 py-3 font-semibold">{day.day}</td>
              {day.lessons.map((lesson) => (
                <td key={`${day.day}-${lesson.time}`} className="px-4 py-3 align-top">
                  <p className="font-medium">{lesson.subject}</p>
                  <p className="text-xs text-muted-foreground">{lesson.teacher}</p>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
