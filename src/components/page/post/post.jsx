import { useContext, useEffect, useState } from "react";
import DOMPurify from 'dompurify'
import { AppContext } from "../../../context/AppContext";
import { useParams } from "react-router-dom";
import { getPost } from "../../../utils/utils";
import "./post.scss";
import img404 from '../../../assets/img/404.avif'
const Post = () => {
  const { language } = useContext(AppContext);
  const [post, setPost] = useState({});
  const { id } = useParams();
  useEffect(() => {
    fetchPostData();
  }, [language]);
  const fetchPostData = async () => {
    try {
      const response = await getPost(id);

      if (response.status === 200) {
        console.log(response.data.data);
        setPost(response.data.data.post)
      }
    } catch (error) {
      console.log("Faild Fetch Data Services: ", error);
    }
  };

  const sanitizedHtml =
  post && post.length >0
      ? DOMPurify.sanitize(post)
      : "";

  return (
    <div className="w-full grid grid-cols-6 gap-[2rem] xs:gap-[1rem] px-[3.2rem] xs:px-[1rem] py-[2rem]">
      <div className="w-full col-start-2 col-span-4 flex flex-col gap-[2rem]">
        {sanitizedHtml && ( <div
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
          className="p-[1.6rem] flex flex-col gap-[1.6rem] !text-md !font-medium break-words"
        />) }

        {!sanitizedHtml && (
          <div className="flex items-center justify-center">
            <img src={img404} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
