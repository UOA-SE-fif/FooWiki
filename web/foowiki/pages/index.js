import Link from 'next/link'
import Container from '../components/container'
import Nav_bar from "../components/nav_bar";
import styles from "./scss/index.scss"



export default function Home() {
    return (
        <div>
            <Nav_bar></Nav_bar>
            <Container>
                <div className={"row vh-100"}>
                    <div className={"align-items-center d-flex"}>
                        <h1>Welcome to FooWiki</h1>
                    </div>
                </div>
            </Container>
        </div>
    )
}
