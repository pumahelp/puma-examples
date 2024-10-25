import { useEffect, useState, useCallback } from "react";
import { api } from "../lib/axios";
import { Ticket, TicketMessage } from "../types/ticket";
import { Button } from "./ui/button";
import parse from "html-react-parser";
import clsx from "clsx";
import { Textarea } from "./ui/textarea";
import { formatDate } from "../utils/format";
import { Spinner } from "./ui/spinner";

type CurrentTicketProps = {
  ticket: Ticket;
  onBack: () => void;
};

export const CurrentTicket = ({ ticket, onBack }: CurrentTicketProps) => {
  const [messages, setMessages] = useState<TicketMessage[]>([]);
  const [isFetchingMessages, setIsFetchingMessages] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getTicketMessages = useCallback(async () => {
    try {
      setIsFetchingMessages(true);
      const { data: messages } = await api.get(
        `/tickets/${ticket.public_id}/messages`
      );
      setMessages(messages);
    } finally {
      setIsFetchingMessages(false);
    }
  }, [ticket]);

  useEffect(() => {
    getTicketMessages();
  }, [getTicketMessages]);

  const handleSendMessage = async (event: React.FormEvent) => {
    try {
      event.preventDefault();

      if (isLoading) return;

      setIsLoading(true);

      const values = Object.fromEntries(
        new FormData(event.target as HTMLFormElement)
      );

      const message = values.message as string;

      if (!message) return;

      // get client name from first message
      const clientName = messages?.[messages.length - 1]?.author_name ?? ticket.client?.email;

      await api.post(`/tickets/${ticket.public_id}/messages`, {
        message,
        name: clientName,
      });

      // reset form
      (event.target as HTMLFormElement).reset();

      await getTicketMessages();
    } catch {
      alert("Ocorreu um erro ao enviar a mensagem, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <header className="flex items-center justify-between">
        <Button onClick={onBack}>Voltar</Button>

        <h1 className="text-xl font-bold">{ticket.subject}</h1>
      </header>

      <div className="flex flex-col gap-4 mt-6">
        {isFetchingMessages && <Spinner />}
        {messages.map((message) => (
          <div
            key={message.id}
            className={clsx(
              "p-4 rounded-md  bg-gray-300",
              !message.from_client && "bg-primary-300"
            )}
          >
            <div className="flex items-center justify-between">
              <strong>{message.author_name}</strong>
              <span className="text-sm opacity-50">
                {formatDate(message.created_at as string)}
              </span>
            </div>
            <p>{parse(message.content)}</p>
          </div>
        ))}
      </div>

      <hr className="my-6" />

      <form onSubmit={handleSendMessage} className="flex flex-col gap-4">
        <Textarea
          name="message"
          placeholder="Mensagem"
          required
          className="min-h-[150px]"
        />
        <Button disabled={isLoading || isFetchingMessages}>Enviar</Button>
      </form>
    </section>
  );
};
