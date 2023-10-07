import styles from './form_card.module.scss'

export default function Form_card({cardType, func}) {
    let cardStyle = styles.loginCard + " card";
    if (cardType === "register") {
        cardStyle = styles.registerCard + " card";
    }
    return (
        <div className={cardStyle}>
            <div className="card-body">
                <h1 className="card-title">{cardType}</h1>
                <input className="form-control" type="text" name="Username" id="username" ref={username}
                       placeholder="Username"></input>
                <input className="form-control" type="password" name="Password" id="password" ref={password}
                       placeholder="Password"></input>
                <button className="btn" type="submit" name="Register" id="registerButton" onClick={func}>{cardType}</button>
            </div>
        </div>
    )
}