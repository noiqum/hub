import { Button } from "../Button/button";
import { Card, CardContent, CardFooter } from "../card";
import { MapPin, Bed, Bath, ArrowRight } from "lucide-react";
interface PropertyCardProps {
    property: {
        id: string;
        title: string;
        image: string;
        location: string;
        sqft: number;
        beds: number;
        baths: number;
        priceChange: string;
        price: number;
    };
}

const PropertyCard = ({ property }: PropertyCardProps) => {



    return (<Card key={property.id} className="overflow-hidden">
        <div className="aspect-[4/3] relative">
            <img
                src={property.image}
                alt={property.title}
                className="object-cover w-full h-full"
            />
            <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                {property.priceChange}
            </div>
        </div>
        <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
            <div className="flex items-center text-gray-500 mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                {property.location}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.sqft} sq. ft.
                </div>
                <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    {property.beds} Bed
                </div>
                <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    {property.baths} Bath
                </div>
            </div>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex items-center justify-between">
            <div className="text-xl font-bold text-green-600">
                ${property.price.toLocaleString()}
            </div>
            <Button variant="outline">
                Invest now
                <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </CardFooter>
    </Card>
    )

}

export default PropertyCard