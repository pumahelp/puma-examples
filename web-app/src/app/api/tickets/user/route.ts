import { pumaAPI } from "@/src/lib/axios";
import { ApiResponse } from "@/src/types/common";
import { Ticket } from "@/src/types/ticket";

type RequestBody = {
  email: string;
}

export async function POST(request: Request) {
  const body = await request.json() as RequestBody;

  const clientEmail = body.email;

  const { data: ticketResponse } = await pumaAPI.post<ApiResponse<Ticket[]>>("/tickets/pagination", {
    page: 1,
    limit: 100,
    client_email: clientEmail
  });

  return Response.json(ticketResponse.data ?? []);
}