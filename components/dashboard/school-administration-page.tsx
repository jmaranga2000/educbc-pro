"use client";

import { useEffect, useMemo, useState } from "react";
import { Building2, Pencil, Phone, Save, School, Users, X, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type SchoolAdministrationDetails = {
  schoolName: string;
  motto: string;
  summary: string;
  county: string;
  subCounty: string;
  postalAddress: string;
  numberOfStreams: string;
  streamSummary: string;
  principalName: string;
  deputyPrincipals: string;
  headBoy: string;
  headGirl: string;
  phone: string;
  email: string;
  website: string;
  emergencyContact: string;
};

const storageKey = "educbc.schoolAdministrationDetails";

const defaultDetails: SchoolAdministrationDetails = {
  schoolName: "EduCBC Demonstration School",
  motto: "Learning for life",
  summary:
    "A complete school administration profile for leadership, school identity, contacts, stream setup, and day-to-day management details.",
  county: "Nairobi",
  subCounty: "Westlands",
  postalAddress: "P.O. Box 1024-00100, Nairobi",
  numberOfStreams: "18",
  streamSummary: "Grade 1 to Grade 9 with two streams per grade",
  principalName: "Mrs. Grace Wanjiku",
  deputyPrincipals: "Mr. Daniel Otieno, Ms. Faith Achieng",
  headBoy: "Brian Mwangi",
  headGirl: "Amina Njeri",
  phone: "+254 700 000 000",
  email: "office@educbc.school",
  website: "www.educbc.school",
  emergencyContact: "+254 711 000 000"
};

export function SchoolAdministrationPage() {
  const [details, setDetails] = useState<SchoolAdministrationDetails>(defaultDetails);
  const [draft, setDraft] = useState<SchoolAdministrationDetails>(defaultDetails);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedDetails = window.localStorage.getItem(storageKey);

    if (!savedDetails) {
      return;
    }

    try {
      const parsedDetails = JSON.parse(savedDetails) as Partial<SchoolAdministrationDetails>;
      const nextDetails = { ...defaultDetails, ...parsedDetails };
      setDetails(nextDetails);
      setDraft(nextDetails);
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, []);

  const deputyCount = useMemo(
    () => details.deputyPrincipals.split(",").map((name) => name.trim()).filter(Boolean).length,
    [details.deputyPrincipals]
  );

  function updateField(field: keyof SchoolAdministrationDetails, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
    setSaved(false);
  }

  function startEditing() {
    setDraft(details);
    setEditing(true);
    setSaved(false);
  }

  function cancelEditing() {
    setDraft(details);
    setEditing(false);
    setSaved(false);
  }

  function saveDetails() {
    setDetails(draft);
    window.localStorage.setItem(storageKey, JSON.stringify(draft));
    setEditing(false);
    setSaved(true);
  }

  const current = editing ? draft : details;

  return (
    <div className="space-y-5">
      <section className="rounded border border-border bg-white p-5 shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Badge>School Administration</Badge>
            <h1 className="mt-3 text-3xl font-bold tracking-normal">{current.schoolName}</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{current.summary}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {editing ? (
              <>
                <Button type="button" variant="ghost" onClick={cancelEditing}>
                  <X className="h-4 w-4" aria-hidden="true" />
                  Cancel
                </Button>
                <Button type="button" onClick={saveDetails}>
                  <Save className="h-4 w-4" aria-hidden="true" />
                  Save Details
                </Button>
              </>
            ) : (
              <Button type="button" onClick={startEditing}>
                <Pencil className="h-4 w-4" aria-hidden="true" />
                Edit Details
              </Button>
            )}
          </div>
        </div>
        {saved ? <p className="mt-3 text-sm font-semibold text-green-700">School administration details saved.</p> : null}
      </section>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <SummaryTile icon={School} label="School" value={details.schoolName} />
        <SummaryTile icon={Building2} label="Streams" value={details.numberOfStreams} />
        <SummaryTile icon={Users} label="Deputy Principals" value={`${deputyCount}`} />
        <SummaryTile icon={Phone} label="Main Contact" value={details.phone} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>School Summary</CardTitle>
            <p className="text-sm text-muted-foreground">Common identity and setup details for this school.</p>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <EditableField label="School Name" value={current.schoolName} editing={editing} onChange={(value) => updateField("schoolName", value)} />
            <EditableField label="Motto" value={current.motto} editing={editing} onChange={(value) => updateField("motto", value)} />
            <EditableField label="County" value={current.county} editing={editing} onChange={(value) => updateField("county", value)} />
            <EditableField label="Sub County" value={current.subCounty} editing={editing} onChange={(value) => updateField("subCounty", value)} />
            <EditableField
              className="md:col-span-2"
              label="Postal Address"
              value={current.postalAddress}
              editing={editing}
              onChange={(value) => updateField("postalAddress", value)}
            />
            <EditableTextArea
              className="md:col-span-2"
              label="Summary"
              value={current.summary}
              editing={editing}
              onChange={(value) => updateField("summary", value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Streams</CardTitle>
            <p className="text-sm text-muted-foreground">School stream count and distribution summary.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <EditableField
              label="Number of Streams"
              type="number"
              value={current.numberOfStreams}
              editing={editing}
              onChange={(value) => updateField("numberOfStreams", value)}
            />
            <EditableTextArea
              label="Stream Summary"
              value={current.streamSummary}
              editing={editing}
              onChange={(value) => updateField("streamSummary", value)}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Leadership</CardTitle>
            <p className="text-sm text-muted-foreground">Principal, deputy principals, and learner leadership.</p>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <EditableField label="Principal Name" value={current.principalName} editing={editing} onChange={(value) => updateField("principalName", value)} />
            <EditableField label="Deputy Principals" value={current.deputyPrincipals} editing={editing} onChange={(value) => updateField("deputyPrincipals", value)} />
            <EditableField label="Head Boy" value={current.headBoy} editing={editing} onChange={(value) => updateField("headBoy", value)} />
            <EditableField label="Head Girl" value={current.headGirl} editing={editing} onChange={(value) => updateField("headGirl", value)} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contacts</CardTitle>
            <p className="text-sm text-muted-foreground">Official school communication channels.</p>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <EditableField label="Phone" value={current.phone} editing={editing} onChange={(value) => updateField("phone", value)} />
            <EditableField label="Emergency Contact" value={current.emergencyContact} editing={editing} onChange={(value) => updateField("emergencyContact", value)} />
            <EditableField label="Email" type="email" value={current.email} editing={editing} onChange={(value) => updateField("email", value)} />
            <EditableField label="Website" value={current.website} editing={editing} onChange={(value) => updateField("website", value)} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SummaryTile({
  icon: Icon,
  label,
  value
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded border border-border bg-white p-4 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
      </div>
      <p className="mt-2 break-words text-xl font-bold">{value}</p>
    </div>
  );
}

function EditableField({
  label,
  value,
  editing,
  type = "text",
  className = "",
  onChange
}: {
  label: string;
  value: string;
  editing: boolean;
  type?: string;
  className?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className={`block space-y-2 ${className}`}>
      <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</span>
      {editing ? (
        <Input type={type} value={value} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <span className="block min-h-10 rounded border border-border bg-background px-3 py-2 text-sm font-semibold">{value}</span>
      )}
    </label>
  );
}

function EditableTextArea({
  label,
  value,
  editing,
  className = "",
  onChange
}: {
  label: string;
  value: string;
  editing: boolean;
  className?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className={`block space-y-2 ${className}`}>
      <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</span>
      {editing ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-28 w-full rounded-md border border-border bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        />
      ) : (
        <span className="block min-h-28 rounded border border-border bg-background px-3 py-2 text-sm leading-6">{value}</span>
      )}
    </label>
  );
}
