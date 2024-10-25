export type TicketAssignedUser = {
  id: string;
  name: string;
  email: string;
}

export type TicketClient = {
  id: string;
  email: string | null;
  name: string;
  created_at: string;
  metadata: any;
  external_id: string | null;
}

export type Ticket = {
  id: string;
  created_at: string;
  subject: string;
  client: TicketClient | null;
  status: string;
  context: string;
  tags: string[];
  assigned_to: TicketAssignedUser | null;
  public_id: string;
  archived_at: string | null;
  metadata: any;
  external_id: string | null;
  time_to_edit_messages: number | null;
}

export type TicketMessage = {
  id: string;
  created_at: string;
  content: string;
  is_private: boolean;
  edited_at: string | null;
  external_id: string | null;
  from_client: boolean;
  author_name: string;
  metadata: any;
}