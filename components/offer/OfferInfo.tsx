import { Offer } from "@/types/offer";
import Rating from "@mui/material/Rating";
import { MapPin } from "lucide-react";

interface Props {
  offer: Offer;
}

export default function OfferInfo({ offer }: Props) {
  return (
    <>
      <h1 className="text-lg xs:text-xl lg:text-2xl font-bold text-gray-900 leading-tight mb-1">
        {offer.title}
      </h1>

      <section className="flex flex-col gap-2 mb-4">
        <div className="hidden xs:flex items-center">
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
          <span className="text-muted/70 text-xs lg:text-sm ml-2 font-medium">
            ({offer.reviewCount}+ reviews)
          </span>
        </div>

        <div className="flex items-center text-muted/70 text-xs lg:text-sm gap-1">
          <MapPin size={18} className="text-primary" /> {offer.location}
        </div>

        <div className="flex justify-between items-center xs:hidden">
          <div className="xs:hidden flex items-center">
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
            <span className="text-muted/70 text-xs ml-2 font-medium">
              ({offer.reviewCount}+ reviews)
            </span>
          </div>
          <div className=" xs:hidden inline-block bg-[#EA4B481A] text-primary text-sm font-medium font-baloo px-3 py-1 rounded-md">
            {offer.value}
          </div>
        </div>
      </section>
      <span className="border-b border-muted/20 w-full mb-2" />

      <section className="text-base leading-relaxed text-gray-600 mb-2">
        <h3 className="text-gray-900 mb-2 text-xs md:text-sm lg:text-base font-bold">Details</h3>
        <p className="mb-2 text-justify text-muted text-xs lg:text-base">
          {offer.description}
        </p>

        <div className=" hidden xs:inline-block bg-[#EA4B481A] text-primary text-xs lg:text-base font-semibold px-6 py-2 rounded-full mb-1 lg:mb-2 mt-1">
          {offer.value}
        </div>
      </section>
    </>
  );
}
