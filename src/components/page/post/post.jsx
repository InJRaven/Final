import { useContext, useEffect, useMemo, useState } from "react";
import DOMPurify from "dompurify";
import { AppContext } from "../../../context/AppContext";
import { useParams } from "react-router-dom";
import { useDynamicHelmet } from "../../../context/DynamicHelmetContext";
import "./post.scss";
import { useLoading } from "../../../context/LoadingContext";
import { getPost } from "../../../utils/utils"; // Chỉ cần gọi API cho post
import { ImSpinner10 } from "react-icons/im";

const Post = () => {
  const [post, setPost] = useState([]);
  const { language } = useContext(AppContext);
  const { setTitle, setMetaTag } = useDynamicHelmet();
  const { startLoading, stopLoading } = useLoading();
  const { url } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      startLoading(); // Hiển thị trạng thái loading
      try {
        const postResponse = await getPost(url); // Chỉ lấy dữ liệu bài viết

        if (postResponse.status === 200) {
          const fetchedPost = postResponse.data.data.posts;

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
        console.error("Failed to fetch post data:", error);
      } finally {
        stopLoading(); // Đảm bảo luôn dừng loading
      }
    };

    fetchData();
  }, [language, url, setTitle, setMetaTag]); // Chỉ theo dõi thay đổi language và url

  const postContent = useMemo(() => {
    // Kiểm tra xem post có tồn tại và có content hay không
    if (post?.[0]?.content) {
      return DOMPurify.sanitize(post[0].content); // Chỉ sanitize nếu có content
    }
    return ""; // Trả về chuỗi rỗng nếu không có content
  }, [post?.[0]?.content]);
  return (
    <>
      <div className="w-full col-start-2 col-end-6 flex flex-col gap-[2rem]">
        {post && post.length > 0 ? (
          <div
            dangerouslySetInnerHTML={{ __html: postContent }}
            className="post-content p-[1.6rem] !text-md break-words"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <ImSpinner10 className="w-16 h-16 text-gray-900 animate-spin mb-4" />
            <p className="text-gray-600 text-lg font-semibold">
              Loading Post...
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Post;
