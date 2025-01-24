import React from "react";
import Button from "../../../ui/Button/Button";
import HeadingSection from "../headingSection/HeadingSection";
import Card from "../../../ui/Card/Card";
import { Link } from "react-router-dom";
import "./section.scss";
const Section = React.memo(
  ({
    langugage,
    title,
    typeButton,
    link,
    textButton,
    iconButtonLeft,
    iconButtonRight,
    data,
  }) => {
    return (
      <section className="w-full flex flex-col items-center gap-[1rem] py-[2rem] section__container">
        <HeadingSection title={title} />
        <div className="w-full grid grid-cols-4 xs:grid-cols-2 gap-[2rem] p-[1.6rem] border border-gray-500 rounded-[0.6rem] relative list-card">
          {data &&
          data.map((item) => (
            <Link to={`/products/${item.slug}`} key={item.id}>
              <Card
                url={item.main_image}
                alt={item.name}
                nameCard={item.name}
                price={`${langugage === 'vi' ? 'Từ': 'From'} ${item.price}`}
              />
            </Link>
          ))}
        </div>
        <Button
          as={typeButton}
          link={link}
          text={textButton}
          iconLeft={iconButtonLeft}
          iconRight={iconButtonRight}
        />
      </section>
    );
  }
);
export default Section;
