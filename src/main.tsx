/* eslint-disable react-refresh/only-export-components */
import { StrictMode, Suspense, use } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
} from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
    loader: homeLoader,
  },
]);

function homeLoader() {
  // simulate a slow action
  return {
    data: new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve('Hello, world!');
      }, 1000);
    }),
  };
}
function Home() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Unwrap />
    </Suspense>
  );
}

function Unwrap() {
  const message = use(useLoaderData<typeof homeLoader>().data);
  return <p>{message}</p>;
}

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
