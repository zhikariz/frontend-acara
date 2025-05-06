interface ITicket {
  _id?: string;
  name?: string;
  description?: string;
  price?: number | string;
  quantity?: number | string;
  events?: string;
}

export type { ITicket };
