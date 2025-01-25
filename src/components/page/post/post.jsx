import { useContext, useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { AppContext } from "../../../context/AppContext";
import { useParams } from "react-router-dom";
import { getMenu, getPost } from "../../../utils/utils";
import { useDynamicHelmet } from "../../../context/DynamicHelmetContext";
import SideBar from "../../../views/partials/sidebar/sidebar";
import "./post.scss";
import { useLoading } from "../../../context/LoadingContext";

const Post = () => {
  const [menu, setMenu] = useState([]);
  const { language } = useContext(AppContext);
  const { setTitle, setMetaTag } = useDynamicHelmet();
  const { startLoading, stopLoading } = useLoading();

  const [post, setPost] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // Bắt đầu loading khi bắt đầu fetch dữ liệu
    startLoading();
    Promise.all([fetchPostData(), fetchMenuData()])
      .then(() => stopLoading()) // Kết thúc loading khi tất cả dữ liệu đã tải xong
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        stopLoading(); // Đảm bảo loading luôn dừng kể cả khi có lỗi
      });
  }, [language, id, setTitle, setMetaTag]);

  const fetchMenuData = async () => {
    try {
      const response = await getMenu();
      if (response.status === 200) {
        setMenu(response.data.data);
      }
    } catch (error) {
      console.log("Fetch Menu Error:", error);
    }
  };

  const fetchPostData = async () => {
    try {
      const response = await getPost(id); // Sử dụng id từ URL
      if (response.status === 200) {
        console.log(response.data.data);
        setPost(response.data.data.posts);
        setTitle(`${response.data.data.posts[0].title}`);
        setMetaTag({
          ogTitle: `${response.data.data.posts[0].title}`,
          ogImage: `${response.data.data.posts[0].thumbnail}`,
        });
      }
    } catch (error) {
      console.log("Failed to fetch post data:", error);
    }
  };

  const sanitizedHtml =
    post && post.length > 0 && post[0]?.content
      ? DOMPurify.sanitize(post[0]?.content)
      : "";

  return (
    <div className="w-full grid grid-cols-6 gap-[2rem] xs:gap-[1rem] px-[3.2rem] xs:px-[1rem] py-[2rem]">
      <SideBar menu={menu} />
      <div className="w-full col-start-2 col-span-4 flex flex-col gap-[2rem]">
        {post && post.length > 0 && (
          <div
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            className="p-[1.6rem] !text-md !font-medium break-words"
          />
        )}
      </div>
    </div>
  );
};

export default Post;
