import { SignInBtn } from "../SignInBtn";
import styles from "./style.module.scss"

export function Header() {
    return (
      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <img src="/images/logo.svg" alt="logo"></img>
          <nav>
            <a className={styles.active}>Home</a>
            <a>Posts</a>
          </nav>
          <SignInBtn />
        </div>
      </header>
    );
}
