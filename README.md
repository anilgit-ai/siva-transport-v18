# Siva Transport — Angular School Transport Management

## Included
- Responsive dashboard
- Total students
- Total monthly fee
- Received amount
- Pending amount
- Current-month due list (next 7)
- Student directory with search/filter
- Add student
- Student details
- Payment history
- Record payment
- JSON Server backend
- Mobile-friendly navigation

## Run locally

Requirements: Node.js 20+ recommended.

```bash
npm install
npm run dev
```

Open:
- Angular: http://localhost:4200
- JSON Server: http://localhost:3000

If you prefer separate terminals:

```bash
npm run api
npm start
```

## Important production note

JSON Server is intended for development/demo use. It should not be the permanent production database for real student/payment information.

For production, keep the Angular UI and replace `StudentService` API endpoints with a real backend/database such as:
- Supabase/PostgreSQL
- Firebase
- Node/NestJS + PostgreSQL

The service is intentionally isolated so that migration is straightforward.

## Deployment

The Angular frontend can be deployed to Vercel or Netlify. For the eventual production version, deploy the API/database separately and configure an environment-based API URL rather than using `http://localhost:3000`.

## Suggested next production additions

1. Admin login/authentication
2. Parent/guardian name and WhatsApp number
3. Route/vehicle/driver management
4. Monthly invoice generation
5. Payment receipt/print
6. WhatsApp payment reminders
7. Excel/PDF export
8. Automatic monthly dues
9. Role-based access
10. PostgreSQL backup and audit history
