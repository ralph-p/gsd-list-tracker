export type Task = {
    id: string;
    name: string;
    active: boolean;
    frequency: FrequencyEnum;
    percentComplete: number;
    duration: number;
    description?: string;
    inserted_at: string;
    lastUpdated: number;
    notes?: TaskNote[];
    subtasks?: Subtask[];
    noteObject?: NoteObject;
  }
  
  export type NoteObject = {
    [date: string]: string[];
  }
  export type TaskNote = {
    id: string;
    note: string;
    inserted_at: string;
    time?: number;
  }
  export type Subtask = {
    id: string;
    name: string;
    description?: string;
    inserted_at: string;
    complete: boolean;
  }
  export enum CardViewControls {
    ACTIVE = 'active',
    ARCHIVED = 'archived',
    ALL = 'all'
  }
  export enum FrequencyEnum {
    DAILY = 0,
    WEEKLY = 1,
    MONTHLY = 2
  }
  export const Frequency = {
      0: 'Daily',
      1: 'Weekly',
      2: 'Monthly',
  }
  export const FrequencyString = {
      0: 'day',
      1: 'week',
      2: 'month',
  }