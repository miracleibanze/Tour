export const EntitySkeleton = () => {
  return (
    <div className="min-h-screen bg-foreground pb-24">
      {/* Hero gallery */}
      <div className="h-80 md:h-96 bg-linear-to-r from-secondary/30 via-secondary/10 to-secondary/30 shimmer overflow-hidden max-w-7xl mx-auto rounded-b-4xl" />

      <div className="max-w-5xl mx-auto px-4 -mt-12 relative z-10">
        {/* Header card */}
        <div className="bg-canva rounded-2xl border border-secondary/20 shadow-lg h-36 mb-6" />
        {/* Tabs */}
        <hr className="text-secondary/30 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-canva rounded-2xl border border-secondary/20 h-28" />
            {/* Amenities */}
            <div className="bg-canva rounded-2xl border border-secondary/20 h-28" />
            {/* Opening hours */}
            <div className="bg-canva rounded-2xl border border-secondary/20 h-28" />
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Quick stats */}
            <div className="bg-canva rounded-2xl border border-secondary/20 h-32" />
            {/* Contact */}
            <div className="bg-canva rounded-2xl border border-secondary/20 h-32" />
            {/* Nearby */}
            <div className="bg-canva rounded-2xl border border-secondary/20 h-32" />
          </div>
        </div>
      </div>
    </div>
  );
};
