type Page =
  | "home"
  | "explore"
  | "map"
  | "trips"
  | "entity"
  | "business"
  | "government"
  | "auth"
  | "profile"
  | "events"
  | "transport";
type ExploreTab =
  | "hotels"
  | "restaurants"
  | "cafes"
  | "attractions"
  | "events"
  | "transport";
type ViewMode = "grid" | "list" | "map";

interface Place {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  price: string;
  location: string;
  category: string;
  tags: string[];
  featured?: boolean;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};
