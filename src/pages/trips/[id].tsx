/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
//pages/trips/[id].tsx

import { Hastag, Photo, User, Trip } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import HeaderLayout from "~/layouts/Header";

const getTrip = async (id: string) => {
  const response = await fetch(`/api/trips/${id}`);
  const trip = await response.json();
  console.log(trip);
  return trip as Trip & {
    photos: Photo[];
    hashtags: Hastag[];
    user: User;
  };
};

const Trip: NextPage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const { data: trip, isLoading } = useQuery(
    ["trip", id as string],
    () => getTrip(id as string),
    {
      enabled: !!id,
    }
  );

  return (
    <HeaderLayout>
      <div className="mx-auto min-h-[calc(100vh_-_var(--navigation-height))] w-full max-w-fit bg-white  px-12 pt-[var(--navigation-height)]">
        <div className="flex flex-col">
          {isLoading && <div>Loading...</div>}
          {trip && (
            <div key={trip.id} className="">
              <article className="flex flex-col items-center gap-2">
                <img src={trip.photos[0]?.url} className=" max-w-7xl" />
                <div className="p-2">
                  <h2 className="my-2 text-2xl font-bold">{trip.title}</h2>
                  <p>{trip.description}</p>
                  <span className="text-xl text-gray-300">
                    {trip.hashtags.map((hashtag) => (
                      <span key={hashtag.id}>#{hashtag.name} </span>
                    ))}
                  </span>
                </div>
              </article>
            </div>
          )}
        </div>
      </div>
    </HeaderLayout>
  );
};

export default Trip;
