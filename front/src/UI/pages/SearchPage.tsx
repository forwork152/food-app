import SearchRestaurants from "./SearchRestaurants";
import { Badge } from "@/components/ui/badge";
import { BikeIcon, Clock, Globe, MapPin, Filter, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link, useParams } from "react-router-dom";
import FilterPage from "./FilterPage";
import SearchStore from "@/store/SearchStore";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ResturentT } from "@/types/RestaurentTypes";
import CardSkeleton from "./utils/CardsSkeleton";
import NoResultsFound from "./utils/NotFoundResult";
import { useState } from "react";

// import { useParams } from "react-router-dom"

const SearchPage = () => {
  const { S_restaurants, loading } = SearchStore();
  const { text } = useParams();
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="max-w-7xl mx-auto min-h-screen py-4 md:py-10 px-4">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <Button
          onClick={() => setShowFilter(!showFilter)}
          variant="outline"
          className="flex items-center gap-2">
          {showFilter ? <X size={16} /> : <Filter size={16} />}
          {showFilter ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-start items-start gap-5">
        {/* Filter Sidebar */}
        <div
          className={`${
            showFilter ? "block" : "hidden"
          } md:block transition-all duration-300 ease-in-out w-full md:w-auto`}>
          <FilterPage />
        </div>

        <div className="w-full flex-1">
          {/* Search Bar */}
          <div className="mb-4">
            <SearchRestaurants />
          </div>

          {/* Results Header */}
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6">
            {S_restaurants?.length} Restaurants found
          </h1>

          {/* Restaurant Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {loading ? (
              <CardSkeleton />
            ) : !loading && S_restaurants?.length === 0 ? (
              <NoResultsFound searchTxt={text} />
            ) : (
              S_restaurants?.map((restaurant: ResturentT) => (
                <Card
                  key={restaurant._id}
                  className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 w-full">
                  <div className="relative">
                    <AspectRatio ratio={16 / 9}>
                      <img
                        src={restaurant.imageFile}
                        alt={restaurant.resturentName}
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                    <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-90 rounded-lg px-2 md:px-3 py-1">
                      <span className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">
                        Featured
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-3 md:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100 line-clamp-1">
                        {restaurant.resturentName}
                      </h1>
                      <div className="flex gap-4 sm:flex-col sm:gap-1">
                        <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
                          <Clock size={12} className="md:w-4 md:h-4" />
                          <span className="text-xs md:text-sm font-medium">
                            {restaurant.deliveryTime} mins
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                          <BikeIcon size={12} className="md:w-4 md:h-4" />
                          <span className="text-xs md:text-sm font-medium">
                            Rs. {restaurant.deliveryPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <MapPin size={14} />
                        <p className="text-xs md:text-sm">
                          <span className="font-medium">{restaurant.city}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <Globe size={14} />
                        <p className="text-xs md:text-sm">
                          <span className="font-medium">
                            {restaurant.country}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1 md:gap-2 mt-3 flex-wrap">
                      {restaurant.cusines
                        .slice(0, 3)
                        .map((cuisine: string, idx: number) => (
                          <Badge
                            key={idx}
                            className="font-medium px-2 py-1 text-xs dark:bg-gray-800 dark:border-gray-700 border-gray-200 dark:text-gray-100 rounded-full shadow-sm bg-pink-200">
                            {cuisine}
                          </Badge>
                        ))}
                      {restaurant.cusines.length > 3 && (
                        <Badge className="font-medium px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded-full">
                          +{restaurant.cusines.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="p-3 md:p-4 border-t dark:border-t-gray-700 border-t-gray-100">
                    <Link
                      to={`/resturent-menu/${restaurant._id}`}
                      className="w-full">
                      <Button className="w-full bg-pink-600 hover:bg-pink-500 font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200">
                        View Menus
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
