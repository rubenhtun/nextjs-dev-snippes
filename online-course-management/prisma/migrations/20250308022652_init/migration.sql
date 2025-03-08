-- CreateTable
CREATE TABLE "Courses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER DEFAULT 0,
    "isPublished" BOOLEAN DEFAULT false,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseCategories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CourseCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseCategoriesCourses" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "courseCategoryId" INTEGER NOT NULL,

    CONSTRAINT "CourseCategoriesCourses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseResources" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER DEFAULT 0,
    "isAvailable" BOOLEAN DEFAULT true,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "CourseResources_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CourseCategoriesCourses" ADD CONSTRAINT "CourseCategoriesCourses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseCategoriesCourses" ADD CONSTRAINT "CourseCategoriesCourses_courseCategoryId_fkey" FOREIGN KEY ("courseCategoryId") REFERENCES "CourseCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseResources" ADD CONSTRAINT "CourseResources_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
