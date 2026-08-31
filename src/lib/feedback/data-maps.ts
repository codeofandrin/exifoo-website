export const USAGE_FREQUENCY_OPTIONS = [
  { value: "daily", label: "Daily" },
  { value: "several_times_week", label: "Several times a week" },
  { value: "once_week", label: "About once a week" },
  { value: "few_times_month", label: "A few times a month" },
  { value: "less_often", label: "Less often" }
]

export const PRO_FEATURES_OPTIONS = [
  { value: "bulk_rename_folders", label: "Bulk renaming of entire folders" },
  { value: "save_rename_options", label: "Support for saving the current rename options" },
  { value: "watch_folder", label: "Watch folder (automatically renames new files)" },
  {
    value: "folder_organisation",
    label: 'Automated folder organisation (e.g. "Photos/2026/August") based on EXIF date'
  },
  {
    value: "finder_quick_action",
    label: "Finder Quick Action extension (rename directly in finder with right-click)"
  },
  { value: "timezone_adjustment", label: "Support for time zone adjustment" },
  { value: "gps_location", label: "Option to add GPS location to the file name" },
  {
    value: "camera_info",
    label: "Option to add camera information (brand, model, lens, etc.) to the file name"
  },
  { value: "more_file_formats", label: "More file formats (enter below)" },
  { value: "other", label: "Other" }
]

export const FAIR_PRICE_OPTIONS = [
  { value: "5_one_time", label: "$5" },
  { value: "10_one_time", label: "$10" },
  { value: "15_one_time", label: "$15" },
  { value: "20_one_time", label: "$20" },
  { value: "30_one_time", label: "$30" },
  { value: "no_pay", label: "I wouldn't pay for a Pro version" }
]

export const TESTIMONIAL_CONSENT_OPTIONS = [
  { value: "yes_name", label: "Yes, with my name" },
  { value: "yes_anon", label: "Yes, but anonymously" },
  { value: "no", label: "No" }
]

// Order must match TESTIMONIAL_CONSENT_OPTIONS so slice colors and legend rows line up
export const TESTIMONIAL_CONSENT_COLORS: Record<string, string> = {
  yes_name: "var(--chart-positive-1)",
  yes_anon: "var(--chart-positive-2)",
  no: "var(--chart-negative)"
}
