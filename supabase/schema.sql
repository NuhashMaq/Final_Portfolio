-- Supabase schema for ClickUpProject
-- Run this in Supabase SQL Editor.

-- Projects
create table if not exists public.projects (
  id bigserial primary key,
  title text not null unique,
  description text not null,
  image text,
  link text,
  technologies jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Skills
create table if not exists public.skills (
  id bigserial primary key,
  category text not null,
  name text not null,
  level text not null default 'Intermediate'
);

-- Contacts (messages)
create table if not exists public.contacts (
  id bigserial primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- Auto-update updated_at on projects
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_projects_updated_at on public.projects;
create trigger trg_projects_updated_at
before update on public.projects
for each row
execute function public.set_updated_at();
