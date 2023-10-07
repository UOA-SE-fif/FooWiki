import Link from 'next/link'
import Container from '../components/container'

export default function Home() {
    return (
        <Container>
            <h1>Welcome to FooWiki!</h1>
            <ul className={"nav"}>
                <li className={"nav-item"}>
                    <Link href={"/login"}>
                        login
                    </Link>
                </li>
                <li className={"nav-item"}>
                    <Link href={"/register"}>
                        register
                    </Link>
                </li>
            </ul>
        </Container>
    )
}
