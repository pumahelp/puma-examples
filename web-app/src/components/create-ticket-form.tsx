"use client";

import { useState } from "react";
import { api } from "@/src/lib/axios";
import { FormEvent } from "react";
import { Ticket } from "../types/ticket";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "./ui/button";
import { UserDetails } from "../app/page";

type CreateTicketForm = {
  onCreateTicket: (ticket: Ticket) => void;
  userDetails: UserDetails | null;
};

export const EMAIL_LOCAL_STORAGE_KEY = "example:clientDetails";

export const CreateTicketForm = ({ userDetails, onCreateTicket }: CreateTicketForm) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    try {
      if (isLoading) return;

      event.preventDefault();

      setIsLoading(true);

      const values = Object.fromEntries(
        new FormData(event.target as HTMLFormElement)
      );

      const { data: ticket } = await api.post<Ticket>("/tickets", values);

      if (!ticket?.id) {
        alert("Ocorreu um erro ao criar o ticket, tente novamente.");
        return;
      }

      localStorage.setItem(EMAIL_LOCAL_STORAGE_KEY, JSON.stringify({ name: values.name, email: values.email }));

      onCreateTicket(ticket);
    } catch {
      alert("Ocorreu um erro ao criar o ticket, tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h3 className="text-xl font-medium text-center my-4">
        Olá, inicie um novo ticket de suporte preenchendo o formulário abaixo.
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <Input name="name" label="Nome" required defaultValue={userDetails?.name} />
        <Input name="email" label="E-mail" type="email" required defaultValue={userDetails?.email} />
      </div>
      <Input name="subject" label="Assunto" required />
      <Textarea name="description" label="Descrição" required />
      <Button disabled={isLoading}>Criar Ticket</Button>
    </form>
  );
};
