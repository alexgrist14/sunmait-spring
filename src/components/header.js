const renderNavMenu = (containerSelector, items) => {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  let html = "";

  items.forEach((item) => {
    html += `
      <div class="navbar__item">
        <span>${item.title}</span>
        ${item.dropdown.length ? renderDropdown(item.dropdown) : ""}
      </div>
    `;
  });

  container.innerHTML = html;
};

const renderDropdown = (items) => {
  return `
    <ul class="dropdown">
      ${items
        .map(
          (item) => `
        <li>
          <a 
            class="dropdown__item" 
            href="${item.href}" 
          >
            ${item.text}
          </a>
        </li>
      `
        )
        .join("")}
    </ul>
  `;
};

document.addEventListener("DOMContentLoaded", () => {
  renderNavMenu(".navbar__menu", navItemsData);
});

document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".navbar__item");

  navItems.forEach((item) => {
    const title = item.querySelector("span");
    const dropdown = item.querySelector("ul");

    if (title && dropdown) {
      title.addEventListener("click", (e) => {
        const isOpened = item.classList.contains("opened");
        e.stopPropagation();

        navItems.forEach((otherItem) => {
          if (otherItem !== item) {
            console.log("deleted");

            otherItem.classList.remove("opened");
            otherItem.querySelector("ul")?.classList.remove("opened");
          }
        });

        if (!isOpened) {
          item.classList.add("opened");
          dropdown.classList.add("opened");
        } else {
          item.classList.remove("opened");
          dropdown.classList.remove("opened");
        }
      });
    }
  });
});

const navItemsData = [
  {
    title: "Why Spring",
    dropdown: [
      { text: "Overview", href: "/why-spring" },
      { text: "Generative AI", href: "/ai" },
      { text: "Microservices", href: "/microservices" },
      { text: "Reactive", href: "/reactive" },
      { text: "Event Driven", href: "/event-driven" },
      { text: "Cloud", href: "/cloud" },
      { text: "Web Applications", href: "/web-applications" },
      { text: "Serverless", href: "/serverless" },
      { text: "Batch", href: "/batch" },
    ],
  },
  {
    title: "Learn",
    dropdown: [
      { text: "Overview", href: "/learn" },
      { text: "Quickstart", href: "/quickstart" },
      { text: "Guides", href: "/guides" },
      { text: "Blog", href: "/blog" },
      { text: "Security Advisories", href: "/security" },
    ],
  },
  {
    title: "Projects",
    dropdown: [
      { text: "Overview", href: "/projects", current: true },
      { text: "Spring Boot", href: "/projects/spring-boot" },
      { text: "Spring Framework", href: "/projects/spring-framework" },
      { text: "Spring Cloud", href: "/projects/spring-cloud" },
      {
        text: "Spring Cloud Data Flow",
        href: "/projects/spring-cloud-dataflow",
      },
      { text: "Spring Data", href: "/projects/spring-data" },
      { text: "Spring Integration", href: "/projects/spring-integration" },
      { text: "Spring Batch", href: "/projects/spring-batch" },
      { text: "Spring Security", href: "/projects/spring-security" },
      { text: "Spring AI", href: "/projects/spring-ai" },
      { text: "Release Calendar", href: "/projects#release-calendar" },
      { text: "Security advisories", href: "/security" },
    ],
  },
  {
    title: "Academy",
    dropdown: [
      { text: "Courses", href: "https://spring.academy/courses" },
      { text: "Get Certified", href: "https://spring.academy/learning-path" },
    ],
  },
  {
    title: "Community",
    dropdown: [
      { text: "Overview", href: "/community" },
      { text: "Events", href: "/events" },
      { text: "Authors", href: "/authors" },
    ],
  },
  {
    title: "Tanzu Spring",
    dropdown: [
      { text: "Tanzu", href: "/community" },
      { text: "Spring", href: "/events" },
    ],
  },
];

const burger = document.querySelector(".navbar__burger");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");

  const menu = document.querySelector(".navbar__menu");
  menu.classList.toggle("open");
});
