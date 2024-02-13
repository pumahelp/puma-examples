import { pumaAPI } from "@/src/lib/axios";
import { ApiResponse } from "@/src/types/common";
import { Ticket, TicketMessage } from "@/src/types/ticket";

type RequestBody = {
  name: string;
  email: string;
  subject: string;
  description: string;
}

export async function POST(request: Request) {
  const body = await request.json() as RequestBody;

  // create ticket
  const { data: ticketResponse } = await pumaAPI.post<ApiResponse<Ticket>>("/ticket", {
    client_email: body.email,
    tags: [],
    subject: body.subject
  });

  const ticket = ticketResponse.data;

  // create client
  await pumaAPI.post("/client", {
    name: body.name,
    email: body.email
  })

  // create first client message
  await pumaAPI.post<ApiResponse<TicketMessage>>("/ticket/message", {
    message: body.description,
    ticket_public_id: ticket.public_id,
    from_client: true,
    author_name: body.name,
  })

  return Response.json(ticket);
}