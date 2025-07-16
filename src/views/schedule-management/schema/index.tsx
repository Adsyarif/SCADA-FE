import { z } from 'zod';

export const WEEKDAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"] as const;
export type Weekday = typeof WEEKDAYS[number];

export const defSchema = z.object({
  rtuId:      z.string().uuid(),
  shiftId:    z.string().uuid(),
  daysOfWeek: z.array(z.enum(['Mon','Tue','Wed','Thu','Fri','Sat','Sun'])).min(1),
  userSiteIds: z.array(z.string().uuid()).min(1),
});

export type DefinitionFormData = z.infer<typeof defSchema>;
