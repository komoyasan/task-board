-- 不動産管理アプリ用の物件テーブル
-- SupabaseダッシュボードのSQL Editorで実行してください。

-- 物件テーブル
create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  -- 登録したユーザー（ユーザー削除時は物件も削除する）
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name text not null,
  rent integer not null,
  area text not null,
  layout text not null,
  created_at timestamptz not null default now()
);

-- RLS（Row Level Security）を有効化
alter table public.properties enable row level security;

-- 自分が登録した物件のみ参照できる
create policy "Users can view own properties"
  on public.properties
  for select
  using (auth.uid() = user_id);

-- 自分のユーザーIDでのみ物件を登録できる
create policy "Users can insert own properties"
  on public.properties
  for insert
  with check (auth.uid() = user_id);

-- 自分が登録した物件のみ更新できる
create policy "Users can update own properties"
  on public.properties
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 自分が登録した物件のみ削除できる
create policy "Users can delete own properties"
  on public.properties
  for delete
  using (auth.uid() = user_id);
