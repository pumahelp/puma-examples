"use client";

import { useState, useEffect, useCallback } from "react";
import { CreateTicketForm, EMAIL_LOCAL_STORAGE_KEY } from "../components/create-ticket-form";
import { Ticket } from "../types/ticket";
import { CurrentTicket } from "../components/current-ticket";
import { api } from "../lib/axios";
import { formatDate } from "../utils/format";
import { Spinner } from "../components/ui/spinner";

export type UserDetails = {
  name: string;
  email: string;
};

const TICKET_LOCAL_STORAGE_KEY = "example:currentTicket";

export default function Home() {
  const [currentTicket, setCurrentTicket] = useState<Ticket | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [userTickets, setUserTickets] = useState<Ticket[]>([]);
  const [isFetchingUserTickets, setIsFetchingUserTickets] = useState(false);

  useEffect(() => {
    const storedTicket = localStorage.getItem(TICKET_LOCAL_STORAGE_KEY);
    if (!!storedTicket) setCurrentTicket(JSON.parse(storedTicket) as Ticket);

    const storedEmail = localStorage.getItem(EMAIL_LOCAL_STORAGE_KEY);
    if (!!storedEmail) setUserDetails(JSON.parse(storedEmail) as UserDetails);
  }, []);

  const handleSetCurrentTicket = (ticket: Ticket | null) => {
    if (!ticket) {
      localStorage.removeItem(TICKET_LOCAL_STORAGE_KEY);
    } else {
      localStorage.setItem(TICKET_LOCAL_STORAGE_KEY, JSON.stringify(ticket));
    }
    setCurrentTicket(ticket);
  };

  const getUserTickets = useCallback(async () => {
    try {
      setIsFetchingUserTickets(true);

      if (!userDetails) return;

      const { data } = await api.post("/tickets/user", {
        email: userDetails.email,
      });
      setUserTickets(data);
    } finally {
      setIsFetchingUserTickets(false);
    }
  }, [userDetails]);

  useEffect(() => {
    if (!!userDetails) getUserTickets();
  }, [userDetails, getUserTickets, currentTicket]);

  return (
    <main className="flex flex-col w-full">
      <header className="h-24 w-full flex items-center justify-center bg-primary px-4">
        <h1 className="font-bold text-center text-2xl sm:text-4xl">Exemplo Suporte | PumaHelp</h1>
      </header>
      <section className="w-full max-w-[800px] mx-auto px-4 mt-6">
        {currentTicket ? (
          <CurrentTicket
            ticket={currentTicket}
            onBack={() => handleSetCurrentTicket(null)}
          />
        ) : (
          <>
            <CreateTicketForm
              onCreateTicket={handleSetCurrentTicket}
              userDetails={userDetails}
            />

            {(isFetchingUserTickets && userTickets.length <= 0) && <Spinner className="mt-10" />}

            {userTickets.length > 0 && (
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-center">
                  Tickets criados por você
                </h2>
                <div className="flex flex-col gap-2 mt-6">
                  {userTickets.map((ticket) => (
                    <div key={ticket.id}>
                      <p className="text-primary hover:text-primary-400 transition-colors underline cursor-pointer w-max" onClick={() => handleSetCurrentTicket(ticket)}>{ticket.subject}</p>
                      <span className="text-sm opacity-70">
                        {formatDate(ticket.created_at)} | {ticket.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
