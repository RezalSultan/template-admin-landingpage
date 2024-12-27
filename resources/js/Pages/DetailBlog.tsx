import { Separator } from "@/Components/ui/separator";
import HomeLayout from "@/Layouts/HomeLayout";
import { AllBlogSchema } from "@/types/BlogType";
import { Head, Link } from "@inertiajs/react";
import { ChevronLeft } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

const DetailBlog = ({ blog }: { blog: AllBlogSchema }) => {
  const dateNow = new Date(blog.updated_at);
  const formattedDate = dateNow.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const convertToEmbedUrl = (url: string) => {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };
  return (
    <HomeLayout>
      <Head title={`${blog.slug}`} />
      <div className="w-full sm:px-5 xl:px-20">
        {blog.title && (
          <div className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-4 pb-2">
            <Link
              href={"/blog"}
              className="-ml-3 mr-1 flex items-center justify-center rounded-full bg-white p-3 transition-all hover:bg-accent"
            >
              <ChevronLeft className="text-foreground/75" />{" "}
              <span className="text-lg font-semibold text-foreground/75">
                Kembali
              </span>
            </Link>
            <div className="flex flex-wrap-reverse items-center justify-end gap-x-4 gap-y-4">
              <p className="whitespace-nowrap text-foreground/50">
                {blog.author || "admin"}, {formattedDate}
              </p>

              <div className="flex items-center justify-center gap-2">
                <div>logo</div>
                <div>logo</div>
              </div>
            </div>
          </div>
        )}

        <div className="text-start text-4xl font-bold xl:text-5xl">
          {blog.title}
        </div>
        <ol className="mt-2 flex h-auto w-full cursor-default items-start justify-start gap-2">
          {blog.blog_tags?.map((item, index) => (
            <li
              key={index}
              className="relative flex cursor-default items-center justify-center rounded-sm px-2.5 py-0.5 text-center text-sm font-medium text-foreground/75 odd:bg-accent even:bg-secondary md:text-base"
            >
              {item.tag.name}
            </li>
          ))}
        </ol>

        {blog.cover_image && (
          <div className="mt-4 flex w-full items-center justify-center">
            <img
              src={
                typeof blog.cover_image === "string"
                  ? `/${blog.cover_image}`
                  : URL.createObjectURL(blog.cover_image as File)
              }
              alt="Preview Cover Image"
              className="rounded-sm md:h-[calc(100vh/2)] xl:h-[calc(100vh/1.5)]"
            />
          </div>
        )}
        <p className="mt-4 indent-10 text-foreground/90">{blog.desc}</p>
        {blog.title && <Separator className="my-2" />}
        {blog.blog_sections?.map((section) => (
          <Fragment key={section.id}>
            <div className="text-start text-3xl font-bold">
              {section.sub_title}
            </div>
            {section.type_view_content === "IMAGE" ? (
              <>
                {section.url_asset && (
                  <div className="mt-4 flex w-full flex-col items-center justify-center">
                    <img
                      src={
                        typeof section.url_asset === "string"
                          ? `/${section.url_asset}`
                          : URL.createObjectURL(section.url_asset as File)
                      }
                      alt="Preview URL Asset"
                      className="rounded-sm md:h-[calc(100vh/2)] xl:h-[calc(100vh/1.5)]"
                    />
                    <div className="mt-1 text-center text-sm italic text-foreground/75">
                      {section.caption}
                    </div>
                  </div>
                )}
              </>
            ) : section.type_view_content === "IMAGE_LINK" ? (
              <>
                {section.url_asset && (
                  <div className="mt-4 flex w-full flex-col items-center justify-center">
                    <img
                      src={section.url_asset as string}
                      alt="Preview URL Asset"
                      className="rounded-sm md:h-[calc(100vh/2)] xl:h-[calc(100vh/1.5)]"
                    />
                    <div className="mt-1 text-center text-sm italic text-foreground/75">
                      {section.caption}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                {section.url_asset && (
                  <div className="mt-4 flex w-full flex-col items-center justify-center">
                    <iframe
                      src={convertToEmbedUrl(section.url_asset as string)}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-sm md:h-[calc(100vh/2.3)] xl:h-[calc(100vh/1.5)] xl:w-9/12"
                      title="YouTube Video"
                    ></iframe>
                    <div className="mt-1 text-center text-sm italic text-foreground/75">
                      {section.caption}
                    </div>
                  </div>
                )}
              </>
            )}
            {section.body && (
              <div
                className="tiptap preview"
                dangerouslySetInnerHTML={{ __html: section.body }}
              />
            )}
          </Fragment>
        ))}
      </div>
    </HomeLayout>
  );
};

export default DetailBlog;
