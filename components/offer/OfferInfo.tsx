import { Offer } from "@/types/offer";
import Rating from "@mui/material/Rating";
import { MapPin } from "lucide-react";

interface Props {
  offer: Offer;
}

export default function OfferInfo({ offer }: Props) {
  return (
    <>
      <h1 className="text-lg xs:text-3xl md:text-3xl font-bold text-gray-900 leading-tight mb-1">
        {offer.title}
      </h1>

      <section className="flex flex-col gap-2 mb-4">
        <div className="hidden lg:flex items-center">
          <Rating
            name="readonly"
            className="ml-[-3px]"
            size="medium"
            precision={0.1}
            value={offer.avgRating}
            readOnly
            sx={{
              "& .MuiRating-icon": {
                marginRight: "-3px",
              },
              "& .MuiRating-iconFilled": {
                color: "#FFC000",
              },
              "& .MuiRating-iconEmpty": {
                color: "#ccc",
              },
            }}
          />
          <span className="text-muted/70 text-sm md:text-base ml-2 font-medium">
            ({offer.reviewCount}+ reviews)
          </span>
        </div>

        <div className="flex items-center text-muted/70 text-xs md:text-base gap-1">
          <MapPin size={18} className="text-primary" /> {offer.location}
        </div>

        <div className="flex justify-between items-center lg:hidden">
          <div className="lg:hidden flex items-center">
            <Rating
              name="readonly"
              className="ml-[-3px]"
              size="small"
              precision={0.1}
              value={offer.avgRating}
              readOnly
              sx={{
                "& .MuiRating-icon": {
                  marginRight: "-3px",
                },
                "& .MuiRating-iconFilled": {
                  color: "#FFC000",
                },
                "& .MuiRating-iconEmpty": {
                  color: "#ccc",
                },
              }}
            />
            <span className="text-muted/70 text-xs md:text-sm ml-2 font-medium">
              ({offer.reviewCount}+ reviews)
            </span>
          </div>
          <div className=" lg:hidden inline-block bg-[#EA4B481A] text-primary text-sm font-medium font-baloo px-3 py-1 md:px-4 md:py-2 rounded-md">
            {offer.value}
          </div>
        </div>
      </section>
      <span className="border-b border-muted/20 w-full mb-4" />

      <section className="text-base leading-relaxed text-gray-600 mb-2">
        <h3 className="text-gray-900 mb-2 text-xs md:text-sm lg:text-base font-bold">Details</h3>
        <p className="mb-2 text-justify text-muted text-xs md:text-sm lg:text-base">
          {offer.description}
        </p>

        <div className=" hidden lg:inline-block bg-[#EA4B481A] text-primary text-base font-semibold px-6 py-2 rounded-full mb-4 mt-1">
          {offer.value}
        </div>
      </section>
    </>
  );
}
