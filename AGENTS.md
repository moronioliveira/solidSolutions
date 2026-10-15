<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Shared portfolio sections and navigation live in reusable components, while each named content page has its own public TanStack route and metadata; this keeps navigation and search previews consistent.
- Budget requests use a validated public server function and a private, RLS-enabled submissions table with a database rate-limit trigger; visitors can submit but cannot access collected leads.
