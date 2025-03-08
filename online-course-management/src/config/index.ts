interface Config {
  coursePlatformApiUrl: string;
}

export const config: Config = {
  coursePlatformApiUrl:
    process.env.NEXT_PUBLIC_ONLINECOURSEMANAGEMENT_API_URL || "",
};
