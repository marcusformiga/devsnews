import styles from "./style.module.scss"
import { FaGithub } from "react-icons/fa"
import { FiX } from "react-icons/fi"
import { signIn, useSession, signOut } from "next-auth/client"

export function SignInBtn() {
  const [session] = useSession()
  console.log(session)
    return session ? (
      <button type="button" className={styles.signInBtn} onClick={signOut}>
        <FaGithub color="#17e44a" />
            {session.user.name}
        <FiX color="#23124" className={styles.closeIcon} />    
      </button>
    ) : (
      <button type="button" className={styles.signInBtn} onClick={() => signIn("github")}>
        <FaGithub color="#e4ac17" />
        Signin with github
      </button>
    );
}
