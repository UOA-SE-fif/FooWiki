import styles from './form_card.module.scss'
import {createRef} from "react";


export let username = createRef()
export let password = createRef()
export let confirm_password = createRef()


export default function Form_card({cardType, func}) {

    let cardStyle = styles.loginCard + " card";
    let confirm_element = null;
    if (cardType === "register") {
        confirm_element = <input className="form-control" type="password" name="ConfirmPassword"
                                 id="confirmPassword" placeholder="Confirm Password" ref={confirm_password}></input>
    }
    return (
        <div className={cardStyle}>
            <div className="card-body">
                <h1 className="card-title">{cardType}</h1>
                <input className="form-control" type="text" name="Username" id="username" ref={username}
                       placeholder="Username"></input>
                <input className="form-control" type="password" name="Password" id="password" ref={password}
                       placeholder="Password"></input>
                {confirm_element}
                <button className="btn" type="submit"
                        onClick={func}>{cardType}</button>
            </div>
        </div>
    )
}