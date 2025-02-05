import { useContext, useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { AppContext } from "../../../context/AppContext";
import { useParams } from "react-router-dom";

import { useDynamicHelmet } from "../../../context/DynamicHelmetContext";
import SideBar from "../../../views/partials/sidebar/sidebar";
import "./post.scss";
import { useLoading } from "../../../context/LoadingContext";
import { getMenu, getPost } from "../../../utils/utils";
import { ImSpinner10 } from "react-icons/im";

const Post = () => {
  const [menu, setMenu] = useState([]);
  const [post, setPost] = useState([]);
  const { language } = useContext(AppContext);
  const { setTitle, setMetaTag } = useDynamicHelmet();
  const { startLoading, stopLoading } = useLoading();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      startLoading();
      try {
        const [menuResponse, postResponse] = await Promise.all([
          getMenu(),
          getPost(id),
        ]);

        if (menuResponse.status === 200) {
          setMenu(menuResponse.data.data);
        }

        if (postResponse.status === 200) {
          const fetchedPost = postResponse.data.data.posts;
          console.log(postResponse.data.data);

          setPost(fetchedPost);

          const postTitle = fetchedPost[0]?.title || "Loading Post";
          const postThumbnail = fetchedPost[0]?.thumbnail || "Loading";

          setTitle(postTitle);
          setMetaTag({
            ogTitle: postTitle,
            ogImage: postThumbnail,
          });
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        stopLoading(); // Đảm bảo luôn dừng loading
      }
    };

    fetchData();
  }, [language, id]);

  const sanitizedHtml =
    post && post.length > 0 && post[0]?.content
      ? DOMPurify.sanitize(post[0]?.content)
      : "";

  return (
    <div className="w-full grid grid-cols-6 gap-[2rem] xs:gap-[1rem] px-[3.2rem] xs:px-[1rem] py-[2rem]">
      <SideBar menu={menu} />
      <div className="w-full col-start-2 col-end-6 flex flex-col gap-[2rem]">
        {post && post.length > 0 ? (
          <div
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            className="p-[1.6rem] !text-md !font-medium break-words"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <ImSpinner10 className="w-16 h-16 text-gray-900 animate-spin mb-4" />
            <p className="text-gray-600 text-lg font-semibold">Loading Post...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
