"use server";
import { base_url } from "@/lib/utils";
export const getAllListings = async () => {
    const res = await fetch(`${base_url}/listing`, {
        cache: "no-cache",
        next: { revalidate: 0 }
    });
    console.log("res", res);
    return res.json();
};