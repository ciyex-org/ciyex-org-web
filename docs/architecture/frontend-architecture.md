# Frontend Architecture

Deep dive into the Next.js Frontend application.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **State**: React Query (Server state), Zustand (Client state)
- **Forms**: React Hook Form + Zod

## Project Structure

### App Router
We use the App Router for nested layouts and Server Components.

- `app/layout.tsx`: Root layout (Providers, Fonts).
- `app/(dashboard)/layout.tsx`: Sidebar/Header for authenticated users.
- `app/(auth)/layout.tsx`: Clean layout for login pages.

### Server vs. Client Components
- **Server Components**: Used for fetching data (SEO, Performance).
- **Client Components**: Used for interactivity (Forms, Buttons).

## Key Patterns

### Data Fetching
We use **TanStack Query** (React Query) for client-side fetching and caching.

```typescript
const { data, isLoading } = useQuery({
  queryKey: ['patients', id],
  queryFn: () => api.getPatient(id)
});
```

### Authentication
- **Session**: Managed via `next-auth` or custom `useAuth` hook wrapping access tokens.
- **Middleware**: `middleware.ts` protects routes (redirects to /login if no token).

### UI Component Library
Built on **Radix UI** primitives styled with Tailwind (Shadcn UI).
Encapsulated in `components/ui/`.

### Form Handling
```typescript
const form = useForm<PatientSchema>({
  resolver: zodResolver(patientSchema)
});
```
