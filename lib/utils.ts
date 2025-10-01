import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { createClient } from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const client = createClient({
    apiVersion: "v2022-03-07",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,  // you can find this in sanity.json in your studio project
    dataset: "production", // or the name you chose in step 1
    useCdn: false, 
})

const builder = imageUrlBuilder(client)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlFor = (source: any) => {
    return builder.image(source)
}