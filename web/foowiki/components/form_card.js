import styles from './form_card.module.scss'
import {createRef} from "react";


export let username = createRef()
export let password = createRef()
export let confirm_password = createRef()

export let email = createRef()


export default function Form_card({cardType, func}) {

    let cardStyle = styles.loginCard + " card";
    let confirm_element = null;
    let email_element = null;
    let changeButton = null;
    if (cardType === "register") {
        confirm_element = <input className="form-control" type="password" name="ConfirmPassword"
                                 id="confirmPassword" placeholder="Confirm Password" ref={confirm_password}></input>
        email_element = <input className="form-control" type="email" name="email" ref={email} placeholder="email"></input>
        changeButton = <a className="btn" type="submit" href="/login">back</a>
    }else{
        changeButton = <a className="btn" type="submit" href="/web/foowiki/pages/register">to register</a>
    }
    return (
        <div className={cardStyle}>
            <div className="card-body">
                <h1 className="card-title">{cardType}</h1>
                <input className="form-control" type="text" name="Username" id="username" ref={username}
                       placeholder="Username"></input>
                {email_element}
                <input className="form-control" type="password" name="Password" id="password" ref={password}
                       placeholder="Password"></input>
                {confirm_element}
                <button className="btn" type="submit"
                        onClick={func}>{cardType}</button>
                {changeButton}
            </div>
        </div>
    )
}