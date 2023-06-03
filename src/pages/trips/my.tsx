/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
//pages/trips/[id].tsx

import { type Hastag, type Photo, type User, Trip } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import HeaderLayout from "~/layouts/Header";

const getTrips = async (id: string) => {
  const response = await fetch(`/api/user/trips/${id}`);
  const trip = await response.json();
  console.log(trip);
  return trip as Array<
    Trip & {
      photos: Photo[];
      hashtags: Hastag[];
      user: User;
    }
  >;
};

const Trip: NextPage = () => {
  const { data: sessionData } = useSession();

  const { data: trips, isLoading } = useQuery(
    ["user", "trips", sessionData?.user.id as string],
    () => getTrips(sessionData?.user.id as string),
    {
      enabled: !!sessionData?.user.id,
    }
  );

  return (
    <HeaderLayout>
      <div className="mx-auto min-h-[calc(100vh_-_var(--navigation-height))] w-full max-w-fit bg-white  px-12 pt-[var(--navigation-height)]">
        <div className="flex flex-col">
          {isLoading && <div>Loading...</div>}
          <div className="grid grid-cols-12 flex-col  gap-10 divide-y">
            {trips &&
              trips.map((trip, index) => (
                <div
                  key={trip.id}
                  className={classNames(
                    "card",
                    index % 3 === 0 && "col-start-1 col-end-4",
                    index % 3 === 1 && "col-start-4 col-end-10",
                    index % 3 === 2 && "col-start-10 col-end-13"
                  )}
                >
                  <article className="flex flex-col gap-2">
                    <img src={trip.photos[0]?.url} />
                    <div className="p-2">
                      <Link href={`/trips/${trip.id}`}>
                        <h2 className="my-2 text-2xl font-bold">
                          {trip.title}
                        </h2>
                      </Link>
                      <p className="truncate">{trip.description}</p>
                      <span className="text-xl text-gray-300">
                        {trip.hashtags.map((hashtag) => (
                          <span key={hashtag.id}>#{hashtag.name} </span>
                        ))}
                      </span>
                    </div>
                  </article>
                </div>
              ))}
          </div>
        </div>
      </div>
    </HeaderLayout>
  );
};

export default Trip;
