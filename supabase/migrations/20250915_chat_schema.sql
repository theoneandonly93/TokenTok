-- Users table (optional, for reference)
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  username text unique,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Conversations table
create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc', now())
);

-- Conversation participants (many-to-many)
create table if not exists conversation_participants (
  conversation_id uuid references conversations(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  primary key (conversation_id, user_id)
);

-- Messages table
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations(id) on delete cascade,
  sender_id uuid references users(id) on delete set null,
  content text not null,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Index for fast message lookup
create index if not exists idx_messages_conversation_id on messages(conversation_id);
