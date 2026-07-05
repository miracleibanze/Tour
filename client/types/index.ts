type Page =
  | "/"
  | "/explore"
  | "/map"
  | "/trips"
  | "/entity"
  | "/business"
  | "/government"
  | "/auth"
  | "/profile"
  | "/events"
  | "/transport";
type ExploreTab =
  | "all"
  | "hotels"
  | "restaurants"
  | "cafes"
  | "attractions"
  | "events"
  | "transport";
type ViewMode = "grid" | "list" | "map";

type Workinghours = { day: string; hours: string }[];
type PerformanceCount = {
  views: string;
  bookmarks: number;
  likes: number;
  popularity: string;
};
type Contacts = {
  phone: string;
  email: string;
  website: string;
};

type NearByPlaces = {
  id: string;
  name: string;
  image: string;
  location: string;
}[];

type RatingBreakDown = {
  Location: number;
  Cleanliness: number;
  Service: number;
  Value: number;
};
type WrittenReview = {
  name: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  details: RatingBreakDown;
};

interface DetailedPlace {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  price: string;
  location: string;
  category: string;
  tags?: string[];
  date?: Date;
  featured?: boolean;
  workingHours?: Workinghours;
  imageCollection?: string[];
  performance?: PerformanceCount;
  description?: string;
  writtenReviews: WrittenReview[];
  ratingBreakDown?: RatingBreakDown;
  createdAt?: string;
  updatedAt?: string;
  contact?: Contacts;
}

interface Place {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  price: string;
  location: string;
  category: string;
  tags?: string[];
  date?: Date;
  featured?: boolean;
}

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

type GroupedPlaces = {
  hotels: Place[];
  restaurants: Place[];
  cafes: Place[];
  attractions: Place[];
  events: Place[];
  transport: Place[];
};
