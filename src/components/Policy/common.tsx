const Section = ({ link, title, text, list = null }) => (
  <section className="flex flex-col items-start">
    <div className="relative">
      <h2 id={link} className="text-[0px] absolute top-[-6rem] left-0">
        {title}
      </h2>
      <span className="leading-6 ">{title}</span>
    </div>
    <p className="leading-6 text-sm whitespace-pre-line text-text-secondary dark:text-[#B0B4C8]">
      {text}
    </p>
    {list ? (
      <ul className="list-disc relative left-6">
        {list.map((item) => (
          <li
            key={item.id}
            className="text-sm whitespace-pre-line text-text-secondary dark:text-[#B0B4C8]"
          >
            {item.title}
          </li>
        ))}
      </ul>
    ) : null}
  </section>
);

export default Section;
