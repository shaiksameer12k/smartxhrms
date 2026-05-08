smart-x/
│
├── src/
│   ├── config/
│   │   ├── db.js                  # DB connection (your pool)
│   │   └── env.js                 # validate & export env variables
│   │
│   ├── modules/                   # feature-based structure
│   │   ├── admin/
│   │   │   ├── admin.routes.js    # GET /admin, POST /admin ...
│   │   │   ├── admin.controller.js# req, res logic only
│   │   │   ├── admin.service.js   # business logic
│   │   │   ├── admin.queries.js   # all SQL queries
│   │   │   └── admin.validation.js# input validation
│   │   │
│   │   ├── auth/
│   │   │   ├── auth.routes.js
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   └── auth.validation.js
│   │   │
│   │   └── menu/
│   │       ├── menu.routes.js
│   │       ├── menu.controller.js
│   │       ├── menu.service.js
│   │       └── menu.queries.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js     # JWT verify
│   │   ├── error.middleware.js    # global error handler
│   │   └── validate.middleware.js # request validation
│   │
│   ├── utils/
│   │   ├── response.js            # standard API response helper
│   │   ├── logger.js              # winston logger
│   │   └── asyncHandler.js        # wrap async routes
│   │
│   └── app.js                     # express app setup
│
├── migrations/                    # SQL migration files
│   ├── 001_create_admins.sql
│   ├── 002_create_menu.sql
│   └── 003_create_orders.sql
│
├── .env                           # secrets (never commit)
├── .env.example                   # template (commit this)
├── .gitignore
├── package.json
└── server.js                      # entry point