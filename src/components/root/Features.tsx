import Image from "next/image"

import ImgFilenamesSelect from "@/assets/images/app_filenames_select.png"
import ImgRenameOptions from "@/assets/images/app_options.png"
import ImgExampleOutput from "@/assets/images/app_example_output.png"
import ImgStatusReport from "@/assets/images/app_status_report.png"

interface FeatureTitlePropsType {
  children: string
}

function FeatureTitle({ children }: FeatureTitlePropsType) {
  return (
    <h1 className="mt-10 text-3xl font-semibold text-neutral-800 sm:mt-14 sm:text-4xl md:mt-0">{children}</h1>
  )
}

interface FeatureDescriptionPropsType {
  children: string
}

function FeatureDescription({ children }: FeatureDescriptionPropsType) {
  return <p className="mt-2 text-neutral-600 sm:mt-4 sm:mt-6 sm:text-xl lg:mt-8">{children}</p>
}

interface FeatureContainerPropsType {
  children: React.ReactElement[] | React.ReactElement
  first?: boolean
  reverse?: boolean
}

function FeatureContainer({ children, first = false, reverse = false }: FeatureContainerPropsType) {
  return (
    <div
      className={`${first ? "mt-28 sm:mt-40" : "mt-28 sm:mt-52"} flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} md:items-center md:justify-between`}>
      {children}
    </div>
  )
}

export default function Features() {
  return (
    <div className="mt-14 flex w-full flex-col sm:mt-24">
      {/* Color Transition In */}
      <div className="h-40 bg-gradient-to-b from-white to-primary-50" />
      {/* Features */}
      <div
        id="features"
        className="flex scroll-mt-32 flex-col items-center bg-primary-50 px-7 pb-20 sm:pb-40">
        <div className="sm:max-w-screen-xl">
          {/* Heading */}
          <h1 className="text-3xl font-semibold text-neutral-800 sm:max-w-2xl sm:text-4xl">
            <span className="font-bold text-accent-500">The ultimate tool</span> to enhance your photo
            organization.
          </h1>
          {/* Files Select */}
          <FeatureContainer first>
            <Image
              src={ImgFilenamesSelect}
              alt="app_filenames_select"
              className="select-none rounded-[4.5px] shadow-apple md:max-w-sm lg:max-w-xl"
            />
            <div className="flex flex-col md:ml-14 md:max-w-lg lg:ml-24">
              <FeatureTitle>Select unlimited files</FeatureTitle>
              <FeatureDescription>
                Rename multiple files at once with no limits. Easily organize your entire photo collection in
                just a few clicks.
              </FeatureDescription>
            </div>
          </FeatureContainer>
          {/* Rename Options */}
          <FeatureContainer reverse>
            <div className="flex justify-center">
              <Image
                src={ImgRenameOptions}
                alt="app_options"
                className="w-72 select-none rounded-lg shadow-apple md:min-w-[290px] lg:mr-20 lg:min-w-fit"
              />
            </div>
            <div className="flex flex-col md:mr-14 md:max-w-lg lg:mr-24">
              <FeatureTitle>Flexible file naming</FeatureTitle>
              <FeatureDescription>
                Customize filenames to your needs. Choose the year and time format and add custom text to
                recognize photos even better.
              </FeatureDescription>
            </div>
          </FeatureContainer>
          {/* Example Output */}
          <FeatureContainer>
            <div className="flex justify-center">
              <Image
                src={ImgExampleOutput}
                alt="app_example_output"
                className="w-72 select-none rounded-lg shadow-apple md:min-w-[290px] lg:ml-20 lg:min-w-fit"
              />
            </div>
            <div className="flex flex-col md:ml-14 md:max-w-md lg:ml-24">
              <FeatureTitle>Live Preview</FeatureTitle>
              <FeatureDescription>
                See your customization in action with a real-time example. Instantly preview how your
                filenames will look before renaming your photos.
              </FeatureDescription>
            </div>
          </FeatureContainer>
          {/* Status Report */}
          <FeatureContainer reverse>
            <div className="flex justify-center">
              <Image
                src={ImgStatusReport}
                alt="app_status_report"
                className="w-80 select-none rounded-lg shadow-apple md:min-w-96 lg:mr-20"
              />
            </div>
            <div className="flex flex-col md:mr-14 md:max-w-lg lg:mr-24">
              <FeatureTitle>Status Report</FeatureTitle>
              <FeatureDescription>
                Get a detailed status report after every renaming process, showing the number of successful
                and failed renames.
              </FeatureDescription>
            </div>
          </FeatureContainer>
        </div>
      </div>
      {/* Color Transition Out */}
      <div className="h-40 bg-gradient-to-t from-white to-primary-50" />
    </div>
  )
}
