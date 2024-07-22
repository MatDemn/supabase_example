# Simple READMe

## Installation 

To install the project:
`npm install`

Also, you have to install the ebsocket server in "ebhookServer" directory.
Type in `npm install` as well.

Both projects have to run simultaneously for app to function properly.

## Supabase setup
You need 1 table: 
Profile (id, display_name, created_at, updated_at)
which is updated everytime a new user is authenticated.
I used database triggers on table auth.user to create profile automatically.
All Supabase tables have RLS enabled with poilcies added.
It does not matter in this version of the app, but might be useful in the future.

## Env needed:

DATABASE_URL=<your DB url from supabase>
DIRECT_URL=<your direct url from supabase>
NEXT_PUBLIC_SUPABASE_URL=<your supabase URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your ANON KEY from supabase>
NEXT_PUBLIC_WEBSOCKET_URL="ws://localhost:3001"

This project is using websocket server, which is located in "webhookServer" directory.
You also have to install it by typing: `npm install`.





## Most important features:

- Correctly typed in letters highlighting
- Current players stats updating realtime
- Lorem Ipsum text generated (who doesn't love that?)
- ShadCN components


## Ending

This project was evolving rapidly from supabase playground to what it is right now.
At first, it as a introductory project to learn more about Supabase and the whole T3 stack.
Later on, I transformed it into this coding challenge.
I tried to use realtime from Supabase, but couldn't make it work properly. 
Websockets and youtube tutorials came to the rescue. At the end,
the whole database was not needed, but auth and profiles are still useful.
Zustand stores are a leftover solution for client side props passing.
There are a lot more to fix and improve, but overall I'm quite happy about the results.
I had a lot of fun building and dubugging it. Surely, this project will be improved in the future.
