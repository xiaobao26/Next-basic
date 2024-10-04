# Authentication

## useSession and SessionProvider

<h1>Context Provider Pattern</h1>
<p>In Next.js, when you're using useSession from the next-auth/react package, you also need to wrap your application (or a part of it) with the SessionProvider component to make the session data accessible throughout the component tree.</p>
<p>SessionProvider allows useSession to access the session data from anywhere within the app.</p>
<p>Without SessionProvider, useSession won't know where to get the session data from, because React uses the context API to pass data dow n the component tree.</p>

<h1>Session Management</h1>
<p>SessionProvider ensures that session information is fetched and updated correctly across your app. It handles the state of the session (whether a user is logged in or out) and passes it down to the components that call useSession.</p>

<h1>Performance Optimization</h1>
<p>The provider ensures session state is consistent and can also reduce redundant requests to the backend for fetching the session data. Without this, each component using useSession would have to handle session fetching individually.</p>


<h1>Code example</h1>
```
"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const Providers = (props: Props) => {
    return <SessionProvider>{props.children}</SessionProvider>
}

export default Providers;
```

<h3>Then, in any component where you want to access session data, you can use useSession</h3>
```
import { useSession } from "next-auth/react";

function MyComponent() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (!session) return <p>You are not logged in.</p>;

  return <p>Welcome, {session.user.name}!</p>;
}
```


<h1>add provider for each provider</h1>
```
 <button onClick={() => signIn('github')}>
  <button onClick={() => signIn('google')}>
```
