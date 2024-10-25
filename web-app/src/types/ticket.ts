export type Ticket = {
    id: string;
    created_at: string;
    subject: string;
    client_email: string;
    status: string;
    subscriber_id: string;
    tags: string[];
    assigned_to: {
      id: string;
      name: string;
      email: string;
    } | null;
    public_id: string;
}

export type TicketMessage = {
  id: string;
  created_at: string;
  ticket_id: string;
  message: string;
  is_private: boolean;
  from_client: boolean;
  author_name: string;
}