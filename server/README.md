# PopX Server
Simple Express+Mongo API for auth and profile.

## Endpoints
- POST /api/auth/register { fullName, phone, email, password, company, isAgency }
- POST /api/auth/login { email, password }
- GET /api/auth/me (Bearer token)

Copy `.env.example` to `.env` and set values.