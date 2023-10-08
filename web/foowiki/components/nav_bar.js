import styles from './nav_bar.module.scss'

export default function Nav_bar() {
    return (
        <nav className={styles.navbar + " navbar navbar-expand-lg navbar-light"}>
            <div className="container">
                <a className="navbar-brand" href="/">FooWiki</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="true" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse show" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active"
                                 aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/dishes">Dishes</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#">Restaurants</a>
                        </li>
                    </ul>
                    <form className="d-flex" role="authentication">
                        <li className={styles.navbar_btn + " btn btn-outline-success"}>
                            <a className="nav-link" href="/register">Sign up</a>
                        </li>
                        <li className={styles.navbar_btn + " btn btn-outline-success"}>
                            <a className="nav-link" href="/login">Sign in</a>
                        </li>
                    </form>
                </div>
            </div>
        </nav>
    )
}