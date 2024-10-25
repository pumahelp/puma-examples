import { pumaAPI } from "@/src/lib/axios";
import { ApiResponse } from "@/src/types/common";
import { Ticket } from "@/src/types/ticket";

type RequestBody = {
  name: string;
  email: string;
  subject: string;
  description: string;
}

export async function POST(request: Request) {
  const body = await request.json() as RequestBody;

  // create client
  try {
    await pumaAPI.post("/client", {
      name: body.name,
      email: body.email
    })
  } catch {
    console.log("Client already exists");
  }

  // create ticket
  const { data: ticketResponse } = await pumaAPI.post<ApiResponse<Ticket>>("/ticket", {
    client_email: body.email,
    tags: ["example"],
    subject: body.subject,
    comment: {
      content: body.description,
      author_name: body.name,
      from_client: true
    }
  });

  const ticket = ticketResponse.data;

  return Response.json(ticket);
}