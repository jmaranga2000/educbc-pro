"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { queueNotificationAction } from "@/actions/notification.actions";
import { classParents, parentMessages } from "@/lib/class-teacher";

export function ParentNotificationsListPage() {
  return (
    <div className="space-y-5">
      <section className="rounded border border-border bg-white p-5 shadow-soft">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <Badge>Notifications</Badge>
            <h1 className="mt-3 text-3xl font-bold tracking-normal">Messages to Parents</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              Created messages for class parent communication, including SMS notices queued for Africa's Talking integration.
            </p>
          </div>
          <Link href="/dashboard/class-teacher/notifications/new" className="rounded bg-primary px-3 py-2 text-sm font-bold text-primary-foreground">
            New Message
          </Link>
        </div>
      </section>

      <div className="grid gap-3">
        {parentMessages.map((message) => (
          <div key={message.id} className="rounded border border-border bg-white p-4 shadow-soft">
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="font-bold">{message.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{message.audience}</p>
              </div>
              <Badge>{message.status}</Badge>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{message.channel} - Created {message.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CreateParentNotificationPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [recipientMode, setRecipientMode] = useState("all");
  const [queued, setQueued] = useState(false);
  const recipients = recipientMode === "all" ? classParents : classParents.slice(0, 3);

  async function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await queueNotificationAction({
      type: "CLASS_TEACHER_PARENT_SMS",
      title,
      message,
      recipientUserIds: recipients.map((parent) => parent.id)
    });
    setQueued(true);
  }

  return (
    <div className="space-y-5">
      <section className="rounded border border-border bg-white p-5 shadow-soft">
        <Badge>New SMS</Badge>
        <h1 className="mt-3 text-3xl font-bold tracking-normal">Create Parent Message</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          Compose a parent SMS notice. The form queues the message through the current notification action, ready for Africa's Talking delivery wiring.
        </p>
      </section>

      <form onSubmit={submitMessage} className="rounded border border-border bg-white p-5 shadow-soft">
        <div className="grid gap-4">
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Recipients</span>
            <select value={recipientMode} onChange={(event) => setRecipientMode(event.target.value)} className="min-h-10 w-full rounded border border-border bg-white px-3 py-2 text-sm">
              <option value="all">All parents in stream</option>
              <option value="support">Parents of support-list learners</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Title</span>
            <input value={title} onChange={(event) => setTitle(event.target.value)} className="min-h-10 w-full rounded border border-border bg-white px-3 py-2 text-sm" required />
          </label>
          <label className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Message</span>
            <textarea value={message} onChange={(event) => setMessage(event.target.value)} className="min-h-32 w-full rounded border border-border bg-white px-3 py-2 text-sm" required />
          </label>
          <Button type="submit">Queue SMS Message</Button>
        </div>
        {queued ? (
          <div className="mt-4 rounded border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            Message queued for {recipients.length} parent contacts.
          </div>
        ) : null}
      </form>
    </div>
  );
}
