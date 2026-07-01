import {
  pgTable,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  decimal,
  real,
} from "drizzle-orm/pg-core";

import { uuid } from "drizzle-orm/pg-core";

/* =======================
   HOTELS TABLE
======================= */
export const hotels = pgTable("hotels", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", { length: 255 }).notNull(),
  image: text("image").notNull(),

  rating: real("rating").default(0),
  reviews: integer("reviews").default(0),

  price: varchar("price", { length: 50 }),
  location: varchar("location", { length: 255 }),

  category: varchar("category", { length: 100 }),
  tags: text("tags").array(),

  featured: boolean("featured").default(false),
  description: text("description"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

/* =======================
   RESTAURANTS TABLE
======================= */
export const restaurants = pgTable("restaurants", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", { length: 255 }).notNull(),
  image: text("image").notNull(),

  rating: real("rating").default(0),
  reviews: integer("reviews").default(0),

  price: varchar("price", { length: 50 }),
  location: varchar("location", { length: 255 }),

  category: varchar("category", { length: 100 }),
  tags: text("tags").array(),

  featured: boolean("featured").default(false),
  description: text("description"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

/* =======================
   CAFES TABLE
======================= */
export const cafes = pgTable("cafes", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", { length: 255 }).notNull(),
  image: text("image").notNull(),

  rating: real("rating").default(0),
  reviews: integer("reviews").default(0),

  price: varchar("price", { length: 50 }),
  location: varchar("location", { length: 255 }),

  category: varchar("category", { length: 100 }),
  tags: text("tags").array(),

  featured: boolean("featured").default(false),
  description: text("description"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

/* =======================
   ATTRACTIONS TABLE
======================= */
export const attractions = pgTable("attractions", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", { length: 255 }).notNull(),
  image: text("image").notNull(),

  rating: real("rating").default(0),
  reviews: integer("reviews").default(0),

  price: varchar("price", { length: 50 }),
  location: varchar("location", { length: 255 }),

  category: varchar("category", { length: 100 }),
  tags: text("tags").array(),

  featured: boolean("featured").default(false),
  description: text("description"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", { length: 255 }).notNull(),
  image: text("image").notNull(),

  date: varchar("date", { length: 100 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),

  category: varchar("category", { length: 100 }),
  price: varchar("price", { length: 50 }),

  rating: real("rating").default(0),
  reviews: integer("reviews").default(0),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const transport = pgTable("transport", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", { length: 255 }).notNull(),
  image: text("image").notNull(),

  rating: real("rating").default(0),
  reviews: integer("reviews").default(0),

  price: varchar("price", { length: 50 }),
  location: varchar("location", { length: 255 }),

  category: varchar("category", { length: 100 }),

  tags: text("tags").array(),

  featured: boolean("featured").default(false),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const destinations = pgTable("destinations", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", { length: 255 }).notNull(),
  tagline: varchar("tagline", { length: 255 }).notNull(),
  image: text("image").notNull(),

  places: integer("places").default(0),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const testimonials = pgTable("testimonials", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", { length: 255 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),

  avatar: text("avatar").notNull(),

  text: text("text").notNull(),

  rating: integer("rating").default(5),

  trip: varchar("trip", { length: 255 }),

  createdAt: timestamp("created_at").defaultNow(),
});
