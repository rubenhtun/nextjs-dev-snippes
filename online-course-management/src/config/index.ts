interface Config {
  coursePlatformApiUrl: string;
}

export const config: Config = {
  coursePlatformApiUrl:
    process.env.NEXT_PUBLIC_ONLINECOURSEPLATFORM_API_URL || "",
};
