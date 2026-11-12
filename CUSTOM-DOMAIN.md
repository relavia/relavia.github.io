# Switching this site to relavia.org (after the domain is registered)

Prerequisite: `relavia.org` has been registered (registrar of the
founder's choice; WHOIS privacy on, auto-renew on). Until then the site
lives at <https://relavia.github.io/> and nothing below should be done.

GitHub Pages serves this repository as the organization site of
`relavia`. Pointing the custom domain at it is a DNS + one-file change;
no server is involved and hosting stays free.

## 1. DNS records (at the registrar / DNS provider)

Apex domain `relavia.org` — add four A records (GitHub Pages anycast):

| Type | Host | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

Subdomain `www` — add one CNAME record:

| Type | Host | Value |
| --- | --- | --- |
| CNAME | `www` | `relavia.github.io` |

Remove any conflicting A/AAAA/CNAME records for `@` and `www` left over
from registrar parking pages. DNS propagation can take from a few
minutes up to a few hours.

## 2. Repository change

Add a file named `CNAME` at the repository root containing exactly one
line:

```
relavia.org
```

Commit and push to `main`. (Equivalent: repository Settings → Pages →
Custom domain → enter `relavia.org` and save — GitHub creates the same
`CNAME` file. Doing it via the file keeps the change in git history.)

## 3. Enforce HTTPS

After the DNS records resolve and GitHub has provisioned the
certificate (Settings → Pages shows the certificate as approved; this
can take up to ~24h in the worst case, usually much less):

- Repository **Settings → Pages → Enforce HTTPS**: turn it **on**.

Until the certificate is ready, the checkbox may be unavailable — wait
and retry rather than serving the official domain over plain HTTP.

## 4. Verify

1. `https://relavia.org/` loads this site over HTTPS with a valid
   certificate.
2. `https://www.relavia.org/` loads the same site over HTTPS.
3. Plain `http://` on either host redirects to HTTPS.

## 5. Afterwards

- Update the organization profile website field and the main
  repository's links from `relavia.github.io` to `relavia.org`.
- Optionally set up email forwarding for the domain (e.g. Cloudflare
  Email Routing) so `contact@` / `security@` addresses can replace the
  temporary contact placeholders in the main repository.
