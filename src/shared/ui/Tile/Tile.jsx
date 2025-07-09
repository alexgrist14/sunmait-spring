import styles from "./Tile.module.css";

const Tile = ({ project }) => {
  return (
    <article className={styles.list__item}>
      <div className={styles.item}>
        <div className={styles.item__header}>
          <div className={styles.image}>
            <img src={project.imageUrl} alt={project.title} />
          </div>
          <h2>{project.title}</h2>
        </div>
        <div className={styles.item__description}>
          <p>{project.description}</p>
        </div>
      </div>
    </article>
  );
};

export default Tile;
