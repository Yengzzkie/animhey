
"use client";

import { Banner } from "flowbite-react";
import { HiX } from "react-icons/hi";
import { MdAnnouncement } from "react-icons/md";

export function InfoBanner() {
  return (
    <Banner className="my-2">
      <div className="flex w-full justify-between border-b border-gray-200 bg-gray-700 p-4 dark:border-gray-600 dark:bg-gray-700">
        <div className="mx-auto flex items-center">
          <p className="flex items-center text-sm font-normal text-white dark:text-gray-400">
            <MdAnnouncement className="mr-4 h-4 w-4" />
            <span className="[&_p]:inline">
              App version (Android) for the AnimHey! is now available for download&nbsp;
              <a
                href="https://download2264.mediafire.com/7km5joiav5ogaXf1ZfQuvNkpSEG08ak637rE7fkY0xs-rTIP4GC0_NNp3ygHGq_fm4ESTQMO4A3CEljyTX4ktiIE34prbeMQEkqWr32Ztr1ZDVrADYGlkb446lJips0euH77lvobptZRai08OjCNtit2HaxLfmqVI-nDs_fijw/5sjyxq8dsibxfqm/animhey.apk"
                className="inline font-medium text-yellow-300 underline decoration-solid underline-offset-2 hover:no-underline dark:text-yellow-500"
              >
                here
              </a>
            </span>
          </p>
        </div>
        <Banner.CollapseButton color="gray" className="border-0 bg-transparent text-gray-500 dark:text-gray-400">
          <HiX className="h-4 w-4" />
        </Banner.CollapseButton>
      </div>
    </Banner>
  );
}
