// ** SCHEDULES ** //
import { RecurringDayEnum } from "./enum/RecurringDay"
import { ScheduleTimeSlotStatusEnum } from "./enum/ScheduleTimeSlotStatus"
import { ScheduleTypeEnum } from "./enum/ScheduleType"

// POST api/v1/schedules
const createSchedule1 = {
  consultantId: "Schedule1",
  scheduleType: ScheduleTypeEnum.Recurring,

  schedules: [
    {
      recurringDay: RecurringDayEnum.Mon,
      specificDate: null,

      timeSlots: ["08:00:00", "09:00:00", "10:00:00"]
    },
    {
      recurringDay: RecurringDayEnum.Tue,
      specificDate: null,

      timeSlots: ["13:00:00", "14:00:00", "15:00:00"]
    }
  ]
}

const createSchedule2 = {
  consultantId: "Schedule2",
  scheduleType: ScheduleTypeEnum.OneTime,

  schedules: [
    {
      recurringDay: null,
      specificDate: "2025-03-05",

      timeSlots: ["08:00:00", "09:00:00", "10:00:00"]
    },
    {
      recurringDay: null,
      specificDate: "2025-03-05",

      timeSlots: ["08:00:00", "09:00:00", "10:00:00"]
    }
  ]
}

// POST api/v1/schedules/{scheduleId}/time-slots
const createScheduleTimeSlot = {
  startTime: "12:00:00"
}

// DELETE /api/v1/schedules/{scheduleId}/time-slots/{timeSlotId}

// GET api/v1/schedules/{consultantId}?date='2025-03-03'
const getScheduleByConsultantId = [
  {
    scheduleId: "Schedule1",
    consultantId: "Consultant1",

    scheduleType: ScheduleTypeEnum.Recurring,

    recurringDay: RecurringDayEnum.Mon,
    specificDate: null,

    scheduleTimeSlots: [
      {
        scheduleTimeSlotId: "ScheduleTimeSlot1",
        timeSlotId: "TimeSlot1",

        startTime: "08:00:00",
        status: ScheduleTimeSlotStatusEnum.Available
      },
      {
        scheduleTimeSlotId: "ScheduleTimeSlot2",
        timeSlotId: "TimeSlot2",

        startTime: "09:00:00",
        status: ScheduleTimeSlotStatusEnum.Booked
      },
      {
        scheduleTimeSlotId: "ScheduleTimeSlot3",
        timeSlotId: "TimeSlot3",

        startTime: "10:00:00",
        status: ScheduleTimeSlotStatusEnum.Available
      }
    ]
  }
]

// GET api/v1/schedules/{scheduleId}
const getScheduleById = {
  scheduleId: "Schedule1",
  consultantId: "Consultant1",

  scheduleType: ScheduleTypeEnum.Recurring,

  recurringDay: RecurringDayEnum.Mon,
  specificDate: null,

  scheduleTimeSlots: [
    {
      scheduleTimeSlotId: "ScheduleTimeSlot1",
      timeSlotId: "TimeSlot1",
      startTime: "08:00:00",
      status: ScheduleTimeSlotStatusEnum.Available
    },
    {
      scheduleTimeSlotId: "ScheduleTimeSlot2",
      timeSlotId: "TimeSlot2",
      startTime: "09:00:00",
      status: ScheduleTimeSlotStatusEnum.Booked
    },
    {
      scheduleTimeSlotId: "ScheduleTimeSlot3",
      timeSlotId: "TimeSlot3",
      startTime: "10:00:00",
      status: ScheduleTimeSlotStatusEnum.Available
    }
  ]
}

// PUT api/v1/schedules/{scheduleId}
const updateSchedule = {
  consultantId: "Consultant1",

  scheduleType: ScheduleTypeEnum.Recurring,

  recurringDay: RecurringDayEnum.Mon,
  specificDate: null,

  scheduleTimeSlots: ["12:00:00", "13:00:00", "14:00:00", "15:00:00"]
}

// DELETE /api/v1/schedules/{scheduleId}

// ** SCHEDULES TIME SLOTS ** //
// GET api/v1/schedules-time-slots/{scheduleTimeSlotId}
const getScheduleTimeSlotById = {
  scheduleTimeSlotId: "ScheduleTimeSlot1",
  scheduleId: "Schedule1",
  timeSlotId: "TimeSlot1",

  startTime: "08:00:00",

  status: ScheduleTimeSlotStatusEnum.Available
}

// DELETE api/v1/schedules-time-slots/{scheduleTimeSlotId}

// ** SCHEDULES EXCEPTIONS ** //
// POST /api/v1/schedule-exceptions
const createScheduleException = {
  scheduleId: "Schedule2",

  date: "2025-03-05",
  reason: "Christmas Holiday"
}

// GET /api/v1/schedule-exceptions

// GET /api/v1/schedule-exceptions/{exceptionId}
const getScheduleExceptionById = {
  exceptionId: "Exception1",
  scheduleId: "Schedule2",

  date: "2025-03-05",
  reason: "Christmas Holiday"
}

// PUT /api/v1/schedule-exceptions/{exceptionId}
const updateScheduleException = {
  scheduleId: "Schedule2",

  date: "2025-03-05",
  reason: "New Year Holiday"
}

// DELETE /api/v1/schedule-exceptions/{exceptionId}
