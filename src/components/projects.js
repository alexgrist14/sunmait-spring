const createProjectCard = (project) => {
  return `
    <article class="list__item">
      <div class="item">
        <div class="item__header">
          <div class="image">
            <img src="${project.image}" alt="${project.title}" />
          </div>
          <h2>${project.title}</h2>
        </div>
        <div class="item__desctiption">
          <p>${project.description}</p>
        </div>
      </div>
    </article>
  `;
};

const renderProjects = (projects) => {
  const container = document.querySelector(".list");
  if (!container) return;

  if (projects.length === 0) {
    container.innerHTML = '<div class="no-results">No results</div>';
    return;
  }

  container.innerHTML = projects.map(createProjectCard).join("");
};

const filterProjects = (searchTerm) => {
  if (!searchTerm) return springProjects;

  const term = searchTerm.toLowerCase();
  return springProjects.filter(
    (project) =>
      project.title.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term)
  );
};

const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const handleSearch = debounce((event) => {
  const filtered = filterProjects(event.target.value);
  renderProjects(filtered);
}, 300);

document.addEventListener("DOMContentLoaded", () => {
  renderProjects(springProjects);

  const searchInput = document.getElementById("projectSearch");
  searchInput.addEventListener("input", handleSearch);
});

const springProjects = [
  {
    title: "Spring Boot",
    image: "assets/spring-boot.svg",
    description:
      "Takes an opinionated view of building Spring applications and gets you up and running as quickly as possible.",
  },
  {
    title: "Spring Framework",
    image: "assets/spring-framework.svg",
    description:
      "Provides core support for dependency injection, transaction management, web apps, data access, messaging, and more.",
  },
  {
    title: "Spring Data",
    image: "assets/spring-data.svg",
    description:
      "Provides a consistent approach to data access – relational, non-relational, map-reduce, and beyond.",
  },
  {
    title: "Spring Cloud",
    image: "assets/spring-cloud.svg",
    description:
      "Provides a set of tools for common patterns in distributed systems. Useful for building and deploying microservices.",
  },
  {
    title: "Spring Cloud Data Flow",
    image: "assets/spring-data-flow.svg",
    description:
      "Provides an orchestration service for composable data microservice applications on modern runtimes.",
  },
  {
    title: "Spring Security",
    image: "assets/spring-security.svg",
    description:
      "Protects your application with comprehensive and extensible authentication and authorization support.",
  },
  {
    title: "Spring Authorization",
    image: "assets/spring-authorization-server.svg",
    description:
      "Provides a secure, light-weight, and customizable foundation for building OpenID Connect 1.0 Identity Providers and OAuth2 Authorization Server products.",
  },
  {
    title: "Spring for GraphQL",
    image: "assets/spring-graphql.svg",
    description:
      "Spring for GraphQL provides support for Spring applications built on GraphQL Java.",
  },
  {
    title: "Spring Session",
    image: "assets/spring-security.svg",
    description:
      "Protects your application with comprehensive and extensible authentication and authorization support.",
  },
];
