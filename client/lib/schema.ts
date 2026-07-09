import {
  pgTable,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  decimal,
  real,
  jsonb,
} from "drizzle-orm/pg-core";

import { uuid } from "drizzle-orm/pg-core";

export const hotels = pgTable("hotels", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", { length: 255 }).notNull(),
  image: text("image").notNull(),

  imageCollection: text("image_collection").array(),

  rating: real("rating").default(0),
  reviews: integer("reviews").default(0),

  price: varchar("price", { length: 50 }),
  location: varchar("location", { length: 255 }),
  category: varchar("category", { length: 100 }),

  tags: text("tags").array(),

  featured: boolean("featured").default(false),

  description: text("description"),

  performance: text("performance"), // JSON string

  writtenReviews: jsonb("written_reviews").$type<WrittenReview[]>().default([]),
  contact: jsonb("contact").$type<Contacts>(),
  workingHours: jsonb("working_hours").$type<Workinghours>().default([]),
  // Add these to both tables
  latitude: real("latitude"),
  longitude: real("longitude"),

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

  imageCollection: text("image_collection").array(),

  rating: real("rating").default(0),
  reviews: integer("reviews").default(0),

  price: varchar("price", { length: 50 }),
  location: varchar("location", { length: 255 }),
  category: varchar("category", { length: 100 }),

  tags: text("tags").array(),

  featured: boolean("featured").default(false),

  description: text("description"),

  performance: text("performance"), // JSON string

  writtenReviews: jsonb("written_reviews").$type<WrittenReview[]>().default([]),
  contact: jsonb("contact").$type<Contacts>(),
  workingHours: jsonb("working_hours").$type<Workinghours>().default([]),
  // Add these to both tables
  latitude: real("latitude"),
  longitude: real("longitude"),

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

  imageCollection: text("image_collection").array(),

  rating: real("rating").default(0),
  reviews: integer("reviews").default(0),

  price: varchar("price", { length: 50 }),
  location: varchar("location", { length: 255 }),
  category: varchar("category", { length: 100 }),

  tags: text("tags").array(),

  featured: boolean("featured").default(false),

  description: text("description"),

  performance: text("performance"), // JSON string

  writtenReviews: jsonb("written_reviews").$type<WrittenReview[]>().default([]),
  contact: jsonb("contact").$type<Contacts>(),
  workingHours: jsonb("working_hours").$type<Workinghours>().default([]),
  // Add these to both tables
  latitude: real("latitude"),
  longitude: real("longitude"),

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

  imageCollection: text("image_collection").array(),

  rating: real("rating").default(0),
  reviews: integer("reviews").default(0),

  price: varchar("price", { length: 50 }),
  location: varchar("location", { length: 255 }),
  category: varchar("category", { length: 100 }),

  tags: text("tags").array(),

  featured: boolean("featured").default(false),

  description: text("description"),

  performance: text("performance"), // JSON string

  writtenReviews: jsonb("written_reviews").$type<WrittenReview[]>().default([]),
  contact: jsonb("contact").$type<Contacts>(),
  workingHours: jsonb("working_hours").$type<Workinghours>().default([]),
  // Add these to both tables
  latitude: real("latitude"),
  longitude: real("longitude"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", { length: 255 }).notNull(),
  image: text("image").notNull(),

  imageCollection: text("image_collection").array(),

  rating: real("rating").default(0),
  reviews: integer("reviews").default(0),

  featured: boolean("featured").default(false),
  price: varchar("price", { length: 50 }),

  location: varchar("location", { length: 255 }),

  category: varchar("category", { length: 100 }),

  date: varchar("date", { length: 100 }).notNull(),
  tags: text("tags").array(),

  description: text("description"),

  performance: text("performance"), // JSON string

  writtenReviews: jsonb("written_reviews").$type<WrittenReview[]>().default([]),
  workingHours: jsonb("working_hours").$type<Workinghours>().default([]),
  contact: jsonb("contact").$type<Contacts>(),
  // Add these to both tables
  latitude: real("latitude"),
  longitude: real("longitude"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const transport = pgTable("transport", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", { length: 255 }).notNull(),
  image: text("image").notNull(),

  imageCollection: text("image_collection").array(),

  rating: real("rating").default(0),
  reviews: integer("reviews").default(0),

  price: varchar("price", { length: 50 }),
  location: varchar("location", { length: 255 }),
  category: varchar("category", { length: 100 }),

  tags: text("tags").array(),

  featured: boolean("featured").default(false),

  description: text("description"),

  performance: text("performance"), // JSON string

  writtenReviews: jsonb("written_reviews").$type<WrittenReview[]>().default([]),
  contact: jsonb("contact").$type<Contacts>(),
  workingHours: jsonb("working_hours").$type<Workinghours>().default([]),
  // Add these to both tables
  latitude: real("latitude"),
  longitude: real("longitude"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const destinations = pgTable("destinations", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", { length: 255 }).notNull(),
  tagline: varchar("tagline", { length: 255 }).notNull(),
  image: text("image").notNull(),

  location: varchar("location", { length: 255 }).default("Kigali"),
  places: integer("places").default(0),
  // Add these to both tables
  latitude: real("latitude"),
  longitude: real("longitude"),

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
  // Add these to both tables
  latitude: real("latitude"),
  longitude: real("longitude"),

  createdAt: timestamp("created_at").defaultNow(),
});
