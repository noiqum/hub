import { getAllListings } from "@/actions/listingAction";
import Hero from "@/components/Hero/Hero";
import PropertyCard from "@/components/ui/PropertyCard/PropertyCard";



export default async function Home() {
  const listings = await getAllListings().then((res) => res.data);
  return (
    <div >
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start bg-primary-white ">
        <Hero />
        {listings.map((listing: any) => (
          <PropertyCard key={listing.id} property={listing} />
        ))}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
