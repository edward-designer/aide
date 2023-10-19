import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

import robotPic from "./ai.jpeg";
import previewPic from "@/public/dashboard-preview.jpg";
import uploadPic from "@/public/file-upload-preview.jpg";

import LottieAnimation from "@/components/others/LottieAnimation";
import signUp from "@/public/signup.json";
import upload from "@/public/upload.json";
import ask from "@/public/ask.json";

export default function Home() {
  return (
    <>
      <div
        aria-hidden={true}
        className="fixed opacity-50 inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-200 via-violet-600 to-sky-900 pointer-events-none mix-blend-color-burn"
      />
      <div aria-hidden={true} className="shadow-inner-xl fixed inset-0" />
      <MaxWidthWrapper className="mb-md pt-xl sm:mt-lg flex-centered flex-col text-center">
        <div className="mx-auto px-lg mb-4 flex-centered max-w-fit space-x-sm overflow-hidden rounded-full border border-primary/10 py-sm shadow-md backdrop-blur">
          <p className="text-sm font-semibold text-primary">
            AIDe AI Document Chat is now public!
          </p>
        </div>
        <h1 className="mt-lg max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Chat with your <span className="text-accent/100">documents</span> via
          AI for FREE.
        </h1>
        <p className="mt-lg max-w-prose text-text-primary sm:text-lg">
          AIDe is your 24/7 personal assistant, allowing you to chat with any
          documents using latest AI technology. Simply upload your file and
          start asking questions right away!
        </p>
        <div className="group">
          <Link
            className={buttonVariants({
              size: "lg",
              className:
                "scale-150 z-10 !rounded-full mt-xl !transition-all hover:shadow-md overflow-hidden",
            })}
            href="/dashboard"
            target="_blank"
          >
            <div className="absolute inset-0 w-0 bg-accent/100 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
            <span className="z-10 flex-centered flex-row">
              Free Trial <ArrowRight className="ml-4 h-lg w-lg" />
            </span>
          </Link>
          <Image
            src={robotPic}
            alt="robot"
            aria-hidden="true"
            className="-z-10 shadow-lg pointer-events-none absolute right-0 h-[100vh] w-auto object-cover mix-blend-multiply opacity-50 bottom-0 brightness-150 blur-md group-hover:blur-none transition-all"
          />
        </div>
        <Image
          src={previewPic}
          alt="preview of the app"
          className="mt-36 lg:mt-48 border lg:border-[20px] border-primary/10 rounded-xl shadow-inner backdrop-blur-md"
        />
        <div className="mt-96 mx-auto my-lg max-w-5xl sm:mt-xl">
          <div className="mb-md px-md lg:px-lg">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="mt-sm font-bold text-4xl text-primary/90 sm:text-5xl">
                Start chatting in minutes
              </h2>
              <p className="mt-lg max-w-prose text-text-primary sm:text-lg">
                With AIDe, chatting to your source files has never been easier.
              </p>
            </div>
          </div>
        </div>

        <ol className="my-4 space-y-4 md:flex md:space-x-12 md:space-y-0">
          <li className="md:flex-1">
            <LottieAnimation>{signUp}</LottieAnimation>
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-blue-600">Step 1</span>
              <span className="text-xl font-semibold">
                Sign up for an account
              </span>
              <span className="mt-2 text-zinc-700">
                Either starting out with a free plan or choose our{" "}
                <Link
                  href="/pricing"
                  className="text-blue-700 underline underline-offset-2"
                >
                  pro plan
                </Link>
                .
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <LottieAnimation>{upload}</LottieAnimation>
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-blue-600">Step 2</span>
              <span className="text-xl font-semibold">
                Upload your PDF file
              </span>
              <span className="mt-2 text-zinc-700">
                We&apos;ll process your file and make it ready for you to chat
                with.
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <LottieAnimation>{ask}</LottieAnimation>
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-blue-600">Step 3</span>
              <span className="text-xl font-semibold">
                Start asking questions
              </span>
              <span className="mt-2 text-zinc-700">
                It&apos;s that simple. Try out Quill today - it really takes
                less than a minute.
              </span>
            </div>
          </li>
        </ol>

        <Image
          src={uploadPic}
          alt="uploading preview"
          className="mt-lg border lg:border-[20px] border-primary/10 rounded-xl shadow-inner backdrop-blur-md"
        />
      </MaxWidthWrapper>

      <div
        className="isolate absolute inset-0 pointer-events-none transform-gpu -z-10 blur-3xl overflow-hidden backdrop-brightness-150 opacity-60"
        aria-hidden={true}
      >
        <div className="mix-blend-multiply animate-background-morph relative h-[75%] left-[calc(50%-11rem)] sm:left-[calc(50%-30rem)] sm:w-[78.125rem] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-purple-400/40 via-white/50 to-blue-600/40"></div>
        <div className="animate-background-morph relative h-[50%] sm:w-[78.125rem] aspect-[1155/678] w-[36.125rem] translate-x-1/2 -rotate-[30deg] bg-gradient-to-tr from-yellow-200/75 to-white/70"></div>
      </div>
    </>
  );
}
