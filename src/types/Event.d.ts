import { DateValue } from "@heroui/react";

interface IEvent {
  _id?: string;
  name?: string;
  slug?: string;
  category?: string;
  startDate?: string | DateValue;
  endDate?: string | DateValue;
  isPublish?: boolean | string;
  isFeatured?: boolean | string;
  isOnline?: boolean | string;
  description?: string;
  location?: {
    address: string;
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
  address?: string;
  region?: string;
  latitude?: string;
  longitude?: string;
}

export type { IEvent, IRegency, IEventForm };
