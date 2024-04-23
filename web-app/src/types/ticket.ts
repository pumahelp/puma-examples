export type TicketClient = {
  id: string;
  email?: string;
  name: string;
  created_at: Date;
  metadata: Record<string, any>;
  external_id?: string;
}

export type TicketAssignedTo = {
  id: string;
  name: string;
  email: string;
}

export type Ticket = {
    id: string;
    created_at: Date;
    subject: string;
    client: TicketClient | null;
    status: string;
    subscriber_id: string;
    tags: string[];
    assigned_to: TicketAssignedTo | null;
    public_id: string;
}

export type TicketMessage = {
  id: string;
  created_at: Date;
  ticket_id: string;
  message: string;
  is_private: boolean;
  from_client: boolean;
  author_name: string;
}