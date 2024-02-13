import { pumaAPI } from "@/src/lib/axios";
import { ApiResponse } from "@/src/types/common";
import { TicketMessage } from "@/src/types/ticket";

export async function GET(
  request: Request,
  { params }: { params: { ticketId: string } }
) {
  const ticketId = params.ticketId;

  // get ticket messages
  const { data } = await pumaAPI.post<ApiResponse<TicketMessage>>(`/ticket/${ticketId}/messages`, {
    page: 1,
    limit: 100,
  });

  return Response.json(data.data);
}

type RequestBody = {
  message: string;
  name: string;
}

export async function POST(
  request: Request,
  { params }: { params: { ticketId: string } }
) {
  const ticketId = params.ticketId;

  const body = await request.json() as RequestBody;

  await pumaAPI.post<ApiResponse<TicketMessage>>("ticket/message", {
    message: body.message,
    ticket_public_id: ticketId,
    from_client: true,
    author_name: body.name,
  })

  return Response.json({ success: true });
}