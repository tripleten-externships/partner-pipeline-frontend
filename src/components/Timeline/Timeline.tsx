import React from "react";
// import {Timeline as FlowBiteTimeLine} from 'flowbite-react';
import BreadcrumbHeader from "../BreadcrumbHeader/BreadcrumbHeader";

// interface  to place temporary data
export interface TimelineItem {
  time: string;
  imageSrc: string;
  alt: string;
  content: React.ReactNode;
}

//list of objects with temporary data
const timelineItems: TimelineItem[] = [
  {
    time: "just now",
    imageSrc:
      "https://images.unsplash.com/photo-1515096451051-3e94dfce0487?q=80&w=854&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Bonnie image",
    content: (
      <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
        Bonnie moved{" "}
        <a href="#" className="font-semibold text-blue-600 dark:text-blue-500 hover:underline">
          Jese Leos
        </a>{" "}
        to{" "}
        <span className="bg-gray-100 text-gray-800 text-xs font-normal me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-600 dark:text-gray-300">
          Funny Group
        </span>
      </div>
    ),
  },
  {
    time: "2 hours ago",
    imageSrc:
      "https://images.unsplash.com/photo-1515096451051-3e94dfce0487?q=80&w=854&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Thomas Lean image",
    content: (
      <>
        <div className="items-center justify-between mb-3 sm:flex">
          <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
            2 hours ago
          </time>
          <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
            Thomas Lean commented on{" "}
            <a href="#" className="font-semibold text-gray-900 dark:text-white hover:underline">
              Flowbite Pro
            </a>
          </div>
        </div>
        <div className="p-3 text-xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
          Hi ya'll! I wanted to share a webinar zeroheight is having regarding how to best measure
          your design system! This is the second session of our new webinar series on #DesignSystems
          discussions where we'll be speaking about Measurement.
        </div>
      </>
    ),
  },
  {
    time: "1 day ago",
    imageSrc:
      "https://images.unsplash.com/photo-1515096451051-3e94dfce0487?q=80&w=854&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Jese Leos image",
    content: (
      <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
        Jese Leos has changed{" "}
        <a href="#" className="font-semibold text-blue-600 dark:text-blue-500 hover:underline">
          Pricing page
        </a>{" "}
        task status to <span className="font-semibold text-gray-900 dark:text-white">Finished</span>
      </div>
    ),
  },
];

const Timeline: React.FC = () => {
  //the code below was provided from the flowbite website, It was tested temporarilty by importing it to the dashboard component and passing it as a child to <dashconent/>
  return (
    <div className="flex-1 p-6 overflow-y-auto bg-zinc-950">
      <BreadcrumbHeader section="Milestones" page="Timeline" />
      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {timelineItems.map((item, index) => (
          <li key={index} className={`ms-6 ${index < timelineItems.length - 1 ? "mb-10" : ""}`}>
            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
              <img className="rounded-full shadow-lg" src={item.imageSrc} alt={item.alt} />
            </span>
            <div
              className={`p-4 bg-white border border-gray-200 rounded-lg shadow-xs dark:bg-gray-700 dark:border-gray-600 ${
                typeof item.content === "object" && "sm:flex items-center justify-between"
              }`}
            >
              {typeof item.content !== "object" && (
                <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                  {item.time}
                </time>
              )}
              {item.content}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Timeline;
