import { ScheduleTimeSlotStatusEnum } from "./enum/ScheduleTimeSlotStatus"

export const sampleSchedulesData = [
  {
    scheduleId: "a",
    date: "2025-02-17T00:00:00.000Z",
    time: "08:00",
    status: ScheduleTimeSlotStatusEnum.Available
  },
  {
    scheduleId: "b",
    date: "2025-02-17T00:00:00.000Z",
    time: "09:00",
    status: ScheduleTimeSlotStatusEnum.Unavailable
  },
  {
    scheduleId: "c",
    date: "2025-02-17T00:00:00.000Z",
    time: "10:00",
    status: ScheduleTimeSlotStatusEnum.Booked
  },
  {
    scheduleId: "d",
    date: "2025-02-17T00:00:00.000Z",
    time: "11:00",
    status: ScheduleTimeSlotStatusEnum.Available
  },
  {
    scheduleId: "e",
    date: "2025-02-17T00:00:00.000Z",
    time: "15:00",
    status: ScheduleTimeSlotStatusEnum.Available
  }
]
