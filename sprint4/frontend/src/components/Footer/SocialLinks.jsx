import SocialLink from "./SocialLink";

const SocialLinks = ({ parentClass, itemClass }) => {
  return (
    <ul className={parentClass}>
      <SocialLink
        link={{
          id: 1,
          href: "https://www.facebook.com",
          icon: "fab fa-facebook-f",
        }}
        itemClass={itemClass}
      />
      <SocialLink
        link={{
          id: 2,
          href: "https://www.twitter.com",
          icon: "fab fa-twitter",
        }}
        itemClass={itemClass}
      />
      <SocialLink
        link={{
          id: 3,
          href: "https://www.instagram.com",
          icon: "fab fa-instagram",
        }}
        itemClass={itemClass}
      />
      <SocialLink
        link={{
          id: 4,
          href: "https://www.youtube.com",
          icon: "fab fa-youtube",
        }}
        itemClass={itemClass}
      />
    </ul>
  );
};

export default SocialLinks;
