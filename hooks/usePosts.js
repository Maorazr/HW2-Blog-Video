import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export const usePosts = (initialPage = 1, initialPosts = []) => {
  const [posts, setPosts] = useState(initialPosts);
  const [totalPages, setTotalPages] = useState(
    Math.ceil((initialPosts.length || 0) / 10)
  );
  const router = useRouter();
  const postsPerPage = 10;

  const currentPage = parseInt(router.query.page) || 1;

  useEffect(() => {
    if (initialPosts.length === 0 || currentPage !== initialPage) {
      fetch(`/api/post?page=${currentPage}`)
        .then((res) => res.json())
        .then((data) => {
          if (!Array.isArray(data.posts)) {
            throw new Error("Invalid data");
          }
          setPosts(data.posts);
          const pages = Math.ceil(data.count / postsPerPage);
          setTotalPages(pages);
        })
        .catch((error) => console.error(error));
    }
  }, [currentPage]);

  const setCurrentPage = (page) => {
    router.push(`?page=${page}`, undefined, { shallow: true });
  };

  return { posts, currentPage, totalPages, setCurrentPage };
};
