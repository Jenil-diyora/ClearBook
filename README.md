# 💼 ClearBook — Premium .NET 8 + React Billing & Invoicing System

ClearBook is a modern, responsive, and secure full-stack billing and invoice management system built on a **.NET 8 Web API** backend and a **React 16 (Redux Toolkit + Axios)** SPA frontend. It features a curated light design system with Slate accents, vector icons, secure JWT authentication, and automatic EF Core database migrations.

---

## ✨ Key Features

- **🔒 Secure Authentication:** JWT Bearer authentication with automatic token resolution, token storage persistence, and secure auto-logout when session keys expire.
- **📊 Business Dashboard:** High-level metrics tracking total invoices, total contacts, paid invoices, and draft/pending statuses at a glance.
- **🧾 Invoice Management:** Create, view, edit, print, and delete invoices with multiple repeatable line items, custom tax structures (GST/VAT), and notes.
- **👥 Contact Directory:** Manage clients and business entities with dynamic favs, filtering, search, and edit options.
- **🎨 Premium Slate UI:** Fully custom light design system styled using CSS variables (no Bootstrap grid dependencies) with responsive layouts, smooth micro-animations, and clean vector icons.
- **⚡ Auto-Migrating DB:** Integrated Entity Framework Core database setup that automatically executes migrations and seeds mock records on first startup.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | ASP.NET Core 8 Web API, EF Core 8, ASP.NET Identity |
| **Database** | Microsoft SQL Server (supported out-of-the-box) / SQLite |
| **Frontend** | React 16, Redux Toolkit, Axios, React Router v5 |
| **Icons** | React Icons (`FaFileInvoiceDollar`, `MdDashboard`, `FaUsers`, etc.) |
| **Theme** | Custom Slate Light Theme System |

---

## 🚀 Getting Started

### Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/) + npm

### Local Setup & Execution
1. Clone this repository:
   ```bash
   git clone https://github.com/Jenil-diyora/ClearBook.git
   cd ClearBook
   ```

2. Configuration:
   Open `src/Billing.WebApp/appsettings.json` and configure your database connection string and security key:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost;Database=ClearBookDb;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True;"
     },
     "SecurityKey": "your_super_long_secret_key_at_least_64_characters_for_jwt_signature"
   }
   ```

3. Run the application:
   ```bash
   # Run from the root directory
   dotnet run --project src/Billing.WebApp
   ```
   The backend server and frontend development proxy will start up simultaneously.
   - **Frontend/Backend Address:** `https://localhost:5001` or `http://localhost:5000`

---

## 🔑 Default Seed Credentials

On its initial run, the application auto-migrates the database and creates seeded users for evaluation:

| Role | Email | Password |
|---|---|---|
| **Administrator** | `admin@example.com` | `password1` |
| **Viewer** | `viewer@example.com` | `password1` |

---

## 📁 Repository Structure

```
ClearBook/
├── src/
│   ├── Billing.WebApp/         # ASP.NET Core Web API Application
│   │   ├── Controllers/        # Account, Invoice, Contact, and Tax endpoints
│   │   ├── Data/               # DB Context, Repositories, and JSON Seed data
│   │   ├── DTOs/               # Data Transfer Objects
│   │   ├── Entities/           # Domain/Identity Models (User, Contact, Invoice, etc.)
│   │   ├── Services/           # JWT Token generation logic
│   │   ├── Settings/           # Dependency Injection setups
│   │   ├── Program.cs          # Pipeline configuration & startup
│   │   └── ClientApp/          # React SPA frontend
│   │       ├── public/         # HTML template & icons
│   │       └── src/            # Components, pages, Redux slices, and CSS
│   └── Billing.UnitTests/      # Backend Unit Tests
```

---

## 🔌 API Endpoints

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| **POST** | `/api/account/login` | No | Authenticate user & receive JWT token |
| **POST** | `/api/account/register`| No | Register a new client account |
| **GET** | `/api/contacts` | ✅ JWT | Retrieve all client contacts |
| **POST** | `/api/contacts` | ✅ JWT | Create a new contact card |
| **PUT** | `/api/contacts/{id}` | ✅ JWT | Update contact details |
| **DELETE**| `/api/contacts/{id}` | ✅ JWT | Delete a contact card |
| **GET** | `/api/invoices` | ✅ JWT | Retrieve all invoices |
| **POST** | `/api/invoices` | ✅ JWT | Create/Publish a new invoice |
| **PUT** | `/api/invoices/{id}` | ✅ JWT | Update existing invoice |
| **DELETE**| `/api/invoices/{id}` | ✅ JWT | Delete an invoice |

---

## 📦 Build for Production

To package this application for hosting:

```bash
# 1. Compile the production React build
cd src/Billing.WebApp/ClientApp
npm run build

# 2. Publish the .NET application
cd ../../..
dotnet publish src/Billing.WebApp -c Release -o ./publish
```
The `./publish` folder will contain the bundled assets and binary executable ready for deployment.

---

## 📄 License
This project is licensed under the MIT License.
