import { Input } from "@/Components/ui/input";
import { ScrollArea, ScrollBar } from "@/Components/ui/scroll-area";
import { Separator } from "@/Components/ui/separator";
import HomeLayout from "@/Layouts/HomeLayout";
import { BlogTagSchema, DataBlogSchema, TagSchema } from "@/types/BlogType";
import { Head, Link } from "@inertiajs/react";
import { ChevronLeft, ChevronRight, Newspaper } from "lucide-react";
import { useMemo, useState } from "react";
import ReactPaginate from "react-paginate";

type BlogProps = DataBlogSchema & {
  blog_tags?: BlogTagSchema &
    {
      tag: TagSchema;
    }[];
};

const Blog = ({ blogs }: { blogs: BlogProps[] }) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPage, setTotalPage] = useState(Math.ceil(blogs.length / 12));

  const filteredData: BlogProps[] = useMemo(() => {
    if (!searchTerm) return blogs;

    const lowerSearchTerm = searchTerm.toLowerCase();

    return blogs.filter((item) => {
      // Cek di 'title'
      if (item.title.toLowerCase().includes(lowerSearchTerm)) {
        return true;
      }

      // Cek di 'blog_tags[].tag.name'
      if (
        item.blog_tags?.some((tag) =>
          tag?.tag?.name?.toLowerCase().includes(lowerSearchTerm),
        )
      ) {
        return true;
      }

      return false;
    });
  }, [blogs, searchTerm]);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const itemsPerPage = 12;
  const pageStartIndex = (page - 1) * itemsPerPage;
  const pageEndIndex = page * itemsPerPage;
  const currentData = filteredData.slice(pageStartIndex, pageEndIndex);

  return (
    <HomeLayout>
      <Head title="Artikel" />
      <div className="mx-auto flex w-full flex-col gap-4 md:gap-8">
        <div className="flex flex-col items-center justify-center pt-10">
          <p className="text-center text-4xl font-bold lg:w-10/12 xl:w-8/12">
            Temukan Artikel dan Informasi yang Dapat Bermanfaat Untuk Anda
          </p>
          <p className="text-center text-foreground/75">
            Eksplorasi berbagai topik terkini yang akan membantu Anda memperluas
            wawasan dan pengetahuan.
          </p>
          <Input
            placeholder="Cari Artikel..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="mt-4 w-full sm:max-w-md"
          />
        </div>
        <div className="mt-4 flex w-full flex-wrap gap-2 pb-10">
          <div className="flex items-start justify-start gap-4">
            <div>
              <Newspaper size={28} />
            </div>
            <p className="text-start text-2xl font-bold text-foreground">
              {searchTerm
                ? `Search Artikel : ${searchTerm}`
                : "Semua Postingan Artikel"}
            </p>
          </div>
          <Separator />
          {currentData.length === 0 ? (
            <div className="flex h-[278px] w-full items-center justify-center sm:h-[302px] md:h-[440px]">
              <p className="text-base font-medium text-muted-foreground md:text-lg">
                Postingan artikel belum tersedia
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 place-items-start gap-4 pt-2 sm:grid-cols-3 lg:grid-cols-4 2xl:flex 2xl:flex-wrap 2xl:items-start 2xl:justify-start 2xl:px-4">
                {currentData.map((blog) => (
                  <Link
                    key={blog.id}
                    onMouseDown={(e) => e.stopPropagation()}
                    href={`/blog/${blog.slug}?id=${blog.id}`}
                    className="animate-fadeIn relative flex w-full cursor-pointer flex-col justify-items-start gap-3 self-start rounded-lg transition-all duration-300 ease-in hover:rounded-md hover:bg-accent hover:shadow-lg md:gap-5 2xl:w-[320px]"
                  >
                    <div className="h-[110px] w-full rounded-t-lg sm:h-[150px] md:h-[200px]">
                      <img
                        alt="image blog"
                        src={`/${blog.cover_image}`}
                        width={450}
                        height={340}
                        className="h-full w-full scale-100 rounded-t-lg object-cover"
                      />
                    </div>
                    <div className="flex h-full w-full flex-col items-start justify-start gap-2 px-3 pb-2 md:gap-4">
                      <div className="items-startgap-2 relative flex w-full flex-col justify-start">
                        <time className="text-left text-sm font-medium text-primary sm:text-base">
                          {new Date(blog.created_at).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            },
                          )}
                        </time>
                        <h3
                          title={`${blog.title}`}
                          className={`text-dark line-clamp-1 w-full text-left text-lg font-semibold md:line-clamp-2 md:h-14 md:text-xl`}
                        >
                          {blog.title}
                        </h3>

                        <p className="text-body line-clamp-2 h-10 w-full text-left text-sm font-medium sm:text-base md:line-clamp-3 md:h-[72px]">
                          {blog.desc}
                        </p>
                      </div>
                      <ScrollArea className="w-full overflow-x-auto">
                        <ul className="pointer-events-auto relative flex h-auto w-full cursor-default items-start justify-start gap-2 pb-2">
                          {blog.blog_tags?.map((item, index) => (
                            <li
                              key={index}
                              className="relative flex cursor-default items-center justify-center whitespace-nowrap rounded-sm px-2.5 py-0.5 text-center text-sm font-medium text-foreground/75 odd:bg-accent even:bg-secondary md:text-base"
                            >
                              {item.tag.name}
                            </li>
                          ))}
                        </ul>
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
          {currentData.length > 0 && (
            <ReactPaginate
              breakLabel={
                <span className="flex h-8 w-5 items-center justify-center md:h-10 md:w-10">
                  ...
                </span>
              }
              nextLabel={
                <div className="group mr-1 flex rounded-full bg-white p-3 transition-all hover:bg-accent">
                  <ChevronRight className="group-hover:text-body inline-block text-foreground" />
                </div>
              }
              pageCount={totalPage}
              onPageChange={handlePageClick}
              pageRangeDisplayed={1}
              marginPagesDisplayed={2}
              previousLabel={
                <div className="group mr-1 flex rounded-full bg-white p-3 transition-all hover:bg-accent">
                  <ChevronLeft className="group-hover:text-body inline-block text-foreground" />
                </div>
              }
              containerClassName="flex justify-center items-center border-t-[1px] border-ccc pt-4 mt-6 w-full"
              previousClassName="flex w-full justify-start items-center group"
              nextClassName="flex w-full justify-end items-center group"
              pageClassName="flex justify-center items-center h-7 w-7 md:h-10 md:w-10 rounded-lg"
              disabledClassName="cursor-default pointer-events-none"
              pageLinkClassName="flex justify-center items-center text-sm md:text-base  h-7 w-7 md:h-10 md:w-10 hover:bg-secondary rounded-md md:rounded-lg"
              activeClassName="font-bold bg-secondary"
            />
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

export default Blog;
