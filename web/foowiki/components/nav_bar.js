import styles from './nav_bar.module.scss'
import Link from "next/link";

export default function Nav_bar() {
    return (
        <nav className={styles.navbar + " navbar navbar-expand-lg navbar-light"}>
            <div className="container">
                <Link className="navbar-brand" href="/">FooWiki</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="true" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse show" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active"
                                 aria-current="page" href="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/dishes">Dishes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link disabled" href="#">Restaurants</Link>
                        </li>
                    </ul>
                    <form className="d-flex" role="authentication">
                        <li className={styles.navbar_btn + " btn btn-outline-success"}>
                            <Link className="nav-link" href="/register">Sign up</Link>
                        </li>
                        <li className={styles.navbar_btn + " btn btn-outline-success"}>
                            <Link className="nav-link" href="/login">Sign in</Link>
                        </li>
                    </form>
                </div>
            </div>
        </nav>
    )
}