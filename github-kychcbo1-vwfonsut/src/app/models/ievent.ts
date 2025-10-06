export interface IEvent {
  id?: string;
  title: string;
  description?: string;
  start_date: string;
  end_date?: string;
  location?: string;
  reminder_minutes: number;
  is_completed: boolean;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}
