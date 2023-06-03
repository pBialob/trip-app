/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type NextPage } from "next";
import { useForm } from "react-hook-form";
import HeaderLayout from "~/layouts/Header";
import "@uploadthing/react/styles.css";
import { useState } from "react";
import { useUploadThing } from "~/utils/uploadthing";
import { useSession } from "next-auth/react";

const uploadThings = async (
  files: File[] | null,
  startUpload: (files: File[]) => Promise<
    | {
        fileUrl: string;
        fileKey: string;
      }[]
    | undefined
  >
) => {
  return (await startUpload(files!!)) as unknown as {
    fileKey: string;
    fileUrl: string;
  }[];
};

type Trip = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  files: Array<string>;
  hashtags: string;
};

const NewTrip: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const [files, setFiles] = useState<File[] | null>();
  const { startUpload } = useUploadThing({
    endpoint: "imageUploader",
  });
  const { data: sessionData } = useSession();

  const onSubmit = async (inputTrip: Trip) => {
    const uploadedFiles = await uploadThings(files!!, startUpload);

    const trip = {
      ...inputTrip,
      startDate: new Date(inputTrip.startDate).toISOString(),
      endDate: new Date(inputTrip.endDate).toISOString(),
      files: uploadedFiles.map((file) => file.fileUrl),
      hashtags: inputTrip.hashtags.split(";"), // Corrected from "hastags" to "hashtags"
      userId: sessionData?.user?.id,
    };

    const response = await fetch("/api/trips/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trip),
    });
    if (!response.ok) {
      alert("Error creating trip");
      return;
    }
    alert("Trip created!");
  };

  return (
    <HeaderLayout>
      <div className="mx-auto w-1/2 pt-[8rem]">
        <h1 className="text-5xl font-bold">New Trip</h1>
        <form onSubmit={handleSubmit((data: any) => onSubmit(data as Trip))}>
          <div className="mt-10 flex flex-col items-start justify-center gap-5">
            <label className="text-3xl">Title</label>
            <input
              {...register("title")}
              className="border-base-border h-12 w-full rounded-lg border bg-transparent px-3 text-2xl outline-none  hover:border-black focus:border-black"
            />
            <label className="text-3xl">Description</label>
            <textarea
              {...register("description")}
              className="border-base-border h-48 w-full rounded-lg border bg-transparent px-3 text-2xl outline-none hover:border-black focus:border-black "
            />
            <label className="text-3xl">Start Date</label>
            <input
              type="datetime-local"
              {...register("startDate")}
              className="border-base-border h-12 w-full rounded-lg border bg-transparent px-3 text-2xl outline-none hover:border-black focus:border-black"
            />
            <label className="text-3xl">End Date</label>
            <input
              type="datetime-local"
              {...register("endDate")}
              className="border-base-border h-12 w-full rounded-lg border bg-transparent px-3 text-2xl outline-none hover:border-black focus:border-black"
            />
            <label className="text-3xl">Location</label>
            <input
              {...register("location")}
              className="border-base-border h-12 w-full rounded-lg border bg-transparent px-3 text-2xl outline-none hover:border-black focus:border-black"
            />
            <label className="text-3xl">Hashtags (comma-separated)</label>
            <input
              {...register("hashtags")}
              className="border-base-border h-12 w-full rounded-lg border bg-transparent px-3 text-2xl outline-none hover:border-black focus:border-black"
            />
            <label className="text-3xl">Photos</label>

            <div className="flex w-full items-center justify-center">
              <label className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed ">
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg
                    aria-hidden="true"
                    className="mb-3 h-10 w-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    href="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 4MB)
                  </p>
                  <p className="flex">
                    {files?.map((file) => (
                      <p key={file.name}>`{file.name}`,</p>
                    ))}{" "}
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  multiple
                  onChange={(event) => {
                    setFiles(
                      !!event.target.files
                        ? Array.from(event.target.files)
                        : null
                    );
                  }}
                />
              </label>
            </div>
            <button
              type="submit"
              className="bg-neutral  text-neutral-content focus:bg-neutral-focus delay-50 border-base-border focus:border-neutral-focus focus:text-neutral-focus relative h-16 w-full rounded-lg  border bg-inherit px-6 text-center align-middle text-2xl text-[#181A2A] transition duration-300  hover:opacity-80 focus:bg-transparent focus:opacity-100"
            >
              Create Trip
            </button>
          </div>
        </form>
      </div>
    </HeaderLayout>
  );
};

export default NewTrip;
