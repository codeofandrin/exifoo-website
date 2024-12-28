import Image from "next/image"

import ImgFilenamesSelect from "@/assets/images/app_filenames_select.png"
import ImgRenameOptions from "@/assets/images/app_options.png"
import ImgExampleOutput from "@/assets/images/app_example_output.png"
import ImgStatusReport from "@/assets/images/app_status_report.png"

interface FeatureTitlePropsType {
  children: string
}

function FeatureTitle({ children }: FeatureTitlePropsType) {
  return <h1 className="mt-10 text-3xl font-semibold text-neutral-800">{children}</h1>
}

interface FeatureDescriptionPropsType {
  children: string
}

function FeatureDescription({ children }: FeatureDescriptionPropsType) {
  return <p className="mt-2 text-neutral-600">{children}</p>
}

interface FeatureContainerPropsType {
  children: React.ReactElement[] | React.ReactElement
}

function FeatureContainer({ children }: FeatureContainerPropsType) {
  return <div className="mt-28 flex flex-col">{children}</div>
}

export default function Features() {
  return (
    <div className="mt-14 flex flex-col">
      {/* Color Transition In */}
      <div className="h-40 bg-gradient-to-b from-white to-primary-50" />
      {/* Features */}
      <div id="features" className="scroll-mt-20 bg-primary-50 px-7 pb-20">
        {/* Heading */}
        <h1 className="text-3xl font-semibold text-neutral-800">
          <span className="font-bold text-accent-500">The ultimate tool</span> to enhance your photo
          organization.
        </h1>
        {/* Files Select */}
        <FeatureContainer>
          <Image
            src={ImgFilenamesSelect}
            alt="app_filenames_select"
            className="rounded-[4.5px] shadow-apple"
          />
          <FeatureTitle>Select unlimited files</FeatureTitle>
          <FeatureDescription>
            Rename multiple files at once with no limits. Easily organize your entire photo collection in just
            a few clicks.
          </FeatureDescription>
        </FeatureContainer>
        {/* Rename Options */}
        <FeatureContainer>
          <div className="flex justify-center">
            <Image src={ImgRenameOptions} alt="app_options" className="w-72 rounded-lg shadow-apple" />
          </div>
          <FeatureTitle>Flexible file naming</FeatureTitle>
          <FeatureDescription>
            Customize filenames to your needs. Choose the year and time format and add custom text to
            recognize photos even better.
          </FeatureDescription>
        </FeatureContainer>
        {/* Example Output */}
        <FeatureContainer>
          <div className="flex justify-center">
            <Image src={ImgExampleOutput} alt="app_example_output" className="w-72 rounded-lg shadow-apple" />
          </div>
          <FeatureTitle>Live Preview</FeatureTitle>
          <FeatureDescription>
            See your customization in action with a real-time example. Instantly preview how your filenames
            will look before renaming your photos.
          </FeatureDescription>
        </FeatureContainer>
        {/* Status Report */}
        <FeatureContainer>
          <div className="flex justify-center">
            <Image src={ImgStatusReport} alt="app_status_report" className="w-80 rounded-lg shadow-apple" />
          </div>
          <FeatureTitle>Status Report</FeatureTitle>
          <FeatureDescription>
            Get a detailed status report after every renaming process, showing the number of successful and
            failed renames.
          </FeatureDescription>
        </FeatureContainer>
      </div>
      {/* Color Transition Out */}
      <div className="h-40 bg-gradient-to-t from-white to-primary-50" />
    </div>
  )
}
