import { useContext, useEffect, useMemo, useState } from "react";
import DOMPurify from "dompurify";
import { AppContext } from "../../../context/AppContext";
import { useParams } from "react-router-dom";
import { useDynamicHelmet } from "../../../context/DynamicHelmetContext";
import "./post.scss";
import { useLoading } from "../../../context/LoadingContext";
import { getPost } from "../../../utils/utils"; // Chỉ cần gọi API cho post
import { ImSpinner10 } from "react-icons/im";
import DangerouslySetInnerHTML from "../../ui/DangerouslySetInnerHTML/DangerouslySetInnerHTML";

const Post = () => {
  const [post, setPost] = useState(null);
  const { language } = useContext(AppContext);
  const { setTitle, setMetaTag } = useDynamicHelmet();
  const { startLoading, stopLoading } = useLoading();
  const { url } = useParams();

  useEffect(() => {
    console.log("Đang tải dữ liệu cho", url, "với ngôn ngữ", language);
    const fetchData = async () => {
      startLoading(); // Hiển thị trạng thái loading
      try {
        const postResponse = await getPost(url); // Chỉ lấy dữ liệu bài viết

        if (postResponse.status === 200) {
          const fetchedPost = postResponse.data.data.posts;
          console.log("Tiêu đề bài viết:", fetchedPost[0]?.title); // Kiểm tra tiêu đề ở đây

          setPost(fetchedPost);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu bài viết:", error);
      } finally {
        stopLoading(); // Đảm bảo luôn dừng loading
      }
    };

    fetchData();
  }, [language, url]); // Chỉ theo dõi thay đổi language và url

  useEffect(() => {
    // Kiểm tra post đã được cập nhật chưa
    if (post && post[0]?.title) {
      const postTitle = post[0]?.title || "Loading Post";
      const postThumbnail = post[0]?.thumbnail || "Loading";
      
      // Cập nhật title và meta tag
      setTitle(postTitle);
      setMetaTag({
        ogTitle: postTitle,
        ogImage: postThumbnail,
      });
    }
  }, [post, setTitle, setMetaTag]); // Tách logic cập nhật title và meta tag

  const sanitizedHtml = useMemo(() => {
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
          <DangerouslySetInnerHTML content={sanitizedHtml} className='post-content text-md'/>
        ) : (
          <div className="flex flex-col items-center justify-center h-[70vh]">
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
