import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import Tile from "../../shared/ui/Tile/Tile";
import Button from "../../shared/ui/Button/Button";
import Input from "../../shared/ui/Input/Input";
import debounce from "../../shared/utils/debounce";
import { checkAuth, authAxios } from "../../shared/utils/auth";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const filteredProjects = useMemo(() => {
    if (!searchTerm) return projects;

    const term = searchTerm.toLowerCase();
    return projects.filter(
      (project) =>
        project.title.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term)
    );
  }, [projects, searchTerm]);

  const getProjects = () => {
    authAxios.get("/projects").then((res) => setProjects(res.data.data));
  };

  useEffect(() => {
    const initialize = async () => {
      await checkAuth(dispatch);
      setLoading(false);
      getProjects();
    };
    initialize();
  }, [dispatch]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [loading, isAuthenticated, navigate]);

  const handleSearch = debounce((value) => {
    setSearchTerm(value);
  }, 300);

  const handleInputChange = (e) => {
    handleSearch(e.target.value);
  };

  return (
    <main className={styles.main}>
      <div className={styles.main__top}>
        <div className={classNames(styles.markdown, "container")}>
          <h1>Projects</h1>
          <div className={styles.description}>
            From configuration to security, web apps to big data—whatever the
            infrastructure needs of your application may be, there is a Spring
            Project to help you build it. Start small and use just what you
            need—Spring is modular by design.
          </div>
          <Button color={"white"}>Release Calendar</Button>
        </div>
        <div className={styles.line}></div>
      </div>
      <div className={styles.main__bottom}>
        <div className={classNames(styles.projects, "container")}>
          <div className={styles.search__container}>
            <Input
              id={"searchProjects"}
              placeholder={"Search projects..."}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.list}>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((item) => (
                <Tile key={item.title} project={item} />
              ))
            ) : (
              <div className={styles.no_results}>No results</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
