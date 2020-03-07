import express, { json } from "express";
import users from "./routes/users";
import restrictedRoutes from "./routes/restrictedRoutes";
import session from "express-session";
import knexSection from "connect-session-knex";
import knex from "../database/dbConfig";

const KnexSection = knexSection(session);

const app = express();

//MiddleWare
app.use(json());
app.use(
  session({
    secret: "keyboard cat",
    saveUninitialized: true,
    resave: false,
    store: new KnexSection({
      knex,
      createtable: true,
      tablename: "sessions"
    }),
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 100000000
    }
  })
);
// Routes
app.use("/api", users);
app.use('/api/restricted',restrictedRoutes)

export default app;
