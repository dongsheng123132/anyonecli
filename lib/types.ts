export interface Command {
  name: string;
  description: string;
}

export interface Contact {
  github?: string;
  x?: string;
  email?: string;
  website?: string;
}

export interface Profile {
  name: string;
  display_name: string;
  bio: string;
  skills: string[];
  commands: Command[];
  contact: Contact;
  openclaw: boolean;
  created_at: string;
}
