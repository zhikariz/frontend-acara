import { DateValue } from "@heroui/react";

interface IEvent {
  _id?: string;
  name?: string;
  slug?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  isPublish?: boolean | string;
  isFeatured?: boolean | string;
  isOnline?: boolean | string;
  description?: string;
  location?: {
    region: string;
    coordinates: number[];
  };
  banner?: string | FileList;
}

interface IRegency {
  id: string;
  name: string;
}

interface IEventForm extends IEvent {
  region: string;
  startDate: DateValue;
  endDate: DateValue;
  latitude: string;
  longitude: string;
}

export type { IEvent, IRegency, IEventForm };
