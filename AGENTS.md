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
- Budget requests insert directly from the browser into an RLS-enabled submissions table (anon insert-only policy, rate-limit trigger, Discord notification trigger via pg_net); this works on static hosts like Vercel and visitors cannot read leads.
- Shared portfolio motion is progressively enhanced by a SiteShell-scoped browser hook and CSS; native observers, passive frame-scheduled scroll updates and reduced-motion cleanup keep SSR content readable and interaction lightweight.
- Commercial terms and WhatsApp URL generation live in one browser-safe module shared by pricing sections and contact links, so displayed fees and destinations stay consistent and testable.
